import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as commentActions from '../../store/song';

export default function EditForm({ commentId }) {
	const dispatch = useDispatch();
	const [body, setBody] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(commentActions.editComment({ commentId, body }));
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Comment
				<input
					type="text"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				></input>
			</label>
			<button type="submit">Save</button>
		</form>
	);
}
