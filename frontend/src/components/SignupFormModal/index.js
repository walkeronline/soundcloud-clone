import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import { Link } from 'react-router-dom';

import './SignupForm.css';

function SignupFormModal({ bypass }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Link className="active" onClick={() => setShowModal(true)}>
				{!bypass && 'Create account'}
			</Link>
			{showModal && (
				<Modal onClose={() => setShowModal(false)} customHeight={450}>
					<SignupForm />
				</Modal>
			)}
		</>
	);
}

export default SignupFormModal;
