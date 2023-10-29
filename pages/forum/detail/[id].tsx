import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import Image from 'next/image';
import Layout from '../../../src/components/common/Layout';
import { posts } from '../../../src/constant/announcement';
import DateUtils from '../../../src/utils/DateUtils';

export default function ForumDetail({ post }) {
	const { title, author, descs, images, createdAt } = post;
	const date = DateUtils.getDateString(createdAt);
    return (
        <Layout pageIndex={2}>
			<Header>
				<div className="forum-detail__title">{title}</div>
				<SpecificInfo>
					<div>{author}</div>
					<div className="forum-detail__specific">
						<div className="forum-detail__date">{date}</div>
						{/* <div className="forum-detail__view">조회수</div> */}
					</div>
				</SpecificInfo>
			</Header>
			<Body>
				<div className="forum-detail__content">
					{descs.map((desc, i) => (
						<div key={i}>
							<div>{desc}</div>
							<div className="forum-detail__content--img-box"><Image src={images[i]} alt="test" width={693} height={478}/></div>
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
		font-size: 32px;
		line-height: 1.3;
	}
`;

const SpecificInfo = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 8px;
	font-size: 14px;
	.forum-detail {
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
	.forum-detail__content {
		line-height: 1.5;
		white-space: pre-wrap;
		img {
			margin: 16px 0px;
			width: 100%;
			height: auto;
		}
	}
`;
