import { Link } from 'react-router-dom';

import './Splash.css';

function SplashPage() {
	return (
		<div class="main">
			<h2>What's next in music is first on SoundCloud</h2>
			<h3>
				Upload your first track and begin your journey. SoundCloud gives you
				space to create, find your fans, and connect with other artists.
			</h3>
			<Link id="splash-acc-button" to="/signup">
				Start uploading today
			</Link>
		</div>
	);
}

export default SplashPage;
