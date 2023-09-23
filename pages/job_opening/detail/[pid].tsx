// import Image from 'next/image';

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
// import mockImage from '../../../src/public/assets/apple.jpeg';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
		password: '',
	});
	const [action, setAction] = useState({
		delete: false,
		put: false,
	});

	const passwordRef = useRef(null);
	const { t } = useTranslation();

	// onClickRedirectDetail(data.id)
	const onClickRedirectDetail = async (id: string) => {
		if (
			account.password.length === 0 ||
			!validate.isPasswordValid(account.password)
		) {
			console.log('invalid password');
			passwordRef.current.focus();
			return;
		}

		let isPasswordMatch = false;
		if (account.password === process.env.NEXT_PUBLIC_MASTER_PASSWORD) {
			isPasswordMatch = true;
		} else {
			const passwordMatcher = new Password(account.password, data.password);
			isPasswordMatch = await passwordMatcher.comparePassword();
		}

		if (isPasswordMatch) {
			if (action.put) {
				setShowModal(false);
				setAction({ ...action, put: false });

				router.push(`/job_opening/posting?id=${id}`);
			} else if (action.delete) {
				await Posting.handleDeletePost(id);

				setShowModal(false);
				setAction({ ...action, delete: false });

				router.push('/');
			}
		} else if (!isPasswordMatch) passwordRef.current.focus();
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
						{t('detail:editBtnLabel')}
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
						{t('detail:deleteBtnLabel')}
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
							<RegisterInputItemWrapper>
								{t('posting:password')}
							</RegisterInputItemWrapper>
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
								placeholder={t('detail:passwordPlaceholder')}
								autoComplete="off"
								ref={passwordRef}
								required
							/>
						</RegisterInputContainer>
						<ClosingModalButton onClick={() => onClickRedirectDetail(data.id)}>
							{action.put
								? t('detail:doEditBtnLabel')
								: t('detail:doDeleteBtnLabel')}
						</ClosingModalButton>
						<ClosingModalButton onClick={() => setShowModal(false)}>
							{t('detail:closeBtnLabel')}
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
			...(await serverSideTranslations(context.locale, [
				'common',
				'detail',
				'jobTable',
				'navigation',
				'opening',
				'posting',
			])),
		},
	};
}
