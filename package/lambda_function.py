import json
import openai
import requests
import os
from urllib.parse import quote

def query_pubmed_api(supplement1, supplement2):
    """
    Query PubMed API for studies about interactions between two supplements.
    Uses the NCBI E-utilities API.
    """
    search_term = f"({supplement1}) AND ({supplement2}) AND (interaction OR combined)"
    encoded_term = quote(search_term)
    
    esearch_url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term={encoded_term}&retmode=json&retmax=10"
    search_response = requests.get(esearch_url)
    
    try:
        search_data = search_response.json()
    except:
        return "Error parsing PubMed response."

    if 'esearchresult' not in search_data or 'idlist' not in search_data['esearchresult']:
        return "No studies found."
    
    id_list = search_data['esearchresult']['idlist']
    
    if not id_list:
        return "No studies found."
    
    studies = []
    for article_id in id_list:
        efetch_url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id={article_id}&retmode=text&rettype=abstract"
        abstract_response = requests.get(efetch_url)
        abstract = abstract_response.text.strip() if abstract_response.status_code == 200 else "Abstract unavailable"
        
        studies.append({
            "id": article_id,
            "abstract": abstract
        })
    
    return studies

def analyze_interactions(supplement1, supplement2, studies):
    """
    Use OpenAI API to analyze the PubMed studies and summarize potential interactions.
    """
    api_key = os.getenv('OPENAI_API_KEY')  # Get API key from environment variables

    if not api_key:
        return "Error: OpenAI API key not set."

    client = openai.Client(api_key=api_key)
    
    if isinstance(studies, str):
        return f"Could not find studies about {supplement1} and {supplement2} interactions: {studies}"
    
    if not studies:
        return f"No studies found that discuss interactions between {supplement1} and {supplement2}."
    
    study_texts = []
    for i, study in enumerate(studies[:5]):  # Limit to 5 studies
        abstract = study['abstract'][:500]  # Truncate to manage token limit
        study_texts.append(f"Study {i+1}: {abstract}")
    
    all_studies = "\n".join(study_texts)
    
    prompt = f"""
    You are a medical research assistant analyzing supplement interactions.
    Analyze the following PubMed studies regarding interactions between {supplement1} and {supplement2}:
    
    {all_studies}
    
    Based on these studies, summarize:
    1. Known interactions between {supplement1} and {supplement_2}
    2. Strength of evidence (strong, moderate, weak, or inconclusive)
    3. Safety concerns or recommendations
    4. Any positive synergistic effects
    
    If contradictions exist, note them. If studies don't directly address interactions, state that clearly.
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a helpful medical research assistant."},
                  {"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=500
    )
    
    return response.choices[0].message.content

def lambda_handler(event, context):
    try:
        # Parse input from event
        body = json.loads(event.get("body", "{}"))
        supplement_1 = body.get("supplement_1", "").strip()
        supplement_2 = body.get("supplement_2", "").strip()
        
        if not supplement_1 or not supplement_2:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Both supplements are required"})
            }

        # Query PubMed and analyze results with OpenAI
        studies = query_pubmed_api(supplement_1, supplement_2)
        analysis = analyze_interactions(supplement_1, supplement_2, studies)

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"result": analysis})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
