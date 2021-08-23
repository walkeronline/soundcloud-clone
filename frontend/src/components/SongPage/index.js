import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import ScriptTag from 'react-script-tag'
import * as songActions from '../../store/song';
import LoginFormModal from '../LoginFormModal';
import EditCommentModal from './EditCommentModal';

import './SongPage.css';

// import '../../scripts/visualizer.js';

export default function SongPage() {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const currentSong = useSelector((state) => state.song);
	const sessionUser = useSelector((state) => state.session.user);
	const [song, setSong] = useState(null);
	const [comment, setComment] = useState('');
	const [newComment, setNewComment] = useState('');
	const [imageUrl, setImageUrl] = useState(
		'https://mymusicdb.s3.us-east-2.amazonaws.com/profile-pictures/default.png'
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(
			songActions.createComment({
				body: comment,
				songId,
				userId: sessionUser.id,
			})
		).then(() => {
			setComment('');
		});
	};

	const deleteComment = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const [commentId, userId] = e.target.id.split('-');
		dispatch(songActions.deleteComment({ commentId }));
		const comment = document.getElementById(commentId);
		comment.style.display = 'none';
	};

	const editComment = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const [commentId, userId] = e.target.id.split('-');

		const commentBody = document.getElementById(`${commentId}-body`);
		const body = commentBody.innerText;
	};

	const editButtons = (commentId, userId) => {
		if (userId === sessionUser.id) {
			return (
				<>
					<EditCommentModal commentId={commentId} />
					<button
						onClick={deleteComment}
						id={`${commentId}-${userId}-del`}
						className="del-button"
					>
						Delete
					</button>
				</>
			);
		} else {
			return <></>;
		}
	};

	const deleteSong = (e) => {
		e.preventDefault();
		const songId = e.target.id.split('-')[2];
		dispatch(songActions.deleteSong({ songId }));
		window.location.href = '/feed';
	};

	useEffect(() => {
		dispatch(songActions.fetchSong(songId));
	}, [dispatch, songId]);

	useEffect(() => {
		if (currentSong) {
			setSong(currentSong);
		}
	}, [currentSong]);
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
									@{song.song.User?.username}
								</Link>
							</h2>

							<h3 className="date">{convertDate(song.song.createdAt)}</h3>
						</div>
						<img
							className="song-image"
							src={song.song.imageUrl ? song.song.imageUrl : imageUrl}
							alt={`${song.song.User?.username}'s profile`}
						/>
						{song.song.albumId && (
							<Link className="album-href" to={`/albums/${song.song.albumId}`}>
								{`${song.song.Album?.title}`}
							</Link>
						)}
						<audio
							id="audio"
							preload="auto"
							className="audio-player-main"
							controls
						>
							<source src={song.song.songUrl} />
						</audio>
						{sessionUser.id === song.song.User.id && (
							<>
								<button
									className="eee"
									onClick={deleteSong}
									id={`del-song-${song.song.id}`}
								>
									Delete
								</button>
							</>
						)}
					</div>
					<div className="song-comments">
						<div className="add-comment">
							<form onSubmit={handleSubmit}>
								<label>
									<input
										type="textarea"
										placeholder="Add a comment"
										value={comment}
										onChange={(e) => setComment(e.target.value)}
									></input>
								</label>
								<button type="submit">Post</button>
							</form>
						</div>
						<h3 className="comments-header">Comments</h3>
						{song.song.Comments &&
							song.song.Comments.map((comment) => {
								return (
									<div
										className="comment-container"
										id={comment.id}
										key={comment.id}
									>
										<div className="image-name-container">
											<Link to={`/users/${comment.User.username}`}>
												<img
													className="mini-profile-img"
													src={
														comment.User.profileImageUrl
															? comment.User.profileImageUrl
															: imageUrl
													}
													alt={`${comment.User.username}'s profile`}
												/>
											</Link>

											<div className="name-date-container">
												<Link
													to={`/users/${comment.User.username}`}
													className="comment-user"
												>
													{comment.User.username}
												</Link>
												<h3 className="date">
													{convertDate(comment.createdAt)}
												</h3>
											</div>
										</div>
										<p id={`${comment.id}-body`} className="comment-body">
											{comment.body}
										</p>
										{editButtons(comment.id, comment.userId)}
									</div>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
}
