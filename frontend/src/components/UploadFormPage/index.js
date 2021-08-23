import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as songActions from '../../store/song';

import UploadForm from './UploadForm';

function SignupFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Link className="active" onClick={() => setShowModal(true)}>
				Create account
			</Link>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<UploadForm />
				</Modal>
			)}
		</>
	);
}

export default SignupFormModal;
