import { NextResponse } from 'next/server'
import type { FormData, AnalysisResult } from '@/types'
import { sanitizeInput } from '@/lib/utils'

// This is a mock implementation. In a real application, this would query
// external databases and APIs for actual supplement interaction data.
export async function POST(request: Request) {
  try {
    const body: FormData = await request.json()
    
    // Sanitize input but don't parse yet since this is a mock
    sanitizeInput(body.supplements)
    
    // Mock response with broader range of sources
    const mockResult: AnalysisResult = {
      interactions: [
        {
          supplement: 'Fish Oil',
          interactsWith: 'Blood thinners',
          severity: 'moderate',
          effect: 'May increase risk of bleeding when combined with anticoagulant medications',
          evidence: {
            source: 'WebMD',
            url: 'https://www.webmd.com/vitamins/ai/ingredientmono-993/fish-oil'
          }
        },
        {
          supplement: 'Fish Oil',
          interactsWith: 'Exercise',
          severity: 'low',
          effect: 'May enhance workout recovery and reduce inflammation',
          evidence: {
            source: 'Healthline',
            url: 'https://www.healthline.com/nutrition/fish-oil-benefits'
          }
        }
      ],
      contraindications: [
        ...(body.gender === 'female' ? [{
          condition: 'Pregnancy',
          description: 'Some supplements may not be safe during pregnancy. Specific evaluation needed.',
          evidence: {
            source: 'Medical News Today',
            url: 'https://www.medicalnewstoday.com/articles/supplements-during-pregnancy'
          }
        }] : []),
        {
          condition: 'Surgery',
          description: 'Some supplements may increase bleeding risk during surgery',
          evidence: {
            source: 'Mayo Clinic',
            url: 'https://www.mayoclinic.org/healthy-lifestyle/consumer-health/in-depth/herbal-supplements/art-20046714'
          }
        }
      ],
      adverseEffects: [
        {
          effect: 'Gastrointestinal disturbance',
          likelihood: 'common',
          description: 'May cause mild digestive symptoms, particularly when taken on an empty stomach',
          evidence: {
            source: 'Verywell Health',
            url: 'https://www.verywellhealth.com/fish-oil-side-effects-2324144'
          }
        }
      ],
      lastUpdated: new Date().toISOString(),
      disclaimer: 'Always consult with your healthcare provider before making changes to your supplement regimen.'
    }

    return NextResponse.json(mockResult)
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 