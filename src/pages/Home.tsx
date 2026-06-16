import { Link } from 'react-router-dom';
import { TrendingUp, Landmark, Target, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import AdUnit from '../components/AdUnit';

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FinCalcPro",
    "url": "https://fincalcpro.com",
    "description": "Free online global financial calculators for compound interest, loans, and ROI."
  };

  return (
    <div className="space-y-12">
      <SEO 
        title="Free Global Financial & ROI Calculators" 
        description="Calculate your financial future with our free, high-performance Compound Interest, Mortgage, and ROI calculators. No sign-up required." 
        schema={schema}
        canonicalPath="/"
      />

      <section className="text-center max-w-3xl mx-auto space-y-6 pt-10">
        <h1 className="text-5xl font-black leading-tight mb-4 text-slate-900 tracking-tight">
          Master Your Financial <span className="text-indigo-600">Future</span>
        </h1>
        <p className="text-slate-500 max-w-md mx-auto">
          Professional, fast, and free financial calculators to help you plan investments, manage debt, and track returns effortlessly.
        </p>
      </section>

      <AdUnit />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 max-w-6xl mx-auto w-full">
        <Link to="/compound-interest" className="group bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-6 w-fit">
            <TrendingUp strokeWidth={2} className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Compound Interest</h2>
          <p className="text-slate-500 mb-8 flex-1 text-sm leading-relaxed">
            Visualize how your money grows over time with the power of compounding. Perfect for long-term investments.
          </p>
          <div className="flex items-center text-[10px] uppercase font-bold tracking-widest text-indigo-600">
            Use Calculator <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link to="/loan-calculator" className="group bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl mb-6 w-fit">
            <Landmark strokeWidth={2} className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Loan Payoff</h2>
          <p className="text-slate-500 mb-8 flex-1 text-sm leading-relaxed">
            Plan your mortgage or personal loan payments. See exact amortization schedules and interest totals.
          </p>
          <div className="flex items-center text-[10px] uppercase font-bold tracking-widest text-emerald-600">
            Use Calculator <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link to="/roi-calculator" className="group bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl mb-6 w-fit">
            <Target strokeWidth={2} className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">ROI Calculator</h2>
          <p className="text-slate-500 mb-8 flex-1 text-sm leading-relaxed">
            Calculate the Return on Investment for your business decisions, real estate, or stock market plays.
          </p>
          <div className="flex items-center text-[10px] uppercase font-bold tracking-widest text-amber-600">
            Use Calculator <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      <AdUnit />
      
    </div>
  );
}
