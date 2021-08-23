import { csrfFetch } from './csrf';

const SET_SONG = 'song/setSong';
const SET_FEATURED = 'song/setFeatured';
const DELETE_SONG = 'song/deleteSong';
const UPDATE_SONG = 'song/updateSong';
const CREATE_SONG = 'song/createSong';

const setSong = (song) => {
	return {
		type: SET_SONG,
		payload: song,
	};
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
	// console.log(data);
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