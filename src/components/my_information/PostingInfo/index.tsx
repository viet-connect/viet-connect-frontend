import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ListItem from '../ListItem';

export default function PostingInfo(props) {
  const { appliedPostings } = props;
  const { t } = useTranslation();

  return (
    <Container>
      <ListItem title={t('posting:koLangSkill')}></ListItem>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div``;
