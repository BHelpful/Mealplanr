import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './components/Navbar';

import './App.scss';
import { RootState } from './reducers';
import { decrement, increment } from './reducers/counter';

function App() {
	const counter = useSelector((state: RootState) => state.counter);
	const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
	const dispatch = useDispatch();

	const [menuCurrent, setMenuCurrent] = useState(1);
	const [menuOpen, setMenuOpen] = useState(true);

	return (
		
		<div className="app">
			<h1>Counter {counter}</h1>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button>
			{isLoggedIn ? <h3>Value that should not be visable</h3> : ''}
			<Navbar menuCurrent={menuCurrent} setMenuCurrent={setMenuCurrent} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
		</div>

	);
}

export default App;
