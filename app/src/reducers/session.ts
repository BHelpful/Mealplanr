import config from '../config.json';
import { get } from 'lodash';

// Function definitions - Defining what parameters and the object structure
export const userExists = () => {
	return {
		type: 'USER_EXISTS',
		payload: '',
	};
};

export const setErrMsg = (err: string) => {
	return {
		type: 'ERROR',
		payload: err,
	};
};

export const createdUser = (
	email: string,
	password: string,
	passwordConfirm: string
) => {
	return {
		type: 'CREATED_USER',
		payload: {
			email: email,
			password: password,
			passwordconfirmation: passwordConfirm,
		},
	};
};

export const logIn = (email: string, password: string) => {
	return {
		type: 'LOGIN',
		payload: {
			email: email,
			password: password,
		},
	};
};

export const logOut = () => {
	return {
		type: 'LOGOUT',
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
		case 'USER_EXISTS':
			state.created = true;
			return state;

		case 'CREATED_USER':
			state.created = true;
			return state;

		case 'LOGIN':
			state.isLoggedIn = true;
			if (action.payload) {
				state.informationFillded = true;
			}
			return state;

		case 'LOGOUT':
			state.isLoggedIn = false;
			return state;

		case 'ERROR':
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
			const response = await user.json();
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

export default sessionReducer;
