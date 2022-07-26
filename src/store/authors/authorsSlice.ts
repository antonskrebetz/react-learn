import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
	IAuthor,
	IFulfilledAuthorsAction,
	IFulfilledAddAuthors,
} from '../../types';
import { httpService, _apiBase } from '../../services';

const { request } = httpService();

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', () => {
	return request(`${_apiBase}authors/all`);
});

interface IFetchAddAuthors {
	name: string;
	token: string;
}

export const fetchAddAuthors = createAsyncThunk(
	'authors/fetchAddAuthors',
	({ name, token }: IFetchAddAuthors) => {
		return request(`${_apiBase}authors/add`, 'POST', name, {
			Authorization: token,
			'Content-Type': 'application/json',
		});
	}
);

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
	reducers: {},
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
		[fetchAddAuthors.fulfilled.type]: (
			state,
			action: PayloadAction<IFulfilledAddAuthors>
		) => {
			state.authorsStatus = 'idle';
			state.authorsData.push(action.payload.result);
		},
	},
});

const { reducer } = authorsSlice;
export default reducer;
