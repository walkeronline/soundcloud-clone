import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';

export default function UploadForm() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [albumId, setAlbumId] = useState(null);
	const [url, setUrl] = useState(null);
	const [title, setTitle] = useState(null);
	const [songUrl, setSongUrl] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
}
