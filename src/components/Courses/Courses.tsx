import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchCourses } from '../../store/courses/coursesSlice';
import { fetchAuthors } from '../../store/authors/authorsSlice';
import { fetchUsersMe } from '../../store/user/userSlice';
import { CourseCard } from './components/CourseCard/CourseCard';
import { getCourseDuration, formatCreationDate } from '../../helpers';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import {
	getUserRole,
	getUserToken,
	getCourses,
	getAuthors,
	getSearch,
	getAuthorsLoading,
	getCoursesLoading,
} from '../../store/selectors';
import styles from './Courses.module.css';

export const Courses = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [showSearchCourses, setShowSearchCourses] = useState(false);

	const coursesLoading = useAppSelector(getCoursesLoading);
	const authorsLoading = useAppSelector(getAuthorsLoading);
	const userRole = useAppSelector(getUserRole);
	const userToken = useAppSelector(getUserToken);

	useEffect(() => {
		dispatch(fetchCourses());
		dispatch(fetchAuthors());
		dispatch(fetchUsersMe(userToken));
	}, [dispatch, userToken]);

	const courses = useAppSelector(getCourses);
	const authors = useAppSelector(getAuthors);
	const search = useAppSelector(getSearch);

	const onClickAddNewCourse = () => {
		if (userRole === 'admin') {
			navigate('add');
		} else {
			alert('Only for admin');
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

	const displayedCourses = showSearchCourses ? filterCourses : courses;

	return (
		<div className={styles.main}>
			<div className={styles.appBar}>
				<SearchBar setShowSearchCourses={setShowSearchCourses} />
				<Button buttonText='Add new course' onClick={onClickAddNewCourse} />
			</div>
			<div>
				{(coursesLoading === 'loading' || authorsLoading === 'loading') && (
					<h2>Loading...</h2>
				)}
				{courses.length === 0 && <div>No courses for displaying</div>}
				{!!courses.length &&
					!!authors.length &&
					displayedCourses.map((course) => {
						const authorsForCard = course.authors.map((authorId: string) => {
							return authors.filter((author) => author.id === authorId)[0].name;
						});

						const duration = getCourseDuration(course.duration || 0);
						const creationDate = formatCreationDate(course.creationDate);

						return (
							<CourseCard
								key={course.id}
								id={course.id}
								title={course.title}
								description={course.description}
								creationDate={creationDate}
								duration={duration}
								authors={authorsForCard}
							/>
						);
					})}
			</div>
		</div>
	);
};
