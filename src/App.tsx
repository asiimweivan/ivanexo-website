import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import Partners from './components/Partners';
import About from './components/About';
import StatsCounter from './components/StatsCounter';
import HowItWorks from './components/HowItWorks';
import Trackly from './components/Trackly';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Team from './components/Team';
import DownloadCTA from './components/DownloadCTA';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import CookieBanner from './components/CookieBanner';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import AgentDashboard from './admin/AgentDashboard';

function MainSite() {
  return (
    <div style={{ backgroundColor: '#0B1F3A', minHeight: '100vh' }}>
      <LoadingScreen />
      <Navbar />
      <Hero />
      <Partners />
      <About />
      <StatsCounter />
      <HowItWorks />
      <Trackly />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Team />
      <DownloadCTA />
      <Contact />
      <PrivacyPolicy />
      <Terms />
      <Footer />
      <FloatingButtons />
      <CookieBanner />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/agent" element={<AgentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;