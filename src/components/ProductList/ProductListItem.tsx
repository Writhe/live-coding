import { ChangeEventHandler } from 'react';
import { IProduct } from '../../domain/types';
import { Barcode } from './Barcode';
import styles from './ProductListItem.module.scss';

export enum ProductListItemStatus {
  IDLE,
  BUSY,
}

export interface IProductListItemProps {
  status: ProductListItemStatus;
  product: IProduct;
  onClick(item: IProduct): void;
  onDescriptionChanged(productId: string, newDesc: string): void;
}

export const ProductListItem = ({
  onClick,
  product,
  status,
  onDescriptionChanged,
}: IProductListItemProps) => {
  const handleClick = () => {
    onClick(product);
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (ev) => {
    onDescriptionChanged(product.id, ev.currentTarget.value);
  };

  return (
    <div className={styles.productListItem} onClick={handleClick}>
      <span>{product.name}</span>
      <textarea
        onChange={handleChange}
        className={styles.description}
        value={product.description}
      />
      <Barcode
        className={styles.barcode}
        data={product.description + product.id}
      />
    </div>
  );
};
