import { Header } from './components/Header/Header';
import { SearchBar } from './components/Courses/components/SearchBar/SearchBar';
import { Courses } from './components/Courses/Courses';
import styles from './App.module.css';
import { Button } from './common/Button/Button';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { useMemo, useState } from 'react';
import { mockedAuthorsList, mockedCoursesList, ICourse } from './mockData';
import { v4 as uuidv4 } from 'uuid';

function App() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [search, setSearch] = useState('');
	const [isCourses, setIsCourses] = useState(true);
	const [showSearchCourses, setShowSearchCourses] = useState(false);

	const onClickAddNewCourse = () => {
		setIsCourses(false);
	};

	const handleSearchInput = (value: string) => {
		if (search === '') {
			setShowSearchCourses(false);
		}
		setSearch(value);
	};

	const handleClickSearchButton = () => {
		setShowSearchCourses(true);
	};

	const handleAddAuthor = (name: string) => {
		if (name.length < 2) {
			return name;
		}
		setAuthors([
			...authors,
			{
				name,
				id: uuidv4(),
			},
		]);
	};

	const handleAddNewCourse = (course: ICourse) => {
		if (
			course.title.length < 2 ||
			course.description.length < 2 ||
			course.duration === '' ||
			course.duration === 0 ||
			course.authors.length < 1
		) {
			alert('Please, fill in all fields');
		} else {
			setCourses([...courses, course]);
			setIsCourses(true);
		}
	};

	const filterCourses = useMemo(
		() =>
			courses.filter(
				(el) =>
					el.id.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
					el.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
			),
		[search, courses]
	);

	return (
		<>
			<Header />
			{isCourses ? (
				<div className={styles.main}>
					<div className={styles.appBar}>
						<SearchBar
							onChange={handleSearchInput}
							onClick={handleClickSearchButton}
							value={search}
						/>
						<Button buttonText='Add new course' onClick={onClickAddNewCourse} />
					</div>
					<Courses
						courses={showSearchCourses ? filterCourses : courses}
						authors={authors}
					/>
				</div>
			) : (
				<CreateCourse
					allAppAuthors={authors}
					handleAddAuthor={handleAddAuthor}
					handleAddNewCourse={handleAddNewCourse}
				/>
			)}
		</>
	);
}

export default App;
