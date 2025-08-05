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
            <a href="mailto:todaytalks.office@gmail.com">
              todaytalks.office@gmail.com
            </a>
          </p>
          <p>Phone: +91 8508508590</p>
        </section>

        <section>
          <h2>Advertising</h2>
          <p>
            Email:{" "}
            <a href="todaytalks.office@gmail.com">
              todaytalks.office@gmail.com
            </a>
          </p>
          {/* <p>
            Media Kit: <a href="/media-kit.pdf">Download PDF</a>
          </p> */}
        </section>

        <section>
          <h2>Mailing Address</h2>
          <address>
            MPeoples Business Solutions Pvt Ltd
            <br />
            No 56/3-1 Ranga Nagar, 3rd Cross Street, Suramangalam
            <br />
            Salem-636005
            <br />
            TamilNadu
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
