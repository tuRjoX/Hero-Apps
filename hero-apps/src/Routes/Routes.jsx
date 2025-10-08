import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root/Root.";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Apps from "../Pages/Apps/Apps";
import Installation from "../Pages/Installation/Installation";
import AppDetails from "../Pages/AppDetails/AppDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        loader: () => fetch("/appData.json"),
        path: "/",
        Component: Home,
      },
      {
        path: "/apps",
        loader: () => fetch("/appData.json"),
        Component: Apps,
      },
      {
        path: "/installation",
        Component: Installation,
      },
      {
        path: "/appDetails/:id",
        loader: () => fetch("/appData.json"),
        Component: AppDetails,
      },
    ],
  },
]);
