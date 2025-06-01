'use client'

import SupplementForm from '@/components/forms/SupplementForm'
import Logo from '@/components/ui/Logo'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Supplement Safety Checker
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Check for interactions between supplements, medications, and lifestyle factors using comprehensive online resources.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <SupplementForm />
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>
              Information sourced from trusted health websites including WebMD, Mayo Clinic, Healthline, and other online resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
