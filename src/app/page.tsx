import CustomCursor from './components/effects/CustomCursor'
import Grain from './components/effects/Grain'
import ParticleField from './components/effects/ParticleField'
import ScrollProgress from './components/effects/ScrollProgress'
import Footer from './components/layout/Footer'
import Navigation from './components/layout/Navigation'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import Journey from './components/sections/Journey'
import Lab from './components/sections/Lab'
import System from './components/sections/System'
import Websites from './components/sections/Websites'
import Work from './components/sections/Work'

export default function Home() {
  return (
    <main>
      <ParticleField />
      <Grain />
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      <Hero />
      <Work />
      <Websites />
      <System />
      <About />
      <Lab />
      <Journey />
      <Contact />
      <Footer />
    </main>
  )
}
