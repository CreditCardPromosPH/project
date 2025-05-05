import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p>Last updated: May 5, 2025</p>

        <p className="mt-6">
          Thank you for visiting <strong>CreditCardPromos.ph</strong> ("we", "our", or "us"). We value your privacy and are committed to protecting any personal information you may share with us. This Privacy Policy outlines how we collect, use, and protect your information when you visit or interact with our website.
        </p>

        <div className="mt-10">
          <h2 className="font-bold">1. Information We Collect</h2>
          <p>
            We do not directly collect personal information from users of this website. However, we may collect non-personally identifiable information automatically through third-party services such as:
          </p>
          <ul>
            <li>Google Analytics: to understand website traffic and usage trends.</li>
            <li>Cookies: to enhance user experience and track anonymous usage data.</li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">2. How We Use Information</h2>
          <p>Any data collected is used solely for the following purposes:</p>
          <ul>
            <li>To analyze traffic patterns and improve the performance of our website.</li>
            <li>To maintain the security and functionality of our services.</li>
            <li>To ensure the accuracy and relevance of the promo listings.</li>
          </ul>
          <p>We do not sell, rent, or trade your personal data.</p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">3. Third-Party Services</h2>
          <p>
            We may use third-party services (e.g., analytics tools or advertising platforms) that collect data in accordance with their own privacy policies. These services may use cookies or similar tracking technologies.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">4. Links to Other Websites</h2>
          <p>
            Our website contains links to external sites, particularly official promo pages of banks and credit card issuers. We are not responsible for the privacy practices or content of these third-party websites.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">5. Your Rights and Choices</h2>
          <p>
            Since we do not collect personal information directly, there is generally no data for you to access, modify, or delete on our end. However, you can manage cookies and tracking preferences in your browser settings.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">6. Data Security</h2>
          <p>
            While we do not collect personal data, we take reasonable steps to secure our site and protect it from unauthorized access or alteration.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">7. Children’s Privacy</h2>
          <p>
            Our site is not directed at children under 13, and we do not knowingly collect any personal information from anyone under the age of 13.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">8. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">9. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, feel free to contact us at:
            <br />
            Email: creditcardpromosph@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
