import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, Todo, TimeTable, Notification, Profile, Settings, Tags, Labels } from "./pages/index.js"
import { store } from "./redux/store.js"
import { Provider } from "react-redux"

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
        },
        {
          path: "tags",
          element: <Tags />
        },
        {
          path: "labels",
          element: <Labels />
        }
      ]
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
