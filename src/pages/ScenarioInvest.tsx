import { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { SEO } from '../components/SEO';
import { useCurrency } from '../contexts/CurrencyContext';

export default function ScenarioInvest() {
  const { lang, amount, rate, years } = useParams();
  const currentLang = lang || 'en';
  const { t } = useTranslation();
  const { currency, formatCurrency } = useCurrency();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const amt = parseInt(amount || '10000', 10);
  const r = parseFloat(rate || '5');
  const y = parseInt(years || '10', 10);

  const { finalBalance, totalInterest, data } = useMemo(() => {
    let result = [];
    let currentBalance = amt;
    let interestAccrued = 0;
    const monthlyRate = (r / 100) / 12;

    for (let currentYear = 1; currentYear <= y; currentYear++) {
      for (let month = 1; month <= 12; month++) {
        const interest = currentBalance * monthlyRate;
        currentBalance += interest;
        interestAccrued += interest;
      }
      result.push({
        year: currentYear,
        balance: Math.round(currentBalance),
        interest: Math.round(interestAccrued),
        contributions: amt
      });
    }

    return {
      finalBalance: Math.round(currentBalance),
      totalInterest: Math.round(interestAccrued),
      data: result
    };
  }, [amt, r, y]);

  // Generate related scenarios for internal linking
  const related = useMemo(() => {
    return [
      { a: amt, r: r + 1, y: y },
      { a: amt, r: r - 1 > 0 ? r - 1 : 1, y: y },
      { a: amt, r: r, y: y + 5 },
      { a: Math.round(amt * 1.5), r: r, y: y },
      { a: Math.round(amt * 2), r: r, y: y },
      { a: amt, r: r + 2, y: y + 10 }
    ];
  }, [amt, r, y]);

  const title = t('sc.inv_t', { amount: formatCurrency(amt), rate: r, years: y });
  const description = t('sc.inv_d', { amount: formatCurrency(amt), rate: r, years: y });

  const formatLocalYear = (v: number) => {
    let locale = currentLang;
    if (locale === 'ar') locale = 'ar-EG';
    if (locale === 'hi') locale = 'hi-IN-u-nu-deva';
    return new Intl.NumberFormat(locale).format(v);
  };

  // Structured Data for FAQ based on the scenario
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `If you invest ${formatCurrency(amt)} at an annual interest rate of ${r}% for ${y} years, your total balance will grow to ${formatCurrency(finalBalance)}, earning ${formatCurrency(totalInterest)} in compound interest.`
      }
    }]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8 px-4">
      <SEO 
        title={title}
        description={description}
      />
      {mounted && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
          {title}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl shadow-indigo-200 flex flex-col justify-center items-center text-center">
          <p className="text-indigo-200 text-xs uppercase font-bold tracking-widest mb-2">{t('comp.tb')}</p>
          <div className="text-4xl font-black" dir="ltr">{formatCurrency(finalBalance)}</div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center items-center text-center">
          <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">{t('comp.tc')}</p>
          <div className="text-3xl font-black text-slate-800" dir="ltr">{formatCurrency(amt)}</div>
        </div>
        <div className="bg-emerald-50 p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-emerald-100 flex flex-col justify-center items-center text-center">
          <p className="text-emerald-600 text-xs uppercase font-bold tracking-widest mb-2">{t('comp.ie')}</p>
          <div className="text-3xl font-black text-emerald-600" dir="ltr">{formatCurrency(totalInterest)}</div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="h-[300px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalanceSc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
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
              <Area type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorBalanceSc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-50 p-6 md:p-10 rounded-3xl">
        <h3 className="text-xl font-bold text-slate-800 mb-6">{t('sc.sim')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {related.map((rel, idx) => {
            const relKey = `${rel.a}-${rel.r}-${rel.y}`;
            return (
              <Link 
                key={relKey + idx} 
                to={`/${currentLang}/scenario/invest/${rel.a}/${rel.r}/${rel.y}`}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all text-sm font-semibold text-slate-700 flex flex-col gap-1"
              >
                <span dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>{t('sc.inv_t', { amount: formatCurrency(rel.a), rate: rel.r, years: rel.y })}</span>
                <span className="text-indigo-600 font-bold" dir="ltr">{rel.r}% / {rel.y}y</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
