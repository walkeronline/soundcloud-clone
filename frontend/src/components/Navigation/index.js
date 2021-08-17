import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<>
				<NavLink to="/login">Sign in</NavLink>
				<NavLink to="/signup">Create account</NavLink>
			</>
		);
	}

	return (
		<div className="main-nav">
			<ul>
				<li>
					<NavLink exact to="/">
						<h1 className="hero-logo">SOUNDCLOUD</h1>
					</NavLink>
					{isLoaded && sessionLinks}
				</li>
			</ul>
		</div>
	);
}

export default Navigation;
