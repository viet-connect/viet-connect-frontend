import styled from 'styled-components';
import CommonButton from '../Button';
import usePagination from '../../../hooks/usePagination';

interface Props {
    totalPages: number
}

export default function PageController(props: Props) {
    const { totalPages } = props;

    const { currentPage, showPages, onMovePage } = usePagination(totalPages);
    const wrapperStyle = { color: 'transparent', width: 50, height: 40 };
    const textStyle = (number) => ({ fontSize: 16, color: parseInt(number, 10) === currentPage ? '#1890ff' : 'black' });
    const btnAttrs = (label) => ({ wrapperStyle, textStyle: textStyle(label), label });

    const onClick = (pageNumber) => {
        if (currentPage === pageNumber) return;

        onMovePage(pageNumber);
    };
    return (
        <Container>
            <CommonButton {...btnAttrs('<')} onClick={() => onClick('prev')}/>
            {showPages.map((pageNumber) => <CommonButton key={pageNumber} {...btnAttrs(`${pageNumber}`)} onClick={() => onClick(pageNumber)}/>)}
            <CommonButton {...btnAttrs('>')} onClick={() => onClick('next')}/>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
