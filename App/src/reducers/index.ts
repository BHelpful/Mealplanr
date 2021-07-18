import counterReducer from './counter';
import loggedInReducer from './isLoggedIn';
import { combineReducers } from 'redux';
import navCollapsedReducer from './navCollapsed';
import navIndexReducer from './navIndex';

export const rootReducer = combineReducers({
	counter: counterReducer,
	isLoggedIn: loggedInReducer,
	navgationCollapsed: navCollapsedReducer,
	navgationIndex: navIndexReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
