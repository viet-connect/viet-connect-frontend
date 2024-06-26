import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export default function ListItem(props) {
  const { title, headerRight, readOnly, required, children } = props;
  const { t } = useTranslation();
  return (
    <Container>
      <Header>
        <div className="header__right">
          <div>{title}</div>
          {!readOnly && required && <div className="header__required">{t('myPage:requiredInfo')}</div>}
        </div>
        {headerRight?.()}
      </Header>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.div`
  font-size: 16px;
  font-weight: bold;

  .header {
    &__right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    &__required {
      font-size: 12px;
      color: #c7c7c7;
    }
  }
`;
