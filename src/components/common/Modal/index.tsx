import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Modal = ({ show, children, width, height }) => {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const modalContent = show ? (
		<StyledModalOverlay>
			<StyledModal style={{ width, height }}>
				<StyledModalBody>{children}</StyledModalBody>
			</StyledModal>
		</StyledModalOverlay>
	) : null;

	if (isBrowser) {
		return ReactDOM.createPortal(
			modalContent,
			document.getElementById('modal-root'),
		);
	}
	return null;
};

const StyledModalBody = styled.div`
	padding-top: 10px;
`;

const StyledModal = styled.div`
	background: white;

	border-radius: 15px;
	padding: 15px;
`;
const StyledModalOverlay = styled.div`
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
