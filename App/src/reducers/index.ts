import counterReducer from './counter';
import loggedInReducer from './isLoggedIn';
import { combineReducers } from 'redux';
import navBarReducer from './nav';

export const rootReducer = combineReducers({
	counter: counterReducer,
	isLoggedIn: loggedInReducer,
	nav: navBarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
