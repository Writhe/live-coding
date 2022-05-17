import { useEffect } from 'react';

import { ProductList } from './components/ProductList/ProductList';
import { IProduct } from './domain/types';
import { useProducts } from './providers/product-provider';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Spinner } from './components/Spinner/Spinner';
import styles from './App.module.scss';
import './global.scss';

export const App = () => {
  const { products, isLoading, getProducts, saveDescription } = useProducts();

  useEffect(() => {
    getProducts('');
  }, []);

  const handleProductClick = (product: IProduct) => {
    alert(`Product clicked: ${product.name}`);
  };

  return (
    <>
      <div className={styles.header}>
        <SearchBar onChange={getProducts} isLoading={isLoading} />
      </div>
      {isLoading ? (
        <div className={styles.spinnerOverlay}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.main}>
          <ProductList
            onClick={handleProductClick}
            products={products}
            onDescriptionChanged={saveDescription}
          />
        </div>
      )}
    </>
  );
};
