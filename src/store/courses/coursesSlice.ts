import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
	ICourse,
	IFulfilledCoursesAction,
	IFulfilledDeleteCourse,
	IFulfilledCreateCourse,
} from '../../types';
import { httpService, _apiBase } from '../../services';

const { request } = httpService();

export const fetchCourses = createAsyncThunk('courses/fetchCourses', () => {
	return request(`${_apiBase}courses/all`);
});

interface IFetchCreateCourse {
	course: string;
	token: string;
}

interface IFetchUpdateCourse {
	course: string;
	id: string;
	token: string;
}

interface IFetchDeleteCourse {
	token: string;
	id: string;
}

export const fetchCreateCourse = createAsyncThunk(
	'courses/fetchCreateCourse',
	({ course, token }: IFetchCreateCourse) => {
		return request(`${_apiBase}courses/add`, 'POST', course, {
			Authorization: token,
			'Content-Type': 'application/json',
		});
	}
);

export const fetchUpdateCourse = createAsyncThunk(
	'courses/fetchUpdateCourse',
	({ course, id, token }: IFetchUpdateCourse) => {
		return request(`${_apiBase}courses/${id}`, 'PUT', course, {
			Authorization: token,
			'Content-Type': 'application/json',
		});
	}
);

export const fetchDeleteCourse = createAsyncThunk(
	'courses/fetchDeleteCourse',
	({ token, id }: IFetchDeleteCourse) => {
		return request(`${_apiBase}courses/${id}`, 'DELETE', null, {
			Authorization: token,
		});
	}
);

interface IInitialState {
	coursesStatus: string;
	coursesData: ICourse[];
	search: string;
}

const initialState: IInitialState = {
	coursesStatus: 'idle',
	coursesData: [],
	search: '',
};

const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		searchCourses: (state, action) => {
			state.search = action.payload;
		},
	},
	extraReducers: {
		[fetchCourses.pending.type]: (state) => {
			state.coursesStatus = 'loading';
		},
		[fetchCourses.fulfilled.type]: (
			state,
			action: PayloadAction<IFulfilledCoursesAction>
		) => {
			state.coursesStatus = 'idle';
			state.coursesData = action.payload.result;
		},
		[fetchCourses.rejected.type]: (state) => {
			state.coursesStatus = 'error';
		},
		[fetchDeleteCourse.fulfilled.type]: (
			state,
			action: PayloadAction<IFulfilledDeleteCourse>
		) => {
			state.coursesData = state.coursesData.filter((course) => {
				const payloadCourseId = action.payload.result.slice(17, -13);
				return course.id !== payloadCourseId;
			});
		},
		[fetchCreateCourse.fulfilled.type]: (
			state,
			action: PayloadAction<IFulfilledCreateCourse>
		) => {
			state.coursesData.push(action.payload.result);
		},
	},
});

const { reducer, actions } = coursesSlice;
export default reducer;
export const { searchCourses } = actions;
