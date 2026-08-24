import { AnalysisReport, CommunicationContext, EnglishVariety } from '../types';

export interface ExampleCase {
  id: string;
  buttonLabel: string;
  dialectPair: string;
  text: string;
  context: CommunicationContext;
  selectedAudiences: EnglishVariety[];
  report: AnalysisReport;
}

export const EXAMPLE_CASES: ExampleCase[] = [
  {
    id: 'revert',
    buttonLabel: '“Please revert by tomorrow.”',
    dialectPair: 'IN / SG ↔ US',
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
    dialectPair: 'IN / SG ↔ US',
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
    buttonLabel: '“Send the report by today, can?”',
    dialectPair: 'SG ↔ US / GLOBAL',
    text: 'Send the report by today, can?',
    context: 'Workplace',
    selectedAudiences: ['American English', 'Indian English', 'Singapore English'],
    report: {
      overallRisk: 'medium',
      summary:
        'The trailing modal tag “, can?” is a characteristic Singapore English pragmatic marker used to politely check feasibility and invite agreement. Outside colloquial Singapore English, it can be misread as blunt or questioning basic capability.',
      intendedMeaning: 'Could you please send the report today if possible?',
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
      clearRewrite: 'Could you please send the report today if possible?',
      rewriteRationale:
        'Rephrasing into a standard polite conditional request preserves the warm, cooperative tone while eliminating regional pragmatic ambiguity.',
    },
  },
  {
    id: 'table-topic',
    buttonLabel: '“Let’s table this topic for now.”',
    dialectPair: 'US ↔ UK / IN',
    text: 'Let’s table this topic for now.',
    context: 'Workplace',
    selectedAudiences: ['American English', 'Indian English', 'Singapore English'],
    report: {
      overallRisk: 'high',
      summary:
        '“Table” is a famous contronym across English varieties. In American English, “to table” a topic means to postpone or shelve it. In British, Commonwealth, and Indian English, “to table” means to present it immediately for active consideration.',
      intendedMeaning: 'Let’s postpone discussing this topic until later.',
      riskItems: [
        {
          phrase: 'table this topic',
          category: 'idiom',
          relevantAudiences: ['American English', 'Indian English', 'Singapore English'],
          riskLevel: 'high',
          explanation:
            'Opposite meanings exist: American English uses “table” to set aside or postpone, whereas Commonwealth and Indian English use “table” to introduce a motion or discuss actively right now.',
          possibleReading:
            'Indian and British colleagues may prepare to discuss the topic immediately, expecting it is being prioritized on the agenda.',
          suggestion: 'postpone this discussion / set this aside for now',
          confidence: 'high',
        },
      ],
      audienceNotes: [
        {
          audience: 'American English',
          likelyReading:
            'Understands this as setting aside or shelving the topic for a future date.',
          potentialFriction:
            'None in US context; standard idiom for deferring discussion.',
          confidence: 'high',
        },
        {
          audience: 'Indian English',
          likelyReading:
            'May interpret this as putting the item on the table for active, immediate review.',
          potentialFriction:
            'High risk of diametrically opposed action: one party drops the item while the other prepares slides.',
          confidence: 'high',
        },
        {
          audience: 'Singapore English',
          likelyReading:
            'Exposed to both US and Commonwealth business norms; may pause for context clues.',
          potentialFriction:
            'Ambiguity between deferring or highlighting the agenda item.',
          confidence: 'medium',
        },
      ],
      clearRewrite: 'Let’s postpone this discussion for a later meeting.',
      rewriteRationale:
        'Explicitly using “postpone” or “schedule for later” prevents diametrically opposed actions between US and Commonwealth/Indian teams.',
    },
  },
  {
    id: 'needful',
    buttonLabel: '“Kindly do the needful.”',
    dialectPair: 'IN ↔ US / GLOBAL',
    text: 'Kindly do the needful.',
    context: 'Workplace',
    selectedAudiences: ['American English', 'Indian English', 'Singapore English'],
    report: {
      overallRisk: 'medium',
      summary:
        '“Do the needful” is a venerable Indian and South Asian English idiom for completing the necessary action or procedure. While polite and concise in India, it is often unfamiliar or perceived as vague in American English.',
      intendedMeaning: 'Please take the necessary steps or proceed with the required action.',
      riskItems: [
        {
          phrase: 'do the needful',
          category: 'idiom',
          relevantAudiences: ['American English', 'Indian English', 'Singapore English'],
          riskLevel: 'medium',
          explanation:
            'A legacy administrative idiom widely used in Indian English. American speakers may find it archaic, nonspecific, or unclear about which specific action is required.',
          possibleReading:
            'An American reader might ask “What exactly is the needful?” rather than intuiting the contextually obvious next step.',
          suggestion: 'take the required steps / proceed with the update',
          confidence: 'high',
        },
      ],
      audienceNotes: [
        {
          audience: 'American English',
          likelyReading:
            'May find the phrase archaic or unclear on the exact task requested.',
          potentialFriction:
            'Can lead to back-and-forth emails seeking task clarification.',
          confidence: 'high',
        },
        {
          audience: 'Indian English',
          likelyReading:
            'Standard polite sign-off implying full trust in the recipient to execute the required protocol.',
          potentialFriction:
            'None locally; universally understood in professional and governmental spheres.',
          confidence: 'high',
        },
        {
          audience: 'Singapore English',
          likelyReading:
            'Generally recognized in regional trade, though less common in modern tech correspondence.',
          potentialFriction:
            'Low friction; understood in context.',
          confidence: 'high',
        },
      ],
      clearRewrite: 'Please take the necessary next steps.',
      rewriteRationale:
        'Specifying “take the necessary steps” maintains politeness while communicating clearly across all regional registers.',
    },
  },
  {
    id: 'doubt',
    buttonLabel: '“I have a doubt regarding the plan.”',
    dialectPair: 'IN ↔ US / GLOBAL',
    text: 'I have a doubt regarding the plan.',
    context: 'Workplace',
    selectedAudiences: ['American English', 'Indian English', 'Singapore English'],
    report: {
      overallRisk: 'medium',
      summary:
        'In Indian English, “having a doubt” routinely means “having a question or seeking clarification”. In American English, “doubt” carries a much stronger connotation of skepticism, mistrust, or disbelief in the plan’s viability.',
      intendedMeaning: 'I have a question or need clarification about the plan.',
      riskItems: [
        {
          phrase: 'have a doubt',
          category: 'lexical',
          relevantAudiences: ['American English', 'Indian English', 'Singapore English'],
          riskLevel: 'medium',
          explanation:
            'In Indian English pedagogy and business, “doubt” is synonymous with “clarifying question”. In American English, expressing “doubt” implies a lack of faith or disagreement with the proposal.',
          possibleReading:
            'An American project lead might think you lack confidence in the strategy rather than simply needing one factual detail clarified.',
          suggestion: 'have a question / need clarification',
          confidence: 'high',
        },
      ],
      audienceNotes: [
        {
          audience: 'American English',
          likelyReading:
            'Interprets “doubt” as fundamental skepticism or disagreement with the plan.',
          potentialFriction:
            'May create unnecessary defensiveness or perceived pushback from project owners.',
          confidence: 'high',
        },
        {
          audience: 'Indian English',
          likelyReading:
            'Completely neutral request for information or clarification.',
          potentialFriction:
            'None; ubiquitous in education and workplace discussions.',
          confidence: 'high',
        },
        {
          audience: 'Singapore English',
          likelyReading:
            'Understands both uses; contextual clues dictate interpretation.',
          potentialFriction:
            'Low friction in regional hubs.',
          confidence: 'medium',
        },
      ],
      clearRewrite: 'I have a question regarding the plan.',
      rewriteRationale:
        'Using “question” or “clarification” precisely conveys informational inquiry without signaling unintended skepticism.',
    },
  },
];
