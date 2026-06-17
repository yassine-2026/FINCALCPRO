import { Link, useParams } from 'react-router-dom';
import { TrendingUp, Landmark, Target, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import AdUnit from '../components/AdUnit';

export default function Home() {
  const { lang } = useParams();
  const { t } = useTranslation();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FINCALCPRO",
    "url": "https://fincalcpro.com",
    "description": t('home.meta_d')
  };

  return (
    <div className="space-y-12">
      <SEO 
        title={t('home.meta_t')} 
        description={t('home.meta_d')} 
        schema={schema}
        canonicalPath="/"
      />

      <section className="text-center max-w-3xl mx-auto space-y-6 pt-10">
        <h1 className="text-5xl font-black leading-tight mb-4 text-slate-900 tracking-tight">
          {t('home.title1')} <span className="text-indigo-600">{t('home.title2')}</span>
        </h1>
        <p className="text-slate-500 max-w-md mx-auto">
          {t('home.desc')}
        </p>
      </section>

      <AdUnit />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 max-w-6xl mx-auto w-full">
        <Link to={`/${lang}/compound-interest`} className="group bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-6 w-fit">
            <TrendingUp strokeWidth={2} className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{t('home.c_t')}</h2>
          <p className="text-slate-500 mb-8 flex-1 text-sm leading-relaxed">
            {t('home.c_d')}
          </p>
          <div className="flex items-center text-[10px] uppercase font-bold tracking-widest text-indigo-600">
            {t('home.btn')} <ArrowRight className="mx-2 w-4 h-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
          </div>
        </Link>

        <Link to={`/${lang}/loan-calculator`} className="group bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl mb-6 w-fit">
            <Landmark strokeWidth={2} className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{t('home.l_t')}</h2>
          <p className="text-slate-500 mb-8 flex-1 text-sm leading-relaxed">
            {t('home.l_d')}
          </p>
          <div className="flex items-center text-[10px] uppercase font-bold tracking-widest text-emerald-600">
            {t('home.btn')} <ArrowRight className="mx-2 w-4 h-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
          </div>
        </Link>

        <Link to={`/${lang}/roi-calculator`} className="group bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl mb-6 w-fit">
            <Target strokeWidth={2} className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{t('home.r_t')}</h2>
          <p className="text-slate-500 mb-8 flex-1 text-sm leading-relaxed">
            {t('home.r_d')}
          </p>
          <div className="flex items-center text-[10px] uppercase font-bold tracking-widest text-amber-600">
            {t('home.btn')} <ArrowRight className="mx-2 w-4 h-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
          </div>
        </Link>
      </section>

      <section className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12 pb-10 max-w-6xl mx-auto w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <TrendingUp className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">{t('sc.pop')}</h2>
          <p className="text-slate-400 mb-8 max-w-2xl">{t('home.desc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to={`/${lang}/scenario/invest/10000/5/10`} className="bg-slate-800 hover:bg-indigo-600 transition-colors p-4 rounded-xl border border-slate-700 hover:border-indigo-500 flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('nav.comp')}</span>
              <span className="font-semibold text-sm" dir="ltr">10,000 @ 5% / 10y</span>
            </Link>
            <Link to={`/${lang}/scenario/invest/50000/7/20`} className="bg-slate-800 hover:bg-indigo-600 transition-colors p-4 rounded-xl border border-slate-700 hover:border-indigo-500 flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('nav.comp')}</span>
              <span className="font-semibold text-sm" dir="ltr">50,000 @ 7% / 20y</span>
            </Link>
            <Link to={`/${lang}/scenario/loan/250000/5.5/30`} className="bg-slate-800 hover:bg-rose-600 transition-colors p-4 rounded-xl border border-slate-700 hover:border-rose-500 flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('nav.loan')}</span>
              <span className="font-semibold text-sm" dir="ltr">250,000 @ 5.5% / 30y</span>
            </Link>
            <Link to={`/${lang}/scenario/loan/50000/6/5`} className="bg-slate-800 hover:bg-rose-600 transition-colors p-4 rounded-xl border border-slate-700 hover:border-rose-500 flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('nav.loan')}</span>
              <span className="font-semibold text-sm" dir="ltr">50,000 @ 6% / 5y</span>
            </Link>
          </div>
        </div>
      </section>

      <AdUnit />
      
    </div>
  );
}
