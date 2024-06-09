import React from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import DateUtils from '../../../utils/DateUtils';
import Badge from '../../common/Badge';

export default function ArticleCard({ article, announcement }) {
  const router = useRouter();
  const { t } = useTranslation();

  const { id, author, category: _category, title, viewCount, createdAt } = article;
  const date = createdAt ? DateUtils.getFullDateString(createdAt) : '';
  const category = t(`article:${_category}`);

  const onClick = () => {
    router.push(`forum/detail/${id}`);
  };

  /* 임시방편 ID가 anchor일 때는 버튼생성 */
  return (
    <Wrapper className="article" announcement onClick={onClick}>
      <div className="article__category">{category}</div>
      {id !== 'anchor' && date && <div className="article__date">{date}</div>}
      <div className="article__title">{title}</div>
      <div className="article__author">{`작성자: ${author}`}</div>
      {viewCount && <div className="article__view-count">{`조회 ${viewCount}`}</div>}
    </Wrapper>
  );
}

interface hoverProps {
  announcement: Boolean;
}

const Wrapper = styled.div<hoverProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  cursor: pointer;
  &:hover {
    ${(props) =>
      props.announcement
        ? css`
            background-color: rgb(234, 123, 20, 0.1);
          `
        : css`
            background-color: #f1f1f1;
          `}
  }

  .article {
    &__category,
    &__title {
      font-size: 13px;
    }
    &__title {
      grid-column: span 4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__title {
      font-weight: bold;
    }
    &__category {
      grid-column: 1 / 4;
    }
    &__author,
    &__date,
    &__view-count {
      font-size: 12px;
    }
    &__author {
      grid-column: 1 / 4;
    }
    &__date,
    &__view-count {
      text-align: right;
    }
  }
`;
