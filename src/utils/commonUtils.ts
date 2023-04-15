class CommonUtils {
	static isNumber(n: any): boolean {
		if (n === null) {
			return false;
		}
		return !Number.isNaN(n);
	}

	static addCommaToNumber(x: any): string {
		if (CommonUtils.isNumber(x)) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
		return x;
	}

	static decodeCommaInNumber(x: any): string {
		if (CommonUtils.isNumber(x)) {
			return x.replace(/,/g, '');
		}

		return x;
	}

	static objectDeepCopy(obj: any): any {
		return JSON.parse(JSON.stringify(obj));
	}
}

export default CommonUtils;
