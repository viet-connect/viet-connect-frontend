import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../src/components/common/Layout';
import HomeFilter from '../src/components/home/filter';
import JobList from '../src/components/home/job_list';
import { Posting } from '../src/models/posting';

export default function Home(props) {
	return (
		<Layout pageIndex={0}>
			<Container>
				<HomeFilter />
				<JobList tableContent={props.data} />
			</Container>
		</Layout>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export async function getServerSideProps({ locale }) {
	const data = await Posting.getPostingList();
	return {
		props: {
			data,
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
