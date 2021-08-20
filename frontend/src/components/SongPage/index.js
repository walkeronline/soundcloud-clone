import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as songActions from '../../store/song';

import './SongPage.css';

export default function SongPage() {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const currentSong = useSelector((state) => state.song);
	const [song, setSong] = useState(null);

	useEffect(() => {
		dispatch(songActions.fetchSong(songId));
		setSong(currentSong);
		console.log(currentSong);
	}, []);

	const convertDate = (str) => {
		const date = new Date(str).toDateString();
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
								<Link to={`/users/${song.song.User?.id}`}>
									{song.song.User?.username}
								</Link>
							</h2>
						</div>
						<img
							className="song-image"
							src={song.song.imageUrl}
							alt={`${song.song.User?.username}'s profile`}
						/>
						<audio id="audio" preload="auto" className="audio-player" controls>
							<source src={song.song.songUrl} />
						</audio>
					</div>
					<ul className="comment-list">
						{song.song.Comments &&
							song.song.Comments.map((comment) => (
								<div className="comment-container">
									<li className="comment" key={comment.id}>
										<Link
											to={`/users/${comment.User.id}`}
											className="comment-user"
										>
											{comment.User.username}
										</Link>
										<p className="comment-body">{comment.body}</p>
										<p className="comment-date">
											{convertDate(comment.createdAt)}
										</p>
									</li>
								</div>
							))}
					</ul>
				</div>
			)}
		</div>
	);
}
