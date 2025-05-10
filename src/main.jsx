import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createHashRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Cart from './components/Cart.jsx'
import AdminStartPage from './components/AdminStartPage.jsx';
import AdminConsole from './components/AdminConsole.jsx';

const router = createHashRouter(
  [
    {
      path: '/',
      Component: App,
      children: [
        {
          index: true,
          Component: Home
        },
        {
          path: '/pages/products/:productId?',
          Component: Products,
        },
        {
          path: '/components/cart/:cartId',
          Component: Cart,
        },
        {
          path: '/components/adminStartPage/',
          Component: AdminStartPage,
        },
        {
          path: '/components/adminConsole/',
          Component: AdminConsole,
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
