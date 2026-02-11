import React from "react";
import "./BottomActionsBar.scss";

function BottomActionsBar({ onBenefitsClick, onBookMeetingClick }) {
  return (
    <div className="bottom-actions">
      <div className="bottom-actions-inner">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onBenefitsClick}
        >
          Jakie są korzyści?
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onBookMeetingClick}
        >
          Umów darmowe spotkanie
        </button>
      </div>
    </div>
  );
}

export default BottomActionsBar;


