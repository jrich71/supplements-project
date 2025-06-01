# Supplement Safety Checker

A trusted, evidence-based application for checking supplement interactions, contraindications, and adverse effects.

## Features

### Frontend
- Free-text supplement and lifestyle input
- Adaptive questionnaire for personalized results
- Evidence-based interaction checking
- Transparent citations from peer-reviewed sources
- Pregnancy safety flags
- Clinician-grade information
- HIPAA-aligned security

### Backend API
- Queries PubMed API for studies about supplement interactions
- Uses OpenAI to analyze and summarize the research
- Provides structured analysis of potential interactions
- Includes strength of evidence and safety recommendations

## Tech Stack

### Frontend
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Query
- Zod
- HeadlessUI
- React Hook Form

### Backend
- Python 3.9+
- AWS Lambda
- OpenAI API
- PubMed API

## Getting Started

1. Install frontend dependencies:
   ```bash
   yarn install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Required variables:
   - `OPENAI_API_KEY`: Your OpenAI API key

3. Run the development server:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
supplements-project/
├── src/                    # Frontend source code
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript definitions
├── api/                   # Backend Lambda function
│   ├── __init__.py
│   ├── lambda_function.py
│   └── utils/
│       ├── pubmed.py
│       └── openai_utils.py
├── tests/                 # Test files
└── README.md
```

## API Usage

The backend API accepts POST requests with the following JSON body:
```json
{
    "supplement_1": "Vitamin C",
    "supplement_2": "Iron"
}
```

## Security & Privacy

- All data is encrypted at rest and in transit
- HIPAA-aligned security measures
- No social media or unvetted sources
- Optional secure user accounts

## License

Copyright © 2024. All rights reserved.
