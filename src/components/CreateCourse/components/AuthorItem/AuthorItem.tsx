import { Button } from '../../../../common/Button/Button';
import styles from './AuthorItem.module.css';

interface IAuthorItemProps {
	name: string;
	buttonText: string;
	onClick?: (id: string, name: string) => void;
}

export const AuthorItem = ({ name, buttonText, onClick }: IAuthorItemProps) => {
	return (
		<div className={styles.authorItem}>
			<div className={styles.name}>{name}</div>
			<Button buttonText={buttonText} onClick={onClick} />
		</div>
	);
};
