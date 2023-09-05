import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Order from './order/Order';
import Orders from './orders/Orders';
import Product from './product/Product';
const Products = lazy(() => import('./products/Products'));

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/e-commerce/products',
      element: <Products />,
    },
    {
      path: 'apps/e-commerce/products/:productId/*',
      element: <Product />,
    },
    {
      path: 'apps/e-commerce/orders',
      element: <Orders />,
    },
    {
      path: 'apps/e-commerce/orders/:orderId',
      element: <Order />,
    },
    {
      path: 'apps/e-commerce',
      element: <Navigate to="products" />,
    },
  ],
};

export default ECommerceAppConfig;
