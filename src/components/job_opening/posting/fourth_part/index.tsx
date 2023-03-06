import React from 'react';
import styled from 'styled-components';
import CommonButton from '../../../common/Button';
import {
	ItemTitle,
	PlaceHolder,
	PlaceHolderWrapper,
	SubTitleWrapper,
} from '../first_part';

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
			<div></div>
			<CommonButton
				value="등록하기"
				wrapperStyle={{
					width: 65,
					height: 30,
					color: '#EA7B14',
				}}
				extraWrapperStyle={{ marginTop: 40 }}
			/>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 20px;
`;

const AddressLabel = styled.div`
	display: flex;
	align-items: center;
	font-size: 18px;
	font-weight: bold;
	width: 80px;
`;

const DetailedAddressWrapper = styled.div`
	display: flex;
`;
