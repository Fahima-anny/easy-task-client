import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Components/Navbar/Authentications/AuthProvider.jsx';
import Login from './Components/Login/Login.jsx';
import PrivateRoute from './Components/Navbar/Authentications/PrivateRoute.jsx';
import Main from './Components/Main/Main.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>  ,
    children: [
    {
      path: "/",
      element: <PrivateRoute><App></App></PrivateRoute>
    },
    {
      path: "/login",
      element: <Login></Login>
    }
    ]

  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
