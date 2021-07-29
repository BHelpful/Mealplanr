import config from '../config.json';
import { get } from 'lodash';

const USER_EXISTS = 'USER_EXISTS';
const ERROR = 'ERROR';
const CREATED_USER = 'CREATED_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Function definitions - Defining what parameters and the object structure
const userExists = () => {
	return {
		type: USER_EXISTS,
		payload: '',
	};
};
const setErrMsg = (err: string) => {
	return {
		type: ERROR,
		payload: err,
	};
};
const createdUser = (
	user: any,
	informationFillded: boolean,
	refresh: string,
	authorization: string
) => {
	return {
		type: CREATED_USER,
		payload: {
			user: user,
			informationFillded: informationFillded,
			refresh: refresh,
			authorization: authorization,
		},
	};
};
const logIn = (
	user: any,
	informationFillded: boolean,
	refresh: string,
	authorization: string
) => {
	return {
		type: LOGIN,
		payload: {
			user: user,
			informationFillded: informationFillded,
			refresh: refresh,
			authorization: authorization,
		},
	};
};
const logOut = () => {
	return {
		type: LOGOUT,
		payload: '',
	};
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<
	| typeof userExists
	| typeof setErrMsg
	| typeof logIn
	| typeof logOut
	| typeof createdUser
>;

interface sessionType {
	user: any;
	created: boolean;
	isLoggedIn: boolean;
	informationFillded: boolean;
	refresh: string;
	authorization: string;
	errorMessage: string;
}

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const sessionReducer = (
	state: sessionType = {
		user: {},
		created: false,
		isLoggedIn: false,
		informationFillded: false,
		refresh: '',
		authorization: '',
		errorMessage: '',
	},
	action: ActionType
) => {
	switch (action.type) {
		case USER_EXISTS:
			state.created = true;
			return state;

		case CREATED_USER:
			state.user = get(action.payload, 'user');
			state.created = true;
			state.isLoggedIn = true;
			state.refresh = get(action.payload, 'refresh');
			state.authorization = get(action.payload, 'authorization');
			if (get(action.payload, 'informationFillded')) {
				state.informationFillded = true;
			}
			return state;

		case LOGIN:
			state.user = get(action.payload, 'user');
			state.created = true;
			state.isLoggedIn = true;
			state.refresh = get(action.payload, 'refresh');
			state.authorization = get(action.payload, 'authorization');
			if (get(action.payload, 'informationFillded')) {
				state.informationFillded = true;
			}
			return state;

		case LOGOUT:
			state.isLoggedIn = false;
			return state;

		case ERROR:
			state.errorMessage = String(action.payload);
			return state;
		default:
			return state;
	}
};

export const checkForUser = (email: string) => {
	return async function (dispatch: Function, getState: Function) {
		const user = await fetch(
			`${config.apiUrl}/users/?userMail=${email}&accessCode=${config.accessCode}`,
			{
				method: 'GET',
			}
		);

		if (user.status === 200) {
			// const response = await user.json();
			dispatch(userExists());
		} else {
			try {
				const errorMessage = await user.text();
				dispatch(setErrMsg(errorMessage));
			} catch (error) {
				dispatch(setErrMsg(`Unhandled error: ${error}`));
			}
		}
	};
};

export const createUser = (
	email: string,
	password: string,
	passwordConfirmation: string
) => {
	return async function (dispatch: Function, getState: Function) {
		const userResponse = await fetch(`${config.apiUrl}/users`, {
			body: JSON.stringify({
				email: email,
				password: password,
				passwordConfirmation: passwordConfirmation,
			}),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});

		if (userResponse.status === 200) {
			const sessionResponse = await fetch(`${config.apiUrl}/sessions`, {
				body: JSON.stringify({
					email: email,
					password: password,
				}),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			if (sessionResponse.status === 200) {
				const session = await sessionResponse.json();
				const user = await userResponse.json();
				if (user.name) {
					dispatch(
						createdUser(
							user,
							true,
							session.refreshToken,
							session.accessToken
						)
					);
				} else {
					dispatch(
						createdUser(
							user,
							false,
							session.refreshToken,
							session.accessToken
						)
					);
				}
			} else {
				const errorMessage = await sessionResponse.text();
				dispatch(setErrMsg(errorMessage));
			}
		} else {
			const errorMessage = await userResponse.text();
			dispatch(setErrMsg(errorMessage));
		}
	};
};

export const userLogin = (email: string, password: string) => {
	return async function (dispatch: Function, getState: Function) {
		const userResponse = await fetch(
			`${config.apiUrl}/users/?userMail=${email}&accessCode=${config.accessCode}`,
			{
				method: 'GET',
			}
		);

		if (userResponse.status === 200) {
			const sessionResponse = await fetch(`${config.apiUrl}/sessions`, {
				body: JSON.stringify({
					email: email,
					password: password,
				}),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			if (sessionResponse.status === 200) {
				const session = await sessionResponse.json();
				const user = await userResponse.json();
				if (user.name) {
					dispatch(
						logIn(
							user,
							true,
							session.refreshToken,
							session.accessToken
						)
					);
				} else {
					dispatch(
						logIn(
							user,
							false,
							session.refreshToken,
							session.accessToken
						)
					);
				}
			} else {
				const errorMessage = await sessionResponse.text();
				dispatch(setErrMsg(errorMessage));
			}
		} else {
			const errorMessage = await userResponse.text();
			dispatch(setErrMsg(errorMessage));
		}
	};
};

export const userLogout = (refresh: string, authorization: string) => {
	return async function (dispatch: Function, getState: Function) {
		const sessionResponse = await fetch(`${config.apiUrl}/sessions`, {
			headers: {
				'Content-Type': 'application/json',
				'x-refresh': refresh,
				authorization: authorization,
			},
			method: 'DELETE',
		});
		if (sessionResponse.status === 200) {
			dispatch(logOut());
		} else {
			const errorMessage = await sessionResponse.text();
			dispatch(setErrMsg(errorMessage));
		}
	};
};

export default sessionReducer;
