import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import InformPerson from './inform_person';


const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/character/:id', element: <InformPerson/> }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>,
  
)
