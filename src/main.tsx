import React from 'react';
import ReactDOM from 'react-dom/client';

import { ProductsSource } from './data-sources/products';
import { ProductProvider } from './providers/product-provider';
import App from './App';
import { API_ROOT } from './config';
import './index.css';

const productSource = new ProductsSource(API_ROOT);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductProvider dataSource={productSource}>
      <App />
    </ProductProvider>
  </React.StrictMode>
);
