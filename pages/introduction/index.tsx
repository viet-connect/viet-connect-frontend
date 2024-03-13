import React, { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Layout from '../../src/components/common/Layout';

export default function Introduction() {
	const { t } = useTranslation();
	const guides = ['ceo', 'jobSeeker'].map((key) => {
		const title = t(`introduction:guide.${key}.title`);
		const descs = t(`introduction:guide.${key}.desc`).split('|');
		return { title, descs };
	});
	return (
		<Layout pageIndex={2}>
			<Header>
				<div className="introduction__title">{t('introduction:title')}</div>
				<SpecificInfo>
					<Image
						src="/favicon-96x96.png"
						alt="비엣커넥트 파비콘"
						width="24"
						height="24"
					/>
					<div>비엣커넥트</div>
				</SpecificInfo>
			</Header>
			<Body>
				<div className="introduction__content">
					<div>{t('introduction:desc')}</div>
					<br />
					{guides.map(({ title, descs }) => (
						<div key={title}>
							<div>
								[<strong>{title}</strong>]
							</div>
							<ol className="introduction__order-list">
								{descs.map((desc) => (
									<li key={desc}>{desc}</li>
								))}
							</ol>
							<br />
						</div>
					))}
				</div>
			</Body>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const i18n = [
		'common',
		'detail',
		'jobTable',
		'navigation',
		'opening',
		'posting',
		'introduction',
		'login',
	];
	const translation = await serverSideTranslations(context.locale, i18n);

	return { props: translation };
}

const Header = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	border-bottom: 1px solid rgba(128, 128, 128, 0.5);
	padding-bottom: 16px;
	.introduction__title {
		font-size: 25px;
		line-height: 1.3;
	}
`;

const SpecificInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 14px;
	.introduction {
		&__specific {
			display: flex;
			gap: 4px;
		}
		&__date,
		&__view {
			color: #bebebe;
		}
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 16px;
	.introduction {
		&__content {
			line-height: 1.8;
			white-space: pre-wrap;
		}
		&__order-list {
			margin: 0px 0px;
			padding-inline-start: 20px;
		}
	}
`;
