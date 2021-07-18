import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import Navbar from './components/Navbar';
import Container from './components/Container';

import { RootState } from './reducers';

function App() {

	const navIndex = useSelector((state: RootState) => state.navgationIndex);
	const navCollapsed = useSelector((state: RootState) => state.navgationCollapsed);

	return (

		<div id="app">

			<Navbar />
			{
				{	/* React friendly switch-statement */
					0:
						<Container>
							<h1>What is MealPlanr</h1>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa.</p>
						</Container>,
					1:
						<Container>
							<h1>Browse recepies</h1>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa.</p>
						</Container>,
					2:
						<Container>
							<h1>Create a collection</h1>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa.</p>
						</Container>,
				}[navIndex] || /* In case of no result matching (default to): */
						<Container>
							<h1>404 Error</h1>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa.</p>
						</Container>
			}

		</div>

	);
}

export default App;