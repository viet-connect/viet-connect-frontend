import styled from 'styled-components';
import Image from 'next/image';
import JobCard from './job_card';
import GoogleAd from '../../common/GoogleAd';

export default function JobList({ tableContent }) {
  const onClick = () => {
    window.Kakao.Channel.chat({
      channelPublicId: '_XtVUG',
    });
  };
  return (
    <JobListWrapper>
      <Banner onClick={onClick}>
        <Image alt="banner" src="/banner.jpeg" fill />
      </Banner>
      {tableContent.map((content, i) => (
        <div key={content.id}>
          {i === 4 && <GoogleAd />}
          <JobCard content={content} />
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
    border-radius: 10px;
    overflow: hidden;
  }
`;

const JobListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
