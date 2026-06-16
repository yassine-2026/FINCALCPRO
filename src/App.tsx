import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import CompoundInterest from './pages/CompoundInterest';
import LoanCalculator from './pages/LoanCalculator';
import RoiCalculator from './pages/RoiCalculator';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import Terms from './pages/Legal/Terms';
import Disclaimer from './pages/Legal/Disclaimer';
import Contact from './pages/Legal/Contact';
import About from './pages/Legal/About';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="compound-interest" element={<CompoundInterest />} />
            <Route path="loan-calculator" element={<LoanCalculator />} />
            <Route path="roi-calculator" element={<RoiCalculator />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
