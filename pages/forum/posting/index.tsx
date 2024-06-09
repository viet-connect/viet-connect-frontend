import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Layout from '../../../src/components/common/Layout';
import ArticlePost from '../../../src/components/forum/article-post';
import { initialArticleState, articleState } from '../../../src/recoil/atom/article';
import CommonButton from '../../../src/components/common/Button';
import { Article } from '../../../src/models/article';
import SelectBox from '../../../src/components/common/SelectBox';
import { articleCategory } from '../../../src/constant/constant';

export default function ArticlePosting() {
  const router = useRouter();
  const { t } = useTranslation();

  const [article, setArticle] = useRecoilState(articleState);
  const [loading, setLoading] = useState(false);

  const options = Object.values(articleCategory).map((category) => ({
    value: category,
    name: t(`article:${category}`),
  }));
  const selectAttrs = {
    options,
    initialValue: article.category,
  };

  const btnAttrs = {
    label: t('article:addBtn'),
    loading,
    wrapperStyle: {
      width: 'auto',
      height: 40,
      color: 'white',
    },
    extraWrapperStyle: {
      padding: '1px 16px',
      color: '#297EFF',
      border: '1px solid rgba(128, 128, 128, 0.50)',
      borderRadius: '6px',
    },
  };

  const onClick = async () => {
    try {
      setLoading(true);
      await Article.addArticle(article);
      await router.push('/forum');

      setArticle(initialArticleState);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (value) => {
    setArticle({ ...article, ...value });
  };

  return (
    <Layout pageIndex={3}>
      <Wrapper>
        <BtnWrapper>
          <SelectBox {...selectAttrs} onChange={(v) => onChange({ category: v })} />
          <CommonButton {...btnAttrs} onClick={onClick} />
        </BtnWrapper>
        <ArticlePost article={article} onChange={onChange} />
      </Wrapper>
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  const i18n = ['common', 'article', 'detail', 'jobTable', 'navigation', 'opening', 'posting', 'login'];
  const translation = await serverSideTranslations(locale, i18n);
  const post = {};
  return { props: { post, ...translation } };
}

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
