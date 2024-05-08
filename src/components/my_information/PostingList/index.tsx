import styled from 'styled-components';

export default function PostingList(props) {
  const { list = [] } = props;
  return (
    <Container>
      {list.map(({ contactName, name, phone }, i) => (
        <ListItem key={i} $last={i === list.length - 1}>
          <div className="list__contact-name">{contactName}</div>
          {/* TODO: 조건에 따른 블러 on/off 적용 */}
          {name && phone && <div>{`${name}: ${phone}`}</div>}
        </ListItem>
      ))}
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
  flex-direction: column;
  justify-content: center;
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
