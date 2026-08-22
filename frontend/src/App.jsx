import { useState } from 'react'
import './App.css'

// Keep this sample content near the top while the backend is being integrated.
// Your team can replace these values with the response from /api/analyze later.
const flaggedPhrases = [
  {
    phrase: 'I will revert shortly.',
    description: 'The phrase can sound clear to the writer but is not shared business English everywhere.',
    explanation: 'In Indian English, “revert” commonly means “reply.” In other varieties it often means “return to an earlier state.”',
    alternative: 'I will reply shortly.',
  },
  {
    phrase: 'Please do the needful.',
    description: 'The request may be understood, but it can feel vague or unfamiliar to some audiences.',
    explanation: 'It is widely used in South Asian business communication, yet less common in American and Singaporean workplace writing.',
    alternative: 'Please complete the requested update by Thursday.',
  },
]

const perspectives = [
  {
    audience: 'American English',
    reading: 'A teammate is expected to respond soon and complete the requested update.',
    friction: '“Revert” may be read as undoing a change rather than replying.',
  },
  {
    audience: 'Indian English',
    reading: 'The teammate will reply soon and take the necessary action.',
    friction: 'Low risk; both phrases are familiar in many workplace settings.',
  },
  {
    audience: 'Singapore English',
    reading: 'The request is understandable, but a more direct action and deadline may help.',
    friction: '“Do the needful” can leave the expected action open to interpretation.',
  },
]

function App() {
  const [message, setMessage] = useState(
    'Please do the needful and I will revert shortly with the updated account details.',
  )
  const [selectedAudiences, setSelectedAudiences] = useState([
    'American English',
    'Indian English',
    'Singapore English',
  ])
  const [context, setContext] = useState('Workplace')
  const [checkedMessage, setCheckedMessage] = useState(message)
  const [status, setStatus] = useState('Showing a sample audit report.')
  const [isChecking, setIsChecking] = useState(false)

  function toggleAudience(audience) {
    setSelectedAudiences((current) =>
      current.includes(audience)
        ? current.filter((item) => item !== audience)
        : [...current, audience],
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setCheckedMessage(message)
    setIsChecking(true)
    setStatus('Checking clarity across your selected audiences…')

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testInput: message,
          audiences: selectedAudiences,
          context,
        }),
      })

      if (!response.ok) throw new Error('Audit service is unavailable')
      await response.json()
      setStatus('Audit complete. Sample report layout shown below.')
    } catch {
      setStatus('Sample report shown while the live audit service is connected.')
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Language Risk Audit home">
          <span className="brand-mark">LR</span>
          <span>Language Risk Audit</span>
        </a>
        <p className="header-note">Clearer communication across Englishes</p>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">Multilingual AI communication check</p>
        <h1>Will your English travel?</h1>
        <p className="hero-copy">
          Check how a message may be read across English-speaking audiences, then make it clearer without flattening anyone’s variety.
        </p>
      </section>

      <section className="audit-form-card" aria-labelledby="check-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start an audit</p>
            <h2 id="check-heading">Check your message</h2>
          </div>
          <span className="step-label">1 minute</span>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="message">Message to check</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Paste a message, prompt, or AI-generated response…"
            rows="5"
            required
          />

          <fieldset>
            <legend>Target English audiences</legend>
            <div className="checkbox-group">
              {['American English', 'Indian English', 'Singapore English'].map((audience) => (
                <label className="checkbox-option" key={audience}>
                  <input
                    type="checkbox"
                    checked={selectedAudiences.includes(audience)}
                    onChange={() => toggleAudience(audience)}
                  />
                  <span>{audience}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="context-row">
            <div>
              <label className="field-label" htmlFor="context">Communication context</label>
              <select id="context" value={context} onChange={(event) => setContext(event.target.value)}>
                <option>Workplace</option>
                <option>Customer support</option>
                <option>Marketing</option>
                <option>General communication</option>
              </select>
            </div>
            <button className="primary-button" type="submit" disabled={isChecking || !selectedAudiences.length}>
              {isChecking ? 'Checking message…' : 'Check My Message'}
            </button>
          </div>
          <p className="form-status" aria-live="polite">{status}</p>
        </form>
      </section>

      <section className="report-card" aria-labelledby="report-heading">
        <div className="card-title-row">
          <div>
            <p className="eyebrow">Audit result</p>
            <h2 id="report-heading">Language Risk Audit Report</h2>
          </div>
          <span className="risk-badge">Medium clarity risk</span>
        </div>

        <div className="report-grid">
          <div className="report-block full-width">
            <h3>Checked message</h3>
            <blockquote>{checkedMessage || 'Add a message above to begin your audit.'}</blockquote>
          </div>
          <div className="report-block">
            <h3>Likely intended meaning</h3>
            <p>The sender wants the recipient to complete an account-related update and reply with the latest details soon.</p>
          </div>
          <div className="report-block">
            <h3>Audit summary</h3>
            <p>Understandable in all selected audiences, with two phrases that could cause ambiguity or feel less direct in international collaboration.</p>
          </div>
        </div>

        <div className="rewrite-box">
          <span className="rewrite-label">Clearer international rewrite</span>
          <p>Please complete the account update and reply shortly with the updated details.</p>
        </div>
      </section>

      <section className="content-card" aria-labelledby="phrases-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Review needed</p>
            <h2 id="phrases-heading">Flagged phrases and interpretations</h2>
          </div>
          <span className="count-badge">{flaggedPhrases.length} phrases</span>
        </div>

        <div className="phrase-list">
          {flaggedPhrases.map((item) => (
            <article className="phrase-item" key={item.phrase}>
              <div className="phrase-number">!</div>
              <div>
                <h3>“{item.phrase}”</h3>
                <p>{item.description}</p>
                <dl>
                  <div>
                    <dt>Linguistic note</dt>
                    <dd>{item.explanation}</dd>
                  </div>
                  <div>
                    <dt>Suggested alternative</dt>
                    <dd className="alternative">{item.alternative}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-card" aria-labelledby="perspectives-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Audience comparison</p>
            <h2 id="perspectives-heading">Audience-Specific Perspectives</h2>
          </div>
        </div>

        <div className="perspective-grid">
          {perspectives.map((perspective) => (
            <article className="perspective-card" key={perspective.audience}>
              <h3>{perspective.audience}</h3>
              <div>
                <span>Likely reading</span>
                <p>{perspective.reading}</p>
              </div>
              <div>
                <span>Potential friction</span>
                <p>{perspective.friction}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>Language Risk Audit · Designed for thoughtful, audience-aware AI communication</footer>
    </main>
  )
}

export default App
