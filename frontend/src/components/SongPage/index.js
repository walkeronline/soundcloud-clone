import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as songActions from '../../store/song';

export default function SongPage() {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const currentSong = useSelector((state) => state.song);
	const [song, setSong] = useState(null);

	useEffect(() => {
		dispatch(songActions.fetchSong(songId));
		setSong(currentSong);
		console.log(song);
	}, [song]);

	return (
		<div class="main">
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
					<ul>
						{song.song.Comment &&
							song.song.Comment.map((comment) => (
								<li key={comment.id}>comment.body</li>
							))}
					</ul>
				</div>
			)}
		</div>
	);
}
