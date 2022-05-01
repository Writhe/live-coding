import { FC, useMemo } from 'react';
import { QR_SIZE } from '../../config';
import { createQrCode } from '../../utils/create-qr-code';

export interface IBarcodeProps {
  data: string;
  className?: string;
}

export const Barcode: FC<IBarcodeProps> = ({ className, data }) => {
  // const qrCode = useMemo(() => createQrCode(data, QR_SIZE), [data]);
  const qrCode = createQrCode(data, QR_SIZE);
  return (
    <img className={className} width={QR_SIZE} height={QR_SIZE} src={qrCode} />
  );
};
