import React from 'react';

const TermsOfUsePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
      <div className="prose prose-slate max-w-none">
        <p>Last updated: May 5, 2025</p>

        <div className="mt-10">
          <h2 className="font-bold">1. Agreement to Terms</h2>
          <p>
            By accessing and using CreditCardPromos.ph, you agree to be bound by these Terms of Use and all applicable laws and regulations. 
            If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">2. Use License</h2>
          <p>
            Permission is granted to temporarily access the materials (information or software) on CreditCardPromos.ph for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on CreditCardPromos.ph</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">3. Disclaimer</h2>
          <p>
            The materials on CreditCardPromos.ph are provided on an 'as is' basis. CreditCardPromos.ph makes no warranties, 
            expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, 
            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">4. Limitations</h2>
          <p>
            In no event shall CreditCardPromos.ph or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CreditCardPromos.ph.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">5. Accuracy of Materials</h2>
          <p>
            The materials appearing on CreditCardPromos.ph could include technical, typographical, or photographic errors. 
            CreditCardPromos.ph does not warrant that any of the materials on its website are accurate, complete or current. 
            CreditCardPromos.ph may make changes to the materials contained on its website at any time without notice.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">6. Links</h2>
          <p>
            CreditCardPromos.ph has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. 
            The inclusion of any link does not imply endorsement by CreditCardPromos.ph of the site. Use of any such linked website is at the user's own risk.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">7. Modifications</h2>
          <p>
            CreditCardPromos.ph may revise these terms of service for its website at any time without notice. By using this website, 
            you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the Philippines and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-bold">9. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Use, please contact us at:
            <br />
            Email: terms@creditcardpromos.ph
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
