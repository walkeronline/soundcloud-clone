import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import './Splash.css';

function SplashPage() {
	return (
		<div className="main">
			<h2>What's next in music is first on SoundCloud</h2>
			<h3>
				Upload your first track and begin your journey. SoundCloud gives you
				space to create, find your fans, and connect with other artists.
			</h3>
			<Link id="splash-acc-button" to="/signup">
				Start uploading today
			</Link>
			<Link to="/songs/1">1</Link>
			<Link to="/songs/2">2</Link>
			<Link to="/songs/3">3</Link>
			<Link to="/songs/4">4</Link>
			<Link to="/songs/5">5</Link>
		</div>
	);
}

export default SplashPage;
