import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function parseSupplementList(input: string): string[] {
  return input
    .split(/[,\n\r]+/) // Split by commas or newlines
    .map(item => item.trim())
    .filter(Boolean)
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000) // Enforce character limit
}

export function generateCitation(source: string, pubmedId?: string): string {
  if (pubmedId) {
    return `${source}. PMID: ${pubmedId}`
  }
  return source
}

export const DISCLAIMER = 'This information is for educational purposes only and is not intended as medical advice. Always consult with your healthcare provider before making changes to your supplement regimen.' 