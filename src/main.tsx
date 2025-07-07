import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SwiftContextProvider } from "./context/SwiftContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SwiftContextProvider>
        <App />
      </SwiftContextProvider>
    </BrowserRouter>
  </StrictMode>
);
