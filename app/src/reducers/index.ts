import { combineReducers } from 'redux';
import counterReducer from './counter';
import navStateReducer from './navState';
import sessionReducer from './session';

export const rootReducer = combineReducers({
	counter: counterReducer,
	session: sessionReducer,
	navState: navStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
