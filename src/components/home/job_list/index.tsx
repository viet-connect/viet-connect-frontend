import styled from 'styled-components';
import Image from 'next/image';
import JobCard from './job_card';
import DisplayAds from '../../common/DisplayAdd';

export default function JobList({ tableContent }) {
	const onClick = () => {
		window.open('https://vt.beemall.shop', '_blank');
	};
	return (
		<JobListWrapper>
			<DisplayAds />
			{/* <Banner onClick={onClick}>
				<Image alt="banner" src="/beemall_banner.png" fill />
			</Banner> */}
			{tableContent.map((content) => (
				<JobCard key={content.id} content={content} />
			))}
		</JobListWrapper>
	);
}

const Banner = styled.div`
	position: relative;
	width: 100%;
	height: 104px;
	gap: 5px;
	cursor: pointer;

	img {
		object-fit: fit;
		border-radius: 6px;
	}
`;

const JobListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;
