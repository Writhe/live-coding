import React from 'react';
import ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';

import { ProductSource } from './data-sources/product-source';
import { ProductProvider } from './providers/product-provider';
import { App } from './App';
import { API_ROOT } from './config';
import './index.css';

const productSource = new ProductSource(API_ROOT);

const rootElement = document.getElementById('root');

// ReactDOMClient.createRoot(rootElement!).render(
//   <ProductProvider dataSource={productSource}>
//     <App />
//   </ProductProvider>
// );

ReactDOM.render(
  <ProductProvider dataSource={productSource}>
    <App />
  </ProductProvider>,
  rootElement
);
