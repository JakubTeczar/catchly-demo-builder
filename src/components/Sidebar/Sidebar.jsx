import React from "react";
import "./Sidebar.scss";

function Sidebar({
  isOpen,
  currentDemo,
  demos,
  onSelectDemo,
  companyName,
  sidebarMessage,
}) {
  return (
    <aside className={"sidebar" + (isOpen ? " active" : "")}>
      <div className="sidebar-content">
        <header className="sidebar-header">
          <h1>Demo dla {companyName}</h1>
        </header>

        <div className="sidebar-body">
          <p className="description">{sidebarMessage}</p>

          <div className="demo-buttons">
            {demos.map((demo) => (
              <button
                key={demo.id}
                type="button"
                className={
                  "btn btn-demo" +
                  (currentDemo === demo.id ? " active" : "")
                }
                onClick={() => onSelectDemo(demo.id)}
              >
                {demo.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

