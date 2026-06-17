import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import CompoundInterest from './pages/CompoundInterest';
import LoanCalculator from './pages/LoanCalculator';
import RoiCalculator from './pages/RoiCalculator';
import ScenarioInvest from './pages/ScenarioInvest';
import ScenarioLoan from './pages/ScenarioLoan';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import Terms from './pages/Legal/Terms';
import Disclaimer from './pages/Legal/Disclaimer';
import Contact from './pages/Legal/Contact';
import About from './pages/Legal/About';
import { CurrencyProvider } from './contexts/CurrencyContext';

function RootRedirect() {
  const savedLang = localStorage.getItem('fincalcpro_lang') || navigator.language.split('-')[0];
  const supported = ['ar','en','fr','es','de','it','pt','ru','tr','zh','ja','ko','hi','id','nl','pl','uk','th','vi','ms'];
  const lang = supported.includes(savedLang) ? savedLang : 'en';
  return <Navigate to={`/${lang}`} replace />;
}

function ContextWrapper() {
  return (
    <CurrencyProvider>
      <Layout />
    </CurrencyProvider>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/:lang" element={<ContextWrapper />}>
            <Route index element={<Home />} />
            <Route path="compound-interest" element={<CompoundInterest />} />
            <Route path="loan-calculator" element={<LoanCalculator />} />
            <Route path="roi-calculator" element={<RoiCalculator />} />
            <Route path="scenario/invest/:amount/:rate/:years" element={<ScenarioInvest />} />
            <Route path="scenario/loan/:amount/:rate/:years" element={<ScenarioLoan />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
