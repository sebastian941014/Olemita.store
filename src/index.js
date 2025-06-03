import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import { CartProvider } from "./components/CartContext"; // ✅ IMPORTA CartProvider

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <CartProvider> {/* ✅ ENVUELVE App aquí */}
      <App />
    </CartProvider>
  </StrictMode>
);
