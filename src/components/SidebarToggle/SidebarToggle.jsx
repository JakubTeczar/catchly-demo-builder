import React from "react";
import "./SidebarToggle.scss";

function SidebarToggle({ isOpen, onToggle }) {
  return (
    <button
      className={"sidebar-toggle" + (isOpen ? " active" : "")}
      aria-label="Przełącz panel"
      onClick={onToggle}
    >
      <svg
        className="toggle-icon"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="icon-arrow"
          d="M12 15L7 10L12 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default SidebarToggle;


