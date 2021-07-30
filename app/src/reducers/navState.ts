// Function definitions - Defining what parameters and the object structure
export const setNavCollapsed = () => {
	return {
		type: 'TOGGLE',
		payload: 0,
	};
};
export const setNavIndex = (index: number = 0) => {
	return {
		type: 'PAGE',
		payload: index,
	};
};
export const setUserPopup = (index: number = 0) => {
	return {
		type: 'POPUP',
		payload: index,
	}
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<typeof setNavCollapsed | typeof setNavIndex | typeof setUserPopup>;

interface navStateInterface {
	collapsed: boolean;
	index: number;
	userpopup: number;
}

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const navStateReduser = (
	state: navStateInterface = { collapsed: false, index: 0, userpopup: 0 },
	action: ActionType
) => {
	switch (action.type) {
		case 'TOGGLE':
			state.collapsed = !state.collapsed;
			break;
		case 'PAGE':
			state.index = action.payload;
			break;
		case 'POPUP':
			state.userpopup = state.userpopup === action.payload ? 0 : action.payload;
			break;
		default:
		}
	return state;
};

export default navStateReduser;
