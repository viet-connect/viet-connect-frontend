import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { inputPostingState } from '../../../../recoil/atom/posting';
import CommonButton from '../../../common/Button';
import Modal from '../../../common/Modal';
import Postcode from '../../../common/PostCode';
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
	const [showModal, setShowModal] = useState(false);
	const [newJobPosting, setNewJobPosting] = useRecoilState(inputPostingState);

	const handleChangeSubAddress = (e) => {
		setNewJobPosting({
			...newJobPosting,
			address: {
				...newJobPosting.address,
				sub: e.target.value,
				full: `${newJobPosting.address.main} ${e.target.value}`,
			},
		});
	};

	const handleChangeContent = (e) => {
		setNewJobPosting({
			...newJobPosting,
			contents: e.target.value,
		});
	};

	const saveToJobOpeningDB = (e) => {
		console.log(newJobPosting);
	};

	return (
		<Container>
			<SubTitleWrapper>
				<ItemTitle>상세정보</ItemTitle>
				<PlaceHolderWrapper>
					<label>
						<textarea
							value={newJobPosting.contents}
							onChange={handleChangeContent}
							name="postContent"
							rows={4}
							cols={40}
						/>
					</label>
				</PlaceHolderWrapper>
			</SubTitleWrapper>
			<ButtonWrapper>
				<ItemTitle style={{ width: 120, paddingBottom: 0 }}>근무장소</ItemTitle>
				{/* <CommonButton
					wrapperStyle={{
						// width: 355,
						width: 150,
						height: 40,
						color: '#dda672',
					}}
					className="home-button"
					onClick={() => setShowModal(true)}
				>
					클릭해서 주소찾기
				</CommonButton> */}
				<PlaceHolderWrapper
					style={{ height: 30, marginBottom: 15, marginTop: 15 }}
				>
					<PlaceHolder
						defaultValue={newJobPosting.address.main}
						onClick={() => setShowModal(true)}
					/>
				</PlaceHolderWrapper>
				<DetailedAddressWrapper>
					<AddressLabel>상세주소</AddressLabel>
					<PlaceHolder
						defaultValue={newJobPosting.address.sub}
						onChange={handleChangeSubAddress}
					/>
				</DetailedAddressWrapper>
			</ButtonWrapper>
			<CommonButton
				wrapperStyle={{
					width: 150,
					height: 40,
					color: '#EA7B14',
				}}
				extraWrapperStyle={{ marginTop: 40 }}
				onClick={saveToJobOpeningDB}
			>
				등록하기
			</CommonButton>
			<Modal onClose={() => setShowModal(false)} show={showModal}>
				<Postcode onComplete={() => setShowModal(false)} />
				<ClosingModalButton>닫기</ClosingModalButton>
			</Modal>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 20px;
`;

const ButtonWrapper = styled.div``;

const AddressLabel = styled.div`
	display: flex;
	align-items: center;
	font-size: 16px;
	font-weight: bold;
	width: 80px;
`;

const ClosingModalButton = styled.div`
	display: flex;
	margin-top: 30px;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	color: white;
	font-weight: bold;
	border-radius: 10px;
	background-color: #ea7b14;
	height: 40px;
`;

const DetailedAddressWrapper = styled.div`
	display: flex;
	height: 30px;
`;
