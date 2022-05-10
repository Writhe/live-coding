import {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BLANK_IMAGE, IMAGE_SIZE } from '../../config';
import { generateImageDataURL } from './generate-image';
import styles from './PixelGrid.module.scss';

export interface IPixelGridProps {
  data: string;
  className?: string;
}

export const PixelGrid: FC<IPixelGridProps> = ({ className, data }) => {
  // NOTE: Horrible version
  // const dataUrl = generateImageDataURL(data, QR_SIZE);

  // NOTE: Bad version
  // const dataUrl = useMemo(() => generateImageDataURL(data, QR_SIZE), [data]);

  // NOTE: Better version
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  useEffect(() => {
    setTimeout(() => setDataUrl(generateImageDataURL(data, IMAGE_SIZE)), 1);
  }, [data]);

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
