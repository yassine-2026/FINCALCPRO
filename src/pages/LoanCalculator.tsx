import { useState, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import AdUnit from '../components/AdUnit';
import { useCurrency } from '../contexts/CurrencyContext';

export default function LoanCalculator() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const { currency, rates, formatCurrency } = useCurrency();

  const [loanAmount, setLoanAmount] = useState(250000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [prevCurrency, setPrevCurrency] = useState(currency);

  useEffect(() => {
    if (prevCurrency !== currency && rates[currency] && rates[prevCurrency]) {
      const conversionRate = rates[currency] / rates[prevCurrency];
      setLoanAmount(prev => Math.round(prev * conversionRate));
      setPrevCurrency(currency);
    } else if (prevCurrency !== currency) {
      setPrevCurrency(currency);
    }
  }, [currency, prevCurrency, rates]);

  const { monthlyPayment, data, totalInterest, totalPayment } = useMemo(() => {
    const monthlyRate = (interestRate / 100) / 12;
    const numPayments = loanTerm * 12;
    
    let pmt = 0;
    if (monthlyRate === 0) {
        pmt = loanAmount / numPayments;
    } else {
        pmt = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    let schedule = [];
    let remainingBalance = loanAmount;
    let accumulatedInterest = 0;

    // Output yearly data points to keep chart clean
    schedule.push({ year: 0, balance: Math.round(remainingBalance), interestPaid: 0 });

    for (let year = 1; year <= loanTerm; year++) {
      let yearlyInterest = 0;
      for (let month = 1; month <= 12; month++) {
        const interest = remainingBalance * monthlyRate;
        const principal = pmt - interest;
        remainingBalance -= principal;
        accumulatedInterest += interest;
        yearlyInterest += interest;
      }
      schedule.push({
        year,
        balance: Math.max(0, Math.round(remainingBalance)),
        interestPaid: Math.round(accumulatedInterest)
      });
    }

    return {
      monthlyPayment: Math.round(pmt),
      data: schedule,
      totalInterest: Math.round(accumulatedInterest),
      totalPayment: Math.round(loanAmount + accumulatedInterest)
    };
  }, [loanAmount, interestRate, loanTerm]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Loan & Mortgage Calculator",
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
        title={t('loan.meta_t')} 
        description={t('loan.meta_d')} 
        schema={schema}
        canonicalPath="/loan-calculator"
      />

      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black leading-tight text-slate-900 tracking-tight">{t('loan.t1')} <span className="text-emerald-600">{t('loan.t2')}</span></h1>
        <p className="text-slate-500 max-w-md mx-auto">{t('loan.desc')}</p>
      </div>

      <AdUnit />

      <div className="grid grid-cols-12 gap-8 max-w-6xl mx-auto w-full">
        <section className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('loan.amt')}</label>
            <input 
              type="number" 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('loan.rate')}</label>
            <input 
              type="number" 
              step="0.1"
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('loan.term')}</label>
            <input 
              type="number" 
              value={loanTerm} 
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </section>

        <section className="col-span-12 lg:col-span-8 space-y-6 flex flex-col">
          <div className="p-8 bg-emerald-600 rounded-3xl text-white shadow-xl shadow-slate-200/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <p className="text-emerald-100 text-xs uppercase font-bold tracking-widest mb-1">{t('loan.em')}</p>
                <div className="text-4xl md:text-6xl font-black" dir="ltr">{formatCurrency(monthlyPayment)}</div>
              </div>
              <div className="flex gap-8 text-left md:text-right">
                <div>
                  <p className="text-emerald-100 text-[10px] uppercase font-bold tracking-widest">{t('loan.ti')}</p>
                  <div className="text-xl md:text-2xl font-bold text-rose-300" dir="ltr">{formatCurrency(totalInterest)}</div>
                </div>
                <div>
                  <p className="text-emerald-100 text-[10px] uppercase font-bold tracking-widest">{t('loan.tc')}</p>
                  <div className="text-xl md:text-2xl font-bold" dir="ltr">{formatCurrency(totalPayment)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">{t('loan.am')}</h3>
            <div className="h-64 sm:h-80 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLoanBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="balance" name="Remaining Balance" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorLoanBalance)" />
                  <Area type="monotone" dataKey="interestPaid" name="Total Interest" stroke="#e11d48" strokeWidth={2} fillOpacity={1} fill="url(#colorInterest)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      <AdUnit />

      <div className="prose max-w-none text-slate-600 bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('loan.hw')}</h2>
        <p>{t('loan.hw_d')}</p>
        <p>{t('loan.hw_d2')}</p>
        <p><strong>{t('loan.ft')}</strong></p>
        <code className="bg-slate-100 px-3 py-2 rounded block w-fit mb-4 mt-2" dir="ltr">M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]</code>
      </div>
    </div>
  );
}
