import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

const useAdminAuth = () => {
	const userRole = useAppSelector((state) => state.userReducer.role);
	return { isAuthenticated: userRole === 'admin' };
};

export const AdminAuthComponent = () => {
	const { isAuthenticated } = useAdminAuth();

	return isAuthenticated ? <Outlet /> : <Navigate to='/courses' />;
};
