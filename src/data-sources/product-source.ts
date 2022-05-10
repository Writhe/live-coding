import { IProduct } from '../domain/types';

export interface IProductsSource {
  getProducts(
    page: number,
    itemsPerPage: number,
    query: string
  ): Promise<IProduct[]>;
  storeProduct(product: IProduct): Promise<IProduct>;
}

export interface IRawProduct {
  product_id: string;
  name: string;
  desc: string;
}

export interface IRawProductList {
  products: IRawProduct[];
}

export type Mapper<T1, T2> = (input: T1) => T2;

const mapRawProduct: Mapper<IRawProduct, IProduct> = ({
  desc,
  name,
  product_id,
}) => ({
  description: desc,
  id: product_id,
  name,
});

const mapProduct: Mapper<IProduct, IRawProduct> = ({
  description,
  id,
  name,
}) => ({
  desc: description,
  name,
  product_id: id,
});

const commonFetchOptions: RequestInit = {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};

export class ProductSource implements IProductsSource {
  constructor(private readonly apiRoot: string) {}

  async getProducts(
    page: number,
    itemsPerPage: number,
    query: string
  ): Promise<IProduct[]> {
    const response = await fetch(
      `${this.apiRoot}/products?p=${page}&perPage=${itemsPerPage}&q=${query}`,
      commonFetchOptions
    );
    const rawData: IRawProductList = await response.json();

    return rawData.products.map(mapRawProduct);
  }

  async storeProduct(product: IProduct): Promise<IProduct> {
    const response = await fetch(`${this.apiRoot}/products`, {
      ...commonFetchOptions,
      method: 'PUT',
      body: JSON.stringify(mapProduct(product)),
    });
    const rawData: IRawProduct = await response.json();

    return mapRawProduct(rawData);
  }
}
