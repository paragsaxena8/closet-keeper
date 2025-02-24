import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./app-routes";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={AppRoutes} />
    </ThemeProvider>
  );
}

export { App };
