import { useRouter } from 'next/router';
import styled from 'styled-components';
import WageBox from '../../../common/WageBox';
import SvgIcon from '../../../common/Icon';

export default function JobCard({ content }) {
  const router = useRouter();
  const { id, date, region, salary, title, contact_name, view_count, premium } = content;
  const onClickRedirectDetail = () => {
    router.push(`job_opening/detail/${id}`);
  };

  return (
    <CardWrapper onClick={onClickRedirectDetail} $premium={premium}>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: 10 }}>{contact_name}</div>
          {premium && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SvgIcon name="premium" width={20} height={20} />
              <div style={{ fontWeight: 'bold', color: '#ed571c' }}>프리미엄 공고</div>
            </div>
          )}
        </div>
        <DateWrapper>
          <span style={{ marginRight: 13 }}>조회수: {view_count}</span>
          <span>{date}</span>
        </DateWrapper>
      </CardHeader>
      <CardMain>{title}</CardMain>
      <CardFooter>
        <div>{region}</div>
        <WageWrapper>
          <div>{`${salary.wage}원`}</div>
          <WageBox termIndex={salary.way} />
        </WageWrapper>
      </CardFooter>
    </CardWrapper>
  );
}

const CardWrapper = styled.div<{ $premium: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 6px;
  border: solid 1px rgba(128, 128, 128, 0.5);
  background-color: ${(props) => props.$premium && '#b5dbff'};
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  align-items: center;
`;

const DateWrapper = styled.div`
  font-size: 12px;
`;

const CardMain = styled.div`
  font-size: 13px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;

const WageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
