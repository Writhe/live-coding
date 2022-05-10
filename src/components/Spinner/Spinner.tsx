import { FC } from 'react';
import styles from './Spinner.module.scss';

export const Spinner: FC<{ className?: string }> = ({ className }) => (
  <div className={[styles.spinner, className].filter(Boolean).join(' ')}>
    <div />
    <div />
    <div />
  </div>
);
