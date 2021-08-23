import { csrfFetch } from './csrf';

const SET_SONG = 'song/setSong';
const SET_FEATURED = 'song/setFeatured';
const DELETE_SONG = 'song/deleteSong';
const UPDATE_SONG = 'song/updateSong';
const CREATE_SONG = 'song/createSong';
const CREATE_COMMENT = 'song/createComment';

const setSong = (song) => {
	return {
		type: SET_SONG,
		payload: song,
	};
};

export const deleteSong = (song) => async (dispatch) => {
	const { songId } = song;
	const response = await csrfFetch('/api/songs', {
		method: 'DELETE',
		body: JSON.stringify({
			songId,
		}),
	});
	const data = await response.json();
	return response;
};

export const createComment = (comment) => async (dispatch) => {
	const { body, songId, userId } = comment;
	const response = await csrfFetch('/api/comments', {
		method: 'POST',
		body: JSON.stringify({
			userId,
			songId,
			body,
		}),
	});
	const data = await response.json();
	return response;
};

export const editComment = (comment) => async (dispatch) => {
	const { body, commentId } = comment;
	const response = await csrfFetch('/api/comments', {
		method: 'PUT',
		body: JSON.stringify({ body, commentId }),
	});
	const data = await response.json();
	return response;
};

export const deleteComment = (comment) => async (dispatch) => {
	const { commentId } = comment;
	const response = await csrfFetch('/api/comments', {
		method: 'DELETE',
		body: JSON.stringify({ commentId }),
	});
	const data = await response.json();
	return response;
};

export const uploadSong = (song) => async (dispatch) => {
	const { userId, albumId, url, title, songUrl, imageUrl, songId } = song;
	const response = await csrfFetch('/api/songs', {
		method: 'POST',
		body: JSON.stringify({
			userId,
			albumId,
			url,
			title,
			songUrl,
			imageUrl,
			songId,
		}),
	});
	dispatch(setSong(data));
	const data = await response.json();
	return response;
};

const setFeatured = (songs) => {
	return {
		type: SET_FEATURED,
		payload: songs,
	};
};

export const fetchSong = (song) => async (dispatch) => {
	const songId = song;
	const response = await csrfFetch(`/api/songs/${songId}`, {
		method: 'GET',
	});
	const data = await response.json();
	dispatch(setSong(data));
	return data;
};

export const fetchFeatured = () => async (dispatch) => {
	const response = await csrfFetch('/api/songs/feed', {
		method: 'GET',
	});
	const data = await response.json();
	dispatch(setFeatured(data));
	return data;
};

const initialState = { song: null, songs: null };

const songReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SONG:
			return { ...state, song: action.payload };
		case SET_FEATURED:
			return { ...state, songs: action.payload };

		default:
			return state;
	}
};

export default songReducer;
