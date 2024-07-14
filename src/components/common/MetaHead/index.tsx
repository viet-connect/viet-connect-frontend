import Head from 'next/head';

interface MetaDataProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const MetaHead = ({ title, description }: MetaDataProps) => (
  <Head>
    <title>{`비엣커넥트${title}`}</title>
    <meta name="description" content={description || 'tìm việc làm tại hàn quốc'} />
    <meta property="og:title" content={`비엣커넥트 공고: ${title}`} />
  </Head>
);
export default MetaHead;
