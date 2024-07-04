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
import {
  ClosingModalButton,
  RegisterInputContainer,
  RegisterInputItemWrapper,
} from '../../src/components/job_opening/posting/fourth_part';
import { PlaceHolder } from '../../src/components/job_opening/posting/first_part';
import Modal from '../../src/components/common/Modal';
import GoogleAd from '../../src/components/common/GoogleAd';
import MetaHead from '../../src/components/common/MetaHead';

const { None } = articleCategory;
export default function Forum(props) {
  const router = useRouter();
  const { t } = useTranslation();

  const [selectedCategories, setSelectedCategories] = useState([None]);
  const [posts, setPosts] = useState([]);
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const categories = Object.values(articleCategory);

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

  const onClickMovePostPage = () => {
    if (password !== process.env.NEXT_PUBLIC_MASTER_PASSWORD) return;

    setShowModal(false);
    router.push('forum/posting');
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
      <MetaHead title={`: ${t('navigation:forum')}`} />
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
          <CommonButton
            label={t('article:postPageBtnLabel')}
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
            onClick={() => setShowModal(true)}
          />
        </HeadWrapper>
        <AnnounceSection>
          {posts.map((post) => (
            <ArticleCard key={post.id} article={post} announcement />
          ))}
        </AnnounceSection>
        <GoogleAd />
        <Modal width={500} height={400} show={showModal}>
          <ModalContentContainer>
            <RegisterInputContainer>
              <RegisterInputItemWrapper>{t('posting:password')}</RegisterInputItemWrapper>
              <PlaceHolder
                type="password"
                style={{ height: 30 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder={t('detail:passwordPlaceholder')}
                autoComplete="off"
                required
              />
            </RegisterInputContainer>
            <div className="post-ready-guide">{t('article:postGuide')}</div>
            <ClosingModalButton onClick={onClickMovePostPage}>{t('detail:checkBtnLabel')}</ClosingModalButton>
            <ClosingModalButton onClick={() => setShowModal(false)}>{t('detail:closeBtnLabel')}</ClosingModalButton>
          </ModalContentContainer>
        </Modal>
      </Wrapper>
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  const i18n = ['common', 'article', 'detail', 'jobTable', 'navigation', 'opening', 'posting', 'login'];
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

const ModalContentContainer = styled.div`
  .post-ready-guide {
    font-size: 13px;
    line-height: 2;
    color: #448ef7;
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
