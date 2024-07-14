import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { Article } from '../../src/models/article';

export const getServerSideProps = async (context) => {
  const articles = await Article.getArticleList(); // fetch를 통해 데이터 가져오는 구간
  const url =
    process.env.NODE_ENV === 'development'
      ? `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.DEPLOY_URL;
  const sitemapFields: ISitemapField[] = articles.map(({ id }) => ({
    loc: `${url}/forum/detail/${id}`, // 페이지 경로
    lastmod: new Date().toISOString(), // 최근변경일자
    changefreq: 'daily', // 페이지 주소 변경 빈도 (검색엔진에 제공됨) - always, daily, hourly, monthly, never, weekly, yearly 중 택 1
    priority: 1, // 페이지 주소 우선순위 (검색엔진에 제공됨, 우선순위가 높은 순서대로 크롤링함)
  }));

  const sitemap = getServerSideSitemapLegacy(context, sitemapFields);
  return sitemap;
};

export default (props) => null;
