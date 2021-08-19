import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as userActions from '../../store/user';

export default function UserProfile() {
	const { username } = useParams();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.sessionUser.user);
	const currentUser = useSelector((state) => state.user);
	const [user, setUser] = useState(null);

	useEffect(() => {
		dispatch();
	});
}
