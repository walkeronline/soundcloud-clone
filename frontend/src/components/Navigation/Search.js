import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import * as sessionActions from '../../store/session';

export default function Search() {
	const [searchTerm, setSearchTerm] = useState(null);
	const [go, setGo] = useState(false);
	let result = '';
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (searchTerm) setGo(true);
	};

	if (go) {
		result = <Redirect to={`/search/${searchTerm}`} />;
	} else {
		result = (
			<div className="search-container">
				<form onSubmit={handleSubmit} className="search-box">
					<input
						onChange={(e) => setSearchTerm(e.target.value)}
						className="search-input"
						type="text"
						placeholder="Search"
					/>
					<button id="search-logo">Search</button>
				</form>
			</div>
		);
	}

	return result;
}
