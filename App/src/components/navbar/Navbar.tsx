import React from 'react';
import { logIn, logOut } from '../../reducers/isLoggedIn';
import { setNavIndex, setNavCollapsed } from '../../reducers/navState';

import './Navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
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
		title: 'Browse recepies',
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
	const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
	const dispatch = useDispatch();

	return (
		<div id="navbar" className={navCollapsed ? 'thin' : 'wide'}>
			<div className="top">
				<div className="logo icon"></div>
				<p>MealPlanr</p>
				<div
					className="burger icon"
					onClick={() => dispatch(setNavCollapsed())}
				>
					x
				</div>
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
						<div className={'icon ' + index}></div>
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
					<div className="logout icon" onClick={() => logOut()}></div>
				</div>
			) : (
				<div className="bottom loggedout">
					<p>Log in / Sign up</p>
					<div className="login icon" onClick={() => logIn()}></div>
				</div>
			)}
		</div>
	);
}
