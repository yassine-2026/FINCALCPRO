import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLanguage } from '../lib/i18n-utils';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';

export default function Layout() {
  const location = useLocation();
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const l = getLanguage(lang || 'en');
    i18n.changeLanguage(l.code);
    document.documentElement.dir = l.dir;
    document.documentElement.lang = l.code;
    localStorage.setItem('fincalcpro_lang', l.code);
  }, [lang, i18n]);

  const navLinkClass = (path: string) => {
    const fullPath = `/${lang}${path}`;
    return `hover:text-slate-800 transition-colors ${location.pathname === fullPath ? 'text-indigo-600' : ''}`;
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans text-slate-900 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4 relative z-10">
        <Link to={`/${lang}`} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center text-white font-black text-2xl shadow-md shadow-indigo-200 border border-indigo-400 group-hover:scale-105 transition-transform">
            F
          </div>
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-900 uppercase">
            FINCALCPRO
          </span>
        </Link>
        <nav className="flex flex-wrap text-sm font-semibold uppercase tracking-widest text-slate-500 gap-4 md:gap-8 justify-center items-center">
          <Link to={`/${lang}/compound-interest`} className={navLinkClass('/compound-interest')}>{t('nav.comp')}</Link>
          <Link to={`/${lang}/loan-calculator`} className={navLinkClass('/loan-calculator')}>{t('nav.loan')}</Link>
          <Link to={`/${lang}/roi-calculator`} className={navLinkClass('/roi-calculator')}>{t('nav.roi')}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <CurrencySwitcher />
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 md:p-8 gap-6 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 px-4 md:px-8 py-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Link to={`/${lang}/privacy-policy`} className="hover:text-indigo-600">{t('nav.priv')}</Link>
            <Link to={`/${lang}/terms`} className="hover:text-indigo-600">{t('nav.terms')}</Link>
            <Link to={`/${lang}/contact`} className="hover:text-indigo-600">{t('nav.cont')}</Link>
            <Link to={`/${lang}/about`} className="hover:text-indigo-600">{t('nav.about')}</Link>
            <Link to={`/${lang}/disclaimer`} className="hover:text-indigo-600">{t('nav.disc')}</Link>
          </div>
          <div className="text-[10px] text-slate-400 text-center">
            &copy; {new Date().getFullYear()} {t('nav.copy')}
          </div>
        </div>
      </footer>
    </div>
  );
}
