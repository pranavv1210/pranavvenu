import { profile } from '@/lib/profile'

export default function Journey() {
  const entries = [...profile.experience, ...profile.education]

  return (
    <section className="section-shell">
      <div className="section-kicker">05 / Journey</div>
      <div className="journey-grid">
        {entries.map((entry) => (
          <article key={`${entry.year}-${entry.label}`} className="journey-item">
            <p>{entry.year}</p>
            <h3>{entry.label}</h3>
            <span>{entry.meta}</span>
            <small>{entry.detail}</small>
          </article>
        ))}
      </div>
    </section>
  )
}
