interface actionType {
	type: string;
}

const loggedInReducer = (state = false, action: actionType) => {
	switch (action.type) {
		case 'LOGGED_IN':
			return true;
		default:
			return false;
	}
};

export default loggedInReducer;
