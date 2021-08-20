import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Featured from './Featured';

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
			<h3>Hear what's trending in the SoundCloud community</h3>
			<Featured />
			<Link to="/users/menitrust">Men I Trust</Link>
			<Link to="/songs/1">1</Link>
			<Link to="/songs/2">2</Link>
			<Link to="/songs/3">3</Link>
			<Link to="/songs/4">4</Link>
			<Link to="/songs/5">5</Link>
			<Link to="/songs/6">6</Link>
			<Link to="/songs/7">7</Link>
			<Link to="/songs/8">8</Link>
			<Link to="/songs/9">9</Link>
			<Link to="/songs/10">10</Link>
			<Link to="/songs/11">11</Link>
			<Link to="/songs/12">12</Link>
			<Link to="/songs/13">13</Link>
			<Link to="/songs/14">14</Link>
			<Link to="/songs/15">15</Link>
			<Link to="/songs/16">16</Link>
			<Link to="/songs/17">17</Link>
			<Link to="/songs/18">18</Link>
			<Link to="/songs/19">19</Link>
			<Link to="/songs/20">20</Link>
		</div>
	);
}

export default SplashPage;
