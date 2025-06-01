export interface SupplementInteraction {
  supplement: string;
  interactsWith: string;
  severity: 'low' | 'moderate' | 'high';
  effect: string;
  evidence: {
    source: string;
    pubmedId?: string;
    url?: string;
  };
}

export interface AnalysisResult {
  interactions: SupplementInteraction[];
  contraindications: {
    condition: string;
    description: string;
    evidence: {
      source: string;
      pubmedId?: string;
      url?: string;
    };
  }[];
  adverseEffects: {
    effect: string;
    likelihood: 'rare' | 'uncommon' | 'common';
    description: string;
    evidence: {
      source: string;
      pubmedId?: string;
      url?: string;
    };
  }[];
  lastUpdated: string;
  disclaimer: string;
}

export interface UserProfile {
  id: string;
  email: string;
  savedChecks: {
    id: string;
    date: string;
    supplements: string[];
    result: AnalysisResult;
  }[];
}

export type Gender = 'male' | 'female' | 'other';

export interface FormData {
  supplements: string;
  gender: Gender;
  isPregnant?: boolean;
  conditions?: string;
  medications?: string;
  lifestyle?: string;
} 