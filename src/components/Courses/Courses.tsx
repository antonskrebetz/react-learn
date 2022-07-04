import { useNavigate } from 'react-router-dom';
import { CourseCard } from './components/CourseCard/CourseCard';
import { getCourseDuration, formatCreationDate } from '../../helpers';
import { ICourse, IAuthor } from '../../mockData';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import styles from './Courses.module.css';

interface ICoursesProps {
	courses: ICourse[];
	authors: IAuthor[];
	handleSearchInput: any;
	handleClickSearchButton: any;
	search: string;
}

export const Courses = ({
	courses,
	authors,
	handleSearchInput,
	handleClickSearchButton,
	search,
}: ICoursesProps) => {
	const navigate = useNavigate();
	const onClickAddNewCourse = () => {
		navigate('add');
	};

	return (
		<div className={styles.main}>
			<div className={styles.appBar}>
				<SearchBar
					onChange={handleSearchInput}
					onClick={handleClickSearchButton}
					value={search}
				/>
				<Button buttonText='Add new course' onClick={onClickAddNewCourse} />
			</div>
			<div>
				{courses.map((course) => {
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
