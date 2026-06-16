import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import AdUnit from '../components/AdUnit';
import { useCurrency } from '../contexts/CurrencyContext';

export default function RoiCalculator() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const { currency, rates, formatCurrency } = useCurrency();

  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [investmentYears, setInvestmentYears] = useState(3);
  const [prevCurrency, setPrevCurrency] = useState(currency);

  useEffect(() => {
    if (prevCurrency !== currency && rates[currency] && rates[prevCurrency]) {
      const conversionRate = rates[currency] / rates[prevCurrency];
      setInitialInvestment(prev => Math.round(prev * conversionRate));
      setFinalValue(prev => Math.round(prev * conversionRate));
      setPrevCurrency(currency);
    } else if (prevCurrency !== currency) {
      setPrevCurrency(currency);
    }
  }, [currency, prevCurrency, rates]);

  const { roi, annualizedRoi, totalProfit } = useMemo(() => {
    const profit = finalValue - initialInvestment;
    const returnOnInvestment = (profit / initialInvestment) * 100;
    
    // Annualized ROI = [(Final Value / Initial Value) ^ (1 / Years) - 1] * 100
    let aRoi = 0;
    if (investmentYears > 0 && initialInvestment > 0) {
      aRoi = (Math.pow((finalValue / initialInvestment), (1 / investmentYears)) - 1) * 100;
    }

    return {
      roi: returnOnInvestment,
      annualizedRoi: aRoi,
      totalProfit: profit
    };
  }, [initialInvestment, finalValue, investmentYears]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ROI Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  const formatLocalYear = (v: number) => {
    let locale = currentLang;
    if (locale === 'ar') locale = 'ar-EG';
    if (locale === 'hi') locale = 'hi-IN-u-nu-deva';
    return new Intl.NumberFormat(locale).format(v);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <SEO 
        title={t('roi.meta_t')} 
        description={t('roi.meta_d')} 
        schema={schema}
        canonicalPath="/roi-calculator"
      />

      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black leading-tight text-slate-900 tracking-tight">{t('roi.t1')} <span className="text-amber-600">{t('roi.t2')}</span> (ROI)</h1>
        <p className="text-slate-500 max-w-md mx-auto">{t('roi.desc')}</p>
      </div>

      <AdUnit />

      <div className="grid grid-cols-12 gap-8 max-w-6xl mx-auto w-full">
        <section className="col-span-12 lg:col-span-6 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('roi.ini')}</label>
            <input 
              type="number" 
              value={initialInvestment} 
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('roi.fin')}</label>
            <input 
              type="number" 
              value={finalValue} 
              onChange={(e) => setFinalValue(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('roi.yrs')}</label>
            <input 
              type="number" 
              value={investmentYears} 
              onChange={(e) => setInvestmentYears(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            />
          </div>
        </section>

        <section className="col-span-12 lg:col-span-6 space-y-6 flex flex-col">
          <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 flex flex-col items-center justify-center h-48 shadow-xl shadow-slate-200/50">
            <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800 mb-2">{t('roi.tr')}</span>
            <span className={`text-6xl font-black ${roi >= 0 ? 'text-amber-600' : 'text-rose-600'}`} dir="ltr">
              {formatLocalYear(Number(roi.toFixed(2)))}%
            </span>
          </div>
          <div className="grid grid-cols-2 gap-6 flex-1">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2 text-center">{t('roi.ar')}</span>
              <span className={`text-3xl font-black ${annualizedRoi >= 0 ? 'text-emerald-600' : 'text-rose-600'}`} dir="ltr">
                {formatLocalYear(Number(annualizedRoi.toFixed(2)))}%
              </span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2 text-center">{t('roi.np')}</span>
              <span className={`text-2xl font-black ${totalProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`} dir="ltr">
                {formatCurrency(totalProfit)}
              </span>
            </div>
          </div>
        </section>
      </div>

      <AdUnit />

      <div className="prose max-w-none text-slate-600 bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('roi.hw')}</h2>
        <p className="text-sm border-b pb-6 border-slate-100">{t('roi.hw_d')}</p>
        
        <h3 className="text-sm uppercase tracking-widest font-bold text-slate-400 mt-6 md:mt-8">{t('roi.bf')}</h3>
        <code className="bg-slate-50 border border-slate-100 text-indigo-600 px-4 py-3 rounded-xl block w-fit font-bold" dir="ltr">ROI = ((Final Value - Initial Value) / Initial Value) × 100</code>
        
        <h3 className="text-sm uppercase tracking-widest font-bold text-slate-400 mt-8">{t('roi.ar2')}</h3>
        <p className="text-sm">{t('roi.ar2_d')}</p>
        <code className="bg-slate-50 border border-slate-100 text-emerald-600 px-4 py-3 rounded-xl block w-fit font-bold" dir="ltr">Annualized ROI = [ (Final Value / Initial Value) ^ (1 / Years) - 1 ] × 100</code>
      </div>
    </div>
  );
}
