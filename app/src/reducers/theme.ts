import config from '../config.json';
import { get } from 'lodash';

const THEME = 'THEME';

// Function definitions - Defining what parameters and the object structure
const theme = (
	hue: number,
	shade: number,
) => {
	return {
		type: THEME,
		payload: {
			hue: hue,
			shade: shade
		},
	};
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<
	| typeof theme
>;

interface themeType {
	hue: any;
	shade: any;
}

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const themeReducer = (
	state: themeType = {
		hue: 0,
		shade: 0
	},
	action: ActionType
) => {
	let newstate: any = {}
	switch (action.type) {
		case THEME:
			newstate.hue = get(action.payload, 'hue');
			newstate.shade = get(action.payload, 'shade');
			return Object.assign({...state, ...newstate});

		default:
			return Object.assign({...state, ...newstate});
	}
};

export const getTheme = () => {
	return async function (dispatch: Function, getState: Function) {
		const email = getState().session.user.email;
		const {refresh, authorization} = getState().session;
		const themeResponse = await fetch(
			`${config.apiUrl}/users/?userMail=${email}`, {
				headers: {
					'Content-Type': 'application/json',
					'x-refresh': refresh,
					authorization: authorization,
				},
				method: 'GET',
			}
		);

		if (themeResponse.status === 200) {
			const themedata = await themeResponse.json();
			var [hue, shade] = themedata.options.theme.split(", ");
			dispatch(theme(hue, shade));
		} else {
			// Error handling
		}
	};
};

export const setTheme = (
	password: string,
	thue: number,
	tshade: number
) => {
	return async function (dispatch: Function, getState: Function) {
		const email = getState().session.user.email;
		const {refresh, authorization} = getState().session;
		const themeResponse: any = await fetch(
			`${config.apiUrl}/users/?userMail=${email}`, {
				body: JSON.stringify({
					password: password,
					options: {
						theme: `${thue}, ${tshade}`,
					}
				}),
				headers: {
					'Content-Type': 'application/json',
					'x-refresh': refresh,
					authorization: authorization,
				},
				method: 'PUT',
			}
		);

		if (themeResponse.status === 200) {
			const themedata = await themeResponse.json();
			var [hue, shade] = themedata.options.theme.split(", ");
			dispatch(theme(hue, shade));
		} else {
			// Error handling
		}
	};
};

export default themeReducer;
