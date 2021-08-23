import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { uploadSong } from '../../store/song';
import { Modal } from '../../context/Modal';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import * as songActions from '../../store/song';
import * as albumActions from '../../store/album';

import './UploadForm.css';

export default function UploadForm() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const userId = sessionUser?.id;
	const [albumId, setAlbumId] = useState(null);
	const [url, setUrl] = useState('/songs/' + Math.random() * 100000);
	const [title, setTitle] = useState(null);
	const [songUrl, setSongUrl] = useState(null);
	const currentSong = useSelector((state) => state.song.songs);
	const [songId, setSongId] = useState(0);
	const [songs, setSongs] = useState(null);
	const [albumTitle, setAlbumTitle] = useState('');
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

		dispatch(uploadSong({ userId, albumId, url, title, songId })).then(() => {
			setTitle('');
			setSongUrl(null);
		});
		window.location.href = '/feed';
	};

	const createAlbum = (e) => {
		e.preventDefault();
		dispatch(albumActions.createAlbum({ albumTitle, userId, imageUrl }));
		window.location.href = `/users/${sessionUser?.username}`;
	};

	return (
		<div className="forms">
			<h2>Upload a Song</h2>
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
			<h2>Create an Album</h2>
			<form onSubmit={createAlbum}>
				<label>
					<input
						type="text"
						value={albumTitle}
						placeholder="Album title"
						onChange={(e) => setAlbumTitle(e.target.value)}
					/>
					<button type="submit">Create Album</button>
				</label>
			</form>
		</div>
	);
}
