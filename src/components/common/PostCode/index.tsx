import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useRecoilState } from 'recoil';
import { inputPostingState } from '../../../recoil/atom/posting';

const Postcode = ({ onComplete }) => {
	const [newJobPosting, setNewJobPosting] = useRecoilState(inputPostingState);

	const handleComplete = (data) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress +=
					extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		setNewJobPosting({
			...newJobPosting,
			address: { ...newJobPosting.address, main: fullAddress },
		});

		onComplete();
	};

	return (
		<DaumPostcodeEmbed onComplete={handleComplete} className="post-code" />
	);
};

export default Postcode;
