import React from "react";
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import "./i18n";
import "./styles.css";

export function mountPage(page: React.ReactElement) {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Missing #root element for marketing site entry.");
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>{page}</React.StrictMode>
  );
}
