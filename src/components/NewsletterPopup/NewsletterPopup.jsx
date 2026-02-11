import React from "react";
import "./NewsletterPopup.scss";

function NewsletterPopup({ visible, onClose, onSubmit, config }) {
  if (!config) return null;

  return (
    <div className={"newsletter-popup" + (visible ? " active" : "")}>
      <div className="newsletter-content">
        <button
          type="button"
          className="newsletter-close"
          aria-label="Zamknij"
          onClick={onClose}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="newsletter-header">
          <h2 className="newsletter-title">{config.title}</h2>
          <p className="newsletter-subtitle">{config.subtitle}</p>
        </div>

        <div className="bestseller-list">
          {config.products?.map((item) => (
            <div key={item.id} className="bestseller-item">
              <div className="bestseller-image">
                <div
                  className="bestseller-placeholder"
                  style={{ background: item.background }}
                />
              </div>
              <div className="bestseller-info">
                <div className="bestseller-main">
                  <p className="bestseller-name">{item.name}</p>
                  <p className="bestseller-price">{item.price}</p>
                </div>
                <button type="button" className="bestseller-cta">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <form className="newsletter-form" onSubmit={onSubmit}>
          <div className="form-field">
            <input
              name="email"
              type="email"
              className="newsletter-input"
              placeholder="Wpisz swój e-mail"
              required
            />
          </div>
          <button type="submit" className="newsletter-submit">
            Zapisz się do newslettera
          </button>
        </form>

        {config.note && (
          <p className="newsletter-note">{config.note}</p>
        )}
      </div>
    </div>
  );
}

export default NewsletterPopup;


