import Router, { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import WageBox from '../../../common/WageBox';

const data = [
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: {
			title: '미스사이공 주방직원 급구asdasdas미스사이공 주방직원',
			is_premium: 1,
		},
		salary: { wage: '2,000,000원', way: 'monthly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '100,000원', way: 'daily' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '500,000원', way: 'weekly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 0 },
		salary: { wage: '8,000원', way: 'hourly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: {
			title: '미스사이공 주방직원 급구asdasdas미스사이공 주방직원',
			is_premium: 1,
		},
		salary: { wage: '2,000,000원', way: 'monthly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '100,000원', way: 'daily' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '500,000원', way: 'weekly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 0 },
		salary: { wage: '8,000원', way: 'hourly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: {
			title: '미스사이공 주방직원 급구asdasdas미스사이공 주방직원',
			is_premium: 1,
		},
		salary: { wage: '2,000,000원', way: 'monthly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '100,000원', way: 'daily' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '500,000원', way: 'weekly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 0 },
		salary: { wage: '8,000원', way: 'hourly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: {
			title: '미스사이공 주방직원 급구asdasdas미스사이공 주방직원',
			is_premium: 1,
		},
		salary: { wage: '2,000,000원', way: 'monthly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '100,000원', way: 'daily' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '500,000원', way: 'weekly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 0 },
		salary: { wage: '8,000원', way: 'hourly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: {
			title: '미스사이공 주방직원 급구asdasdas미스사이공 주방직원',
			is_premium: 1,
		},
		salary: { wage: '2,000,000원', way: 'monthly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '100,000원', way: 'daily' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '500,000원', way: 'weekly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 0 },
		salary: { wage: '8,000원', way: 'hourly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: {
			title: '미스사이공 주방직원 급구asdasdas미스사이공 주방직원',
			is_premium: 1,
		},
		salary: { wage: '2,000,000원', way: 'monthly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '100,000원', way: 'daily' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '500,000원', way: 'weekly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 0 },
		salary: { wage: '8,000원', way: 'hourly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: {
			title: '미스사이공 주방직원 급구asdasdas미스사이공 주방직원',
			is_premium: 1,
		},
		salary: { wage: '2,000,000원', way: 'monthly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '100,000원', way: 'daily' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '500,000원', way: 'weekly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 0 },
		salary: { wage: '8,000원', way: 'hourly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: {
			title: '미스사이공 주방직원 급구asdasdas미스사이공 주방직원',
			is_premium: 1,
		},
		salary: { wage: '2,000,000원', way: 'monthly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 1,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '100,000원', way: 'daily' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '500,000원', way: 'weekly' },
		category: '요식업',
	},
	{
		job_opening_no: 1,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 0 },
		salary: { wage: '8,000원', way: 'hourly' },
		category: '요식업',
	},
];

export default function JobContent({ content }) {
	const router = useRouter();
	const onClickRedirectDetail = (rowIndex) => {
		router.push(`job_opening/detail/${rowIndex}`);
	};

	return (
		<Tbody>
			{content.map((el, index: number) => {
				const {
					category,
					job_opening_no,
					region,
					salary: { wage, way },
					title: { title, is_preimium },
				} = el;

				return (
					<Tr key={job_opening_no} onClick={() => onClickRedirectDetail(index)}>
						<Td>{region}</Td>
						<Td>
							<span>{title}</span>
						</Td>
						<Td>
							<WageWrapper>
								<WageBox termIndex={0} />
								<WageValue>{wage}</WageValue>
							</WageWrapper>
						</Td>
						<Td>{category}</Td>
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
	padding: 16px;
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
	font-size: 16px;
`;
