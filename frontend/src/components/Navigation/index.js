import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<>
				<li>
					<NavLink to="/about">About</NavLink>
				</li>
				<li>
					<NavLink to="/upload">Upload</NavLink>
				</li>
				<li>
					<NavLink to={`/users/${sessionUser.username}`}>
						{sessionUser.username}
					</NavLink>
				</li>
				<li>
					<i class="fa-solid fa-ellipsis"></i>
				</li>
			</>
		);
	} else {
		sessionLinks = (
			<>
				<li>
					<NavLink to="/about">About</NavLink>
				</li>
				<li>
					<LoginFormModal />
				</li>
				{/* <li>
					<NavLink className="active" to="/signup">
						Create account
					</NavLink>
				</li> */}
				<li>
					<SignupFormModal />
				</li>
			</>
		);
	}

	return (
		<div className="main-nav">
			<header>
				<NavLink className="hero-logo" exact to="/">
					SoundsLoud
				</NavLink>
				<ul>{isLoaded && sessionLinks}</ul>
			</header>
		</div>
	);
}

export default Navigation;
