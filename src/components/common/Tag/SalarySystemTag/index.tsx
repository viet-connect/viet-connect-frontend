import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Tag } from 'antd';
import styled from 'styled-components';
import Layout from '../../Layout';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const tagColor = {
	monthly: { color: 'magenta', name: '월급' },
	weekly: { color: 'orange', name: '주급' },
	daily: { color: 'green', name: '일급' },
	hourly: { color: 'geekblue', name: '시급' },
};

export default function SalarySystemTag({ salarySystem }) {
	return (
		<Tag color={tagColor[salarySystem].color}>
			{tagColor[salarySystem].name}
		</Tag>
	);
}
