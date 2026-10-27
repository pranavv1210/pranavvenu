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

const html = await response.text()
const days = []

// GitHub has used both SVG <rect> cells and HTML <td> cells for the public
// contribution calendar. Parse the attributes rather than depending on one
// particular markup version.
for (const tag of html.matchAll(/<(?:td|rect)\b[^>]*>/gi)) {
  const source = tag[0]
  const date = source.match(/\bdata-date=["']([^"']+)["']/i)?.[1]
  const level = source.match(/\bdata-level=["'](\d+)["']/i)?.[1]
  const countAttribute = source.match(/\bdata-count=["'](\d+)["']/i)?.[1]
  const aria = source.match(/\baria-label=["'](\d[\d,]*)\s+contributions?/i)?.[1]

  if (!date || level === undefined) continue

  days.push({
    date,
    count: Number((countAttribute ?? aria ?? '0').replaceAll(',', '')),
    level: Number(level),
  })
}

const uniqueDays = Array.from(new Map(days.map((day) => [day.date, day])).values())
  .sort((a, b) => a.date.localeCompare(b.date))

if (!uniqueDays.length) {
  throw new Error(`No contribution days found for @${username}`)
}

const output = {
  username,
  fetchedAt: new Date().toISOString(),
  start: uniqueDays[0].date,
  total: uniqueDays.reduce((sum, day) => sum + day.count, 0),
  counts: uniqueDays.map((day) => day.count),
  levels: uniqueDays.map((day) => day.level).join(''),
}

mkdirSync('data', { recursive: true })
writeFileSync('data/github.json', `${JSON.stringify(output, null, 2)}\n`)
console.log(`Saved ${uniqueDays.length} contribution days for @${username} (${output.total} visible contributions).`)
