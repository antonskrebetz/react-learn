import { useAppDispatch } from '../../../../store/store';
import { searchCourses } from '../../../../store/courses/coursesSlice';
import { Input } from '../../../../common/Input/Input';
import { Button } from '../../../../common/Button/Button';
import styles from './SearchBar.module.css';
import { Dispatch, SetStateAction, useState } from 'react';

interface ISearchBar {
	setShowSearchCourses: Dispatch<SetStateAction<boolean>>;
}

export const SearchBar = ({ setShowSearchCourses }: ISearchBar) => {
	const dispatch = useAppDispatch();

	const [search, setSearch] = useState('');

	const handleSearchInput = (value: string) => {
		setSearch(value);
	};
	console.log(search);

	const onSearchClick = () => {
		dispatch(searchCourses(search));
		setShowSearchCourses(true);
	};

	return (
		<div className={styles.searchBar}>
			<Input
				addClass={styles.input}
				id={'search'}
				placeholderText='Enter course name ...'
				value={search}
				onChange={handleSearchInput}
				searchInput
			/>
			<Button buttonText='Search' onClick={() => onSearchClick()} />
		</div>
	);
};
