import config from '../config.json';
import { get } from 'lodash';
import { setUserPopup } from './navState';

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

interface sessionType {
	hue: any;
	shade: any;
}

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const colorReducer = (
	state: sessionType = {
		hue: 0,
		shade: 0
	},
	action: ActionType
) => {
	switch (action.type) {
		case THEME:
			state.hue = get(action.payload, 'hue');
			state.shade = get(action.payload, 'shade');
			return state;

		default:
			return state;
	}
};

export const getTheme = () => {
	return async function (dispatch: Function, getState: Function) {
		const themeResponse = await fetch(
			`${config.apiUrl}/users/settings/?theme`, {
				headers: { 'Content-Type': 'application/json' },
				method: 'GET',
			}
		);

		if (themeResponse.status === 200) {
			const themedata = await themeResponse.json();
			dispatch(theme(themedata.hue, themedata.shade));
		} else {
			// Error handling
		}
	};
};

export const setTheme = (
	hue: number,
	shade: number
) => {
	return async function (dispatch: Function, getState: Function) {
		const themeResponse = await fetch(
			`${config.apiUrl}/users/settings/?theme`, {
				body: JSON.stringify({
					hue: hue,
					shade: shade,
				}),
				headers: { 'Content-Type': 'application/json' },
				method: 'PUT',
			}
		);

		if (themeResponse.status === 200) {
			const themedata = await themeResponse.json();
			dispatch(theme(themedata.hue, themedata.shade));
		} else {
			// Error handling
		}
	};
};


export default colorReducer;
