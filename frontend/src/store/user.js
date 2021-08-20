import { csrfFetch } from './csrf';

const SET_USER = 'song/setUser';
const UPDATE_USER = 'song/updateUser';

const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

export const fetchUser = (user) => async (dispatch) => {
	const userId = user;
	const response = await csrfFetch(`/api/users/${userId}`, {
		method: 'GET',
	});
	const data = await response.json();
	dispatch(setUser(data));
	// console.log(data);
	return data;
};

const initialState = { user: null };

const userReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

export default userReducer;
