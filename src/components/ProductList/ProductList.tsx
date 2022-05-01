import { IProduct } from '../../domain/types';
import { ProductListItem, ProductListItemStatus } from './ProductListItem';
import styles from './ProductList.module.scss';

export interface IProductListProps {
  products: IProduct[];
  onClick(product: IProduct): void;
  onDescriptionChanged(productId: string, newDesc: string): void;
}

export const ProductList = ({
  products,
  onClick,
  onDescriptionChanged,
}: IProductListProps) => {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          status={ProductListItemStatus.IDLE}
          product={product}
          onClick={onClick}
          onDescriptionChanged={onDescriptionChanged}
        />
      ))}
    </div>
  );
};
