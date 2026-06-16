import { Link, Outlet, useLocation } from 'react-router-dom';
import { Calculator } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navLinkClass = (path: string) => {
    return `hover:text-slate-800 transition-colors ${location.pathname === path ? 'text-indigo-600' : ''}`;
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans text-slate-900 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4 relative z-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            <Calculator className="h-5 w-5" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-800 uppercase">FinCalcPro</span>
        </Link>
        <nav className="flex flex-wrap text-sm font-semibold uppercase tracking-widest text-slate-500 gap-4 md:gap-8 justify-center">
          <Link to="/compound-interest" className={navLinkClass('/compound-interest')}>Compound Interest</Link>
          <Link to="/loan-calculator" className={navLinkClass('/loan-calculator')}>Loan</Link>
          <Link to="/roi-calculator" className={navLinkClass('/roi-calculator')}>ROI</Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/compound-interest" className="px-4 py-2 border border-slate-200 rounded-full text-xs font-bold hover:bg-slate-50 transition-colors">START CALC</Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 md:p-8 gap-6 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 px-4 md:px-8 py-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Link to="/privacy-policy" className="hover:text-indigo-600">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-600">Terms of Service</Link>
            <Link to="/contact" className="hover:text-indigo-600">Contact Us</Link>
            <Link to="/about" className="hover:text-indigo-600">About Us</Link>
            <Link to="/disclaimer" className="hover:text-indigo-600">Disclaimer</Link>
          </div>
          <div className="text-[10px] text-slate-400 text-center">
            &copy; {new Date().getFullYear()} FinCalcPro &bull; Global Financial Calculators
          </div>
        </div>
      </footer>
    </div>
  );
}
