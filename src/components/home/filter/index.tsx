import { useState } from 'react';
import { Row, Col, Select, Button, Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import  from './select_box';

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
		job_opening_no: 2,
		is_premium: 1,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '100,000원', way: 'daily' },
		category: '요식업',
	},
	{
		job_opening_no: 3,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
		salary: { wage: '500,000원', way: 'weekly' },
		category: '요식업',
	},
	{
		job_opening_no: 4,
		is_premium: 0,
		region: '서울시 중구',
		title: { title: '미스사이공 주방직원 급구', is_premium: 0 },
		salary: { wage: '8,000원', way: 'hourly' },
		category: '요식업',
	},
];

export default function HomeFilter() {
	const { Option } = Select;
	const [region, setRegion] = useState([
		{ region_no: 1, region_name: '부천시 원미구' },
		{ region_no: 2, region_name: '부천시 소사구' },
	]);

	return (
		<Row justify="start" gutter={20}>
			{/* <SelectBox selectBoxProps={} /> */}
			<Col>
				<Select
					showSearch
					placeholder="시/도 선택"
					optionFilterProp="children"
					// filterOption={(inputValue, option) => {
					// 	console.log(inputValue, option);
					// 	return option.children
					// 		.toLowerCase()
					// 		.includes(inputValue.toLowerCase());
					// }}
				>
					{region.map((item) => (
						<Option key={item.region_name} value={item.region_no}>
							{item.region_name}
						</Option>
					))}
				</Select>
			</Col>
			<Col>
				<Select
					showSearch
					placeholder="상세 선택"
					optionFilterProp="children"
					// filterOption={(input, option) => {
					// 	const { children } = option;
					// 	console.log(children);
					// 	return children.toLowerCase().includes(input.toLowerCase());
					// }}
				>
					{region.map((item) => (
						<Option key={item.region_name} value={item.region_no}>
							{item.region_name}
						</Option>
					))}
				</Select>
			</Col>
			<Col>
				<Select
					showSearch
					placeholder="직무 선택"
					optionFilterProp="children"
					// filterOption={(input, option) =>
					// 	option.children.toLowerCase().includes(input.toLowerCase())
					// }
				>
					{region.map((item) => (
						<Option key={item.region_no} value={item.region_no}>
							{item.region_name}
						</Option>
					))}
				</Select>
			</Col>
			<Col>
				<Button
					type="primary"
					icon={<SearchOutlined />}
					style={{ width: '330px', borderRadius: '10px' }}
				>
					검색
				</Button>
			</Col>
		</Row>
	);
}
