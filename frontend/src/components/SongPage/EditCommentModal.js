import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditForm from './EditForm';
import { Link } from 'react-router-dom';

function EditCommentModal({ commentId }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Link onClick={() => setShowModal(true)}>Edit</Link>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditForm commentId={commentId} />
				</Modal>
			)}
		</>
	);
}

export default EditCommentModal;
