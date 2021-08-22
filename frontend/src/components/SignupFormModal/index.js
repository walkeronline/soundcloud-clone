import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm'
import { Link } from 'react-router-dom';

import './SignupForm.css'

function SignupFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Link className="active" onClick={() => setShowModal(true)}>Create account</Link>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SignupForm />
				</Modal>
			)}
		</>
	);
}

export default SignupFormModal;
