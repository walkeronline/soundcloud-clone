import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import Search from './Search';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	let home = sessionUser ? '/feed' : '/';
	if (sessionUser) {
		sessionLinks = (
			<>
				<li>
					<NavLink to="/feed">Feed</NavLink>
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
					<ProfileButton user={sessionUser} />
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
				<li>
					<SignupFormModal />
				</li>
			</>
		);
	}

	return (
		<div className="main-nav">
			<header>
				<NavLink className="hero-logo" exact to={home}>
					SoundsLoud
				</NavLink>
				<ul>{isLoaded && sessionLinks}</ul>
			</header>
		</div>
	);
}

export default Navigation;
