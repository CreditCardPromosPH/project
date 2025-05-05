import React from 'react';

const TermsOfUsePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
      <div className="prose prose-slate max-w-none">
        <p>Last updated: May 5, 2025</p>

        <p className="mt-6">
          Welcome to <strong>CreditCardPromos.ph</strong> (“we”, “our”, or “us”). By accessing or using our website, you agree to comply with and be bound by the following Terms of Use. If you do not agree with these terms, please do not use our site.
        </p>

        <div className="mt-10">
          <h2 className="font-bold">1. Website Purpose</h2>
          <p>
            CreditCardPromos.ph is a publicly accessible online directory that lists credit card promotions from major banks in the Philippines. We aim to provide updated, relevant, and accurate promotional information for informational purposes only.
            <br />
            We do not issue credit cards, facilitate financial transactions, or represent any bank or financial institution.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">2. Use of Content</h2>
          <p>All content on this website is for personal, non-commercial use only. You may not:</p>
          <ul>
            <li>Reproduce, republish, or redistribute our content without permission</li>
            <li>Misrepresent our content or use it in a misleading context</li>
            <li>Use the website for any unlawful or abusive activity</li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">3. Accuracy of Information</h2>
          <p>We strive to keep all promo listings up to date and accurate. However:</p>
          <ul>
            <li>Promotions are subject to change by issuing banks without notice</li>
            <li>We do not guarantee the availability, accuracy, or completeness of any promo</li>
            <li>Always verify details directly with the official source (bank website or representative) before taking action</li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">4. External Links</h2>
          <p>
            Our website may include links to third-party websites. These are provided for your convenience, and we are not responsible for the content, privacy practices, or availability of those external sites.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">5. No Financial Advice</h2>
          <p>
            The content on CreditCardPromos.ph does not constitute financial advice. Always consult with a licensed financial advisor or directly with the bank before making credit-related decisions.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">6. Limitation of Liability</h2>
          <p>We are not liable for:</p>
          <ul>
            <li>Any errors or omissions in the content</li>
            <li>Any loss or damage arising from your use of the site or reliance on the information provided</li>
            <li>Issues resulting from technical errors or site downtime</li>
          </ul>
          <p>Use of this website is at your own risk.</p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">7. Intellectual Property</h2>
          <p>
            All branding, website design, and original content (including compiled promo data) are the intellectual property of CreditCardPromos.ph unless otherwise stated. Unauthorized use is prohibited.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">8. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time without prior notice. Continued use of the website signifies your acceptance of any updated terms.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">9. Contact Information</h2>
          <p>
            For any questions about these terms, please contact:
            <br />
            Email: creditcardpromosph@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
