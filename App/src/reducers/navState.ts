// Function definitions - Defining what parameters and the object structure
export const setNavCollapsed = () => {
	return {
		type: 'TOGGLE',
		payload: false,
	};
};
export const setNavIndex = (index: number = 0) => {
	return {
		type: 'PAGE',
		payload: index,
	};
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<typeof setNavCollapsed | typeof setNavIndex>;

interface navStateInterface {
	collapsed: boolean;
	index: number;
}

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const navStateReduser = (
	state: navStateInterface = { collapsed: false, index: 0 },
	action: ActionType
) => {
	switch (action.type) {
		case 'TOGGLE':
			state.collapsed = !state.collapsed;
			return state;
		case 'PAGE':
			state.index = Number(action.payload);
			return state;
		default:
			return state;
	}
};

export default navStateReduser;
