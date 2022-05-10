import { ChangeEventHandler } from 'react';
import { IProduct } from '../../domain/types';
import { PixelGrid } from '../PixelGrid/PixelGrid';
import styles from './ProductListItem.module.scss';

export interface IProductListItemProps {
  product: IProduct;
  onDescriptionChanged(productId: string, newDesc: string): void;
}

export const ProductListItem = ({
  product,
  onDescriptionChanged,
}: IProductListItemProps) => {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (ev) => {
    onDescriptionChanged(product.id, ev.currentTarget.value);
  };

  return (
    <div className={styles.productListItem}>
      <span>{product.name}</span>
      <textarea
        onChange={handleChange}
        className={styles.description}
        value={product.description}
      />
      <PixelGrid
        className={styles.image}
        data={product.description + product.id}
      />
    </div>
  );
};
