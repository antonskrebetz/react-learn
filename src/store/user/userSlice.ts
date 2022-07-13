import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase } from '../../services';
import { IFulfilledLoginUser } from '../../types';

const { request } = httpService();

export const fetchLoginUser = createAsyncThunk(
	'user/fetchLoginUser',
	(user: string) => {
		return request(`${_apiBase}login`, 'POST', user);
	}
);

export const fetchLogoutUser = createAsyncThunk(
	'user/fetchLogoutUser',
	(user: string) => {
		return request(`${_apiBase}delete`, 'DELETE', user);
	}
);

interface IInitialState {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
}

const initialState: IInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		onLogout: (state) => initialState,
	},
	extraReducers: {
		[fetchLoginUser.fulfilled.type]: (
			state,
			action: PayloadAction<IFulfilledLoginUser>
		) => {
			state.isAuth = action.payload.successful;
			state.name = action.payload.user.name;
			state.email = action.payload.user.email;
			state.token = action.payload.result;
		},
	},
});

const { reducer, actions } = userSlice;
export const { onLogout } = actions;
export default reducer;
