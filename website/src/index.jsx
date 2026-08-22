import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import { ContextProvider } from "./components/context/context-provider.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
