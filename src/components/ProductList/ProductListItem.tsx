import { ChangeEventHandler } from 'react';

import { IProduct } from '../../domain/types';
import { PixelGrid } from '../PixelGrid/PixelGrid';
import styles from './ProductListItem.module.scss';

export interface IProductListItemProps {
  product: IProduct;
  onClick(item: IProduct): void;
  onDescriptionChanged(productId: string, newDesc: string): void;
}

export const ProductListItem = ({
  onClick,
  product,
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
      <PixelGrid
        className={styles.image}
        data={product.description + product.id}
      />
    </div>
  );
};
