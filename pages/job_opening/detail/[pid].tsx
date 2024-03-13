import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../../src/components/common/Layout';
import ContentHeader from '../../../src/components/job_opening/detail/content_header';
import MainContent from '../../../src/components/job_opening/detail/main_content';
import JobDetailContactInfo from '../../../src/components/job_opening/detail/contact_info';
import { Posting } from '../../../src/models/posting';
import LocationInfo from '../../../src/components/job_opening/detail/location_iinfo';

export default function JobOpeningDetail({ data }) {
	return (
		<Layout pageIndex={0}>
			<Container>
				<ContentHeader data={data} />
				<MainContent data={data} />
				<LocationInfo data={data} />
				<JobDetailContactInfo data={data} />
			</Container>
		</Layout>
	);
}

const Container = styled.div``;

export async function getServerSideProps(context) {
	const data = await Posting.getUniquePosting(context.query.pid);
	return {
		props: {
			data,
			...(await serverSideTranslations(context.locale, [
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
