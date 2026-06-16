import { SEO } from '../../components/SEO';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 prose prose-slate">
      <SEO title="About Us" description="Learn more about FinCalcPro and our mission to provide free financial tools." />
      <h1>About FinCalcPro</h1>
      <p>Welcome to FinCalcPro, your premier global destination for fast, reliable, and completely free financial calculators.</p>
      
      <h2>Our Mission</h2>
      <p>We believe that financial literacy and planning should be accessible to everyone around the world. Whether you're trying to figure out how much your next home will cost, tracking how quickly your investments will grow, or analyzing the return on a business venture, you need the right tools.</p>
      
      <h2>Why We Built This</h2>
      <p>The internet is full of calculators that are slow, require you to create an account, or force you to install an app. We built FinCalcPro to be the exact opposite:</p>
      <ul>
        <li><strong>No sign-ups ever:</strong> Use the tools immediately.</li>
        <li><strong>Lightning fast:</strong> Built on modern web technologies ensuring instant calculations.</li>
        <li><strong>Privacy first:</strong> All calculations happen securely on your own device.</li>
        <li><strong>Global scale:</strong> Accessible anywhere, on any device.</li>
      </ul>
      
      <p>Thank you for trusting FinCalcPro for your financial planning. We continue to add new calculators and features to help you master your financial future.</p>
    </div>
  );
}
