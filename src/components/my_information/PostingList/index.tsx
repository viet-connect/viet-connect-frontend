import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CommonButton from '../../common/Button';
import Modal from '../../common/Modal';
import { ClosingModalButton } from '../../job_opening/posting/fourth_part';

export default function PostingList(props) {
  const { list = [] } = props;
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
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
      {list.map(({ contactName, appliedUsers }, i) => (
        <ListItem key={i} $last={i === list.length - 1}>
          <div className="list__contact-name">{contactName}</div>
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
      <Modal
        width={500}
        height={400}
        // onClose={() => setShowErrorModal(false)}
        show={showModal}
      >
        <ModalContentContainer>
          <div>
            {appliers.map((applicant) => (
              <div key={applicant.id}>{applicant.name}</div>
            ))}
          </div>
          <ClosingModalButton onClick={() => setShowModal(false)}>{t('detail:closeBtnLabel')}</ClosingModalButton>
        </ModalContentContainer>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ListItemProps {
  $last: boolean;
}

const ListItem = styled.div<ListItemProps>`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 4px;
  min-height: 40px;
  border-radius: 5px;
  border-bottom: ${({ $last }) => ($last ? 'none' : '1px solid rgba(128, 128, 128, 0.5)')};
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }

  .list {
    &__contact-name {
      font-weight: bold;
    }
  }
`;

const ModalContentContainer = styled.div``;
