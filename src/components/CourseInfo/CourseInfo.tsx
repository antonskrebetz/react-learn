import { useParams, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { formatCreationDate, getCourseDuration } from '../../helpers';
import { IAuthor, ICourse } from '../../mockData';
import styles from './CourseInfo.module.css';

interface ICourseInfoProps {
	courses: ICourse[];
	authors: IAuthor[];
}

export const CourseInfo = ({ courses, authors }: ICourseInfoProps) => {
	let { courseID } = useParams();

	const course = courses.find((course) => course.id === courseID);

	return (
		<div className={styles.container}>
			<Link to='/courses' className={styles.backButton}>
				Back to courses
			</Link>
			<h1 className={styles.title}>{course?.title}</h1>
			<div className={styles.content}>
				<div className={styles.description}>{course?.description}</div>
				<div className={styles.props}>
					<div className={styles.propsBlock}>
						<div className={styles.propsTitle}>ID:</div>
						<div className={styles.propsInfo}>{course?.id}</div>
					</div>
					<div className={styles.propsBlock}>
						<div className={styles.propsTitle}>Duration:</div>
						<div className={styles.propsInfo}>
							{getCourseDuration(course?.duration)}
						</div>
					</div>
					<div className={styles.propsBlock}>
						<div className={styles.propsTitle}>Created:</div>
						<div className={styles.propsInfo}>
							{formatCreationDate(course?.creationDate)}
						</div>
					</div>
					<div className={styles.propsBlock}>
						<div className={styles.propsTitle}>Authors:</div>
					</div>
					{course?.authors.map((author) => {
						const currentAuthor = authors.find((el) => el.id === author);

						return (
							<p key={currentAuthor?.id} className={styles.propsAuthor}>
								{currentAuthor?.name}
							</p>
						);
					})}
				</div>
			</div>
		</div>
	);
};
