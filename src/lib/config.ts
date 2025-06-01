export const config = {
  api: {
    naturalMedicines: {
      url: process.env.NATURAL_MEDICINES_API_URL || 'https://api.naturalmedicines.com/v1',
      key: process.env.NATURAL_MEDICINES_API_KEY
    },
    pubmed: {
      url: process.env.PUBMED_API_URL || 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
      key: process.env.PUBMED_API_KEY
    },
    fda: {
      url: process.env.FDA_API_URL || 'https://api.fda.gov/drug',
      key: process.env.FDA_API_KEY
    }
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/supplements'
  },
  features: {
    enableUserAccounts: process.env.ENABLE_USER_ACCOUNTS === 'true',
    enableRealTimeAnalysis: process.env.ENABLE_REAL_TIME_ANALYSIS !== 'false'
  },
  security: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000'
  }
}

export const SOURCES = {
  NATURAL_MEDICINES: 'Natural Medicines Database',
  PUBMED: 'PubMed',
  FDA: 'FDA',
  NIH: 'NIH Office of Dietary Supplements'
} as const

export const SEVERITY_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high'
} as const

export const LIKELIHOOD_LEVELS = {
  RARE: 'rare',
  UNCOMMON: 'uncommon',
  COMMON: 'common'
} as const 