import { mkdirSync, writeFileSync } from 'node:fs'

const username = 'pranavv1210'
const url = `https://github.com/users/${username}/contributions`

const response = await fetch(url, {
  headers: {
    'User-Agent': 'pranavvenu-portfolio-github-contributions',
    Accept: 'text/html,application/xhtml+xml',
  },
})

if (!response.ok) {
  throw new Error(`GitHub contributions request failed: ${response.status} ${response.statusText}`)
}

const svg = await response.text()

const dayPattern = /<rect[^>]*data-date="([^"]+)"[^>]*data-count="(\d+)"[^>]*data-level="(\d+)"[^>]*>/g
const days = []
let match

while ((match = dayPattern.exec(svg)) !== null) {
  days.push({
    date: match[1],
    count: Number(match[2]),
    level: Number(match[3]),
  })
}

if (!days.length) {
  throw new Error(`No contribution days found for @${username}`)
}

// GitHub's public contribution calendar exposes the exact daily counts and levels.
// The total is calculated from those same visible days so the portfolio never needs
// a GitHub token or a repository-writing sync job.
const output = {
  username,
  fetchedAt: new Date().toISOString(),
  start: days[0].date,
  total: days.reduce((sum, day) => sum + day.count, 0),
  counts: days.map((day) => day.count),
  levels: days.map((day) => day.level).join(''),
}

mkdirSync('data', { recursive: true })
writeFileSync('data/github.json', `${JSON.stringify(output, null, 2)}\n`)
console.log(`Saved ${days.length} contribution days for @${username} (${output.total} visible contributions).`)
