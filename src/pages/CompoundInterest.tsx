import { useState, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import AdUnit from '../components/AdUnit';
import { useCurrency } from '../contexts/CurrencyContext';

export default function CompoundInterest() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const { currency, rates, formatCurrency } = useCurrency();

  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(7);
  const [prevCurrency, setPrevCurrency] = useState(currency);

  useEffect(() => {
    if (prevCurrency !== currency && rates[currency] && rates[prevCurrency]) {
      const conversionRate = rates[currency] / rates[prevCurrency];
      setInitialAmount(prev => Math.round(prev * conversionRate));
      setMonthlyContribution(prev => Math.round(prev * conversionRate));
      setPrevCurrency(currency);
    } else if (prevCurrency !== currency) {
      setPrevCurrency(currency);
    }
  }, [currency, prevCurrency, rates]);

  const data = useMemo(() => {
    let result = [];
    let currentBalance = initialAmount;
    let totalContributions = initialAmount;

    result.push({
      year: 0,
      balance: currentBalance,
      contributions: totalContributions,
      interest: 0
    });

    for (let i = 1; i <= years; i++) {
        let yearlyInterest = 0;
        for (let m = 0; m < 12; m++) {
            const interest = currentBalance * ((interestRate / 100) / 12);
            yearlyInterest += interest;
            currentBalance += interest + monthlyContribution;
            totalContributions += monthlyContribution;
        }
        result.push({
            year: i,
            balance: Math.round(currentBalance),
            contributions: Math.round(totalContributions),
            interest: Math.round(currentBalance - totalContributions)
        });
    }
    return result;
  }, [initialAmount, monthlyContribution, years, interestRate]);

  const finalBalance = data[data.length - 1]?.balance || 0;
  const totalContributions = data[data.length - 1]?.contributions || 0;
  const totalInterest = finalBalance - totalContributions;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Compound Interest Calculator",
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
    <div className="max-w-5xl mx-auto space-y-8">
      <SEO 
        title={t('comp.meta_t')} 
        description={t('comp.meta_d')} 
        schema={schema}
        canonicalPath="/compound-interest"
      />

      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black leading-tight text-slate-900 tracking-tight">{t('comp.t1')} <span className="text-indigo-600">{t('comp.t2')}</span></h1>
        <p className="text-slate-500 max-w-md mx-auto">{t('comp.desc')}</p>
      </div>

      <AdUnit />

      <div className="grid grid-cols-12 gap-8 max-w-6xl mx-auto w-full">
        <section className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('comp.init')}</label>
            <input 
              type="number" 
              value={initialAmount} 
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('comp.mon')}</label>
            <input 
              type="number" 
              value={monthlyContribution} 
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('comp.yrs')}</label>
            <input 
              type="number" 
              value={years} 
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('comp.rate')}</label>
            <input 
              type="number" 
              step="0.1"
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </section>

        <section className="col-span-12 lg:col-span-8 space-y-6 flex flex-col">
          <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-slate-200/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <p className="text-indigo-200 text-xs uppercase font-bold tracking-widest mb-1">{t('comp.tb')}</p>
                <div className="text-4xl md:text-6xl font-black" dir="ltr">{formatCurrency(finalBalance)}</div>
              </div>
              <div className="flex gap-8 text-left md:text-right">
                <div>
                  <p className="text-indigo-200 text-[10px] uppercase font-bold tracking-widest">{t('comp.tc')}</p>
                  <div className="text-xl md:text-2xl font-bold" dir="ltr">{formatCurrency(totalContributions)}</div>
                </div>
                <div>
                  <p className="text-emerald-300 text-[10px] uppercase font-bold tracking-widest">{t('comp.ie')}</p>
                  <div className="text-xl md:text-2xl font-bold" dir="ltr">{formatCurrency(totalInterest)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">{t('comp.gr')}</h3>
            <div className="h-64 sm:h-80 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" tickFormatter={(v) => formatLocalYear(v)} stroke="#64748b" fontSize={10} tickMargin={10} />
                  <YAxis tickFormatter={(v) => formatCurrency(v > 1000 ? v/1000 : v).replace('.00', '') + (v > 1000 ? 'k' : '')} stroke="#64748b" fontSize={10} width={80} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => formatLocalYear(Number(label))}
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  />
                  <Area type="monotone" dataKey="balance" name={t('comp.tb')} stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                  <Area type="monotone" dataKey="contributions" name={t('comp.tc')} stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorContributions)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      <AdUnit />

      <div className="prose max-w-none text-slate-600 bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('comp.hw')}</h2>
        <p>{t('comp.hw_d')}</p>
        <p><strong>{t('comp.ft')}</strong> A = P(1 + r/n)^(nt) + PMT × {`(((1 + r/n)^(nt) - 1) / (r/n))`}</p>
      </div>
    </div>
  );
}
