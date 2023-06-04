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

	static genderConverter(num: number): string {
		if (num === 0) {
			return '성별 무관';
		}
		if (num === 1) {
			return '남자';
		}

		return '여자';
	}

	static proficiencyConverter(num: number): string {
		if (num === 0) {
			return '잘함';
		}
		if (num === 1) {
			return '보통';
		}
		if (num === 2) {
			return '기초';
		}

		return '미숙';
	}

	static DayConverter(num: number): string {
		if (num === 0) {
			return '월';
		}
		if (num === 1) {
			return '화';
		}
		if (num === 2) {
			return '수';
		}
		if (num === 3) {
			return '목';
		}
		if (num === 4) {
			return '금';
		}
		if (num === 5) {
			return '토';
		}

		return '일';
	}
}

export default CommonUtils;
