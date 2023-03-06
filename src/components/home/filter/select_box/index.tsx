import { useState } from 'react';
import { Row, Col, Select, Button, Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

interface ISelectBox {
	regionNum: Number;
	regionName: String;
}

export default function SelectBox(selectBoxProps: Array<ISelectBox>) {
	return (
		<Col>
			<Select
				showSearch
				placeholder="시/도 선택"
				optionFilterProp="children"
				// filterOption={(input, option) => {
				// 	console.log(option.children);
				// 	return option.children.toLowerCase().includes(input.toLowerCase());
				// }}
			>
				{/* {region.map((item) => (
					<Option key={item.region_name} value={item.region_no}>
						{item.region_name}
					</Option>
				))} */}
			</Select>
		</Col>
	);
}
