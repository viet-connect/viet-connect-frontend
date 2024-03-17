import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../src/components/common/Layout';
import HomeFilter from '../src/components/home/filter';
import JobList from '../src/components/home/job_list';
import { Posting } from '../src/models/posting';
import PageController from '../src/components/common/PageController';

export default function Home({ data = { list: [], totalPages: 0 } }) {
	const { list, totalPages } = data;

	return (
		<Layout pageIndex={0}>
			<Container>
				<HomeFilter />
				<JobList tableContent={list} />
				<PageController totalPages={totalPages}/>
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
	const { locale, query } = context;
	const { postingPage = 1 } = query;
	const { list, totalPages } = await Posting.getPostingList({ postingPage });
	return {
		props: {
			data: { list, totalPages },
			...(await serverSideTranslations(locale, [
				'common',
				'detail',
				'jobTable',
				'navigation',
				'opening',
				'posting',
				'login',
			])),
		},
	};
}
