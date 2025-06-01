'use client'

import { ShieldCheckIcon } from '@heroicons/react/24/solid'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <ShieldCheckIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-tight text-blue-600">SafeSupp</span>
        <span className="text-xs text-gray-600 leading-tight">Safety Checker</span>
      </div>
    </div>
  )
} 