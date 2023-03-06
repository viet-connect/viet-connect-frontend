import { Row, Col, Select, Button, Table, Tag } from 'antd';
import { useRouter } from 'next/router';

const columns = [
	// {
	//   title: '공고',
	//   dataIndex: 'is_premium',
	//   key: 'is_premium',
	//   width: 100,
	//   render: (text) => {
	//     return text === 1 ? (
	//       <span style={{ color: '#FF0000', fontWeight: 'bold' }}>PREMIUM</span>
	//     ) : (
	//       <span></span>
	//     );
	//   },
	// },
	{
		title: '지역',
		dataIndex: 'region',
		key: 'region',
		width: 50,
		ellipsis: true,
	},
	{
		title: '제목',
		dataIndex: 'title',
		key: 'title',
		// width: '10%',
		render: (item) =>
			item.is_premium === 1 ? (
				<span>
					{/* <Tag color="red">PREMIUM </Tag> */}
					{item.title}
				</span>
			) : (
				<span>{item.title}</span>
			),
		width: 100,
		ellipsis: true,
	},
	{
		title: '급여',
		key: 'salary',
		dataIndex: 'salary',
		render: (item) => {
			if (item.way === 'monthly') {
				return (
					<div>
						<Tag color="magenta">월급</Tag>
						<span>{item.wage}</span>
					</div>
				);
			}
			if (item.way === 'weekly') {
				return (
					<div>
						<Tag color="gold">주급</Tag>
						<span>{item.wage}</span>
					</div>
				);
			}
			if (item.way === 'daily') {
				return (
					<div>
						<Tag color="blue">일급</Tag>
						<span>{item.wage}</span>
					</div>
				);
			}

			return (
				<div>
					<Tag color="purple">시급</Tag>
					<span>{item.wage}</span>
				</div>
			);
		},
		width: 100,
		// ellipsis: true,
	},
	{
		title: '직무',
		key: 'category',
		dataIndex: 'category',
		width: 100,
		// ellipsis: true,
	},
	// {
	//   title: '',
	//   render: () => <Button type="primary">지원하기</Button>,
	//   ellipsis: true,
	// },
];

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

export default function JobTable() {
	const router = useRouter();
	return (
		<Row style={{ marginTop: '20px' }}>
			<Col span={24}>
				<Table
					columns={columns}
					dataSource={data}
					// title={() => <Title level={3}>채용공고</Title>}
					pagination={{ position: ['bottomCenter'] }}
					scroll={{ x: '1024px' }}
					// column={{ fixed: true }}
					onRow={(record, rowIndex) => ({
						onClick: (event) => {
							router.push(`job_opening/detail/${rowIndex}`);
						},
					})}
				/>
			</Col>
		</Row>
	);
}
