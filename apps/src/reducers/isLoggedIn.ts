// Function definitions - Defining what parameters and the object structure
export const logIn = () => {
	return {
		type: 'LOGIN',
	};
};
export const logOut = () => {
	return {
		type: 'LOGOUT',
	};
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<typeof logIn | typeof logOut>;

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const loggedInReducer = (state = false, action: ActionType) => {
	switch (action.type) {
		case 'LOGIN':
			return true;
		case 'LOGOUT':
			return false;
		default:
			return false;
	}
};

export default loggedInReducer;
