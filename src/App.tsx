import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Noise from './components/Noise'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    <main>
      <Noise />
      <ScrollProgress />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  )
}
