import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import Layout from '../../src/components/common/Layout';
import ArticleCard from '../../src/components/forum/article-card';
import { posts } from '../../src/constant/announcement';

export default function Forum() {
    const postList = Object.values(posts);
    return (
        <Layout pageIndex={2}>
            <AnnounceSection>
                {postList.map((post) => (
                    <ArticleCard key={post.id} article={post} announcement/>
                ))}
            </AnnounceSection>
            {/* <ArticleSection> TODO: 글쓰기 기능 출시 후 추가개발 예정
                {mockData.map((article) => (
                    <ArticleCard key={article.id} article={article}/>
                ))}
            </ArticleSection> */}
        </Layout>
    );
}

export async function getServerSideProps({ locale }) {
	const i18n = [
		'common',
		'detail',
		'jobTable',
		'navigation',
		'opening',
		'posting',
	];
	const translation = await serverSideTranslations(locale, i18n);

	const data = null;
	return { props: { data, ...translation } };
}

const AnnounceSection = styled.div`
    display: flex;
    flex-direction: column;
    .title {
        font-weight: bold;
    }
`;
const ArticleSection = styled.div`
    display: flex;
    flex-direction: column;
`;

/**
 * model Article {
  id        String   @id @default(uuid())
  author    String
  contents  String
  category  String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  password  String
  title     String
  viewCount Int
  imgUrl Array<String>
}
 */
