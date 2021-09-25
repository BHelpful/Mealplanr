import { combineReducers } from 'redux';
import counterReducer from './counter';
import navStateReducer from './navState';
import sessionReducer from './session';
import colorReducer from './colors';

export const rootReducer = combineReducers({
	counter: counterReducer,
	session: sessionReducer,
	navState: navStateReducer,
	color: colorReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
