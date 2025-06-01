"""
OpenAI API interaction utilities
"""
import os
import openai
from typing import List, Dict, Union

def analyze_interactions(supplement1: str, supplement2: str, studies: Union[List[Dict], str]) -> str:
    """
    Use OpenAI API to analyze the PubMed studies and summarize potential interactions.

    Args:
        supplement1 (str): First supplement name
        supplement2 (str): Second supplement name
        studies (Union[List[Dict], str]): List of studies or error message

    Returns:
        str: Analysis of interactions or error message
    """
    api_key = os.getenv('OPENAI_API_KEY')

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
    1. Known interactions between {supplement1} and {supplement2}
    2. Strength of evidence (strong, moderate, weak, or inconclusive)
    3. Safety concerns or recommendations
    4. Any positive synergistic effects
    
    If contradictions exist, note them. If studies don't directly address interactions, state that clearly.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful medical research assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=500
        )
        
        return response.choices[0].message.content
    except Exception as e:
        return f"Error analyzing interactions: {str(e)}" 