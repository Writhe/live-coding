import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { ITEMS_PER_PAGE } from '../config';
import { IProductsSource } from '../data-sources/product-source';
import { IProduct } from '../domain/types';

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

interface IProductProviderState {
  products: IProduct[];
  isLoading: boolean;
}

export const ProductProvider = ({
  dataSource,
  children,
}: PropsWithChildren<IProductProviderProps>) => {
  const [state, setState] = useState<IProductProviderState>({
    products: [],
    isLoading: false,
  });

  const getProducts = async (query = '') => {
    setState({ products: [], isLoading: true });
    const products = await dataSource.getProducts(1, ITEMS_PER_PAGE, query);
    setState({ products, isLoading: false });
  };

  const saveDescription = async (productId: string, newDesc: string) => {
    const index = state.products.findIndex((p) => p.id === productId);
    if (index === -1) throw new Error(`no such product - ${productId}`);

    const product = state.products[index];

    const newProduct: IProduct = { ...product, description: newDesc };

    setState((state) => ({
      ...state,
      products: state.products.map((p, i) => (i === index ? newProduct : p)),
    }));

    await dataSource.storeProduct(newProduct);
  };

  const contextValue: IProductContext = {
    isLoading: state.isLoading,
    products: state.products,
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
