import { ChangeEventHandler, FC } from 'react';
import styles from './SearchBar.module.scss';

export interface ISearchBarProps {
  onChange(newValue: string): void;
}

export const SearchBar: FC<ISearchBarProps> = ({ onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.value);
  };

  return <input className={styles.input} type="text" onChange={handleChange} />;
};
