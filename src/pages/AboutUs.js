import React from 'react';
import "../styles/AboutUs.css";

const AboutUs = () => (
  <div className="about-page">
    <h1>About NewsHub</h1>
    <div className="about-content">
      <section>
        <h2>Our Mission</h2>
        <p>Founded in 2023, NewsHub delivers accurate, timely news across technology, business, health and more. Our team of 15 journalists and editors are committed to fact-checked reporting.</p>
      </section>

      <section>
        <h2>Editorial Standards</h2>
        <p>Every article undergoes:</p>
        <ul>
          <li>Fact-checking by at least two editors</li>
          <li>Source verification</li>
          <li>Bias review process</li>
        </ul>
      </section>

      <section className="team">
        <h2>Leadership Team</h2>
        <div className="team-member">
          <h3>John Smith</h3>
          <p>Editor-in-Chief (Former Tech Editor at The Verge)</p>
        </div>
        <div className="team-member">
          <h3>Maria Garcia</h3>
          <p>Health Editor (PhD in Medical Journalism)</p>
        </div>
      </section>
    </div>
  </div>
);

export default AboutUs;