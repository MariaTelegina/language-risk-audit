import { AnalysisReport, CommunicationContext, EnglishVariety } from '../types';

export interface ExampleCase {
  id: string;
  buttonLabel: string;
  text: string;
  context: CommunicationContext;
  selectedAudiences: EnglishVariety[];
  report: AnalysisReport;
}

export const EXAMPLE_CASES: ExampleCase[] = [
  {
    id: 'revert',
    buttonLabel: '“Please revert by tomorrow.”',
    text: 'Please revert by tomorrow.',
    context: 'Workplace',
    selectedAudiences: ['American English', 'Indian English', 'Singapore English'],
    report: {
      overallRisk: 'medium',
      summary:
        '“Revert” is standard in Indian and Singapore English professional correspondence meaning “to reply” or “to respond”. In American English, “revert” almost exclusively means “to return to a former state or version”, which can cause brief ambiguity.',
      intendedMeaning: 'Please reply or get back to me by tomorrow.',
      riskItems: [
        {
          phrase: 'revert',
          category: 'lexical',
          relevantAudiences: ['American English', 'Indian English', 'Singapore English'],
          riskLevel: 'medium',
          explanation:
            'In Indian and Singapore English, “revert” functions routinely as “respond” or “reply”. In American English, it implies rolling back or returning to a previous state, which can prompt confusion in international team communication.',
          possibleReading:
            'An American English speaker may wonder what document, software version, or decision needs to be rolled back, rather than simply sending an email reply.',
          suggestion: 'reply / get back to me',
          confidence: 'high',
        },
      ],
      audienceNotes: [
        {
          audience: 'American English',
          likelyReading:
            'May interpret “revert” as restoring a previous state, rollback, or previous baseline.',
          potentialFriction:
            'Could lead to momentary confusion or require clarification if the reader is unfamiliar with Commonwealth and South Asian business idiom.',
          confidence: 'high',
        },
        {
          audience: 'Indian English',
          likelyReading:
            'Naturally understood as a standard, polite request to reply or send updates by tomorrow.',
          potentialFriction:
            'None within this variety; highly conventional and professional phrasing.',
          confidence: 'high',
        },
        {
          audience: 'Singapore English',
          likelyReading:
            'Understood without friction as a request to respond or get back by the specified deadline.',
          potentialFriction:
            'None in local business environments; widely accepted standard usage.',
          confidence: 'high',
        },
      ],
      clearRewrite: 'Please reply by tomorrow.',
      rewriteRationale:
        'Replacing “revert” with “reply” or “get back to me” ensures instantaneous comprehension across all global English varieties without altering the professional intent.',
    },
  },
  {
    id: 'prepone',
    buttonLabel: '“Can we prepone the meeting?”',
    text: 'Can we prepone the meeting?',
    context: 'Workplace',
    selectedAudiences: ['American English', 'Indian English', 'Singapore English'],
    report: {
      overallRisk: 'medium',
      summary:
        '“Prepone” is a well-established and widely used word in Indian English as the direct antonym of “postpone”. While commonly understood across South and Southeast Asia, it is rarely used or recognized in American English.',
      intendedMeaning: 'Can we reschedule the meeting to an earlier time or date?',
      riskItems: [
        {
          phrase: 'prepone',
          category: 'lexical',
          relevantAudiences: ['American English', 'Indian English', 'Singapore English'],
          riskLevel: 'medium',
          explanation:
            '“Prepone” is standard vocabulary across Indian English for advancing an appointment. In American English, speakers almost exclusively say “move up”, “bring forward”, or “reschedule earlier”.',
          possibleReading:
            'An American English speaker might not recognize the word or may mistakenly assume it is a typo for “postpone”.',
          suggestion: 'move the meeting earlier / move up the meeting',
          confidence: 'high',
        },
      ],
      audienceNotes: [
        {
          audience: 'American English',
          likelyReading:
            'May pause at the unfamiliar word or question whether the sender meant to postpone or advance the meeting.',
          potentialFriction:
            'Unfamiliarity could delay calendar coordination or lead to scheduling misunderstandings.',
          confidence: 'high',
        },
        {
          audience: 'Indian English',
          likelyReading:
            'Understands this as a standard, concise request to move the meeting to an earlier slot.',
          potentialFriction:
            'None; standard, everyday business and personal vocabulary.',
          confidence: 'high',
        },
        {
          audience: 'Singapore English',
          likelyReading:
            'Generally recognized in regional multinational workspaces as advancing a schedule.',
          potentialFriction:
            'Minimal friction in regional settings; less common in formal Singapore publications.',
          confidence: 'high',
        },
      ],
      clearRewrite: 'Can we move the meeting to an earlier time?',
      rewriteRationale:
        'Using “move to an earlier time” or “bring forward” provides unambiguous schedule clarity for international participants.',
    },
  },
  {
    id: 'can-particle',
    buttonLabel: '“Please send me the document by today, can?”',
    text: 'Please send me the document by today, can?',
    context: 'Workplace',
    selectedAudiences: ['American English', 'Indian English', 'Singapore English'],
    report: {
      overallRisk: 'medium',
      summary:
        'The trailing modal tag “, can?” is a characteristic Singapore English pragmatic marker used to politely check feasibility and invite agreement. Outside colloquial Singapore English, it can be misread as blunt or questioning basic capability.',
      intendedMeaning: 'Could you please send me the document today if possible?',
      riskItems: [
        {
          phrase: ', can?',
          category: 'pragmatics',
          relevantAudiences: ['American English', 'Indian English', 'Singapore English'],
          riskLevel: 'medium',
          explanation:
            'In Singapore English, “, can?” is a friendly confirmation check equivalent to “is that okay?” or “would you be able to?”. In American or Indian English contexts, sentence-final “can?” can appear syntactically truncated or demanding.',
          possibleReading:
            'May be misperceived as an abrupt interrogation of the recipient’s capability rather than a cooperative check on feasibility.',
          suggestion: 'if possible? / would that work?',
          confidence: 'high',
        },
      ],
      audienceNotes: [
        {
          audience: 'American English',
          likelyReading:
            'May interpret the ending as an abrupt or grammatically incomplete question regarding physical ability.',
          potentialFriction:
            'Could be perceived as curt, informal, or demanding in professional cross-border email.',
          confidence: 'high',
        },
        {
          audience: 'Indian English',
          likelyReading:
            'Will likely deduce the core request, though sentence-final “can?” differs from typical Indian English confirmation tags like “right?” or “no?”.',
          potentialFriction:
            'May sound unusually informal or unconventional for formal business correspondence.',
          confidence: 'medium',
        },
        {
          audience: 'Singapore English',
          likelyReading:
            'Understands it immediately as a polite, friendly, and efficient check on whether sending the document today is workable.',
          potentialFriction:
            'Natural in peer-to-peer or informal communication, but often softened in formal global writing.',
          confidence: 'high',
        },
      ],
      clearRewrite: 'Could you please send me the document today if possible?',
      rewriteRationale:
        'Rephrasing into a standard polite conditional request preserves the warm, cooperative tone while eliminating regional pragmatic ambiguity.',
    },
  },
];
