import React from 'react';
import { setNavIndex, setNavCollapsed } from '../../reducers/navState';

import './Navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { checkForUser, createUser, userLogin, userLogout } from '../../reducers/session';
//import { user } from "path/to/user";    // TODO: Create and import user object
const user = {
	firstname: 'Lars',
	lastname: 'Larsen',
	image: 'path/to/image.jpg',
};

const navbarlist = [
	{
		title: 'Plan meals',
		url: '/plan',
	},
	{
		title: 'Browse recipes',
		url: '/browse',
	},
	{
		title: 'My collection',
		url: '/collection',
	},
	{
		title: 'Shopping list',
		url: '/list',
	},
	{
		title: 'Settings',
		url: '/settings',
	},
];

export default function Navbar() {
	const navIndex = useSelector((state: RootState) => state.navState.index);
	const navCollapsed = useSelector(
		(state: RootState) => state.navState.collapsed
	);
	const isLoggedIn = useSelector(
		(state: RootState) => state.session.isLoggedIn
	);
	const refresh = useSelector((state: RootState) => state.session.refresh);
	const authorization = useSelector(
		(state: RootState) => state.session.authorization
	);
	const dispatch = useDispatch();

	return (
		<div id="navbar" className={navCollapsed ? 'thin' : 'wide'}>
			<div className="top">
				<div className="logo icon"></div>
				<p>MealPlanr</p>
				<div
					className="burger icon"
					onClick={() => dispatch(setNavCollapsed())}
				></div>
			</div>
			<div className="items">
				{navbarlist.map((data: any, index: number) => (
					<div
						key={index.toString()}
						className={
							'bar' + (navIndex === index ? ' selected' : '')
						}
						onClick={() => dispatch(setNavIndex(index))}
					>
						<div className={'icon nbi' + index}></div>
						<p>{data.title}</p>
					</div>
				))}
			</div>
			{isLoggedIn ? (
				<div className="bottom loggedin">
					<div className="profile image" data-img={user.image}></div>
					<p>
						{user.firstname} {user.lastname}
					</p>
					<div
						className="logout icon"
						onClick={() =>
							dispatch(userLogout(refresh, authorization))
						}
					></div>
				</div>
			) : (
				<div className="bottom loggedout">
					<p>Log in / Sign up</p>
					<div
						className="login icon"
						onClick={() =>
							dispatch(
								userLogin('andreasgdp@gmail.com', '123456')
							)
						}
					></div>
				</div>
			)}
		</div>
	);
}
