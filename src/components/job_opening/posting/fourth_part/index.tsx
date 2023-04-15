import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { inputPostingState } from '../../../../recoil/atom/posting';
import CommonButton from '../../../common/Button';
import {
	ItemTitle,
	PlaceHolder,
	PlaceHolderWrapper,
	SubTitleWrapper,
} from '../first_part';

/*
	is_time_negotiable: 0,
	contents: '',
	address: '',
*/

export default function JobOpeningPostingFourthPart() {
	return (
		<Container>
			<SubTitleWrapper>
				<ItemTitle>상세정보</ItemTitle>
				<PlaceHolderWrapper>
					<label>
						<textarea name="postContent" rows={4} cols={40} />
					</label>
				</PlaceHolderWrapper>
			</SubTitleWrapper>
			<SubTitleWrapper>
				<ItemTitle>근무장소</ItemTitle>
				<PlaceHolderWrapper style={{ marginBottom: 15 }}>
					<PlaceHolder />
				</PlaceHolderWrapper>
				<DetailedAddressWrapper>
					<AddressLabel>상세주소</AddressLabel>
					<PlaceHolder />
				</DetailedAddressWrapper>
			</SubTitleWrapper>
			<CommonButton
				wrapperStyle={{
					width: 65,
					height: 30,
					color: '#EA7B14',
				}}
				extraWrapperStyle={{ marginTop: 40 }}
			>
				등록하기
			</CommonButton>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 20px;
`;

const AddressLabel = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
	font-weight: bold;
	width: 80px;
`;

const DetailedAddressWrapper = styled.div`
	display: flex;
`;
