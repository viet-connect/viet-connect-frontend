import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import Image from 'next/image';
import Layout from '../../../src/components/common/Layout';
import { posts } from '../../../src/constant/announcement';
import DateUtils from '../../../src/utils/DateUtils';

export default function ForumDetail({ post }) {
	const { title, author, descs, images, createdAt } = post;
	const date = DateUtils.getFullDateString(createdAt);
    return (
        <Layout pageIndex={3}>
			<Header>
				<div className="forum-detail__title">{title}</div>
				<SpecificInfo>
					<div className="forum-detail__writer">
						<Image src="/favicon-96x96.png" alt="비엣커넥트 파비콘" width="24" height="24"/>
						<div>{author}</div>
					</div>
					<div className="forum-detail__specific">
						<div className="forum-detail__date">{date}</div>
						{/* <div className="forum-detail__view">조회수</div> */}
					</div>
				</SpecificInfo>
			</Header>
			<Body>
				<div className="forum-detail__content">
					{descs.map(({ subTitle, desc }, i) => (
						<li key={i}>
							<span className="forum-detail__content--sub-title">{subTitle}</span>
							<br />
							{desc}
						</li>
					))}
					{images.map((image, i) => (
						<div key={i}>
							<Image src={image} alt="test" width={693} height={478}/>
						</div>
					))}
				</div>
			</Body>
        </Layout>
    );
}

export async function getServerSideProps({ locale, query }) {
	const i18n = [
		'common',
		'detail',
		'jobTable',
		'navigation',
		'opening',
		'posting',
	];
	const translation = await serverSideTranslations(locale, i18n);
	const post = posts[query.id];
	return { props: { post, ...translation } };
}

const Header = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	border-bottom: 1px solid rgba(128, 128, 128, 0.50);
	padding-bottom: 16px;
	.forum-detail__title {
		font-size: 25px;
		line-height: 1.3;
	}
`;

const SpecificInfo = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 8px;
	font-size: 14px;
	.forum-detail {
		&__writer {
			display: flex;
			align-items: center;
			gap: 4px;
		}
		&__specific {
			display: flex;
			gap: 4px;
		}
		&__date, &__view {
			color: #BEBEBE
		}
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 16px;
	.forum-detail {
		&__content {
			line-height: 1.7;
			white-space: pre-wrap;
			img {
				margin: 16px 0px;
				width: 100%;
				height: auto;
			}
			li {
				margin-bottom: 16px;
				list-style-position: inside;
				padding-inline-start: 20px;
				text-indent: -20px;
				font-weight: bold;
			}
			&--sub-title {
				color: #2f5597
			}
		}
	}
`;
