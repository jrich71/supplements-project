# Supplement Safety Checker

A trusted, evidence-based application for checking supplement interactions, contraindications, and adverse effects.

## Features

- Free-text supplement and lifestyle input
- Adaptive questionnaire for personalized results
- Evidence-based interaction checking
- Transparent citations from peer-reviewed sources
- Pregnancy safety flags
- Clinician-grade information
- HIPAA-aligned security

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Prisma
- React Query
- Zod
- HeadlessUI
- React Hook Form

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `src/app/*` - App router pages and layouts
- `src/components/*` - Reusable React components
- `src/lib/*` - Utility functions and shared logic
- `src/types/*` - TypeScript type definitions
- `src/styles/*` - Global styles and Tailwind configuration

## Security & Privacy

- All data is encrypted at rest and in transit
- HIPAA-aligned security measures
- No social media or unvetted sources
- Optional secure user accounts

## License

Copyright © 2024. All rights reserved.
