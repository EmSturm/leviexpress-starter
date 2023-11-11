import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { App } from "./components/App";
import "./global.css";
import { JourneyPicker } from "./components/JourneyPicker";
import { HomePage } from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    
    ]
  },
]);

createRoot(document.querySelector("#app")).render(
  <RouterProvider router={router} />
);

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//     {
//       path: 'about',
//       element: <About />,
//     },
//     {
//       path: 'contact',
//       element: <Contact />,
//     },

//     ]
//   },

// ]);

// createRoot(document.querySelector('#app')).render(
//   <RouterProvider router={router} />
// );
