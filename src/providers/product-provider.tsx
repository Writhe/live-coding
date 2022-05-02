import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { ITEMS_PER_PAGE } from '../config';
import { IProductsSource } from '../data-sources/products';
import { IProduct } from '../domain/types';

interface IProductContext {
  products: IProduct[];
  getProducts(): Promise<void>;
  saveDescription(productId: string, newDesc: string): Promise<void>;
}

const ProductContext = createContext<IProductContext>({} as IProductContext);

interface IProductProviderProps {
  dataSource: IProductsSource;
}

export const ProductProvider = ({
  dataSource,
  children,
}: PropsWithChildren<IProductProviderProps>) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    const products = await dataSource.getProducts(1, ITEMS_PER_PAGE, '');
    setProducts(products);
  };

  const saveDescription = async (productId: string, newDesc: string) => {
    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) throw new Error(`no such product - ${productId}`);

    const product = products[index];

    const newProduct: IProduct = { ...product, description: newDesc };

    setProducts((p) => {
      const newValue = [...p];
      newValue[index] = newProduct;
      return newValue;
    });

    await dataSource.storeProduct(newProduct);
  };

  const contextValue: IProductContext = {
    products,
    getProducts,
    saveDescription,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
