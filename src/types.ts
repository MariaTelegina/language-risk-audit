export type EnglishVariety =
  | "American English"
  | "Indian English"
  | "Singapore English";

export type RiskLevel = "low" | "medium" | "high";

export type CommunicationContext =
  | "Workplace"
  | "Customer support"
  | "Marketing"
  | "General communication";

export type RiskCategory =
  | "lexical"
  | "idiom"
  | "grammar"
  | "pragmatics"
  | "tone"
  | "cultural_reference"
  | "general_ambiguity";

export interface RiskItem {
  phrase: string;
  category: RiskCategory;
  relevantAudiences: EnglishVariety[];
  riskLevel: RiskLevel;
  explanation: string;
  possibleReading: string;
  suggestion: string;
  confidence: RiskLevel;
}

export interface AudienceNote {
  audience: EnglishVariety;
  likelyReading: string;
  potentialFriction: string;
  confidence: RiskLevel;
}

export interface AnalysisReport {
  overallRisk: RiskLevel;
  summary: string;
  intendedMeaning: string;
  riskItems: RiskItem[];
  audienceNotes: AudienceNote[];
  clearRewrite: string;
  rewriteRationale: string;
}

export interface AnalyzeRequest {
  text: string;
  selectedAudiences: EnglishVariety[];
  context: CommunicationContext;
}

export interface AnalysisResponse {
  report?: AnalysisReport;
  error?: string;
  isExample?: boolean;
}
