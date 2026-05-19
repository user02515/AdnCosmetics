
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { TiendaConfigProvider } from "./config/TiendaConfigContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TiendaConfigProvider>
        <App />
      </TiendaConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)

