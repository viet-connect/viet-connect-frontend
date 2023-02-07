import styled from 'styled-components';
import Layout from '../src/components/common/Layout';
import HomeFilter from '../src/components/home/filter';
import JobTable from '../src/components/home/job_table';

export default function Home() {
	return (
		<Layout>
			<Wrapper>
				<HomeFilter />
				<JobTable />
			</Wrapper>
		</Layout>
	);
}

const Wrapper = styled.div`
	.ant-card-body {
		padding: 5px 20px;
	}
`;
