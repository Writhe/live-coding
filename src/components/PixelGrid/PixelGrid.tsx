import { FC } from 'react';

import { BLANK_IMAGE, IMAGE_SIZE } from '../../config';
import { generateImageDataURL } from './generate-image';
import styles from './PixelGrid.module.scss';

export interface IPixelGridProps {
  data: string;
  className?: string;
}

export const PixelGrid: FC<IPixelGridProps> = ({ className, data }) => {
  const dataUrl = generateImageDataURL(data, IMAGE_SIZE);

  return (
    <img
      alt=""
      className={styles.wrapper}
      width={IMAGE_SIZE}
      height={IMAGE_SIZE}
      src={dataUrl || BLANK_IMAGE}
    />
  );
};
