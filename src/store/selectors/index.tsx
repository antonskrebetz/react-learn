import { RootState } from '../store';

export const getUserRole = (state: RootState) => state.userReducer.role;
export const getUserName = (state: RootState) => state.userReducer.name;
export const getUserToken = (state: RootState) => state.userReducer.token;

export const getCoursesLoading = (state: RootState) =>
	state.coursesReducer.coursesStatus;

export const getAuthorsLoading = (state: RootState) =>
	state.authorsReducer.authorsStatus;

export const getCourses = (state: RootState) =>
	state.coursesReducer.coursesData;
export const getAuthors = (state: RootState) =>
	state.authorsReducer.authorsData;
export const getSearch = (state: RootState) => state.coursesReducer.search;
