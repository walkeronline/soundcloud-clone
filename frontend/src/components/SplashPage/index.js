import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Featured from './Featured';
import SignupFormModal from '../SignupFormModal';

import './Splash.css';

function SplashPage() {
	return (
		<div className="main-container">
			<section className="main-content">
				<h1 className="motto">
					What's next in music is first on{' '}
					<Link to="/signup" className="emphasis">
						SoundsLoud
					</Link>
				</h1>
				<h2 className="sub-motto">
					SoundsLoud gives you space to create, find your fans, and connect with
					other artists.
				</h2>
				<button className="splash-modal">
					<SignupFormModal bypass={true} />
				</button>
			</section>
		</div>
	);
}

export default SplashPage;
