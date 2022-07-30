import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';
import styles from './Header.module.css';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { fetchLogoutUser } from '../../store/user/userSlice';
import { getUserName, getUserToken } from '../../store/selectors';

export const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userName = useAppSelector(getUserName);
	const userToken = useAppSelector(getUserToken);

	const onLogoutClick = async () => {
		await dispatch(fetchLogoutUser(userToken));
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
