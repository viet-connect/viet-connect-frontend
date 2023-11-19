import styled from 'styled-components';

interface BadgeProps {
    className: string;
    id: string;
    label: string;
    onClick?: (e) => void
}

export default function Badge(props: BadgeProps) {
    const { className: _className, id, label, onClick } = props;
    const className = onClick ? `${_className} common-badge--clickable` : '';
    return (
        <Wrapper className={className} onClick={() => onClick ? onClick(id) : {}}>{label}</Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 8px;
    height: 16px;
    font-size: 8px;
    border: 1px solid rgba(128,128,128,0.5);
    border-radius: 20px;
    
    &.common-badge {
        &--clickable {
            cursor: pointer;
        }
        &--selected {
            color: $white;
            background-color: rgba(68,142,247, 0.2);
        }
    }

    &:hover {
        border: 1px solid #448ef7;
    }
`;
