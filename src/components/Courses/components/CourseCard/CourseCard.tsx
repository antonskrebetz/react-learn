import { Button } from '../../../../common/Button/Button';
import styles from './CourseCard.module.css';

interface ICourseCard {
	title: string;
	description: string;
	creationDate: string;
	duration: string;
	authors: string[];
}

export const CourseCard = ({
	title,
	description,
	creationDate,
	duration,
	authors,
}: ICourseCard) => {
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
				<Button buttonText='Show course' />
			</div>
		</div>
	);
};
