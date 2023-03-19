import styled from 'styled-components';
import Layout from '../src/components/common/Layout';
import HomeFilter from '../src/components/home/filter';
import JobTable from '../src/components/home/job_table';

export default function Home() {
	return (
		<Layout pageIndex={0}>
			<Container>
				<HomeFilter />
				<JobTable />
			</Container>
		</Layout>
	);
}

const Container = styled.div``;
