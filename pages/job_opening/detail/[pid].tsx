import Image from 'next/image';

import React from 'react';
import styled from 'styled-components';
import mockImage from '../../../src/public/assets/apple.jpeg';
import CommonButton from '../../../src/components/common/Button';
import Layout from '../../../src/components/common/Layout';
import ContentHeader from '../../../src/components/job_opening/detail/content_header';
import MainContent from '../../../src/components/job_opening/detail/main_content';
import JobDetailMap from '../../../src/components/job_opening/detail/map';
import JobDetailContactInfo from '../../../src/components/job_opening/detail/contact_info';
import { Posting, IPosting } from '../../../src/models/posting';

export default function JobOpeningDetail({ data }) {
	console.log(data, 'server provided data');
	/*
		1. title, updatedAt, wageType, wageAmount, address
		2. gender, proficiency, workingDay, startingTime, endingTime, contents
		3.
	*/
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
					>
						삭제
					</CommonButton>
				</ButtonWrapper>
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

export async function getServerSideProps(context) {
	const data = await Posting.getUniquePosting(context.query.pid);
	return {
		props: {
			data,
		},
	};
}
