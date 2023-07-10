/* eslint-disable indent */
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { jobTableConstant } from '../../../constant/constant';
import { selectedRegionState } from '../../../recoil/atom/region';
import JobContent from './job_content';

export default function JobTable({ tableContent }) {
	const ThElement = Object.values(jobTableConstant);
	const selectedRegionArray = useRecoilValue(selectedRegionState);
	const selectedRegion = selectedRegionArray[0].concat(
		` ${selectedRegionArray[1]}`,
	);

	const comparableData = [];
	console.log('tableContent?', tableContent, typeof tableContent);
	for (let i = 0; i < tableContent.length; i += 1) {
		if (tableContent[i].region === selectedRegion) {
			comparableData.push(tableContent[i]);
		}
	}

	return (
		<Container>
			<TableWrapper>
				<colgroup>
					{ThElement.map((el, index) => (
						<col key={el.renderingTitle} width={el.width} />
					))}
				</colgroup>
				<Thead>
					<Tr>
						{ThElement.map((el, index) =>
							index < 2 ? (
								<Th
									className="home-content-header"
									index={index}
									key={el.renderingTitle}
								>
									{el.renderingTitle}
								</Th>
							) : (
								<Th
									className="home-content-header"
									key={el.renderingTitle}
									index={index}
									DivideNotExist
								>
									{el.renderingTitle}
								</Th>
							),
						)}
					</Tr>
				</Thead>
				<JobContent content={comparableData} />
			</TableWrapper>
		</Container>
	);
}

const Container = styled.div``;

const TableWrapper = styled.table`
	width: 100%;
`;

const Thead = styled.thead`
	box-sizing: border-box;
	background-color: #f7f7f7;
`;

const Tr = styled.tr``;

interface IThProps {
	DivideNotExist?: boolean;
	index: number;
}

const handleWidth = (index) => {
	switch (index) {
		case 0:
			return '57px';
		case 1:
			return '140px';
		default:
			return '330px';
	}
};

const Th = styled.th<IThProps>`
	box-sizing: border-box;
	padding: 16px;
	text-align: start;
	position: relative;
	color: rgba(0, 0, 0, 0.88);
	border-bottom: 1px solid #f0f0f0;
	font-size: 12px;
	width: ${(props) => handleWidth(props.index)};

	${(props) =>
		!props.DivideNotExist &&
		css`
			&:before {
				content: '';
				position: absolute;
				top: 50%;
				inset-inline-end: 0;
				width: 1px;
				height: 1.6em;
				background-color: #e9d7d75c;
				transform: translateY(-50%);
				transition: background-color 0.2s;
			}
		`};
`;
