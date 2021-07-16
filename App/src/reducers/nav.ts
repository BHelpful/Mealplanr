// Function definitions - Defining what parameters and the object structure
export const currentPage = (index: number = 0) => {
	return {
		type: 'PAGE',
		payload: index,
	};
};

export const setNav = (wide: boolean = true) => {
	return {
		type: 'SIZE',
    payload: wide,
	};
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<typeof currentPage | typeof setNav>;

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const navBarReducer = (state: number|boolean = 0||true, action: ActionType) => {
	switch (action.type) {
		case 'PAGE':
      state = action.payload;
      break;
		case 'SIZE':
      state = action.payload;
      break;
	}
  return state;
};

export default navBarReducer;
