import { FiArrowUpRight, FiMail } from 'react-icons/fi'
import { profile } from '@/lib/profile'

const websiteBuilds = [
  {
    name: 'Raadhvi Designer Studio',
    type: 'Fashion / Studio Website',
    url: 'https://raadhvidesignerstudio.in',
    note: 'A polished brand-facing website for a designer studio.',
  },
  {
    name: 'JourneySync Ride App',
    type: 'Mobility Product Website',
    url: 'https://journeysyncrideapp.in',
    note: 'A product surface for a real-time biker ride coordination app.',
  },
  {
    name: 'Atlas Fitness OS',
    type: 'Fitness App Experience',
    url: 'https://atlas-fitness-os-henna.vercel.app/',
    note: 'A modern fitness operating system for training, hydration, and progress.',
  },
  {
    name: 'Frame Your Goa',
    type: 'Creative Tech / Event Tool',
    url: 'https://frame-your-goa-iota.vercel.app/',
    note: 'A visual event utility that turns photos into shareable branded frames.',
  },
  {
    name: 'Pranav Venu Portfolio',
    type: 'Personal Identity System',
    url: 'https://pranavvenu.vercel.app/',
    note: 'A futuristic personal portfolio built as a digital identity system.',
  },
  {
    name: 'Yaatra EV',
    type: 'EV / Mobility Website',
    url: 'https://yaatra-ev-app.vercel.app/',
    note: 'A clean web experience for an electric mobility concept.',
  },
  {
    name: 'WaterBuddy',
    type: 'Delivery Platform Website',
    url: 'https://waterbuddy-app.vercel.app/',
    note: 'A water delivery platform surface with customer and seller workflows.',
  },
  {
    name: 'AI Hiring OS',
    type: 'AI Product Website',
    url: 'https://ai-hiring-os.vercel.app/',
    note: 'A web interface for AI-powered recruiting and HR workflows.',
  },
]

const offers = [
  'Portfolio websites',
  'Product landing pages',
  'Startup MVP interfaces',
  'Modern business websites',
  'AI product dashboards',
  'Interactive brand experiences',
]

export default function Websites() {
  return (
    <section id="websites" className="section-shell">
      <div className="section-kicker">02 / Websites</div>
      <div className="websites-hero">
        <div>
          <h2>
            Websites
            <br />
            I build.
          </h2>
          <p>
            I like building futuristic, modern UI websites that feel sharp, premium, and product-ready. I am open to
            building interfaces like these for founders, creators, studios, apps, and early-stage products.
          </p>
        </div>
        <div className="websites-offer-panel">
          <span>Open for</span>
          {offers.map((offer) => (
            <strong key={offer}>{offer}</strong>
          ))}
          <a href={profile.contactHref} data-cursor="OPEN">
            Build with me <FiMail />
          </a>
        </div>
      </div>

      <div className="website-grid">
        {websiteBuilds.map((site, index) => (
          <a key={site.url} href={site.url} target="_blank" rel="noreferrer" className="website-card" data-cursor="OPEN">
            <div className="website-card-index">{String(index + 1).padStart(2, '0')}</div>
            <div>
              <p>{site.type}</p>
              <h3>{site.name}</h3>
              <span>{site.note}</span>
            </div>
            <em>
              Visit site <FiArrowUpRight />
            </em>
          </a>
        ))}
      </div>
    </section>
  )
}
