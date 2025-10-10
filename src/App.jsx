import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import MissionSection from './components/MissionSection'
import ProgramsSection from './components/ProgramsSection'
import WhyChooseUsSection from './components/WhyChooseUsSection'
import VolunteerSection from './components/VolunteerSection'
import BlogSection from './components/BlogSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <MissionSection />
        <ProgramsSection />
        <WhyChooseUsSection />
        <VolunteerSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}

export default App

