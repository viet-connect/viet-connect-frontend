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
	const [selectedProvince, setSelectedProvince] = useState([
		'-- 전체 지역 --',
		'ALL',
	]);
	const [selectedDistrictArray, setSelectedDistrictArray] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState('-- 전체 지역 --');
	const [keyword, setKeyword] = useState('');
	const [inputKeyword, setSearchKeyword] = useRecoilState(searchKeyword);
	const regionArray = Object.values(region);
	const setSelectedRegionState = useSetRecoilState(selectedRegionState);
	const [isDisabled, setIsDisabled] = useState(true);
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
		if (keyword !== inputKeyword) {
			const trimedKeyword = keyword.trim();
			setSearchKeyword(trimedKeyword);
		}

		setSelectedRegionState([
			region[selectedProvince[1]].province[0],
			selectedDistrict,
		]);
	};

	/*
		1. 초기 : 박스1 -> 전체지역, 박스2 -> 전체지역(비활성)
		2. 2차지역 변경
		  - 전체 -> 2차지역 O
			- 2차지역 -> 전체 O
			- 2차지역 -> 2차지역 O
		3. 1차지역 변경
			- 전체 -> 1차지역 O
			- 1차지역 -> 전체 O
			- 1차지역 -> 1차지역
	*/

	useEffect(() => {
		if (selectedProvince[0] !== '-- 전체 지역 --') {
			const target = Object.values(region[selectedProvince[1]])[1];
			if (Array.isArray(target)) {
				if (isDisabled) {
					setIsDisabled(false);
				}

				if (selectedDistrict !== '-- 전체 지역 --') {
					setSelectedDistrict('-- 전체 지역 --');
				}

				setSelectedDistrictArray(['-- 전체 지역 --', ...target]);
			}
		} else {
			if (!isDisabled) {
				setIsDisabled(true);
			}

			if (selectedDistrict !== '-- 전체 지역 --') {
				setSelectedDistrict('-- 전체 지역 --');
			}
		}
	}, [selectedProvince]);

	return (
		<Container>
			<SelectContainer>
				<SelectWrapper>
					<Select
						styles={customStyles}
						value={{
							value: selectedProvince[1],
							label: selectedProvince[0],
						}}
						options={regionArray.map(({ province }) => ({
							value: province[1],
							label: province[0],
						}))}
						// defaultValue={{ value: 'city/province', label: '-- 전체 지역 --' }}
						instanceId={useId()}
						onChange={(e) => setSelectedProvince([e.label, e.value])}
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
						isDisabled={isDisabled}
						// defaultValue={{
						// 	value: 'district/county',
						// 	label: '-- 전체 지역 --',
						// }}
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
