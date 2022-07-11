import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IAuthor, IFulfilledAuthorsAction } from '../../types';
import { httpService, _apiBase } from '../../services';

const { request } = httpService();

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', () => {
	return request(`${_apiBase}authors/all`);
});

interface IInitialState {
	authorsStatus: string;
	authorsData: IAuthor[];
}

const initialState: IInitialState = {
	authorsStatus: 'idle',
	authorsData: [],
};

const authorsSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		addAuthor: (state, action) => {
			state.authorsData.push(action.payload);
		},
	},
	extraReducers: {
		[fetchAuthors.pending.type]: (state) => {
			state.authorsStatus = 'loading';
		},
		[fetchAuthors.fulfilled.type]: (
			state,
			action: PayloadAction<IFulfilledAuthorsAction>
		) => {
			state.authorsStatus = 'idle';
			state.authorsData = action.payload.result;
		},
		[fetchAuthors.rejected.type]: (state) => {
			state.authorsStatus = 'error';
		},
	},
});

const { reducer, actions } = authorsSlice;
export default reducer;
export const { addAuthor } = actions;
