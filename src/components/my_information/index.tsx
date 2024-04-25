import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicInfo from './BasicInfo';
import ConditionalInfo from './ConditionalInfo';
import PostingInfo from './PostingInfo';
import CommonButton from '../common/Button';
import { IUser, User } from '../../models/user';

export default function MyInformation({ data }) {
  const { data: sesstionData } = useSession();
  const [info, setInfo] = useState({
    image: '',
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
    ...data,
  });

  const onChange = (value) => {
    setInfo({ ...info, ...value });
  };

  const saveInfo = () => {
    const validInfo = Object.entries(info).reduce((r, [key, value]) => {
      if (!value) return r;
      r[key] = value;
      return r;
    }, {});
    User.handleUpdateUser(sesstionData?.user?.id, validInfo as IUser);
  };

  return (
    <Container>
      <ImageWrapper>
        {sesstionData?.user?.image ? (
          <Image src={sesstionData?.user?.image} alt="profile-image" width={150} height={150} />
        ) : (
          <div className="empty-image" />
        )}
      </ImageWrapper>
      <BasicInfo {...info} onChange={onChange} />
      <ConditionalInfo {...info} onChange={onChange} />
      <PostingInfo {...info} />
      <CommonButton
        className="save-button"
        label="저장하기"
        extraWrapperStyle={{ height: 43, color: 'white', backgroundColor: '#1890ff' }}
        onClick={saveInfo}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
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
