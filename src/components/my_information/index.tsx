import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import BasicInfo from './BasicInfo';
import ConditionalInfo from './ConditionalInfo';
import PostingInfo from './PostingInfo';
import CommonButton from '../common/Button';
import { IUser, User } from '../../models/user';
import Toggle from '../common/Toggle';
import RadioBox from '../common/RadioBox';
import PostingList from './PostingList';

export default function MyInformation({ data }) {
  const { data: sesstionData } = useSession();
  const router = useRouter();
  const [info, setInfo] = useState({
    name: '',
    nation: null,
    gender: null,
    birth: '',
    phone: '',
    proficiency: '',
    career: '',
    careerDetail: '',
    residenceType: '',
    selfIntroduction: '',
    appliedPostings: [],
    postedPostings: [],
    ...data,
  });
  const [active, setActive] = useState(false);
  const [subPage, setSubPage] = useState('privacy');

  const { t } = useTranslation();

  const onChange = (value) => {
    setInfo({ ...info, ...value });
  };

  const saveInfo = () => {
    const validInfo = Object.entries(info).reduce((r, [key, value]) => {
      if (['appliedPostings', 'postedPostings'].includes(key) || !value) return r;
      r[key] = value;
      return r;
    }, {});
    User.handleUpdateUser(sesstionData?.user?.id, validInfo as IUser).then((res) => {
      router.push('/');
    });
  };

  const onToggle = (checked) => setActive(checked);

  return (
    <Container>
      <ImageWrapper>
        {sesstionData?.user?.image ? (
          <Image src={sesstionData?.user?.image} alt="profile-image" width={150} height={150} />
        ) : (
          <div className="empty-image" />
        )}
      </ImageWrapper>
      <PageControlWrapper>
        <RadioBox
          color="#F0F0F0"
          value={subPage}
          options={[
            { label: t('myPage:privacy'), value: 'privacy' },
            { label: t('myPage:postingInformation'), value: 'postingInformation' },
          ]}
          onChange={(v) => setSubPage(v)}
        />
      </PageControlWrapper>
      {subPage === 'privacy' ? (
        <PrivacyConatiner>
          <BasicInfo {...info} onChange={onChange} />
          <ConditionalInfo {...info} onChange={onChange} />
          <CommonButton
            className="save-button"
            label="저장하기"
            extraWrapperStyle={{ height: 43, color: 'white', backgroundColor: '#1890ff' }}
            onClick={saveInfo}
          />
        </PrivacyConatiner>
      ) : (
        <>
          <Toggle
            label={active ? t('myPage:postedPostings') : t('myPage:appliedPostings')}
            value={active}
            onChange={onToggle}
          />
          {/* TODO: DB 데이터 적용 */}
          {/* [
                    {
                      id: '지원한 공고 id1',
                      contactName: '지원한 별미곱창',
                    },
                  ] */}
          <PostingList
            list={
              active
                ? info.postedPostings.map((posting) => {
                    const { id, contactName, contactNumber, appliedUsers } = posting;
                    return {
                      id,
                      contactName,
                      contactNumber,
                      appliedUsers,
                    };
                  })
                : info.appliedPostings.map((posting) => {
                    const { id, contactName } = posting;
                    return {
                      id,
                      contactName,
                    };
                  })
            }
          />
        </>
      )}
    </Container>
  );
}

const PageControlWrapper = styled.div`
  display: flex;
  justify-content: center;

  .radio-box {
    width: 300px;
    height: 40px;
  }
`;

const PrivacyConatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
  }

  .empty-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #c7c7c7;
  }
`;
