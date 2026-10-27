import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const username = process.env.GITHUB_USERNAME || 'pranavv1210'
let token = process.env.GH_CONTRIBUTIONS_TOKEN || process.env.GITHUB_TOKEN || ''

if (!token) {
  try {
    token = execFileSync('gh', ['auth', 'token'], { encoding: 'utf8' }).trim()
  } catch {
    throw new Error('Set GH_CONTRIBUTIONS_TOKEN or GITHUB_TOKEN, or sign in with the GitHub CLI.')
  }
}

const query = `
  query Contributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

const response = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'pranavvenu-contribution-sync',
  },
  body: JSON.stringify({ query, variables: { login: username } }),
})

if (!response.ok) throw new Error(`GitHub returned ${response.status} ${response.statusText}`)

const payload = await response.json()
if (payload.errors?.length) throw new Error(payload.errors.map((error) => error.message).join('; '))

const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar
if (!calendar) throw new Error(`No contribution calendar found for @${username}`)

const levels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}
const days = calendar.weeks.flatMap((week) => week.contributionDays)
const output = {
  username,
  fetchedAt: new Date().toISOString(),
  start: days[0]?.date ?? '',
  total: calendar.totalContributions ?? 0,
  counts: days.map((day) => day.contributionCount),
  levels: days.map((day) => levels[day.contributionLevel] ?? 0).join(''),
}

mkdirSync('data', { recursive: true })
writeFileSync('data/github.json', `${JSON.stringify(output, null, 2)}\n`)
console.log(`Saved ${days.length} days and ${output.total} contributions for @${username}.`)
