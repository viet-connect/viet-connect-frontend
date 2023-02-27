import React from 'react';
import styled from 'styled-components';
import Layout from '../../../src/components/common/Layout';
import JobOpeningPostingFirstPart from '../../../src/components/job_opening/posting/first_part';
import JobOpeningPostingSecondPart from '../../../src/components/job_opening/posting/second_part';
import JobOpeningPostingThirdPart from '../../../src/components/job_opening/posting/third_part';

export default function JobOpeningPosting() {
	return (
		<Layout>
			<Container>
				<Title>채용공고 등록</Title>
				<JobOpeningPostingFirstPart />
				<JobOpeningPostingSecondPart />
				<JobOpeningPostingThirdPart />
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
