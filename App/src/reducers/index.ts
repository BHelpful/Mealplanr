import { combineReducers } from 'redux';
import counterReducer from './counter';
import loggedInReducer from './isLoggedIn';
import navStateReducer from './navState';

export const rootReducer = combineReducers({
	counter: counterReducer,
	isLoggedIn: loggedInReducer,
	navState: navStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
