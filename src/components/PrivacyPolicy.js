import React from "react";
import "../styles/PrivacyPolicy.css";
import { te } from "date-fns/locale";

const PrivacyPolicy = () => (
  <div className="privacy-policy">
    <h1>Privacy Policy</h1>
    <p>Last Updated: {new Date().toLocaleDateString()}</p>
    <section>
      <h2>Information We Collect</h2>
      <p>We may collect personal information including but not limited to:</p>
      <ul>
        <li>Email addresses for newsletter subscriptions</li>
        <li>Anonymous usage data via Google Analytics</li>
        <li>Cookies to personalize content and ads</li>
      </ul>
    </section>
    <section>
      <h2>How We Use Information</h2>
      <p>All data collection serves to:</p>
      <ol>
        <li>Improve user experience</li>
        <li>Display relevant advertisements</li>
        <li>Analyze site performance</li>
      </ol>
    </section>
    <section>
      <h2>Third-Party Services</h2>
      <p>
        We use Google AdSense to serve ads, which uses cookies to personalize
        content. Users may opt out through Google's{" "}
        <a
          style={{ color: "blue", textDecoration: "underline" }}
          href="https://adssettings.google.com"
        >
          Ad Settings
        </a>
        .
      </p>
    </section>
    {/* <p>
      For GDPR compliance, contact us at privacy@yourdomain.com to request data
      access or deletion.
    </p> */}
  </div>
);

export default PrivacyPolicy;
