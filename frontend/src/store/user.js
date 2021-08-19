import { csrfFetch } from './csrf';

const SET_USER = 'song/setSong';
const UPDATE_USER = 'song/updateSong';

const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

export const fetchUser = (song) => async (dispatch) => {
	const songId = song;
	const response = await csrfFetch(`/api/songs/${songId}`, {
		method: 'GET',
	});
	const data = await response.json();
	dispatch(setUser(data));
	// console.log(data);
	return data;
};

const initialState = { user: null };

const songReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

export default songReducer;
