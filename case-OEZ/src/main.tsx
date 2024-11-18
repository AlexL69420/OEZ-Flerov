import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Help from "./pages/Help.tsx";
import History from "./pages/History.tsx";
import RegistrationForm from "./pages/RegistrationForm.tsx";
import Profile from "./pages/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/Help",
    element: <Help />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/History",
    element: <History />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/Registration",
    element: <RegistrationForm />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/Profile",
    element: <Profile />,
    errorElement: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
