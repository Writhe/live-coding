import { ProductList } from './components/ProductList/ProductList';
import { IProduct } from './domain/types';
import './global.scss';
import styles from './App.module.scss';
import { useProducts } from './providers/product-provider';
import { useEffect } from 'react';

function App() {
  const { products, getProducts, saveDescription } = useProducts();
  useEffect(() => {
    getProducts();
  }, []);

  const handleProductClick = ({ id, name }: IProduct) => {
    console.log(`Product clicked - ${name} (${id})`);
  };

  return (
    <main className={styles.main}>
      <ProductList
        products={products}
        onClick={handleProductClick}
        onDescriptionChanged={saveDescription}
      />
    </main>
  );
}

export default App;
