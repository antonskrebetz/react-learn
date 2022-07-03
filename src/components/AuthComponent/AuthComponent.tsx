import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
	const user = localStorage.getItem('access_token');
	return user ? true : false;
};

export const AuthComponent = () => {
	const auth = useAuth();

	return auth ? <Outlet /> : <Navigate to='/login' />;
};
