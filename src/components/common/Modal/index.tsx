import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CommonButton from '../Button';

interface Props {
  show: boolean;
  title?: string;
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  onClose?: () => void;
}

const Modal = ({ show, title, children, width, height, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal $width={width} $height={height}>
        {(onClose || title) && (
          <Header>
            {title && <div className="modal-title">{title}</div>}
            {onClose && (
              <CommonButton
                label="X"
                extraWrapperStyle={{
                  width: 'auto',
                  color: 'black',
                  backgroundColor: 'white',
                }}
                textStyle={{ fontSize: '20px' }}
                onClick={onClose}
              />
            )}
          </Header>
        )}
        <StyledModalBody>{children}</StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
  }
  return null;
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

interface ModalStyleProps {
  $width?: string | number;
  $height?: string | number;
}

const StyledModal = styled.div<ModalStyleProps>`
  position: relative;
  width: ${({ $width }) => `${typeof $width === 'number' ? `${$width}px` : $width}` ?? 'auto'};
  height: ${({ $height }) => `${typeof $height === 'number' ? `${$height}px` : $height}` ?? 'auto'};
  max-height: 95%;
  overflow: auto;
  background: white;

  border-radius: 15px;
  padding: 15px;

  @media (max-width: 500px) {
    width: 100%;
    height: 95%;
    overflow: auto;
  }
`;
const StyledModalOverlay = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: '100%';
  margin-bottom: 16px;

  .modal-title {
    flex: 1;
    font-size: 24px;
  }
`;

export default Modal;
