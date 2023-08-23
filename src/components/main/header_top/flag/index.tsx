import React from 'react';
import styled from 'styled-components';
import i18n from 'i18next';
import SvgIcon from '../../../common/Icon';

export default function Flag() {
	const onChangeLang = (locale) => {
		i18n.changeLanguage(locale);
	};
	return (
		<Container>
			<IconWrapper onClick={() => onChangeLang('vn')}>
				<SvgIcon
					style={{ marginRight: 5 }}
					name="vietnamFlag"
					width={29}
					height={19}
				/>
			</IconWrapper>
			<IconWrapper onClick={() => onChangeLang('ko')}>
				<SvgIcon name="koreanFlag" width={29} height={19} />
			</IconWrapper>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
`;
const IconWrapper = styled.div`
	cursor: pointer;
`;
