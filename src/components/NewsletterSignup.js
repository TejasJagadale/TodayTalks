import React, { useState } from "react";
import "./NewsletterSignup.css";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log("Subscribed with:", email);
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="newsletter-signup">
      <h3>Stay Updated</h3>
      {subscribed ? (
        <div className="success-message">
          <p>Thank you for subscribing!</p>
          <button onClick={() => setSubscribed(false)}>Subscribe Again</button>
        </div>
      ) : (
        <>
          <p>Get the latest news delivered to your inbox</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          <p className="privacy-note">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default NewsletterSignup;