import { useRouter } from 'next/router';
import Image from 'next/image';

import React from 'react';
import styled from 'styled-components';
import mockImage from '../../../public/assets/apple.jpeg';
import CommonButton from '../../../src/components/common/Button';
import Layout from '../../../src/components/common/Layout';
import ContentHeader from '../../../src/components/job_opening/detail/content_header';
import MainContent from '../../../src/components/job_opening/detail/main_content';
import JobDetailMap from '../../../src/components/job_opening/detail/map';
import JobDetailContactInfo from '../../../src/components/job_opening/detail/contact_info';

export default function JobOpeningDetail() {
	const router = useRouter();

	return (
		<Layout pageIndex={0}>
			<Container>
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
						value="수정"
					/>
					<CommonButton
						wrapperStyle={{
							width: 65,
							height: 30,
							color: '#EEAB6E',
						}}
						extraWrapperStyle={{
							marginRight: 10,
						}}
						value="삭제"
					/>
				</ButtonWrapper>
				<ImageWrapper style={{ background: 'lightgrey' }}>
					<Image src={mockImage} alt="mock-picture" placeholder="blur" />
				</ImageWrapper>
				<ContentHeader />
				<MainContent />
				<JobDetailMap />
				<JobDetailContactInfo />
			</Container>
		</Layout>
	);
}

const Container = styled.div``;

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
