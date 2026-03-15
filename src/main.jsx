import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./index.css"; 

// Fix for external browser extension error: "TypeError: can't access property 'then', localStorage.setItem(...) is undefined"
// This monkey-patches setItem to return a Promise, satisfying the buggy extension.
// Only apply in development to avoid security risks in production
if (import.meta.env.DEV) {
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    originalSetItem.call(localStorage, key, value);
    return Promise.resolve();
  };
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
