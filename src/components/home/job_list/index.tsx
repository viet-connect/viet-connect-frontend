import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import JobCard from './job_card';
import GoogleAd from '../../common/GoogleAd';

export default function JobList({ tableContent }) {
  const router = useRouter();
  const onClick = () => {
    router.push('/forum/detail/anchor');
  };
  return (
    <JobListWrapper>
      <Banner onClick={onClick}>
        <Image alt="banner" src="/banner.png" fill />
      </Banner>
      {tableContent.map((content, i) => (
        <div key={content.id}>
          <JobCard content={content} />
          {i === 4 && <GoogleAd />}
        </div>
      ))}
    </JobListWrapper>
  );
}

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 104px;
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
