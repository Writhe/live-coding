import { ProductList } from './components/ProductList/ProductList';
import { IProduct } from './domain/types';
import './global.scss';
import styles from './App.module.scss';
import { useProducts } from './providers/product-provider';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Spinner } from './components/Spinner/Spinner';

export const App = () => {
  const { products, isLoading, getProducts, saveDescription } = useProducts();

  useEffect(() => {
    getProducts('');
  }, []);

  return (
    <>
      <div className={styles.header}>
        <SearchBar onChange={getProducts} />
      </div>
      {isLoading ? (
        <div className={styles.spinnerOverlay}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.main}>
          <ProductList
            products={products}
            onDescriptionChanged={saveDescription}
          />
        </div>
      )}
    </>
  );
};
