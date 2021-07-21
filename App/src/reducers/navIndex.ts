// Function definitions - Defining what parameters and the object structure
export const setNavIndex = (index: number = 0) => {
	return {
		type: 'PAGE',
		payload: index,
	};
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<typeof setNavIndex>;

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const navIndexReducer = (state: number = 0, action: ActionType) => {
	switch (action.type) {
		case 'PAGE':
			state = action.payload;
			return state;
		default:
			return 0;
	}
};

export default navIndexReducer;
