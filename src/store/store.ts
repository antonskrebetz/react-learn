import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import coursesReducer from './courses/coursesSlice';
import authorsReducer from './authors/authorsSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
	reducer: {
		coursesReducer,
		authorsReducer,
		userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
