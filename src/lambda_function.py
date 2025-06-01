"""
AWS Lambda function for checking supplement interactions
"""
import json
import logging
from typing import Dict, Any
from .utils.pubmed import query_pubmed_api
from .utils.openai_utils import analyze_interactions

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def validate_input(body: Dict[str, Any]) -> tuple[bool, str, str]:
    """
    Validate the input parameters from the request body.

    Args:
        body (Dict[str, Any]): Request body

    Returns:
        tuple[bool, str, str]: (is_valid, supplement1, supplement2)
    """
    supplement_1 = body.get("supplement_1", "").strip()
    supplement_2 = body.get("supplement_2", "").strip()
    
    if not supplement_1 or not supplement_2:
        return False, "", ""
    
    return True, supplement_1, supplement_2

def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    AWS Lambda handler function.

    Args:
        event (Dict[str, Any]): Lambda event
        context (Any): Lambda context

    Returns:
        Dict[str, Any]: Response with status code and body
    """
    try:
        # Parse and validate input
        body = json.loads(event.get("body", "{}"))
        is_valid, supplement_1, supplement_2 = validate_input(body)
        
        if not is_valid:
            logger.warning("Invalid input: missing supplement names")
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Both supplements are required"})
            }

        # Query PubMed and analyze results
        logger.info(f"Querying PubMed for interactions between {supplement_1} and {supplement_2}")
        studies = query_pubmed_api(supplement_1, supplement_2)
        
        logger.info("Analyzing interactions with OpenAI")
        analysis = analyze_interactions(supplement_1, supplement_2, studies)

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"  # Enable CORS
            },
            "body": json.dumps({"result": analysis})
        }

    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in request body: {str(e)}")
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid JSON in request body"})
        }
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Internal server error"})
        } 