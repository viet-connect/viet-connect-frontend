import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import Image from 'next/image';
import Layout from '../../../src/components/common/Layout';
import DateUtils from '../../../src/utils/DateUtils';
import { Article } from '../../../src/models/article';
import ArticlePost from '../../../src/components/forum/article-post';
import GoogleAd from '../../../src/components/common/GoogleAd';
import MetaHead from '../../../src/components/common/MetaHead';

export default function ForumDetail({ post }) {
  const { author, createdAt } = post;
  const date = DateUtils.getFullDateString(createdAt);

  /* 임시방편 ID가 anchor일 때는 버튼생성 */
  return (
    <Layout pageIndex={3}>
      <MetaHead title={` 공지: ${post.title}`} description={post.contents} />
      <ArticlePost article={post} readOnly>
        <Header>
          <SpecificInfo>
            <div className="forum-detail__writer">
              <Image src="/favicon-96x96.png" alt="비엣커넥트 파비콘" width="24" height="24" />
              <div>{author}</div>
            </div>
            {post.id !== 'anchor' && (
              <div className="forum-detail__specific">
                <div className="forum-detail__date">{date}</div>
                {/* <div className="forum-detail__view">조회수</div> */}
              </div>
            )}
          </SpecificInfo>
        </Header>
      </ArticlePost>
      <GoogleAd />
    </Layout>
  );
}

export async function getServerSideProps({ locale, query }) {
  const i18n = ['common', 'detail', 'jobTable', 'navigation', 'opening', 'posting', 'login'];
  const translation = await serverSideTranslations(locale, i18n);
  const post = await Article.getUniqueArticle(query.id);
  return { props: { post, ...translation } };
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
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
      align-items: center;
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
        color: #2f5597;
      }
    }
  }
`;
