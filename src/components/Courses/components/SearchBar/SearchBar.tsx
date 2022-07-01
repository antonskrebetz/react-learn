import { Input } from '../../../../common/Input/Input';
import { Button } from '../../../../common/Button/Button';
import styles from './SearchBar.module.css';

interface ISearchBar {
	onChange: (value: string) => void;
	onClick: () => void;
	value: string;
}

export const SearchBar = ({ onChange, onClick, value }: ISearchBar) => {
	return (
		<div className={styles.searchBar}>
			<Input
				addClass={styles.input}
				id={'search'}
				placeholderText='Enter course name ...'
				value={value}
				onChange={onChange}
				searchInput
			/>
			<Button buttonText='Search' onClick={onClick} />
		</div>
	);
};
