import React from 'react';
import "../styles/AboutUs.css";

const AboutUs = () => (
  <div className="about-page">
    <h1>About Today Talks</h1>
    <div className="about-content">
      <section>
        <h2>Our Mission</h2>
        <p>Today Talks is your premier destination for daily news updates across all key sectors. We deliver accurate, timely news coverage in Technology, Business, Health, Education, and compelling Stories that matter. Our team brings you the latest Information and Updates to keep you informed in this fast-paced world.</p>
      </section>

      <section>
        <h2>Our Content</h2>
        <p>At Today Talks, we cover a wide range of topics to satisfy every reader:</p>
        <ul>
          <li><strong>Technology:</strong> Latest tech innovations and digital trends</li>
          <li><strong>Business:</strong> Market updates and financial insights</li>
          <li><strong>Health:</strong> Medical breakthroughs and wellness tips</li>
          <li><strong>Education:</strong> Learning trends and academic news</li>
          <li><strong>Stories:</strong> Human interest pieces and in-depth features</li>
        </ul>
      </section>

      <section>
        <h2>Advertising with Us</h2>
        <p>Today Talks partners with Google AdSense to deliver relevant, high-quality advertisements to our readers. Our advertising policy ensures:</p>
        <ul>
          <li>Ads are clearly marked and separated from editorial content</li>
          <li>We maintain strict standards for ad content quality</li>
          <li>Advertising never influences our news coverage</li>
          <li>We comply with all Google AdSense program policies</li>
        </ul>
        <p>For advertising inquiries or to report an ad issue, please contact our support team.</p>
      </section>

      {/* <section className="team">
        <h2>Our Team</h2>
        <div className="team-member">
          <h3>John Smith</h3>
          <p>Editor-in-Chief (Former Tech Editor at The Verge)</p>
        </div>
        <div className="team-member">
          <h3>Maria Garcia</h3>
          <p>Health Editor (PhD in Medical Journalism)</p>
        </div>
      </section> */}

      <section>
        <h2>Commitment to Quality</h2>
        <p>Every article on Today Talks undergoes rigorous editorial review including fact-checking, source verification, and bias review to ensure we deliver only the most reliable news to our readers.</p>
      </section>
    </div>
  </div>
);

export default AboutUs;