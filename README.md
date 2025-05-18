# Supplements Interaction Checker

An AWS Lambda function that checks for potential interactions between supplements using PubMed research and OpenAI analysis.

## Features

- Queries PubMed API for studies about supplement interactions
- Uses OpenAI to analyze and summarize the research
- Provides structured analysis of potential interactions
- Includes strength of evidence and safety recommendations

## Project Structure

```
supplements-project/
├── src/
│   ├── __init__.py
│   ├── lambda_function.py
│   └── utils/
│       ├── __init__.py
│       ├── pubmed.py
│       └── openai_utils.py
├── tests/
│   └── test_lambda_function.py
├── requirements.txt
└── README.md
```

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key

## Testing

Run the test suite:
```bash
pytest tests/
```

## Deployment

1. Create a deployment package:
   ```bash
   pip install -r requirements.txt -t ./package
   cd package
   zip -r ../lambda_function.zip .
   cd ..
   zip -g lambda_function.zip src/lambda_function.py
   ```

2. Deploy to AWS Lambda:
   - Upload `lambda_function.zip` to AWS Lambda
   - Set environment variables
   - Configure API Gateway trigger

## API Usage

Send a POST request to the API endpoint with the following JSON body:
```json
{
    "supplement_1": "Vitamin C",
    "supplement_2": "Iron"
}
```

## Development

- Python 3.9+
- AWS Lambda
- OpenAI API
- PubMed API

## License

[Your chosen license]