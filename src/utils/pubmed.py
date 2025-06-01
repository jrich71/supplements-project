"""
PubMed API interaction utilities
"""
import requests
from urllib.parse import quote
from typing import List, Dict, Union

def query_pubmed_api(supplement1: str, supplement2: str) -> Union[List[Dict], str]:
    """
    Query PubMed API for studies about interactions between two supplements.
    Uses the NCBI E-utilities API.

    Args:
        supplement1 (str): First supplement name
        supplement2 (str): Second supplement name

    Returns:
        Union[List[Dict], str]: List of studies or error message
    """
    search_term = f"({supplement1}) AND ({supplement2}) AND (interaction OR combined)"
    encoded_term = quote(search_term)
    
    esearch_url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term={encoded_term}&retmode=json&retmax=10"
    
    try:
        search_response = requests.get(esearch_url)
        search_response.raise_for_status()
        search_data = search_response.json()
    except requests.RequestException as e:
        return f"Error querying PubMed: {str(e)}"
    except ValueError as e:
        return f"Error parsing PubMed response: {str(e)}"

    if 'esearchresult' not in search_data or 'idlist' not in search_data['esearchresult']:
        return "No studies found."
    
    id_list = search_data['esearchresult']['idlist']
    
    if not id_list:
        return "No studies found."
    
    studies = []
    for article_id in id_list:
        try:
            efetch_url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id={article_id}&retmode=text&rettype=abstract"
            abstract_response = requests.get(efetch_url)
            abstract_response.raise_for_status()
            abstract = abstract_response.text.strip()
        except requests.RequestException as e:
            abstract = f"Error fetching abstract: {str(e)}"
        
        studies.append({
            "id": article_id,
            "abstract": abstract
        })
    
    return studies 