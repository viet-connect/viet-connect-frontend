import { useRouter } from 'next/router';
import styled from 'styled-components';
import WageBox from '../../../common/WageBox';

export default function JobCard({ content }) {
	const router = useRouter();
	const { id, date, region, salary, title } = content;
	const onClickRedirectDetail = () => {
		router.push(`job_opening/detail/${id}`);
	};

	return (
		<CardWrapper onClick={onClickRedirectDetail}>
			<CardHeader>
				{/* TODO: 업체명 적용 */}
				{/* <div>업체명</div> */}
				<div>{date}</div>
			</CardHeader>
			<CardMain>{title}</CardMain>
			<CardFooter>
				<div>{region}</div>
				<WageWrapper>
					<div>{`${salary.wage}원`}</div>
					<WageBox termIndex={salary.way} />
				</WageWrapper>
			</CardFooter>
		</CardWrapper>
	);
}

const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 16px;
	border-radius: 6px;
	border: solid 1px rgba(128, 128, 128, 0.5);
	cursor: pointer;
	&:hover {
		background-color: #f1f1f1;
	}
`;
const CardHeader = styled.div`
	display: flex;
	justify-content: flex-end;
	font-size: 14px;
`;
const CardMain = styled.div`
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const CardFooter = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 12px;
`;

const WageWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;
