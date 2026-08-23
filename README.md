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

- React and TypeScript (Vite)
- Flask backend on Vercel
- Google Gemini API
- Google AI Studio prototype UI and evaluation flow

Gemini requests are handled by Flask. The API key is not included in the client-side application or GitHub repository. Live checks are capped per visitor and across the whole site to control token use. Prepared examples do not call Gemini.

## Current status

This is an early hackathon MVP.

Working:

- example reports;
- live sentence analysis through Flask;
- structured reports;
- copy and print controls;
- input validation;
- per-visitor live-check limits.

Still being refined:

- Print and Save as PDF layout;
- human evaluation;
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
- Python 3.12
- Gemini API key

### Installation

```bash
npm install
python -m venv backend/.venv
backend\.venv\Scripts\activate
pip install -r backend/requirements.txt
copy .env.example .env
```

Set `GEMINI_API_KEY` in `.env`, then run Flask and Vite together:

```bash
python backend/app.py
npm run dev
```

Open http://localhost:5173. Vite proxies `/api` to Flask on port 5000.

### Vercel

Keep the project Root Directory as the repository root so `vercel.json` can build the Vite app and Flask service together. Add `GEMINI_API_KEY` in Vercel Project Settings. Optional: `GEMINI_MODEL`, `ANALYZE_LIMIT_PER_VISITOR_PER_HOUR`, `GLOBAL_ANALYZE_LIMIT_PER_HOUR`.