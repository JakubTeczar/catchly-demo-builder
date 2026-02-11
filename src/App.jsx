import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DemoPage from "./pages/DemoPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/:companySlug" element={<DemoPage />} />
      <Route path="/__admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/xyz-company" replace />} />
    </Routes>
  );
}

export default App;
