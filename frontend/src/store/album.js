import { csrfFetch } from './csrf';

const SET_ALBUM = 'album/setAlbum';

const setAlbum = (album) => {
	return {
		type: SET_ALBUM,
		payload: album,
	};
};

export const fetchAlbum = (album) => async (dispatch) => {
	const response = await csrfFetch(`/api/albums/${album}`, {
		method: 'GET',
	});
	const data = await response.json();
	dispatch(setAlbum(data));
	return data;
};

const initialState = { album: null };
const albumReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALBUM:
			return { ...state, album: action.payload };
		default:
			return state;
	}
};

export default albumReducer;
