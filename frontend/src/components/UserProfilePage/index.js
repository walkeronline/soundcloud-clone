import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import userReducer, * as userActions from '../../store/user';

import './UserProfile.css';

export default function UserProfile() {
	const { username } = useParams();
	const dispatch = useDispatch();
	// const sessionUser = useSelector((state) => state.sessionUser.user);
	const currentUser = useSelector((state) => state.user);
	const [user, setUser] = useState(null);

	useEffect(() => {
		dispatch(userActions.fetchUser(username));
	}, []);

	useEffect(() => {
		if (currentUser) setUser(currentUser);
	}, [currentUser]);

	const profileImg = currentUser?.currUser?.profileImageUrl
		? currentUser.currUser.profileImageUrl
		: 'https://mymusicdb.s3.us-east-2.amazonaws.com/profile-pictures/default.jpg';

	return (
		<div className="main-user-profile">
			{currentUser?.currUser && (
				<div className="user-header">
					<img
						className="profile-picture"
						src={profileImg}
						alt={`${currentUser.currUser.username}'s profile`}
					/>
					<h2 className="display-name">{currentUser.currUser.displayName}</h2>
					<h3 className="username">{currentUser.currUser.username}</h3>
					<div className="user-songs">
						{currentUser.currUser.Songs.map((song) => (
							<div class="mini-song">
								<img
									className="mini-song-pic"
									src={song.imageUrl}
									alt={song.title}
								/>
								<h4 className="song-user-title">
									{currentUser.currUser.displayName}
								</h4>
								<h3 className="song-title">{song.title}</h3>
								<audio
									id="audio"
									preload="auto"
									className="audio-player"
									controls
								>
									<source src={song.songUrl} />
								</audio>
							</div>
						))}
						<div className="user-albums">
							{currentUser.currUser.Albums.map((album) => (
								<Link to={`/albums/${album.id}`}>
									<h3>{album.title}</h3>
									<img
										className="mini-album-pic"
										src={album.imageUrl}
										alt={album.title}
									/>
								</Link>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
