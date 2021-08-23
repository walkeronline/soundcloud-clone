import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session';

export default function SearchResults() {
	const searchTerm = useParams();
	const [results, setResults] = useState(null);
	const dispatch = useDispatch();
	const searchRes = useSelector((state) => state.search);

	useEffect(() => {
		dispatch(sessionActions.search(searchTerm));
	}, [dispatch, searchRes]);

	useEffect(() => {
		if (searchRes) {
			setResults(searchRes);
			console.log(results);
		}
	}, [searchRes]);

	return <div></div>;
}
