# Language Risk Audit

Language Risk Audit is a research-informed AI prototype that helps writers identify potential misunderstandings across varieties of English before sending a message.

Built for DoraHacks 2.0, 21–30 August 2026.

## Current MVP

Users can:

- paste a sentence or short paragraph;
- select two or three target audiences;
- choose a communication context;
- generate a structured language-risk report;
- examine potential differences in interpretation;
- copy a clearer international rewrite;
- view example reports without making a Gemini request.

The current version supports:

- American English
- Indian English
- Singapore English

## What the report includes

- overall communication-risk level;
- likely intended meaning;
- potentially ambiguous phrases;
- audience-specific interpretations;
- possible communication friction;
- suggested improvements;
- a clearer international rewrite.

## Technology

- React
- TypeScript
- Node.js
- Express
- Google Gemini API
- Google AI Studio

Gemini requests are handled by the server. The API key is not included in the client-side application or GitHub repository.

## Current status

This is an early hackathon MVP.

Working:

- example reports;
- live sentence analysis;
- structured reports;
- copy controls;
- input validation;
- server-side Gemini integration.

Still being refined:

- Print and Save as PDF layout;
- human evaluation;
- rate limiting;
- broader language and dialect coverage.

## Method and limitations

The report is generated using Gemini and a structured linguistic evaluation framework.

The system has not yet been comprehensively validated by speakers of all supported English varieties. Interpretations can vary between individuals and contexts, so results should be treated as prompts for thoughtful review rather than authoritative linguistic evidence.

No external linguistic dataset is currently integrated into the application.

## Planned development

Potential future additions include:

- a human-reviewed evaluation set;
- Multi-VALUE integration for English-variety stress testing;
- evidence from eWAVE and World Englishes corpora;
- LinCE-based code-switching evaluation;
- additional English varieties and languages;
- CSV batch audits;
- model comparison;
- usage and cost controls.

## Run locally

### Requirements

- Node.js
- Gemini API key

### Installation

```bash
npm install
