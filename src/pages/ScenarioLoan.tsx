import { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { SEO } from '../components/SEO';
import { useCurrency } from '../contexts/CurrencyContext';

export default function ScenarioLoan() {
  const { lang, amount, rate, years } = useParams();
  const currentLang = lang || 'en';
  const { t } = useTranslation();
  const { currency, formatCurrency } = useCurrency();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const amt = parseInt(amount || '250000', 10);
  const r = parseFloat(rate || '5.5');
  const y = parseInt(years || '30', 10);

  const { monthlyPayment, data, totalInterest, totalPayment } = useMemo(() => {
    const monthlyRate = (r / 100) / 12;
    const numberOfPayments = y * 12;
    
    let mPayment = 0;
    if (monthlyRate === 0) {
      mPayment = amt / numberOfPayments;
    } else {
      mPayment = amt * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    let remainingBalance = amt;
    let chartData = [];
    
    for (let currentYear = 1; currentYear <= y; currentYear++) {
      let principalPaidYear = 0;
      let interestPaidYear = 0;
      
      for (let month = 1; month <= 12; month++) {
        const interest = remainingBalance * monthlyRate;
        const principal = mPayment - interest;
        remainingBalance -= principal;
        principalPaidYear += principal;
        interestPaidYear += interest;
      }
      
      chartData.push({
        year: currentYear,
        balance: Math.max(0, Math.round(remainingBalance)),
        principalPaid: Math.round(principalPaidYear),
        interestPaid: Math.round(interestPaidYear)
      });
    }

    return {
      monthlyPayment: Math.round(mPayment),
      totalPayment: Math.round(mPayment * numberOfPayments),
      totalInterest: Math.round((mPayment * numberOfPayments) - amt),
      data: chartData
    };
  }, [amt, r, y]);

  // Generate related scenarios for internal linking
  const related = useMemo(() => {
    return [
      { a: amt, r: r + 0.5, y: y },
      { a: amt, r: r - 0.5 > 0 ? r - 0.5 : 1, y: y },
      { a: amt, r: r, y: y === 30 ? 15 : 30 },
      { a: Math.round(amt * 0.8), r: r, y: y },
      { a: Math.round(amt * 1.2), r: r, y: y },
      { a: Math.round(amt * 1.5), r: r + 1, y: y }
    ];
  }, [amt, r, y]);

  const title = t('sc.loan_t', { amount: formatCurrency(amt), rate: r, years: y });
  const description = t('sc.loan_d', { amount: formatCurrency(amt), rate: r, years: y });

  const formatLocalYear = (v: number) => {
    let locale = currentLang;
    if (locale === 'ar') locale = 'ar-EG';
    if (locale === 'hi') locale = 'hi-IN-u-nu-deva';
    return new Intl.NumberFormat(locale).format(v);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `For a ${formatCurrency(amt)} loan at ${r}% interest over ${y} years, your monthly payment will be ${formatCurrency(monthlyPayment)}. Over the life of the loan, you will pay a total of ${formatCurrency(totalPayment)}, including ${formatCurrency(totalInterest)} in interest.`
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
        <div className="bg-rose-600 text-white p-8 rounded-3xl shadow-xl shadow-rose-200 flex flex-col justify-center items-center text-center">
          <p className="text-rose-200 text-xs uppercase font-bold tracking-widest mb-2">{t('loan.em')}</p>
          <div className="text-4xl font-black" dir="ltr">{formatCurrency(monthlyPayment)}</div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center items-center text-center">
          <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">{t('loan.tc')}</p>
          <div className="text-3xl font-black text-slate-800" dir="ltr">{formatCurrency(totalPayment)}</div>
        </div>
        <div className="bg-rose-50 p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-rose-100 flex flex-col justify-center items-center text-center">
          <p className="text-rose-600 text-xs uppercase font-bold tracking-widest mb-2">{t('loan.ti')}</p>
          <div className="text-3xl font-black text-rose-600" dir="ltr">{formatCurrency(totalInterest)}</div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="h-[300px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalanceLoan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
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
              <Area type="monotone" dataKey="balance" stroke="#e11d48" strokeWidth={3} fillOpacity={1} fill="url(#colorBalanceLoan)" />
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
                to={`/${currentLang}/scenario/loan/${rel.a}/${rel.r}/${rel.y}`}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-rose-400 hover:shadow-md transition-all text-sm font-semibold text-slate-700 flex flex-col gap-1"
              >
                <span dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>{t('sc.loan_t', { amount: formatCurrency(rel.a), rate: rel.r, years: rel.y })}</span>
                <span className="text-rose-600 font-bold" dir="ltr">{rel.r}% / {rel.y}y</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
