import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
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

	return (
		<JobListWrapper>
			{jobList.map((content) => (
				<JobCard key={content.id} content={content} />
			))}
		</JobListWrapper>
	);
}

const JobListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;
