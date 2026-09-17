import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | CreditCardPromos.ph",
  description: "Privacy Policy for CreditCardPromos.ph.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Thank you for visiting <strong>CreditCardPromos.ph</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We value your privacy and are committed to protecting any personal information you may share with us. This Privacy Policy outlines how we collect, use, and protect your information when you visit or interact with our website.</p>

      <h2>1. Information We Collect</h2>
      <p>We do not directly collect personal information from users of this website. However, we may collect non-personally identifiable information automatically through third-party services such as:</p>
      <ul>
        <li>Google Analytics: to understand website traffic and usage trends.</li>
        <li>Cookies: to enhance user experience and track anonymous usage data.</li>
      </ul>

      <h2>2. How We Use Information</h2>
      <p>Any data collected is used solely for the following purposes:</p>
      <ul>
        <li>To analyze traffic patterns and improve the performance of our website.</li>
        <li>To maintain the security and functionality of our services.</li>
        <li>To ensure the accuracy and relevance of the promo listings.</li>
      </ul>
      <p>We do not sell, rent, or trade your personal data.</p>

      <h2>3. Third-Party Services</h2>
      <p>We may use third-party services (e.g., analytics tools or advertising platforms) that collect data in accordance with their own privacy policies. These services may use cookies or similar tracking technologies.</p>

      <h2>4. Links to Other Websites</h2>
      <p>Our website contains links to external sites, particularly official promo pages of banks and credit card issuers. We are not responsible for the privacy practices or content of these third-party websites.</p>

      <h2>5. Your Rights and Choices</h2>
      <p>Since we do not collect personal information directly, there is generally no data for you to access, modify, or delete on our end. However, you can manage cookies and tracking preferences in your browser settings.</p>

      <h2>6. Data Security</h2>
      <p>While we do not collect personal data, we take reasonable steps to secure our site and protect it from unauthorized access or alteration.</p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>Our site is not directed at children under 13, and we do not knowingly collect any personal information from anyone under the age of 13.</p>

      <h2>8. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>

      <h2>9. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, feel free to contact us at:</p>
      <p>Email: <a href="mailto:creditcardpromosph@gmail.com">creditcardpromosph@gmail.com</a></p>
    </LegalPage>
  );
}
