import React from 'react';
import styled from 'styled-components';
import { postingConstant } from '../../../../constant/constant';

export default function JobOpeningPostingFirstPart() {
	const { PostingFirstPartInfo } = postingConstant;
	return (
		<Container>
			{PostingFirstPartInfo.map((el) => (
				<SubTitleWrapper key={el[0]}>
					<ItemTitle>{el[0]}</ItemTitle>
					<PlaceHolderWrapper>
						<PlaceHolder type="text" placeholder={el[1]} />
					</PlaceHolderWrapper>
				</SubTitleWrapper>
			))}
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 20px;
`;

export const SubTitleWrapper = styled.div`
	margin-bottom: 20px;
`;

export const ItemTitle = styled.div`
	font-size: 18px;
	font-weight: bold;
	padding-bottom: 15px;
`;

export const PlaceHolderWrapper = styled.div`
	display: flex;
`;

interface IPlaceHolderProps {
	placeholder: string;
}

export const PlaceHolder = styled.input.attrs<IPlaceHolderProps>(
	({ placeholder }) => ({
		placeholder,
	}),
)`
	width: 100%;
`;

// export const PlaceHolder = styled.div`
// 	width: 50%;
// 	color: #e2e2e2;
// 	padding-bottom: 10px;
// 	border-bottom: 1px solid #e2e2e2;
// `;
