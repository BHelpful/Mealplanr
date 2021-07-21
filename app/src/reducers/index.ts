import counterReducer from './counter';
import loggedInReducer from './isLoggedIn';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
	counter: counterReducer,
	isLoggedIn: loggedInReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
