import { ChangeEventHandler, FC, useState } from 'react';
import styles from './SearchBar.module.scss';

export interface ISearchBarProps {
  isLoading: boolean;
  onChange(newValue: string): void;
}

export const SearchBar: FC<ISearchBarProps> = ({ onChange, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newQuery = event.currentTarget.value;

    setQuery(newQuery);
    onChange(newQuery);
  };

  const handleClear = () => {
    setQuery('');
    onChange('');
  };

  const canClear = Boolean(query);

  return (
    <div className={styles.searchBar}>
      <input
        value={query}
        className={styles.input}
        type="text"
        onChange={handleChange}
        placeholder="Search"
      />
      {isLoading ? (
        <button className={styles.loadingButton} type="button" disabled>
          Loading...
        </button>
      ) : (
        <button
          className={styles.clearButton}
          type="button"
          disabled={!canClear}
          onClick={handleClear}
        >
          Clear search
        </button>
      )}
    </div>
  );
};
