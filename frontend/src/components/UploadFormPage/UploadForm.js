import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { uploadSong } from '../../store/song';
import { Modal } from '../../context/Modal';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import * as songActions from '../../store/song';

import './UploadForm.css';

export default function UploadForm() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const userId = sessionUser.id;
	const [albumId, setAlbumId] = useState(null);
	const [url, setUrl] = useState('/songs/' + Math.random() * 100000);
	const [title, setTitle] = useState(null);
	const [songUrl, setSongUrl] = useState(null);
	const currentSong = useSelector((state) => state.song.songs);
	const [songId, setSongId] = useState(0);
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

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(title, songId, userId, albumId, url);

		dispatch(uploadSong({ userId, albumId, url, title, songId })).then(() => {
			setTitle('');
			setSongUrl(null);
		});
		window.location.href = '/feed';
	};

	return (
		<div className="form">
			<h1>Upload a Song</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<select
					value={songId}
					onChange={(e) => {
						setSongId(e.target.value);
					}}
					name="song-select"
					className="song-select"
				>
					{currentSong &&
						currentSong.map((song) => (
							<option value={song.id}>{song.title}</option>
						))}
				</select>
				<button type="submit">Upload Song</button>
			</form>
		</div>
	);
}
