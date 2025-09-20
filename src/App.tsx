import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero.tsx'
import Services from './components/Services'
import InteractivePreview from './components/InteractivePreview'
import PhoneSlider from './components/PhoneSlider'
import OtherCGIs from './components/OtherCGIs'
import MediaFeature from './components/MediaFeature'
import Team from './components/Team'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen text-white bg-black overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <InteractivePreview />
        <PhoneSlider />
        <OtherCGIs />
        <MediaFeature />
        <Team />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
