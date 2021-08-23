import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_SEARCH = 'session/search';

const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

const setSearch = (search) => {
	return {
		type: SET_SEARCH,
		payload: search,
	};
};

export const search = (searchTerm) => async (dispatch) => {
	const response = await csrfFetch('/api/songs/search', {
		method: 'POST',
		body: JSON.stringify({
			searchTerm,
		}),
	});
	const data = await response.json();
	dispatch(setSearch(data));
	return response;
};

export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await csrfFetch('/api/session', {
		method: 'POST',
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

const initialState = { user: null, search: null };

const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			// newState = Object.assign({}, state);
			// newState.user = action.payload;
			// return newState;
			return { ...state, user: action.payload };
		case REMOVE_USER:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		case SET_SEARCH:
			return { ...state, search: action.payload };
		default:
			return state;
	}
};

export const restoreUser = () => async (dispatch) => {
	const response = await csrfFetch('/api/session');
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const signup = (user) => async (dispatch) => {
	const { username, email, password, displayName } = user;
	// console.log(username, email, password, displayName)
	const response = await csrfFetch('/api/users', {
		method: 'POST',
		body: JSON.stringify({
			username,
			email,
			password,
			displayName,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const logout = () => async (dispatch) => {
	const response = await csrfFetch('/api/session', {
		method: 'DELETE',
	});
	dispatch(removeUser());
	return response;
};

export const createUser = (user) => async (dispatch) => {
	const { images, image, username, email, password } = user;
	const formData = new FormData();
	formData.append('username', username);
	formData.append('email', email);
	formData.append('password', password);

	// for multiple files
	if (images && images.length !== 0) {
		for (var i = 0; i < images.length; i++) {
			formData.append('images', images[i]);
		}
	}

	// for single file
	if (image) formData.append('image', image);

	const res = await csrfFetch(`/api/users/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		body: formData,
	});

	const data = await res.json();
	dispatch(setUser(data.user));
};

export default sessionReducer;
