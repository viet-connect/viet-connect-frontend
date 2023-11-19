import React, { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Layout from '../../src/components/common/Layout';
import CommonButton from '../../src/components/common/Button';
import ArticleCard from '../../src/components/forum/article-card';
import { Article } from '../../src/models/article';
import { articleCategory } from '../../src/constant/constant';
import Badge from '../../src/components/common/Badge';

const { None } = articleCategory;
export default function Forum(props) {
    const router = useRouter();
    const { t } = useTranslation();
    const [selectedCategories, setSelectedCategories] = useState([None]);
    const [posts, setPosts] = useState([]);

    const categories = Object.values(articleCategory);

    const onClick = () => {
        router.push('forum/posting');
    };

    const onBadgeClick = (category) => {
        let categoryList = null;
        if (selectedCategories.includes(category)) {
            categoryList = selectedCategories.filter((c) => c !== category);
        } else {
            categoryList = [...selectedCategories, category];
        }

        if (category !== None) {
            if (categoryList.includes(None)) {
                categoryList = categoryList.filter((c) => c !== None);
            }
        } else {
            categoryList = [category];
        }

        setSelectedCategories(categoryList);
    };

    useEffect(() => {
        let postList = [];
        if (selectedCategories.includes(None)) {
            postList = props.posts;
        } else if (selectedCategories.length) {
            postList = props.posts.filter((post) => selectedCategories.includes(post.category));
        }
        setPosts(postList);
    }, [props.posts, selectedCategories]);
    return (
        <Layout pageIndex={3}>
            <Wrapper>
                <HeadWrapper>
                    <Category>
                        {categories.map((category: any) => (
                            <Badge
                                key={category}
                                className={selectedCategories.includes(category) ? 'common-badge--selected' : ''}
                                id={category}
                                label={t(`article:${category}`)}
                                onClick={(id) => onBadgeClick(id)}
                            />
                        ))}
                    </Category>
                    {/* <CommonButton TODO: 게시판 글쓰기 기능 기획시 주석 해제
                        label="글쓰기"
                        wrapperStyle={{
                            width: 'auto',
                            height: 'auto',
                            color: 'white',
                        }}
                        extraWrapperStyle={{
                            padding: '1px 16px',
                            color: '#297EFF',
                            border: '1px solid rgba(128, 128, 128, 0.50)',
                            borderRadius: '6px',
                        }}
                        onClick={onClick}
                    /> */}
                </HeadWrapper>
                <AnnounceSection>
                    {posts.map((post) => (
                        <ArticleCard key={post.id} article={post} announcement/>
                    ))}
                </AnnounceSection>
            </Wrapper>
        </Layout>
    );
}

export async function getServerSideProps({ locale }) {
	const i18n = [
		'common',
        'article',
		'detail',
		'jobTable',
		'navigation',
		'opening',
		'posting',
	];
	const translation = await serverSideTranslations(locale, i18n);

	const posts = await Article.getArticleList();
	return { props: { posts, ...translation } };
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Category = styled.div`
    display: flex;
    gap: 4px;
`;

const HeadWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 8px;
`;

const AnnounceSection = styled.div`
    display: flex;
    flex-direction: column;
    .title {
        font-weight: bold;
    }
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
