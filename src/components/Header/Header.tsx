import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';
import styles from './Header.module.css';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { onLogoutClickClearState } from '../../store/user/userSlice';

export const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userName = useAppSelector((state) => state.userReducer.name);

	const onLogoutClick = async () => {
		await dispatch(onLogoutClickClearState());
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
