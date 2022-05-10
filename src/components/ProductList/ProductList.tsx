import { IProduct } from '../../domain/types';
import { ProductListItem } from './ProductListItem';
import styles from './ProductList.module.scss';

export interface IProductListProps {
  products: IProduct[];
  onDescriptionChanged(productId: string, newDesc: string): void;
}

export const ProductList = ({
  products,
  onDescriptionChanged,
}: IProductListProps) => {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          onDescriptionChanged={onDescriptionChanged}
        />
      ))}
    </div>
  );
};
