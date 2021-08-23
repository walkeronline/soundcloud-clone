import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import './AlbumPage.css';
import * as albumActions from '../../store/album';

export default function AlbumPage() {
	const { albumId } = useParams();
	const dispatch = useDispatch();
	const currentAlbum = useSelector((state) => state.album);
	const [album, setAlbum] = useState(null);

	useEffect(() => {
		dispatch(albumActions.fetchAlbum(albumId));
	}, [dispatch, albumId]);

	useEffect(() => {
		if (currentAlbum) {
			setAlbum(currentAlbum);
		}
	}, [currentAlbum]);

	const convertDate = (str) => {
		const date = new Date(str).toDateString().split(' ').slice(1).join(' ');
		return date;
	};

	const imageUrl = album?.album?.imageUrl
		? album.album.imageUrl
		: 'https://mymusicdb.s3.us-east-2.amazonaws.com/profile-pictures/default.png';

	return (
		<div className="album-container">
			{album?.album && (
				<>
					<div className="album-info">
						<img
							className="album-pic"
							src={album.album.imageUrl ? album.album.imageUrl : imageUrl}
							alt={album.album.title}
						/>
						<div className="user-info-names">
							<h2 className="album-title">{album.album.title}</h2>
							<h3 className="album-user">
								<Link to={`/users/${album.album.User.username}`}>
									{album.album.User.displayName}
								</Link>
							</h3>
							<h3 className="date">{convertDate(album.album.createdAt)}</h3>
						</div>
					</div>
					<div className="album-songs">
						{album.album.Songs.map((song) => (
							<>
								<div className="mini-song">
									<Link className="song-link" to={`/songs/${song.id}`}>
										{/* <img
											className="mini-song-pic"
											src={song.imageUrl ? song.imageUrl : imageUrl}
											alt={song.title}
										/> */}
										<div className="mini-song-info">
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
				</>
			)}
		</div>
	);
}
