import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Page from "./app/dashboard/page.tsx";
import LoginPage from "./app/auth/page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App children={<Page />} />
  </StrictMode>
);
