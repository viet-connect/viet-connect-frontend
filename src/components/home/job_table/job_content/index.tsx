import Router, { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { IPostingSummary } from '../../../../models/posting';
import WageBox from '../../../common/WageBox';

export default function JobContent({ content }) {
	const router = useRouter();
	const onClickRedirectDetail = (id: string) => {
		router.push(`job_opening/detail/${id}`);
	};

	return (
		<Tbody>
			{content.map((el: IPostingSummary, index: number) => {
				const {
					id,
					date,
					salary: { wage, way },
					title,
				} = el;

				return (
					<Tr key={id} onClick={() => onClickRedirectDetail(id)}>
						<Td>{date}</Td>
						<Td>
							<WageWrapper>
								<WageBox termIndex={way} />
								<WageValue>{wage}</WageValue>
							</WageWrapper>
						</Td>
						<Td>
							<span>{title}</span>
						</Td>
						{/* <Td>{category}</Td> */}
					</Tr>
				);
			})}
		</Tbody>
	);
}

const Tbody = styled.tbody`
	box-sizing: border-box;
	vertical-align: middle;
	font-size: 14px;
`;

const Tr = styled.tr`
	border-top: 1px solid #f0f0f0;
	box-sizing: border-box;
	line-height: 22px;
	transition: 0.3s;

	:hover {
		background-color: #e5e5e5f6;
		cursor: pointer;
	}
`;

const Td = styled.td`
	position: relative;
	box-sizing: border-box;
	padding: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const WageWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const WageValue = styled.div`
	margin-left: 8px;
	font-size: 14px;
`;
