import React from 'react';
import styled from 'styled-components';
import Layout from '../../../src/components/common/Layout';
import JobOpeningPostingFirstPart from '../../../src/components/job_opening/posting/first_part';
import JobOpeningPostingSecondPart from '../../../src/components/job_opening/posting/second_part';
import JobOpeningPostingThirdPart from '../../../src/components/job_opening/posting/third_part';
import JobOpeningPostingFourthPart from '../../../src/components/job_opening/posting/fourth_part';

/*
 First: 공고제목, 업체명, 연락처
 Third: 급여, 성별, 한국어능숙도, 날짜, 시간
 Fourth: 상세정보, 근무장소
*/
export default function JobOpeningPosting() {
	return (
		<Layout pageIndex={1}>
			<Container>
				<Title>채용공고 등록</Title>
				<JobOpeningPostingFirstPart />
				{/* <JobOpeningPostingSecondPart /> */}
				<JobOpeningPostingThirdPart />
				<JobOpeningPostingFourthPart />
			</Container>
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
