import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { postingConstant } from '../../../../constant/constant';
import { inputPostingState } from '../../../../recoil/atom/posting';
import CommonUtils from '../../../../utils/commonUtils';

/*
	title: '',
	contact_name: '',
	contact_number: 0,
*/

export default function JobOpeningPostingFirstPart({ data }) {
	const { t } = useTranslation();
	const { PostingFirstPartInfo } = postingConstant;
	const [newJobPosting, setNewJobPosting] = useRecoilState(inputPostingState);

	return (
		<Container>
			{PostingFirstPartInfo.map((el) => (
				<SubTitleWrapper key={el[0]}>
					<ItemTitle>{t(`posting:${el[0]}`)}</ItemTitle>
					<PlaceHolderWrapper>
						<PlaceHolder
							type="text"
							placeholder={t(`posting:${el[1]}`)}
							name={el[2]}
							defaultValue={newJobPosting[el[2]]}
							onChange={(e) => {
								if (e.target.name === 'contact_number') {
									e.target.value = CommonUtils.addHyphenToPhoneNumber(
										e.target.value,
									);
								}

								setNewJobPosting({
									...newJobPosting,
									[e.target.name]: e.target.value,
								});
							}}
							maxLength={el[0] ? 50 : 20}
						/>
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
	font-size: 16px;
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
	({ placeholder, required }) => ({
		placeholder,
		required,
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
