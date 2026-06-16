import { SEO } from '../../components/SEO';

export default function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto py-12 prose prose-slate">
      <SEO title="Disclaimer" description="Financial disclaimer for FinCalcPro tools." />
      <h1>Financial Disclaimer</h1>
      <p>The information and calculations provided on FinCalcPro are for educational and informational purposes only.</p>
      
      <h2>No Professional Advice</h2>
      <p>We are not financial advisors, planners, brokers, or tax professionals. The interactive calculators made available on this website are designed to be approximate estimates only. They are not intended as investment, legal, tax, or accounting advice.</p>
      
      <h2>Accuracy of Information</h2>
      <p>While we strive to keep the calculators mathematically accurate based on standard formulas, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the results.</p>
      <p>Always consult with a qualified financial professional regarding your specific situation before making major financial decisions, taking out loans, or committing to investments.</p>
    </div>
  );
}
