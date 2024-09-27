import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import JobCard from './job_card';
import GoogleAd from '../../common/GoogleAd';

export default function JobList({ tableContent, serviceList }) {
  const router = useRouter();
  const onClick = () => {
    router.push('/forum/detail/anchor');
  };

  const totalList = serviceList.concat(tableContent);

  return (
    <JobListWrapper>
      <Link href="https://vn.beemall.shop/" passHref legacyBehavior>
        <a target="_blank">
          <Banner>
            <Image alt="banner" src="/bemall.jpeg" fill />
          </Banner>
        </a>
      </Link>
      {totalList.map((content, i) => (
        <div key={content.id}>
          <JobCard content={content} />
          {i === 4 && <GoogleAd adId="6000990775" />}
        </div>
      ))}
    </JobListWrapper>
  );
}

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  gap: 5px;
  cursor: pointer;

  img {
    object-fit: fit;
    overflow: hidden;
  }
`;

const JobListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .adsbygoogle {
    margin-top: 8px;
  }
`;
