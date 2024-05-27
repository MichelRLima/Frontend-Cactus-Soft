import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Clients from './routes/Clients.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import Concentrador from './routes/Concentrador.jsx'
import Plano from './routes/Plano.jsx'
import MetricasFinanceiras from './components/MetricasFinanceiras/MetricasFinanceiras.jsx'
import { ClientProvider } from './context/ClientsContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Clients />
      }
    ]
  },
  {
    path: "/clients",
    element: <App />,
    children: [
      {
        path: "/clients",
        element: <Clients />
      }
    ]
  }, {
    path: "/planos",
    element: <App />,
    children: [
      {
        path: "/planos",
        element: <Plano />
      }
    ]
  },
  {
    path: "/concentrador",
    element: <App />,
    children: [
      {
        path: "/concentrador",
        element: <Concentrador />
      }
    ]
  },
  {
    path: "/metricas",
    element: <App />,
    children: [
      {
        path: "/metricas",
        element: <MetricasFinanceiras />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClientProvider >
      <RouterProvider router={router} />
    </ClientProvider>
  </React.StrictMode>,
)
