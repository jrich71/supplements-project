'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ExclamationCircleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import type { AnalysisResult } from '@/types'

const supplementFormSchema = z.object({
  supplements: z.string()
    .min(1, 'Please enter your supplements')
    .max(1000, 'Input is too long'),
  gender: z.enum(['male', 'female', 'other']),
  isPregnant: z.boolean().optional(),
  conditions: z.string().optional(),
  medications: z.string().optional(),
  lifestyle: z.string().optional(),
})

type SupplementFormData = z.infer<typeof supplementFormSchema>

function Citation({ evidence }: { evidence: { source: string; pubmedId?: string; url?: string } }) {
  if (!evidence.url) return <span className="text-xs mt-1">Source: {evidence.source}</span>
  
  return (
    <span className="text-xs mt-1">
      Source:{' '}
      <a 
        href={evidence.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {evidence.source}
        {evidence.pubmedId ? ` (PMID: ${evidence.pubmedId})` : ''}
      </a>
    </span>
  )
}

export default function SupplementForm() {
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SupplementFormData>({
    resolver: zodResolver(supplementFormSchema)
  })

  const gender = watch('gender')

  const onSubmit = async (data: SupplementFormData) => {
    try {
      setError(null)
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze supplements')
      }

      const result = await response.json()
      setResults(result)
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('Failed to analyze supplements. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Supplements Input */}
      <div>
        <label htmlFor="supplements" className="block text-sm font-medium text-gray-700">
          Enter your supplements
        </label>
        <div className="mt-1">
          <textarea
            id="supplements"
            rows={3}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.supplements ? 'border-red-300' : ''
            }`}
            placeholder="Example: Fish oil 1000mg, Vitamin D3 5000IU, Magnesium citrate 400mg..."
            {...register('supplements')}
          />
          {errors.supplements && (
            <p className="mt-1 text-sm text-red-600">{errors.supplements.message}</p>
          )}
        </div>
      </div>

      {/* Gender Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <div className="mt-1 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="male"
              {...register('gender')}
              className="form-radio"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="female"
              {...register('gender')}
              className="form-radio"
            />
            <span className="ml-2">Female</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="other"
              {...register('gender')}
              className="form-radio"
            />
            <span className="ml-2">Other</span>
          </label>
        </div>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      {/* Pregnancy Question (only shown for female) */}
      {gender === 'female' && (
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('isPregnant')}
              className="form-checkbox"
            />
            <span className="ml-2">Are you pregnant or planning to become pregnant?</span>
          </label>
        </div>
      )}

      {/* Medical Conditions */}
      <div>
        <label htmlFor="conditions" className="block text-sm font-medium text-gray-700">
          Medical conditions (optional)
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="conditions"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Example: Hypertension, Type 2 diabetes..."
            {...register('conditions')}
          />
        </div>
      </div>

      {/* Medications */}
      <div>
        <label htmlFor="medications" className="block text-sm font-medium text-gray-700">
          Current medications (optional)
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="medications"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Example: Lisinopril, Metformin..."
            {...register('medications')}
          />
        </div>
      </div>

      {/* Lifestyle Factors */}
      <div>
        <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700">
          Lifestyle factors (optional)
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="lifestyle"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Example: Regular exercise, alcohol consumption..."
            {...register('lifestyle')}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Analyzing...' : 'Check Interactions'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {results && (
        <div className="mt-6 space-y-6">
          {/* Interactions */}
          {results.interactions.length > 0 && (
            <div className="p-4 bg-yellow-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Potential Interactions</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    {results.interactions.map((interaction, index) => (
                      <div key={index} className="mt-3">
                        <p className="font-medium">{interaction.supplement} + {interaction.interactsWith}</p>
                        <p>Severity: {interaction.severity}</p>
                        <p>{interaction.effect}</p>
                        <Citation evidence={interaction.evidence} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contraindications */}
          {results.contraindications.length > 0 && (
            <div className="p-4 bg-red-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Contraindications</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {results.contraindications.map((item, index) => (
                      <div key={index} className="mt-3">
                        <p className="font-medium">{item.condition}</p>
                        <p>{item.description}</p>
                        <Citation evidence={item.evidence} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Adverse Effects */}
          {results.adverseEffects.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Potential Adverse Effects</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    {results.adverseEffects.map((effect, index) => (
                      <div key={index} className="mt-3">
                        <p className="font-medium">{effect.effect} ({effect.likelihood})</p>
                        <p>{effect.description}</p>
                        <Citation evidence={effect.evidence} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Last Updated */}
          <div className="text-sm text-gray-500">
            <p className="mt-1">Last updated: {new Date(results.lastUpdated).toLocaleDateString()}</p>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 border-t pt-6">
            <p className="text-base font-bold text-red-600">
              {results.disclaimer}
            </p>
          </div>
        </div>
      )}
    </form>
  )
} 