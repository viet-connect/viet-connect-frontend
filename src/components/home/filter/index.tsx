import styled from 'styled-components';
import Select from 'react-select';
import { BsSearch } from 'react-icons/bs';
import CommonButton from '../../common/Button';

export default function HomeFilter() {
	const province = [
		{ value: '서울시', label: '서울시' },
		{ value: '경기도', label: '경기도' },
	];

	const district = [];

	const customStyles = {
		control: (styles, state) => ({
			...styles,
			cursor: 'pointer',
		}),
		option: (styles, state) => ({
			...styles,
			cursor: 'pointer',
		}),
	};

	return (
		<Container>
			<SelectWrapper>
				<Select
					styles={customStyles}
					options={province}
					defaultValue={{ value: '-- 시/도 --', label: 'city/province' }}
				/>
			</SelectWrapper>
			<SelectWrapper>
				<Select
					styles={customStyles}
					options={province}
					defaultValue={{ value: '-- 시/군/구 --', label: 'district/county' }}
				/>
			</SelectWrapper>
			<SelectWrapper style={{ marginRight: 20 }}>
				<Select
					styles={customStyles}
					options={province}
					// defaultValue={options[0]}
				/>
			</SelectWrapper>
			<CommonButton
				wrapperStyle={{
					width: 250,
					height: 37,
					color: '#1890ff',
				}}
			>
				<ButtonChildrenWrapper>
					<ButtonTextWrapper>검색</ButtonTextWrapper>
					<IconWrapper>
						<BsSearch
							style={{ verticalAlign: 'top' }}
							fontSize={13}
							color="white"
						/>
					</IconWrapper>
				</ButtonChildrenWrapper>
			</CommonButton>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const SelectWrapper = styled.div`
	margin-right: 5px;
`;
const ButtonChildrenWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const IconWrapper = styled.div``;
const ButtonTextWrapper = styled.div`
	margin-right: 5px;
	font-size: 15px;
	color: white;
	font-weight: 400;
`;
