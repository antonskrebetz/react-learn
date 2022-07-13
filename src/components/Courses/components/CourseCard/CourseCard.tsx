import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../common/Button/Button';
import styles from './CourseCard.module.css';

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

	const onClickShowCourse = () => {
		navigate(`/courses/${id}`);
	};

	return (
		<div className={styles.courseCard}>
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
				<Button buttonText='Update' />
				<Button buttonText='Delete' />
			</div>
		</div>
	);
};
