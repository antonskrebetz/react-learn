import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';
import styles from './Header.module.css';

export const Header = () => {
	return (
		<div className={styles.header}>
			<Logo />
			<div className={styles.loginSection}>
				<div className={styles.name}>Dave</div>
				<Button buttonText={'Logout'} />
			</div>
		</div>
	);
};
