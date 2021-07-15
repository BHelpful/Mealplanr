export const increment = (nr: number = 0) => {
	return {
		type: 'INCREMENT',
		payload: nr,
	};
};
export const decrement = (nr: number = 0) => {
	return {
		type: 'DECREMENT',
		payload: nr,
	};
};

type CounterAction = ReturnType<typeof increment | typeof decrement>;

const counterReducer = (state = 0, action: CounterAction) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

export default counterReducer;
