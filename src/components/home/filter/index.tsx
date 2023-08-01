import styled from 'styled-components';
import Select from 'react-select';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useId, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CommonButton from '../../common/Button';
import region from '../../../constant/region';
import {
	searchKeyword,
	selectedRegionState,
} from '../../../recoil/atom/region';
// import { category } from '../../../constant/constant';

export default function HomeFilter() {
	const [selectedProvince, setSelectedProvince] = useState('');
	const [selectedDistrictArray, setSelectedDistrictArray] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState('');
	const [keyword, setKeyword] = useState('');
	const setSearchKeyword = useSetRecoilState(searchKeyword);
	const regionArray = Object.values(region);
	const setSelectedRegionState = useSetRecoilState(selectedRegionState);

	const customStyles = {
		control: (styles, state) => ({
			...styles,
			cursor: 'pointer',
			height: 50,
		}),
		option: (styles, state) => ({
			...styles,
			cursor: 'pointer',
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
				setSelectedDistrict('-- 시/군/구 --');
			}
		}
	}, [selectedProvince]);

	return (
		<Container>
			<SelectContainer>
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
						value={{
							value: selectedDistrict,
							label: selectedDistrict,
						}}
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
			</SelectContainer>
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
				<SearchInput
					type="text"
					id="search-input"
					name="search-input"
					className="search-input"
					placeholder="채용공고를 검색해보세요!"
					onChange={(event) => {
						setKeyword(event.target.value);
					}}
				></SearchInput>
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
	flex-direction: column;
	gap: 20px;
`;

const SelectContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;
	width: 100%;
`;

const SelectWrapper = styled.div`
	flex: 1 0;
`;

const ButtonOutterWrapper = styled.div``;

const ButtonChildrenWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	:hover {
		webkit-filter: blur(0.7px); /* Chrome, Safari, Opera */
		filter: blur(0.7px);
	}
`;

const IconWrapper = styled.div``;
const ButtonTextWrapper = styled.div`
	font-size: 15px;
	color: white;
	font-weight: 400;
`;

const InputWrapper = styled.div`
	width: 100%;
`;

const SearchInput = styled.input`
	width: 100%;
	height: 45px;
`;
