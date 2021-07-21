import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { RootState } from './reducers';
import { decrement, increment } from './reducers/counter';

function App() {
	const counter = useSelector((state: RootState) => state.counter);
	const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
	const dispatch = useDispatch();

	return (
		<div className="app">
			<h1>Counter {counter}</h1>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button>
			{isLoggedIn ? <h3>Value that should not be visable</h3> : ''}
		</div>
	);
}

export default App;
