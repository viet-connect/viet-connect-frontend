import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { signIn, useSession } from 'next-auth/react';
import Layout from '../../../src/components/common/Layout';
import ContentHeader from '../../../src/components/job_opening/detail/content_header';
import MainContent from '../../../src/components/job_opening/detail/main_content';
import JobDetailContactInfo from '../../../src/components/job_opening/detail/contact_info';
import { Posting } from '../../../src/models/posting';
import LocationInfo from '../../../src/components/job_opening/detail/location_iinfo';
import CommonButton from '../../../src/components/common/Button';

export default function JobOpeningDetail({ data }) {
	const { t } = useTranslation();
	const session = useSession();
	const onApplyJobOpening = () => {
		if (session.status === 'authenticated') {
			console.log('지원가능합니다');
			return;
		}

		signIn();
	};

	return (
		<Layout pageIndex={0}>
			<Container>
				<ContentHeader data={data} />
				<MainContent data={data} />
				<LocationInfo data={data} />
				<ButtonOutterWrapper>
					<CommonButton
						wrapperStyle={{
							height: 45,
							color: '#1890ff',
						}}
						onClick={onApplyJobOpening}
					>
						<ButtonChildrenWrapper>
							<ButtonTextWrapper>
								{t('posting:applyBtnLabel')}
							</ButtonTextWrapper>
						</ButtonChildrenWrapper>
					</CommonButton>
				</ButtonOutterWrapper>
			</Container>
		</Layout>
	);
}

const Container = styled.div``;

const ButtonOutterWrapper = styled.div`
	margin-bottom: 20px;
`;

const ButtonChildrenWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
`;

const ButtonTextWrapper = styled.div`
	font-size: 15px;
	color: white;
	font-weight: 400;
`;

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
