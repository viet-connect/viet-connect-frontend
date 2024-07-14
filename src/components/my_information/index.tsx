import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import BasicInfo from './BasicInfo';
import ConditionalInfo from './ConditionalInfo';
import CommonButton from '../common/Button';
import { IUser, User } from '../../models/user';
import RadioBox from '../common/RadioBox';
import PostingList from './PostingList';
import MetaHead from '../common/MetaHead';
import Modal from '../common/Modal';

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
  const [postingType, setPostingType] = useState('postedPostings');
  const [subPage, setSubPage] = useState('privacy');
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const { t } = useTranslation();

  const onChange = (value) => {
    setInfo({ ...info, ...value });
  };

  const saveInfo = async () => {
    const { name, nation, gender, birth, phone } = info;
    const isBasicFull = name && nation && gender && birth && phone;
    if (!isBasicFull) {
      setShowInvalidModal(true);
      return;
    }

    setIsUpdateLoading(true);
    const validInfo = Object.entries(info).reduce((r, [key, value]) => {
      if (['appliedPostings', 'postedPostings'].includes(key) || !value) return r;
      r[key] = value;
      return r;
    }, {});
    try {
      await User.handleUpdateUser(sesstionData?.user?.id, validInfo as IUser);
      router.push('/');
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return (
    <Container>
      <MetaHead title={`: ${t('navigation:myInformation')}-${t(`myPage:${subPage}`)}`} />
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
          onChange={(v) => {
            if (v) setSubPage(v);
          }}
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
            loading={isUpdateLoading}
            onClick={saveInfo}
          />
        </PrivacyConatiner>
      ) : (
        <>
          <RadioBox
            value={postingType}
            options={[
              { label: t('myPage:postedPostings'), value: 'postedPostings' },
              { label: t('myPage:appliedPostings'), value: 'appliedPostings' },
            ]}
            onChange={(v) => {
              if (v) setPostingType(v);
            }}
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
              postingType === 'postedPostings'
                ? info.postedPostings.map((posting) => {
                    const { id, contactNumber, appliedUsers, title } = posting;
                    return {
                      id,
                      contactNumber,
                      appliedUsers,
                      title,
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
      <Modal
        show={showInvalidModal}
        title="필수 정보를 모두 입력해주세요!"
        width={400}
        onClose={() => setShowInvalidModal(false)}
      >
        <div>누락된 정보는 아래와 같습니다.</div>
        {Object.entries(info).map(([k, v]) => {
          if (!v) {
            if (k === 'name') return <li>{t('myPage:name')}</li>;
            if (k === 'nation') return <li>{t('myPage:nationality')}</li>;
            if (k === 'gender') return <li>{t('myPage:gender')}</li>;
            if (k === 'birth') return <li>{t('myPage:dateOfBirth')}</li>;
            if (k === 'phone') return <li>{t('posting:contact')}</li>;
          }
          return null;
        })}
      </Modal>
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
  margin-bottom: 16px;
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
