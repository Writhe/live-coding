import React from 'react';
import ReactDOM from 'react-dom/client';
import OldReactDOM from 'react-dom';

import { ProductSource } from './data-sources/product-source';
import { ProductProvider } from './providers/product-provider';
import { App } from './App';
import { API_ROOT } from './config';
import './index.css';

const productSource = new ProductSource(API_ROOT);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   // <React.StrictMode>
//   <ProductProvider dataSource={productSource}>
//     <App />
//   </ProductProvider>
//   // </React.StrictMode>
// );

OldReactDOM.render(
  <ProductProvider dataSource={productSource}>
    <App />
  </ProductProvider>,
  document.getElementById('root')
);
