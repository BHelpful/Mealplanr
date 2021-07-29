import { combineReducers } from 'redux';
import counterReducer from './counter';
import loggedInReducer from './isLoggedIn';
import navStateReducer from './navState';
import sessionReducer from './session';

export const rootReducer = combineReducers({
	counter: counterReducer,
	isLoggedIn: loggedInReducer,
	session: sessionReducer,
	navState: navStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
