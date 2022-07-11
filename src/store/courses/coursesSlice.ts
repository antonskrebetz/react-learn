import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICourse, IFulfilledCoursesAction } from '../../types';
import { httpService, _apiBase } from '../../services';

const { request } = httpService();

export const fetchCourses = createAsyncThunk('courses/fetchCourses', () => {
	return request(`${_apiBase}courses/all`);
});

// export const fetchAddCourse = createAsyncThunk(
// 	'courses/fetchAddCourse',
// 	(course: string) => {
// 		return request(`${_apiBase}courses/add`, 'POST', course);
// 	}
// );

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
		addNewCourse: (state, action) => {
			state.coursesData.push(action.payload);
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
		// [fetchAddCourse.fulfilled.type]: (state, action) => {
		// 	state.coursesData.push(action.payload.result);
		// },
	},
});

const { reducer, actions } = coursesSlice;
export default reducer;
export const { searchCourses, addNewCourse } = actions;
