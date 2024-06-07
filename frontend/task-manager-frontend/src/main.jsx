import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, Todo, TimeTable, Notification, Profile, Settings } from "./pages/index.js"

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "todo",
          element: <Todo />
        },
        {
          path: "timetable",
          element: <TimeTable />
        },
        {
          path: "notification",
          element: <Notification />
        },
        {
          path: "profile",
          element: <Profile />
        },
        {
          path: "settings",
          element: <Settings />
        }
      ]
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
