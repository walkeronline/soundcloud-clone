import { csrfFetch } from './csrf';

const SET_CURRENT_USER = 'user/setUser';
const UPDATE_USER = 'user/updateUser';

const setCurrentUser = (user) => {
	return {
		type: SET_CURRENT_USER,
		payload: user,
	};
};

export const fetchUser = (user) => async (dispatch) => {
	const username = user;
	const response = await csrfFetch(`/api/users/${username}`, {
		method: 'GET',
	});
	const data = await response.json();
	dispatch(setCurrentUser(data));
	return data;
};

const initialState = { currUser: null };

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return { ...state, currUser: action.payload };
		default:
			return state;
	}
};

export default userReducer;
