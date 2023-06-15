// import Image from 'next/image';

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
// import mockImage from '../../../src/public/assets/apple.jpeg';
import CommonButton from '../../../src/components/common/Button';
import Layout from '../../../src/components/common/Layout';
import ContentHeader from '../../../src/components/job_opening/detail/content_header';
import MainContent from '../../../src/components/job_opening/detail/main_content';
// import JobDetailMap from '../../../src/components/job_opening/detail/map';
import JobDetailContactInfo from '../../../src/components/job_opening/detail/contact_info';
import { Posting } from '../../../src/models/posting';
import Modal from '../../../src/components/common/Modal';
import {
	ClosingModalButton,
	RegisterInputContainer,
	RegisterInputItemWrapper,
} from '../../../src/components/job_opening/posting/fourth_part';
import { PlaceHolder } from '../../../src/components/job_opening/posting/first_part';
import { Password } from '../../../src/utils/bcrypt';
import validate from '../../../src/utils/validate';

export default function JobOpeningDetail({ data }) {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [account, setAccount] = useState({
		author: '',
		password: '',
	});
	const [action, setAction] = useState({
		delete: false,
		put: false,
	});
	const authorRef = useRef(null);
	const passwordRef = useRef(null);

	// onClickRedirectDetail(data.id)
	const onClickRedirectDetail = async (id: string) => {
		if (account.author.length === 0) {
			authorRef.current.focus();
			return;
		}
		if (
			account.password.length === 0 ||
			!validate.isPasswordValid(account.password)
		) {
			passwordRef.current.focus();
			return;
		}

		const passwordMatcher = new Password(account.password, data.password);
		const isPasswordMatch = await passwordMatcher.createPassword();
		const isAuthorMatch = account.author === data.author;

		if (isPasswordMatch && isAuthorMatch) {
			if (action.put) {
				setShowModal(false);
				setAction({ ...action, put: false });

				router.replace({
					pathname: '/job_opening/posting',
					query: { id },
				});
			} else if (action.delete) {
				await Posting.handleDeletePost(id);

				setShowModal(false);
				setAction({ ...action, delete: false });

				router.replace({
					pathname: '/',
				});
			}
		} else {
			if (!isAuthorMatch) authorRef.current.focus();
			if (!isPasswordMatch) passwordRef.current.focus();
		}
	};

	return (
		<Layout pageIndex={0}>
			<Container>
				{/* <ImageWrapper style={{ background: 'lightgrey' }}>
					<Image src={mockImage} alt="mock-picture" placeholder="blur" />
				</ImageWrapper> */}
				<ContentHeader data={data} />
				<MainContent data={data} />
				{/* <JobDetailMap /> */}
				<JobDetailContactInfo data={data} />
				<ButtonWrapper>
					<CommonButton
						wrapperStyle={{
							width: 65,
							height: 30,
							color: '#EEAB6E',
						}}
						extraWrapperStyle={{
							marginRight: 10,
						}}
						onClick={() => {
							setShowModal(true);
							setAction({ ...action, put: true });
						}}
					>
						수정
					</CommonButton>
					<CommonButton
						wrapperStyle={{
							width: 65,
							height: 30,
							color: '#EEAB6E',
						}}
						extraWrapperStyle={{
							marginRight: 10,
						}}
						onClick={() => {
							setShowModal(true);
							setAction({ ...action, delete: true });
						}}
					>
						삭제
					</CommonButton>
				</ButtonWrapper>
				<Modal
					width={500}
					height={400}
					// onClose={() => setShowErrorModal(false)}
					show={showModal}
				>
					<ModalContentContainer>
						<RegisterInputContainer>
							<RegisterInputItemWrapper>작성자</RegisterInputItemWrapper>
							<PlaceHolder
								style={{ height: 30 }}
								value={account.author}
								onChange={(e) => {
									setAccount({
										...account,
										author: e.target.value,
									});
								}}
								maxLength={20}
								placeholder="작성자명을 입력해주세요"
								autoComplete="off"
								ref={authorRef}
								required
							/>
						</RegisterInputContainer>
						<RegisterInputContainer>
							<RegisterInputItemWrapper>비밀번호</RegisterInputItemWrapper>
							<PlaceHolder
								type="password"
								style={{ height: 30 }}
								value={account.password}
								onChange={(e) => {
									setAccount({
										...account,
										password: e.target.value,
									});
								}}
								name="password"
								placeholder="비밀번호를 입력해주세요"
								autoComplete="off"
								ref={passwordRef}
								required
							/>
						</RegisterInputContainer>
						<ClosingModalButton onClick={() => onClickRedirectDetail(data.id)}>
							{action.put ? '수정하기' : '삭제하기'}
						</ClosingModalButton>
						<ClosingModalButton onClick={() => setShowModal(false)}>
							닫기
						</ClosingModalButton>
					</ModalContentContainer>
				</Modal>
			</Container>
		</Layout>
	);
}

const Container = styled.div``;

const ModalContentContainer = styled.div``;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 10px;
`;

const ImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 7px;
`;

export async function getServerSideProps(context) {
	const data = await Posting.getUniquePosting(context.query.pid);
	return {
		props: {
			data,
		},
	};
}
