import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Link from 'next/link';
import CommonButton from '../../common/Button';
import Modal from '../../common/Modal';
import BasicInfo from '../BasicInfo';
import ConditionalInfo from '../ConditionalInfo';

export default function PostingList(props) {
  const { list = [] } = props;
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [appliedPost, setAppiedPost] = useState(null);
  const [appliers, setAppliers] = useState([]);

  const btnAttrs = {
    label: t('posting:getApplierBtnLabel'),
    wrapperStyle: {
      width: 'auto',
      height: 40,
      color: 'white',
    },
    extraWrapperStyle: {
      padding: '1px 16px',
      color: '#297EFF',
      border: '1px solid rgba(128, 128, 128, 0.50)',
      borderRadius: '6px',
    },
  };

  return (
    <Container>
      {list.map(({ contactName, title, appliedUsers, id }, i) => (
        <ListItem key={i} $last={i === list.length - 1}>
          <Link
            style={{ textDecoration: 'none', color: 'inherit', flex: 1, cursor: 'pointer' }}
            key={id}
            href={`/job_opening/detail/${id}`}
          >
            {title && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <div className="list__contact-name">{title}</div>
                <div className="list__appliers-status">현재 {appliedUsers.length}명의 지원자가 있습니다</div>
              </div>
            )}
            {contactName && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="list__contact-name">{contactName}</div>
              </div>
            )}
          </Link>
          {/* TODO: 조건에 따른 블러 on/off 적용 */}
          {appliedUsers && (
            <CommonButton
              onClick={() => {
                setShowModal(true);
                setAppliers(appliedUsers);
              }}
              {...btnAttrs}
            />
          )}
        </ListItem>
      ))}
      <Modal show={showModal} width={500} height={400} title="지원자 목록" onClose={() => setShowModal(false)}>
        <ModalContentContainer>
          <div>
            {appliers.map((applicant, index) => (
              <ItemContainer key={index}>
                <div style={{ marginTop: 10 }} key={applicant.id}>
                  {index + 1}. {applicant.name} / {applicant.email}
                </div>
                <CommonButton
                  label="이력서 보기"
                  wrapperStyle={{ height: '100% ' }}
                  extraWrapperStyle={{ width: 100, backgroundColor: '#1990ff', color: 'white' }}
                  onClick={() => setAppiedPost(applicant)}
                />
                <Modal
                  show={appliedPost?.id === applicant.id}
                  title="지원자 이력서"
                  width={500}
                  height="max-content"
                  onClose={() => {
                    setAppiedPost(null);

                    const scrollY = document.body.style.top;
                    document.body.style.cssText = '';
                    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
                  }}
                >
                  <ModalWrapper>
                    <BasicInfo {...applicant} readOnly />
                    <ConditionalInfo {...applicant} readOnly />
                  </ModalWrapper>
                </Modal>
              </ItemContainer>
            ))}
            {appliers.length === 0 && <div style={{ marginTop: 10 }}>{'현재 해당 공고에 지원자가 없습니다.'}</div>}
          </div>
        </ModalContentContainer>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
`;

interface ListItemProps {
  $last: boolean;
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ListItem = styled.div<ListItemProps>`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 4px;
  min-height: 40px;
  border-radius: 5px;
  border-bottom: ${({ $last }) => ($last ? 'none' : '1px solid rgba(128, 128, 128, 0.5)')};

  &:hover {
    background-color: #f1f1f1;
  }

  .list {
    &__contact-name {
      font-weight: bold;
    }
  }

  .list {
    &__appliers-status {
      font-size: 12px;
    }
  }
`;

const ModalContentContainer = styled.div``;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  padding-bottom: 16px;

  .apply_modal_title {
    font-size: 25px;
    line-height: 1.3;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
