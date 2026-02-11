import React, { useEffect, useState } from "react";
import "./LimitedOfferPopup.scss";

function useCountdown(initialSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, [secondsLeft]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return { hours, minutes, seconds };
}

function LimitedOfferPopup({ visible, onClose, config }) {
  if (!config) return null;

  const durationSeconds = (config.durationHours || 48) * 60 * 60;
  const { hours, minutes, seconds } = useCountdown(durationSeconds);

  return (
    <div className={"limited-popup" + (visible ? " active" : "")}>
      <div className="limited-popup-content">
        <button
          type="button"
          className="limited-close"
          aria-label="Zamknij"
          onClick={onClose}
        >
          ×
        </button>

        {config.brand && (
          <p className="popup-brand">{config.brand}</p>
        )}

        <h2 className="limited-title">
          {config.titleLine1}
          <br />
          {config.titleLine2}
        </h2>

        <p className="limited-subtitle">{config.subtitle}</p>

        <div className="limited-countdown">
          <div className="time-box">
            <span className="time-value">
              {String(hours).padStart(2, "0")}
            </span>
            <span className="time-label">GODZIN</span>
          </div>
          <div className="time-box">
            <span className="time-value">
              {String(minutes).padStart(2, "0")}
            </span>
            <span className="time-label">MINUT</span>
          </div>
          <div className="time-box">
            <span className="time-value">
              {String(seconds).padStart(2, "0")}
            </span>
            <span className="time-label">SEKUND</span>
          </div>
        </div>

        <button type="button" className="limited-cta">
          {config.ctaLabel}
        </button>
      </div>
    </div>
  );
}

export default LimitedOfferPopup;


