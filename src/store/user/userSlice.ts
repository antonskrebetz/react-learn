import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase } from '../../services';
import { IFulfilledLoginUser, IFulfilledUsersMe } from '../../types';

const { request } = httpService();

export const fetchLoginUser = createAsyncThunk(
	'user/fetchLoginUser',
	(user: string) => {
		return request(`${_apiBase}login`, 'POST', user);
	}
);

export const fetchUsersMe = createAsyncThunk(
	'user/fetchUsersMe',
	(token: string) => {
		return request(`${_apiBase}users/me`, 'GET', null, {
			Authorization: token,
		});
	}
);

export const fetchLogoutUser = createAsyncThunk(
	'user/fetchLogoutUser',
	(token: string) => {
		return request(`${_apiBase}delete`, 'DELETE', null, {
			Authorization: token,
		});
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
	reducers: {},
	extraReducers: {
		[fetchLoginUser.fulfilled.type]: (
			state,
			action: PayloadAction<IFulfilledLoginUser>
		) => {
			state.isAuth = action.payload.successful;
			state.token = action.payload.result;
		},
		[fetchUsersMe.fulfilled.type]: (
			state,
			action: PayloadAction<IFulfilledUsersMe>
		) => {
			state.name = action.payload.result.name;
			state.email = action.payload.result.email;
			state.role = action.payload.result.role;
		},
		[fetchLogoutUser.fulfilled.type]: (state) => initialState,
	},
});

const { reducer } = userSlice;
export default reducer;
