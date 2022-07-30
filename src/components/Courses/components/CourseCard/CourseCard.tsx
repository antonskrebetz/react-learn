import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../common/Button/Button';
import styles from './CourseCard.module.css';
import { useAppSelector, useAppDispatch } from '../../../../store/store';
import { fetchDeleteCourse } from '../../../../store/courses/coursesSlice';

interface ICourseCard {
	id: string;
	title: string;
	description: string;
	creationDate: string | null;
	duration: string | null;
	authors: string[];
}

export const CourseCard = ({
	id,
	title,
	description,
	creationDate,
	duration,
	authors,
}: ICourseCard) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const userRole = useAppSelector((state) => state.userReducer.role);
	const userToken = useAppSelector((state) => state.userReducer.token);

	const onClickShowCourse = () => {
		navigate(`/courses/${id}`);
	};

	const onClickDeleteCourse = async () => {
		await dispatch(fetchDeleteCourse({ id, token: userToken }));
	};

	const onClickUpdateCourse = () => {
		navigate(`/courses/update/${id}`);
	};

	return (
		<div className={styles.courseCard} data-testid='course-card'>
			<div className={styles.leftSection}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.description}>{description}</div>
			</div>
			<div className={styles.rightSection}>
				<div className={styles.detailBlock}>
					<div className={styles.detailBlockTitle}>Authors:</div>
					<div className={styles.detailBlockInfo}>{authors.join(', ')}</div>
				</div>
				<div className={styles.detailBlock}>
					<div className={styles.detailBlockTitle}>Duration:</div>
					<div className={styles.detailBlockInfo}>{duration}</div>
				</div>
				<div className={styles.detailBlock}>
					<div className={styles.detailBlockTitle}>Created:</div>
					<div className={styles.detailBlockInfo}>{creationDate}</div>
				</div>
				<Button buttonText='Show course' onClick={onClickShowCourse} />
				{userRole === 'admin' && (
					<>
						<Button buttonText='Update' onClick={onClickUpdateCourse} />
						<Button buttonText='Delete' onClick={onClickDeleteCourse} />
					</>
				)}
			</div>
		</div>
	);
};
