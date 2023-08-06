export const regionListSelector = (regionArray, tableContent, keyword) => {
	const comparableData = [];
	const selectedRegion = regionArray[0].concat(` ${regionArray[1]}`);

	if (regionArray[1] === '-- 전체 지역 --') {
		if (regionArray[0] === '-- 전체 지역 --') {
			return keyword.length > 0
				? tableContent.filter(
						(el) => el.title.includes(keyword) || el.contents.includes(keyword),
				  )
				: tableContent;
		}

		const province = regionArray[0];
		for (let i = 0; i < tableContent.length; i += 1) {
			const { region } = tableContent[i];
			const targetProvince = region.split(' ')[0];
			if (province === targetProvince) {
				if (keyword.length > 0) {
					const { title, contents } = tableContent[i];
					if (title.includes(keyword) || contents.includes(keyword)) {
						comparableData.push(tableContent[i]);
					}
				} else {
					comparableData.push(tableContent[i]);
				}
			}
		}

		return comparableData;
	}

	for (let i = 0; i < tableContent.length; i += 1) {
		if (!selectedRegion.trim() || tableContent[i].region === selectedRegion) {
			if (keyword.length > 0) {
				const { title, contents } = tableContent[i];
				if (title.includes(keyword) || contents.includes(keyword)) {
					comparableData.push(tableContent[i]);
				}
			} else {
				comparableData.push(tableContent[i]);
			}
		}
	}

	return comparableData;
};
