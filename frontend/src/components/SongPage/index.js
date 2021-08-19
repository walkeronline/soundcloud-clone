import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as songActions from '../../store/song';

import './SongPage.css';

export default function SongPage() {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const currentSong = useSelector((state) => state.song);
	const [song, setSong] = useState(null);

	useEffect(() => {
		dispatch(songActions.fetchSong(songId));
		setSong(currentSong);
	}, []);

	const convertDate = (str) => {
		const date = new Date(str).toDateString();
		return date;
	};

	return (
		<div className="main">
			{song?.song && (
				<div>
					<h1>{song.song.title}</h1>
					<h2>
						<Link to={`/users/${song.song.User?.id}`}>
							{song.song.User?.username}
						</Link>
					</h2>
					<audio controls>
						<source src={song.song.songUrl} />
					</audio>
					<img
						src={song.song.imageUrl}
						alt={`${song.song.User?.username}'s profile`}
					/>
					<ul className="comment-list">
						{song.song.Comments &&
							song.song.Comments.map((comment) => (
								<div class="comment-container">
									<li className="comment" key={comment.id}>
										<Link
											to={`/users/${comment.User.id}`}
											className="comment-user"
										>
											{comment.User.username}
										</Link>
										<p class="comment-body">{comment.body}</p>
										<p class="comment-date">{convertDate(comment.createdAt)}</p>
									</li>
								</div>
							))}
					</ul>
				</div>
			)}
		</div>
	);
}
