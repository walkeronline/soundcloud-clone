import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
		console.log(currentAlbum);
	}, [currentAlbum]);

	return <div></div>;
}
