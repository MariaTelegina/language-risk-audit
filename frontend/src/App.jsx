import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

async function runAudit() {
  const response = await fetch("http://127.0.0.1:5000/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ testInput: "Example multilingual test case" }),
  });

  const results = await response.json();
  console.log(results);
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        
        <div>
          <h1> Welcome to Language Audit! LAUNCHING IN 3 DAYS </h1>
          <p>
            Audit your AI output with our analysis here! 
          </p>
          <p>
            <strong> Will your English travel? </strong> 
            Check where a message could be interpreted differently across Englishes—and make it clearer without erasing anyone's variety.
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={runAudit}
        >
          Run Audit {count}
        </button>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
