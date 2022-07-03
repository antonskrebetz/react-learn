import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';
import styles from './Header.module.css';

export const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const userName = localStorage.getItem('userName');

	const onLogoutClick = () => {
		localStorage.clear();
		navigate('/login');
	};

	return (
		<div className={styles.header}>
			<Logo />
			{location.pathname !== '/login' && location.pathname !== '/registration' && (
				<div className={styles.loginSection}>
					<div className={styles.name}>{userName}</div>
					<Button buttonText={'Logout'} onClick={onLogoutClick} />
				</div>
			)}
		</div>
	);
};
