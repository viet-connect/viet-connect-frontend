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
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta property="og:title" content={`비엣커넥트 공고: ${title}`} />
    <meta property="og:type" content="website" />
    <meta property="og:article:author" content="tìm việc làm tại hàn quốc" />
    <meta name="google-site-verification" content="AZZcGA28wo57AUEGR_hMLIl-qSlJaSIB9D_kXRWqoFI" />
  </Head>
);
export default MetaHead;
