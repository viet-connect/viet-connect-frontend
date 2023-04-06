import styled from 'styled-components';
import Select from 'react-select';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useId, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import CommonButton from '../../common/Button';
import region from '../../../constant/region';
import { selectedRegionState } from '../../../recoil/atom/region';
// import { category } from '../../../constant/constant';

export default function HomeFilter() {
	const [selectedProvince, setSelectedProvince] = useState('');
	const [selectedDistrictArray, setSelectedDistrictArray] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState('');
	const regionArray = Object.values(region);
	const setSelectedRegionState = useSetRecoilState(selectedRegionState);

	const customStyles = {
		control: (styles, state) => ({
			...styles,
			cursor: 'pointer',
			width: 260,
		}),
		option: (styles, state) => ({
			...styles,
			cursor: 'pointer',
			width: 260,
		}),
	};

	const handleClickSetRegionArray = () => {
		setSelectedRegionState([
			region[selectedProvince].province[0],
			selectedDistrict,
		]);
	};

	useEffect(() => {
		if (selectedProvince.length > 0) {
			const target = Object.values(region[selectedProvince])[1];

			if (Array.isArray(target)) {
				setSelectedDistrictArray(target);
			}
		}
	}, [selectedProvince]);

	return (
		<Container>
			<SelectWrapper>
				<Select
					styles={customStyles}
					options={regionArray.map(({ province }) => ({
						value: province[1],
						label: province[0],
					}))}
					defaultValue={{ value: 'city/province', label: '-- 시/도 --' }}
					instanceId={useId()}
					onChange={(e) => setSelectedProvince(e.value)}
				/>
			</SelectWrapper>
			<SelectWrapper>
				<Select
					styles={customStyles}
					options={
						selectedDistrictArray.length > 0 &&
						selectedDistrictArray.map((el) => ({
							value: el,
							label: el,
						}))
					}
					onChange={(e) => setSelectedDistrict(e.value)}
					instanceId={useId()}
					isDisabled={selectedProvince.length === 0}
					defaultValue={{ value: 'district/county', label: '-- 시/군/구 --' }}
				/>
			</SelectWrapper>
			{/* <SelectWrapper style={{ marginRight: 20 }}>
				<Select
					styles={customStyles}
					options={Object.entries(category).map((el) => {
						const [value, label] = [el[0], el[1]];
						return {
							value,
							label,
						};
					})}
					defaultValue={{ value: 'category', label: '-- 직무 선택 --' }}
				/>
			</SelectWrapper> */}
			<InputWrapper>
				<SearchInput className="search-input"></SearchInput>
			</InputWrapper>
			<ButtonOutterWrapper className="home-button-wrapper">
				<CommonButton
					wrapperStyle={{
						// width: 355,
						height: 40,
						color: '#1890ff',
					}}
					className="home-button"
					onClick={
						selectedProvince.length > 0 && selectedDistrict.length > 0
							? handleClickSetRegionArray
							: undefined
					}
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
			</ButtonOutterWrapper>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
`;

const SelectWrapper = styled.div`
	margin: 0px 5px 20px 0;
`;

const ButtonOutterWrapper = styled.div`
	margin: 0px 0px 20px 0;
`;

const ButtonChildrenWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	:hover {
		webkit-filter: blur(0.7px); /* Chrome, Safari, Opera */
		filter: blur(0.7px);
	}
`;

const IconWrapper = styled.div``;
const ButtonTextWrapper = styled.div`
	margin-right: 5px;
	font-size: 15px;
	color: white;
	font-weight: 400;
`;

const InputWrapper = styled.div`
	margin-bottom: 20px;
`;

const SearchInput = styled.input`
	height: 38px;
`;
