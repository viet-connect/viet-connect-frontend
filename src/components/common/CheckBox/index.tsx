import React from 'react';
import styled from 'styled-components';

export default function Checkbox({ children, checked, onChange }) {
	return (
		<label>
			<BoxWrapper>
				<InputWrapper>
					<input
						style={{ width: 20, height: 20, cursor: 'pointer' }}
						type="checkbox"
						checked={checked}
						onChange={() => onChange(!checked)}
					/>
				</InputWrapper>
				{children}
			</BoxWrapper>
		</label>
	);
}

const BoxWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const InputWrapper = styled.div`
	display: flex;
	align-items: center;
`;
