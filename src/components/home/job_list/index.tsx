import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
	searchKeyword,
	selectedRegionState,
} from '../../../recoil/atom/region';
import JobCard from './job_card';

export default function JobList({ tableContent }) {
	const comparableData = [];
	const selectedRegionArray = useRecoilValue(selectedRegionState);
	const selectedRegion = selectedRegionArray[0].concat(
		` ${selectedRegionArray[1]}`,
	);
	const keyword = useRecoilValue(searchKeyword);

	for (let i = 0; i < tableContent.length; i += 1) {
		if (!selectedRegion.trim() || tableContent[i].region === selectedRegion) {
			if (keyword.length > 0) {
				const { title, contents } = tableContent[i];
				if (title.includes(keyword) || contents.includes(keyword)) {
					comparableData.push(tableContent[i]);
				}
			} else {
				comparableData.push(tableContent[i]);
			}
		}
	}
	return (
		<JobListWrapper>
			{comparableData.map((content) => (
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
