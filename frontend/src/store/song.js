import { csrfFetch } from './csrf';

const SET_SONG = 'song/setSong';
const DELETE_SONG = 'song/deleteSong';
const UPDATE_SONG = 'song/updateSong';
const CREATE_SONG = 'song/createSong';

const setSong = (song) => {
	return {
		type: SET_SONG,
		payload: song,
	};
};

export const fetchSong = (song) => async (dispatch) => {
	const { songId } = song;
	const response = await csrfFetch(`/api/songs/${songId}`, {
		method: 'GET',
	});
	const data = await response.json();
	dispatch(setSong(data.song));
	console.log(data);
	return response;
};

const initialState = { song: null };

const songReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_SONG:
			return { ...state, song: action.payload };
		default:
			return state;
	}
};

export default songReducer;
