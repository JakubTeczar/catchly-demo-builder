import React from "react";
import "./Overlay.scss";

function Overlay({ isVisible, onClick }) {
  return (
    <div
      className={"overlay" + (isVisible ? " active" : "")}
      onClick={onClick}
    />
  );
}

export default Overlay;


