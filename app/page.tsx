import styled from 'styled-components';
import { Posting } from '../src/models/posting';
import HomeFilter from '../src/components/home/filter';
import JobList from '../src/components/home/job_list';
import Layout from '../src/components/common/Layout';

async function getPosts() {
	const data = await Posting.getPostingList();
	return data;
}

export default async function HomePage() {
	const posts = await getPosts();
	return (
		<Layout pageIndex={0}>
			<Container>
				<HomeFilter />
				<JobList tableContent={posts} />
			</Container>
		</Layout>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
