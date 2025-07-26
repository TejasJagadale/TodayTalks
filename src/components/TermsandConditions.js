import React from 'react';
import "../styles/TermsandConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-conditions">
      <div className="containertc">
        <h1>Terms and Conditions for TodayTalks</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the TodayTalks website, you agree to be bound by these Terms and Conditions. If you disagree, please do not use our website.</p>
        </section>
        
        <section>
          <h2>2. Intellectual Property</h2>
          <p>All content on this website, including articles, images, and logos, is the property of TodayTalks or its content suppliers and protected by copyright laws.</p>
        </section>
        
        <section>
          <h2>3. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the website for any unlawful purpose</li>
            <li>Post or transmit any harmful or offensive content</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the website's operation</li>
          </ul>
        </section>
        
        <section>
          <h2>4. User-Generated Content</h2>
          <p>If you post comments or other content, you grant TodayTalks a non-exclusive, royalty-free license to use, reproduce, and display such content.</p>
        </section>
        
        <section>
          <h2>5. Disclaimer of Warranties</h2>
          <p>The website is provided "as is." TodayTalks makes no warranties regarding the accuracy, completeness, or reliability of any content.</p>
        </section>
        
        <section>
          <h2>6. Limitation of Liability</h2>
          <p>TodayTalks shall not be liable for any damages resulting from your use of the website or any content therein.</p>
        </section>
        
        <section>
          <h2>7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Your continued use of the website constitutes acceptance of the modified terms.</p>
        </section>
        
        <section>
          <h2>8. Governing Law</h2>
          <p>These terms shall be governed by the laws of [Your Country/State] without regard to its conflict of law provisions.</p>
        </section>
        
        <section>
          <h2>9. Contact Information</h2>
          <p>For questions about these Terms and Conditions, please contact us at legal@todaytalks.com.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;