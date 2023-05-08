import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { Bars } from 'react-loader-spinner';
import Layout from '../../../src/components/common/Layout';
import JobOpeningPostingFirstPart from '../../../src/components/job_opening/posting/first_part';
import JobOpeningPostingThirdPart from '../../../src/components/job_opening/posting/third_part';
import JobOpeningPostingFourthPart from '../../../src/components/job_opening/posting/fourth_part';
/*
	First: 공고제목, 업체명, 연락처
	Third: 급여, 성별, 한국어능숙도, 날짜, 시간
	Fourth: 상세정보, 근무장소
*/
export default function JobOpeningPosting() {
	const [isRequesting, setIsRequesting] = useState(false);

	return (
		<Layout pageIndex={1}>
			{!isRequesting ? (
				<Container>
					<Title>채용공고 등록</Title>
					<JobOpeningPostingFirstPart />
					{/* <JobOpeningPostingSecondPart /> */}
					<JobOpeningPostingThirdPart />
					<JobOpeningPostingFourthPart setIsRequesting={setIsRequesting} />
				</Container>
			) : (
				<SpinnerContainer>
					<Bars
						height="100"
						width="100"
						color="#4fa94d"
						ariaLabel="bars-loading"
						visible={true}
					/>
				</SpinnerContainer>
			)}
		</Layout>
	);
}

const Container = styled.div`
	margin: 20px 0 35px 0;
`;

const Title = styled.div`
	font-size: 25px;
	font-weight: bold;
	margin-bottom: 15px;
`;

const SpinnerContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
