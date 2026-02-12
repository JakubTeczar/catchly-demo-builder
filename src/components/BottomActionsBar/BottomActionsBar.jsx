import React from "react";
import "./BottomActionsBar.scss";

function BottomActionsBar({ onBenefitsClick, onBookMeetingClick }) {
  return (
    <div className="bottom-actions">
      <div className="bottom-actions-inner">
        <button
          type="button"
          className="btn visit-website-btn"
          onClick={onBenefitsClick}
        >
          Sprawdź naszą stronę
        </button>
        <button
          type="button"
          className="btn meeting-btn"
          onClick={onBookMeetingClick}
        >
          Umów spotkanie
        </button>
      </div>
    </div>
  );
}

export default BottomActionsBar;



