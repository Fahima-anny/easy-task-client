import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Components/Navbar/Authentications/AuthProvider.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <RouterProvider router={router} />
       </AuthProvider>
  </StrictMode>,
)
