import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { Posting } from '../../src/models/posting';

export const getServerSideProps = async (context) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.DEPLOY_URL;
  const promiseArray = [];
  const { totalPages = 1 } = await Posting.getPostingList({ postingPage: '1' });

  for (let i = 1; i < totalPages; i += 1) {
    promiseArray.push(Posting.getPostingList({ postingPage: `${i + 1}` }));
  }

  const res = await Promise.all(promiseArray);
  const jobList = [];
  for (let i = 0; i < res.length; i += 1) {
    jobList.push(...res[i].list);
  }

  const sitemapFields: ISitemapField[] = jobList.map(({ id }) => ({
    loc: `${url}job_opening/detail/${id}`, // 페이지 경로
    lastmod: new Date().toISOString(), // 최근변경일자
    changefreq: 'daily', // 페이지 주소 변경 빈도 (검색엔진에 제공됨) - always, daily, hourly, monthly, never, weekly, yearly 중 택 1
    priority: 1, // 페이지 주소 우선순위 (검색엔진에 제공됨, 우선순위가 높은 순서대로 크롤링함)
  }));
  // console.log(sitemapFields);

  const sitemap = getServerSideSitemapLegacy(context, sitemapFields);
  return sitemap;
};

export default (props) => null;
