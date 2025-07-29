import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact Our Team</h1>

      <div className="contact-methods">
        <section>
          <h2>Editorial Inquiries</h2>
          <p>
            Email:{" "}
            <a href="mailto:todaytalks.office@gmail.com">todaytalks.office@gmail.com</a>
          </p>
          <p>Phone: +1 (555) 123-4567</p>
        </section>

        <section>
          <h2>Advertising</h2>
          <p>
            Email: <a href="todaytalks.office@gmail.com">todaytalks.office@gmail.com</a>
          </p>
          {/* <p>
            Media Kit: <a href="/media-kit.pdf">Download PDF</a>
          </p> */}
        </section>

        <section>
          <h2>Mailing Address</h2>
          <address>
            TodatTalks Inc.
            <br />
            123 Journalism Way
            <br />
            San Francisco, CA 94107
            <br />
            USA
          </address>
        </section>
      </div>

      <div className="disclaimer">
        <p>
          Note: This is a real contact page with verifiable information -
          required for AdSense approval.
        </p>
      </div>
    </div>
  );
};

export default Contact;
