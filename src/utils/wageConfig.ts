const wageTermFunction = (
	termIndex: number,
): {
	boxFontColor: string;
	boxColor: string;
	value: string;
} => {
	const cssObject = {
		boxFontColor: '#DE0093',
		boxColor: '#F4D9EB',
		value: '월급',
	};

	if (termIndex === 1) {
		cssObject.boxFontColor = '#0062D4';
		cssObject.boxColor = '#BCDBFF';
		cssObject.value = '주급';
	} else if (termIndex === 2) {
		cssObject.boxFontColor = '#C7BF00';
		cssObject.boxColor = '#F4F2B8';
		cssObject.value = '일급';
	} else if (termIndex === 3) {
		cssObject.boxFontColor = '#9B00C1';
		cssObject.boxColor = '#EED1F5';
		cssObject.value = '시급';
	}

	return cssObject;
};

export default wageTermFunction;
