import styled from 'styled-components';
import Layout from '../src/components/common/Layout';
import HomeFilter from '../src/components/home/filter';
import JobList from '../src/components/home/job_list';
import { Posting } from '../src/models/posting';
import '../src/i18n';

export default function Home({ data }) {
	return (
		<Layout pageIndex={0}>
			<Container>
				<HomeFilter />
				<JobList tableContent={data} />
			</Container>
		</Layout>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export async function getServerSideProps(context) {
	const data = await Posting.getPostingList();
	return {
		props: {
			data,
		},
	};
}
