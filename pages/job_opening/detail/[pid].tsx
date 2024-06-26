import styled, { css } from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Layout from '../../../src/components/common/Layout';
import ContentHeader from '../../../src/components/job_opening/detail/content_header';
import MainContent from '../../../src/components/job_opening/detail/main_content';
import { Posting } from '../../../src/models/posting';
import LocationInfo from '../../../src/components/job_opening/detail/location_iinfo';
import CommonButton from '../../../src/components/common/Button';
import { User } from '../../../src/models/user';
import validate from '../../../src/utils/validate';
import { KakaoAlarm } from '../../../src/models/alarm';
import Modal from '../../../src/components/common/Modal';
import BasicInfo from '../../../src/components/my_information/BasicInfo';
import ConditionalInfo from '../../../src/components/my_information/ConditionalInfo';
import CommonUtils from '../../../src/utils/commonUtils';
import { Tooltip } from 'react-tooltip';

export default function JobOpeningDetail({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const { t } = useTranslation();
  const session = useSession();
  const sessionData = session?.data;
  const router = useRouter();

  const onApplyJobOpening = async () => {
    setIsLoading(true);
    try {
      if (session.status === 'authenticated') {
        const userData = await User.getUserInfo(sessionData?.user?.id);
        if (!validate.hasMyPageInfo(userData)) {
          toast.error('Xin nhập vào các thông tin cá nhân để xin việc');

          router.push('/my_information');
          return;
        }

        await User.handleApplyPosting(data.id, sessionData?.user?.id);
        setIsApplied(true);

        const { id, title, contactNumber, postedUsers = [] } = data;
        if (contactNumber) {
          const { id: myId } = sessionData.user ?? {};
          const { name = '사장님' } = postedUsers[0] ?? {};
          await KakaoAlarm.sendChannelTalk({ title, name, templateId: id, contactNumber, userId: myId });
        }

        toast.success('Xin việc hoàn thành.');
        return;
      }

      signIn();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  const isPostedUser = useMemo(
    () => data.postedUsers.length > 0 && data.postedUsers[0].id === session.data?.user?.id,
    [data.postedUsers, session.data?.user?.id],
  );

  const isAppliedPosting = useMemo(
    () => data.appliedUsers.find(({ id }) => id === sessionData?.user?.id),
    [data.appliedUsers, sessionData],
  );

  const [showModal, setShowModal] = useState(false);
  const [appliedUser, setAppliedUser] = useState(null);
  useEffect(() => {
    const isModalValid = data.postedUsers.some(
      ({ id: posterId }) => posterId && sessionData?.user?.id && posterId === sessionData?.user?.id,
    );
    const { applicant_id } = router.query;
    if (!isModalValid || !applicant_id) return;

    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow: auto;
    width: 100%;`;

    const user = data.appliedUsers.find(({ id }) => id === applicant_id);
    setAppliedUser(user);
    setShowModal(true);
  }, [sessionData]);

  return (
    <Layout pageIndex={0}>
      <Container>
        <ContentHeader data={data} />
        <MainContent data={data} />
        <LocationInfo data={data} />
        <ContactInfo>
          <div style={{ margin: '10px 0 10px 0' }}>
            {t('detail:companyName')}: {data.contactName}
          </div>
          <span>{t('detail:managerContact')} : </span>
          <PhoneNumber auth={session.status} id="phone-number">
            {CommonUtils.addHyphenToPhoneNumber(data.contactNumber)}
          </PhoneNumber>
          <Tooltip anchorSelect="#phone-number" place="right">
            <div>Xin vui lòng đăng nhập để xem số liên hệ</div>
          </Tooltip>
        </ContactInfo>
        <ButtonOutterWrapper>
          <CommonButton
            wrapperStyle={{
              height: 45,
              color: '#1890ff',
            }}
            disabled={isApplied || Boolean(isAppliedPosting)}
            loading={isLoading}
            onClick={isPostedUser ? () => router.push('/forum/detail/anchor') : onApplyJobOpening}
          >
            <ButtonChildrenWrapper>
              {isPostedUser ? (
                <ButtonTextWrapper>{t('posting:subscribeBtnLabel')}</ButtonTextWrapper>
              ) : (
                <ButtonTextWrapper>{t('posting:applyBtnLabel')}</ButtonTextWrapper>
              )}
            </ButtonChildrenWrapper>
          </CommonButton>
        </ButtonOutterWrapper>
        {/* <div>****비엣커넥트 경영진 인증용 코드******</div>
        <div>공고만든자사람 이름이랑 아이디 연동완료</div>
        <div>이름:{data.postedUsers[0].name} = 공고의 창시자</div>
        <div>아이디:{data.postedUsers[0].id} = 공고의 창시자</div>
        <div>{data.appliedUsers.map((user) => user.name)}님이 지원하였습니다</div> */}
      </Container>
      {appliedUser && (
        <Modal
          show={showModal}
          title="지원자 이력서"
          width={500}
          height="max-content"
          onClose={() => {
            setShowModal(false);

            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
          }}
        >
          <ModalWrapper>
            <BasicInfo {...appliedUser} readOnly />
            <ConditionalInfo {...appliedUser} readOnly />
          </ModalWrapper>
        </Modal>
      )}
    </Layout>
  );
}

const Container = styled.div``;

const ButtonOutterWrapper = styled.div`
  margin-bottom: 20px;
`;

const ButtonChildrenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ButtonTextWrapper = styled.div`
  font-size: 15px;
  color: white;
  font-weight: 400;
`;

const ContactInfo = styled.div`
  margin: 10px 0 10px 0;
  font-size: 18px;
`;

interface ISession {
  auth: string;
}

const PhoneNumber = styled.span<ISession>`
  ${(props) =>
    props.auth === 'unauthenticated' &&
    css`
      text-shadow: 0px 0px 10px black;
      color: transparent;
      cursor: pointer;
    `}
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export async function getServerSideProps(context) {
  const data = await Posting.getUniquePosting(context.query.pid);
  return {
    props: {
      data,
      ...(await serverSideTranslations(context.locale, [
        'common',
        'detail',
        'jobTable',
        'navigation',
        'opening',
        'posting',
        'login',
        'myPage',
      ])),
    },
  };
}
