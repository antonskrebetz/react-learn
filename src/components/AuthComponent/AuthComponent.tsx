import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
	const user = localStorage.getItem('access_token');
	return { isAuthenticated: !!user };
};

export const AuthComponent = () => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};
