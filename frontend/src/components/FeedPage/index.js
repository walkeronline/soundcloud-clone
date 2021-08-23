import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as songActions from '../../store/song';

import './FeedPage.css';

export default function Feed() {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const currentSong = useSelector((state) => state.song.songs);
	const [songs, setSongs] = useState(null);
	const [imageUrl, setImageUrl] = useState(
		'https://mymusicdb.s3.us-east-2.amazonaws.com/profile-pictures/default.png'
	);

	useEffect(() => {
		dispatch(songActions.fetchFeatured());
	}, [dispatch]);

	useEffect(() => {
		if (currentSong) setSongs(currentSong);
	}, [currentSong]);

	return (
		<div className="songs-container-feed">
			<div className="user-songs">
				<h2 class="songs-header">Feed</h2>
				{currentSong?.map((song) => (
					<>
						<div className="mini-song">
							<Link className="song-link" to={`/songs/${song.id}`}>
								<img
									className="mini-song-pic"
									src={song.imageUrl ? song.imageUrl : imageUrl}
									alt={song.title}
								/>
								<div className="mini-song-info">
									<h4 className="song-user-title">{song.User.username}</h4>
									<h3 className="song-title">{song.title}</h3>
								</div>
							</Link>
						</div>
						<audio
							id="audio"
							preload="auto"
							className="mini-audio-player"
							controls
						>
							<source src={song.songUrl} />
						</audio>
					</>
				))}
			</div>
		</div>
	);
}
