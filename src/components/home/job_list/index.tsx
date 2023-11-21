import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Image from 'next/image';
import {
	searchKeyword,
	selectedRegionState,
} from '../../../recoil/atom/region';
import JobCard from './job_card';
import { regionListSelector } from '../../../utils/regionUtils';

export default function JobList({ tableContent }) {
	const regionArray = useRecoilValue(selectedRegionState);
	const keyword = useRecoilValue(searchKeyword);
	const jobList = regionListSelector(regionArray, tableContent, keyword);
	const onClick = () => {
		window.open('https://vt.beemall.shop', '_blank');
	};
	return (
		<JobListWrapper>
			<Banner onClick={onClick}>
				<Image alt="banner" src="/beemall_banner.png" width={289} height={195}/>
			</Banner>
			{jobList.map((content) => (
				<JobCard key={content.id} content={content} />
			))}
		</JobListWrapper>
	);
}

const Banner = styled.div`
	cursor: pointer;

	img {
		width: 100%;
		height: auto;
		border-radius: 6px;
	}
`;

const JobListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;
