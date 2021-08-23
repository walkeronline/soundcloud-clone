import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import ScriptTag from 'react-script-tag'
import * as songActions from '../../store/song';

import './SongPage.css';

// import '../../scripts/visualizer.js';

export default function SongPage() {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const currentSong = useSelector((state) => state.song);
	const [song, setSong] = useState(null);
	const [imageUrl, setImageUrl] = useState(
		'https://mymusicdb.s3.us-east-2.amazonaws.com/profile-pictures/default.png'
	);

	useEffect(() => {
		dispatch(songActions.fetchSong(songId));
	}, [dispatch, songId]);

	useEffect(() => {
		if (currentSong) {
			setSong(currentSong);
		}
	}, [currentSong]);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = '../visualizer.js';
		script.async = true;
		document.body.appendChild(script);
	}, [song]);

	const convertDate = (str) => {
		const date = new Date(str).toDateString().split(' ').slice(1).join(' ');
		return date;
	};

	return (
		<div className="main">
			{song?.song && (
				<div>
					<div className="main-song-container">
						<div className="song-info">
							<h1 className="song-title">{song.song.title}</h1>
							<h2 className="song-owner">
								<Link to={`/users/${song.song.User?.username}`}>
									{song.song.User?.username}
								</Link>
							</h2>
							<h3 className="date">{convertDate(song.song.createdAt)}</h3>
							{song.song.albumId && (
								<Link to={`/albums/${song.song.albumId}`}>
									{song.song.Album?.title}
								</Link>
							)}
						</div>
						<img
							className="song-image"
							src={song.song.imageUrl ? song.song.imageUrl : imageUrl}
							alt={`${song.song.User?.username}'s profile`}
						/>
						<audio
							id="audio"
							preload="auto"
							className="audio-player-main"
							controls
						>
							<source src={song.song.songUrl} />
						</audio>
					</div>
					<div className="song-comments">
						{song.song.Comments &&
							song.song.Comments.map((comment) => {
								return (
									<>
										<img
											src={
												comment.User.profileImageUrl
													? comment.User.profileImageUrl
													: imageUrl
											}
											alt={`${comment.User.username}'s profile`}
										/>
										<Link
											to={`/users/${comment.User.id}`}
											className="comment-user"
										>
											{comment.User.username}
										</Link>
										<h3 className="date">{convertDate(comment.createdAt)}</h3>
										<p className="comment-body">{comment.body}</p>
									</>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
}
