import styled from 'styled-components';
import Home from '../pages/page';
import { Posting } from '../src/models/posting';
import HomeFilter from '../src/components/home/filter';
import JobList from '../src/components/home/job_list';

async function getPosts() {
	const data = await Posting.getPostingList();
	return data;
}

export default async function HomePage() {
	const posts = await getPosts();
	return (
		<Container>
			<HomeFilter />
			<JobList tableContent={posts} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
