import { ProductList } from './components/ProductList/ProductList';
import { IProduct } from './domain/types';
import './global.scss';
import styles from './App.module.scss';
import { useProducts } from './providers/product-provider';
import { ChangeEventHandler, useEffect } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Spinner } from './components/Spinner/Spinner';

function App() {
  const { products, isLoading, getProducts, saveDescription } = useProducts();
  useEffect(() => {
    getProducts('');
  }, []);

  const handleProductClick = ({ id, name }: IProduct) => {
    console.log(`Product clicked - ${name} (${id})`);
  };

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
            onClick={handleProductClick}
            onDescriptionChanged={saveDescription}
          />
        </div>
      )}
    </>
  );
}

export default App;
