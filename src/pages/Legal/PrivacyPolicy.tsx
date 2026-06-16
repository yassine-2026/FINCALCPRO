import { SEO } from '../../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 prose prose-slate">
      <SEO title="Privacy Policy" description="Privacy Policy for FinCalcPro." />
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <p>Welcome to FinCalcPro. We respect your privacy and are committed to protecting it. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you use our global calculators.</p>
      
      <h2>1. Information Collection And Use</h2>
      <p>Our calculators run entirely on your client device (your browser). We do not collect, store, or transmit your financial inputs to our servers. Any numbers you enter remain strictly on your device.</p>
      
      <h2>2. Log Data & Analytics</h2>
      <p>We may collect information that your browser sends whenever you visit our website ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, and other statistics to improve our service.</p>

      <h2>3. Third-Party Services (Google AdSense)</h2>
      <p>We use Google AdSense to serve ads. Google adheres to its own privacy policy. Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</p>
      <p>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>
      <p>You may opt out of personalized advertising by visiting Ads Settings.</p>
      
      <h2>4. Cookies</h2>
      <p>We do not use proprietary cookies to track users. Third-party vendors may use cookies as described above.</p>

      <h2>5. Changes To This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

      <h2>6. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us via our Contact page.</p>
    </div>
  );
}
