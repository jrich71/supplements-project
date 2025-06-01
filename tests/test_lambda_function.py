"""
Unit tests for the Lambda function
"""
import json
import pytest
from src.lambda_function import lambda_handler, validate_input
from src.utils.pubmed import query_pubmed_api
from src.utils.openai_utils import analyze_interactions

def test_validate_input():
    """Test input validation"""
    # Test valid input
    body = {"supplement_1": "Vitamin C", "supplement_2": "Iron"}
    is_valid, supp1, supp2 = validate_input(body)
    assert is_valid
    assert supp1 == "Vitamin C"
    assert supp2 == "Iron"

    # Test missing supplement
    body = {"supplement_1": "Vitamin C"}
    is_valid, supp1, supp2 = validate_input(body)
    assert not is_valid

    # Test empty supplement
    body = {"supplement_1": "Vitamin C", "supplement_2": ""}
    is_valid, supp1, supp2 = validate_input(body)
    assert not is_valid

def test_lambda_handler_invalid_input():
    """Test Lambda handler with invalid input"""
    # Test missing supplements
    event = {
        "body": json.dumps({})
    }
    response = lambda_handler(event, None)
    assert response["statusCode"] == 400
    assert "error" in json.loads(response["body"])

    # Test invalid JSON
    event = {
        "body": "invalid json"
    }
    response = lambda_handler(event, None)
    assert response["statusCode"] == 400
    assert "error" in json.loads(response["body"])

def test_lambda_handler_valid_input(mocker):
    """Test Lambda handler with valid input"""
    # Mock the external API calls
    mocker.patch(
        "src.utils.pubmed.query_pubmed_api",
        return_value=[{"id": "123", "abstract": "Test abstract"}]
    )
    mocker.patch(
        "src.utils.openai_utils.analyze_interactions",
        return_value="Test analysis"
    )

    event = {
        "body": json.dumps({
            "supplement_1": "Vitamin C",
            "supplement_2": "Iron"
        })
    }
    response = lambda_handler(event, None)
    assert response["statusCode"] == 200
    result = json.loads(response["body"])
    assert "result" in result
    assert result["result"] == "Test analysis" 