import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'
import { profile } from '@/lib/profile'
import CommandLine from './CommandLine'

export default function Contact() {
  return (
    <section id="contact" className="section-shell pb-16">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="section-kicker">06 / Contact</div>
          <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.85] text-text md:text-8xl">
            Let&apos;s
            <br />
            build
            <br />
            something.
          </h2>
          <p className="mt-8 max-w-xl text-lg text-secondary">Have an idea, need a builder, or want to collaborate on an AI/product system?</p>
          <a href={profile.contactHref} className="button-primary mt-8 inline-flex" data-cursor="idle">
            Start a conversation <FiArrowUpRight />
          </a>
        </div>
        <div className="grid content-between gap-6">
          <CommandLine />
          <div className="grid gap-3">
            <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer" data-cursor="OPEN"><FiGithub /> GitHub</a>
            <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="OPEN"><FiLinkedin /> LinkedIn</a>
            <a className="contact-link" href={profile.contactHref} data-cursor="idle"><FiMail /> Email</a>
            <a className="contact-link" href={`tel:${profile.phone}`} data-cursor="OPEN"><FiPhone /> Phone</a>
            <a className="contact-link" href={profile.resume} data-cursor="OPEN">Resume <FiArrowUpRight /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
