'use client'

import { FormEvent, useState } from 'react'

const responses: Record<string, string> = {
  help: 'commands: whoami / focus / status / ship',
  whoami: 'builder',
  focus: 'AI / systems / products',
  status: 'building',
  email: 'mailto: pranavv736@gmail.com',
  ship: 'from idea -> system -> product',
}

export default function CommandLine() {
  const [input, setInput] = useState('whoami')
  const [output, setOutput] = useState(responses.whoami)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const key = input.trim().toLowerCase()
    setOutput(responses[key] ?? 'unknown command. try: help')
  }

  return (
    <form onSubmit={submit} className="terminal-panel" aria-label="Small interactive command line">
      <label htmlFor="command" className="sr-only">Command</label>
      <div>
        <span>pranav@portfolio:~$</span>
        <input id="command" value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} />
      </div>
      <p>&gt; {output}</p>
    </form>
  )
}
