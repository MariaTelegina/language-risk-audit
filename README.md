# Language Risk Audit

Language Risk Audit helps people identify potential misunderstandings across varieties of English before sending a message.

Paste a workplace, customer-support, marketing or general message and receive:

- an overall communication-risk assessment;
- possible differences in interpretation;
- audience-specific notes;
- phrases that may create friction;
- a clearer international rewrite;
- a downloadable or printable report.

## Current scope

The MVP currently compares how a message may be understood across:

- American English
- Indian English
- Singapore English

The analysis focuses on:

- lexical differences;
- idioms;
- pragmatic meaning;
- tone and politeness;
- cultural references;
- general ambiguity.

## Why we are building it

Global teams often communicate in English without sharing exactly the same linguistic conventions. A message can be grammatically clear while still sounding abrupt, ambiguous or carrying an unintended meaning for another audience.

Language Risk Audit gives writers a quick pre-send review and offers a more internationally transparent alternative.

## How it works

1. Paste a sentence or short paragraph.
2. Select two or three English-speaking audiences.
3. Choose the communication context.
4. Generate the report.
5. Review or copy the suggested rewrite.

Example reports can be viewed without making a model request. A new live analysis makes one request to the Gemini API, although one retry may occur if the response does not match the required structure.

## Technology

- React
- TypeScript
- Node.js
- Express
- Google Gemini API
- Google AI Studio

Gemini requests are handled by the server. The API key is not included in client-side code.

## Run locally

### Requirements

- Node.js
- A Gemini API key

### Installation

```bash
npm install
