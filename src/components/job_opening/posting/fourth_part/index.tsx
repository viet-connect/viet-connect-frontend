import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { FcHighPriority } from 'react-icons/fc';
import { useRouter } from 'next/router';
import { Bars } from 'react-loader-spinner';
import { Posting, IPosting } from '../../../../models/posting';
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
	contents: '',
	address: '',
*/

export default function JobOpeningPostingFourthPart({ data, setIsRequesting }) {
	const [showModal, setShowModal] = useState(false);
	const [newJobPosting, setNewJobPosting] = useRecoilState(inputPostingState);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [error, setError] = useState({});
	const router = useRouter();

	const toggleModal = async (e) => {
		if (!Posting.validateNewPost(newJobPosting)) {
			setIsRequesting(true);
			try {
				await postRequest(newJobPosting);
			} catch (err) {
				console.log(err);
			} finally {
				setIsRequesting(false);
				router.push('/');
			}
		} else {
			setError(Posting.validateNewPost(newJobPosting));
			setShowErrorModal(true);
		}
	};

	const postRequest = async (posting: IPosting) => {
		console.log('posting', posting);

		try {
			await Posting.handleNewPost(posting);
		} catch (err) {
			console.log('err', err);
		}
	};

	return (
		<Container>
			<SubTitleWrapper>
				<ItemTitle>상세정보</ItemTitle>
				<PlaceHolderWrapper>
					<label>
						<textarea
							value={newJobPosting.contents}
							onChange={(e) =>
								setNewJobPosting({
									...newJobPosting,
									contents: e.target.value,
								})
							}
							name="postContent"
							rows={4}
							cols={40}
							placeholder="200자 이내로 입력해주세요"
							maxLength={210}
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
						placeholder="클릭해서 주소 찾아주세요"
						onClick={() => setShowModal(true)}
						readOnly={true}
					/>
				</PlaceHolderWrapper>
				<DetailedAddressWrapper>
					<AddressLabel>상세주소</AddressLabel>
					<PlaceHolder
						style={{ height: 30 }}
						defaultValue={newJobPosting.address.sub}
						onChange={(e) => {
							setNewJobPosting({
								...newJobPosting,
								address: {
									...newJobPosting.address,
									sub: e.target.value,
									full: `${newJobPosting.address.main} ${e.target.value}`,
								},
							});
						}}
					/>
				</DetailedAddressWrapper>
			</ButtonWrapper>
			<RegisterInputContainer>
				<RegisterInputItemWrapper>작성자</RegisterInputItemWrapper>
				<PlaceHolder
					style={{ height: 30 }}
					defaultValue={newJobPosting.author}
					onChange={(e) => {
						setNewJobPosting({
							...newJobPosting,
							author: e.target.value,
						});
					}}
					maxLength={20}
					autoComplete="off"
					required
				/>
			</RegisterInputContainer>
			<RegisterInputContainer>
				<RegisterInputItemWrapper>비밀번호</RegisterInputItemWrapper>
				<PlaceHolder
					type="password"
					style={{ height: 30 }}
					defaultValue={newJobPosting.password}
					onChange={(e) => {
						setNewJobPosting({
							...newJobPosting,
							password: e.target.value,
						});
					}}
					name="password"
					placeholder="8~12자, 최소 하나의 문자 및 하나의 숫자로 설정해주세요"
					autoComplete="off"
					required
				/>
			</RegisterInputContainer>
			<CommonButton
				wrapperStyle={{
					width: 150,
					height: 40,
					color: '#EA7B14',
				}}
				extraWrapperStyle={{ marginTop: 40 }}
				onClick={toggleModal}
			>
				등록하기
			</CommonButton>
			<Modal
				width={500}
				height={600}
				// onClose={() => setShowModal(false)}
				show={showModal}
			>
				<Postcode onComplete={() => setShowModal(false)} />
				<ClosingModalButton onClick={() => setShowModal(false)}>
					닫기
				</ClosingModalButton>
			</Modal>
			<Modal
				width={500}
				height={400}
				// onClose={() => setShowErrorModal(false)}
				show={showErrorModal}
			>
				{showErrorModal && (
					<ErrorContainer>
						{Object.entries(error).map((el: [string, string]) => {
							if (el[1].length === 0) {
								return null;
							}

							return (
								<ErrorWrapper key={el[0]}>
									<div style={{ marginRight: 5 }}>
										<FcHighPriority />
									</div>
									<div>{el[1]}</div>
								</ErrorWrapper>
							);
						})}
						<ClosingModalButton onClick={() => setShowErrorModal(false)}>
							닫기
						</ClosingModalButton>
					</ErrorContainer>
				)}
			</Modal>
		</Container>
	);
}

const ErrorContainer = styled.div`
	padding: 20px;
`;

const ErrorWrapper = styled.div`
	padding: 5px;
	display: flex;
	align-items: center;
	font-weight: bold;
`;

const Container = styled.div`
	margin-bottom: 20px;
`;

const ButtonWrapper = styled.div``;

const AddressLabel = styled.label`
	display: flex;
	align-items: center;
	font-size: 18px;
	font-weight: bold;
	width: 100px;
`;

export const ClosingModalButton = styled.div`
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
	cursor: pointer;
`;

const DetailedAddressWrapper = styled.div`
	display: flex;
	height: 30px;
`;

export const RegisterInputContainer = styled.div`
	display: flex;
	margin-top: 20px;
`;

export const RegisterInputItemWrapper = styled.label`
	display: flex;
	align-items: center;
	width: 100px;
	font-weight: bold;
	font-size: 18px;
`;
