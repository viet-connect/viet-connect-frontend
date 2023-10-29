const wageTermFunction = (
	termIndex: number,
): {
	boxFontColor: string;
	boxColor: string;
	value: string;
	borderColor: string;
} => {
	const cssObject = {
		boxFontColor: '#c41d7f',
		boxColor: '#fff0f6',
		borderColor: '#ffadd2',
		value: 'salary',
	};
	if (termIndex === 1) {
		cssObject.boxFontColor = '#d48806';
		cssObject.boxColor = '#fffbe6';
		cssObject.borderColor = '#ffe58f';
		cssObject.value = 'weeklyWage';
	} else if (termIndex === 2) {
		cssObject.boxFontColor = '#0958d9';
		cssObject.boxColor = '#e6f4ff';
		cssObject.borderColor = '#91caff';
		cssObject.value = 'dailyWage';
	} else if (termIndex === 3) {
		cssObject.boxFontColor = '#531dab';
		cssObject.boxColor = '#f9f0ff';
		cssObject.borderColor = '#d3adf7';
		cssObject.value = 'hourlyWage';
	}

	return cssObject;
};

export const wageTypeConverter = (wageType: string): number => {
	if (wageType === 'monthly') {
		return 0;
	}
	if (wageType === 'weekly') {
		return 1;
	}
	if (wageType === 'daily') {
		return 2;
	}

	return 3;
};

export const wageTypeConverterInI18n = (wageType: string): string => {
	if (wageType === 'monthly') {
		return 'salary';
	}

	if (wageType === 'weekly') {
		return 'weeklyWage';
	}
	if (wageType === 'daily') {
		return 'dailyWage';
	}

	return 'hourlyWage';
};

export default wageTermFunction;
