import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as songActions from '../../store/song';

export default function SongPage() {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [song, setSong] = useState(null);

	useEffect(() => async () => {
		setSong(dispatch(songActions.fetchSong(songId)));
		console.log(song);
		// console.log(songId)
	});

	return <div class="main">{song}</div>;
}
