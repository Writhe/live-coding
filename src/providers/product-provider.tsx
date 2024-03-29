import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { IProduct } from '../domain/types';
import { IProductsSource } from '../data-sources/product-source';
import { ITEMS_PER_PAGE } from '../config';

interface IProductContext {
  isLoading: boolean;
  products: IProduct[];

  getProducts(query: string): Promise<void>;
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
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async (query = '') => {
    setProducts([]);
    setIsLoading(true);

    const newProducts = await dataSource.getProducts(1, ITEMS_PER_PAGE, query);

    setProducts(newProducts);
    setIsLoading(false);
  };

  const saveDescription = async (productId: string, newDesc: string) => {
    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) throw new Error(`no such product - ${productId}`);

    const product = products[index];

    const newProduct: IProduct = { ...product, description: newDesc };

    setProducts((products) =>
      products.map((p, i) => (i === index ? newProduct : p))
    );

    await dataSource.storeProduct(newProduct);
  };

  const contextValue: IProductContext = {
    isLoading,
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
