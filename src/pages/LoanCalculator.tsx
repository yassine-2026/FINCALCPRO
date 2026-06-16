import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SEO } from '../components/SEO';
import AdUnit from '../components/AdUnit';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(30);

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

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <SEO 
        title="Loan & Mortgage Calculator" 
        description="Calculate your monthly mortgage or loan payments, view detailed amortization schedules, and see exactly how much interest you'll pay." 
        schema={schema}
        canonicalPath="/loan-calculator"
      />

      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black leading-tight text-slate-900 tracking-tight">Loan Payoff <span className="text-emerald-600">Calculator</span></h1>
        <p className="text-slate-500 max-w-md mx-auto">Plan your debt payoff strategy and calculate complete amortization schedules.</p>
      </div>

      <AdUnit />

      <div className="grid grid-cols-12 gap-8 max-w-6xl mx-auto w-full">
        <section className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Loan Amount ($)</label>
            <input 
              type="number" 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Interest Rate (%)</label>
            <input 
              type="number" 
              step="0.1"
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Loan Term (Years)</label>
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
                <p className="text-emerald-100 text-xs uppercase font-bold tracking-widest mb-1">Estimated Monthly</p>
                <div className="text-4xl md:text-6xl font-black">${monthlyPayment.toLocaleString()}</div>
              </div>
              <div className="flex gap-8 text-left md:text-right">
                <div>
                  <p className="text-emerald-100 text-[10px] uppercase font-bold tracking-widest">Total Interest</p>
                  <div className="text-xl md:text-2xl font-bold text-rose-300">${totalInterest.toLocaleString()}</div>
                </div>
                <div>
                  <p className="text-emerald-100 text-[10px] uppercase font-bold tracking-widest">Total Cost</p>
                  <div className="text-xl md:text-2xl font-bold">${totalPayment.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Amortization Over Time</h3>
            <div className="h-64 sm:h-80 w-full">
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
                  <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} stroke="#64748b" fontSize={10} tickMargin={10} />
                  <YAxis tickFormatter={(v) => `$${v > 1000 ? (v/1000).toFixed(0) + 'k' : v}`} stroke="#64748b" fontSize={10} width={45} />
                  <Tooltip 
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                    labelFormatter={(label) => `Year ${label}`}
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
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Understanding Loan Amortization</h2>
        <p>A loan amortization schedule shows precisely how much of your payment goes towards the principal and how much goes to interest.</p>
        <p>In the early years of a mortgage or long-term loan, the majority of your payment covers the interest. Over time, as the principal balance decreases, a larger portion of your payment goes toward paying off the loan.</p>
        <p><strong>Standard Amortization Formula:</strong></p>
        <code className="bg-slate-100 px-3 py-2 rounded block w-fit mb-4 mt-2">M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]</code>
        <ul className="text-sm">
          <li><strong>M:</strong> Total monthly payment</li>
          <li><strong>P:</strong> The principal loan amount</li>
          <li><strong>i:</strong> Your monthly interest rate (annual rate divided by 12)</li>
          <li><strong>n:</strong> Number of payments (time in years multiplied by 12)</li>
        </ul>
      </div>
    </div>
  );
}
