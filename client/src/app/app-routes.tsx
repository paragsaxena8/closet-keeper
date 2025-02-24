import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Dashboard } from "@app/pages/dashboard";
import { Wardrobe } from "./pages/wardobe";
import { Layout } from "./pages/layout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "wardrobe",
        element: <Wardrobe />,
      },
    ],
  },
];

export const AppRoutes = createBrowserRouter(routes);
