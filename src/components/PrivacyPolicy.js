import React from 'react';
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="containerpp">
        <h1>Privacy Policy for TodayTalks</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2>1. Introduction</h2>
          <p>Welcome to TodayTalks ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our news website.</p>
        </section>
        
        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address, etc., when you register or subscribe.</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent, referring website.</li>
            <li><strong>Cookies:</strong> We use cookies to enhance your experience.</li>
          </ul>
        </section>
        
        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our service</li>
            <li>Notify you about changes to our service</li>
            <li>Allow you to participate in interactive features</li>
            <li>Provide customer support</li>
            <li>Gather analysis to improve our website</li>
          </ul>
        </section>
        
        <section>
          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>
        
        <section>
          <h2>5. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We have no control over and assume no responsibility for their privacy policies.</p>
        </section>
        
        <section>
          <h2>6. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        </section>
        
        <section>
          <h2>7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@todaytalks.com.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;