import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export default function InfoWrapper(props) {
  const { title, readOnly, required, children } = props;
  const { t } = useTranslation();
  const guideMsg = required ? t('myPage:requiredInfo') : t('myPage:conditionalInfo');
  return (
    <Wrapper>
      <Header>
        <div className="header__title">{title}</div>
        {!readOnly && <div className="header__guide">{guideMsg}</div>}
      </Header>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .info {
    &__input {
      padding: 0px;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;

  .header {
    &__title,
    &__guide {
      font-weight: bold;
    }
    &__guide {
      font-size: 12px;
      color: #c7c7c7;
    }
  }
`;
