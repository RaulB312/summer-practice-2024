import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeScript } from '@chakra-ui/react';
import theme from '../theme.js'
import Movies from './pages/Movies/Movies.jsx'
import Shows from './pages/Shows/Shows.jsx'
import Search from './pages/Search/Search.jsx'
import Home from './pages/Home.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import { AuthProvider } from './context/authProvider.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/shows",
        element: <Shows />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/:type/:id",
        element: <DetailsPage />,
      }

    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme = {theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
