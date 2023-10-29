/* eslint-disable indent */
/* eslint-disable default-case */
import dateformat from 'dateformat';

class DateUtils {
	static getDateStringOnlyNumber(date: number | Date | undefined) {
		if (!date) return null;
		return dateformat(date, 'yyyymmdd');
	}

	static getRemainingDaysString(
		date: number | Date | undefined,
	): Optional<string> {
		if (!date) return null;
		const timestamp = typeof date === 'number' ? date : date.getTime();
		return ((timestamp - new Date().getTime()) / (24 * 60 * 60 * 1000)).toFixed(
			1,
		);
	}

	static getDateHourMinString(
		date: string | number | Date | undefined,
	): Optional<string> {
		if (!date) return null;
		return dateformat(date, 'yyyy-mm-dd HH:MM');
	}

	static getDateString(
		date: string | number | Date | undefined,
	): Optional<string> {
		if (!date) return null;
		return dateformat(date, 'yy-mm-dd');
	}

	static getDateTimeString(
		date: string | number | Date | undefined,
	): Optional<string> {
		if (!date) return null;
		return dateformat(date, 'yyyy.mm.dd HH:MM:ss');
	}

	static getShortDateTimeString(
		date: string | number | Date | undefined,
	): Optional<string> {
		if (!date) return null;
		return dateformat(date, 'mm/dd HH:MM');
	}

	static getMonthDayDateTimeString(
		date: string | number | Date | undefined,
	): Optional<string> {
		if (!date) return null;
		return dateformat(date, 'mm-dd');
	}

	static getYearMonthString(dateNum: number | string): string {
		const dateStr = `${dateNum}`;
		return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}`;
	}

	static getYearMonthDayString(dateNum: number | string): string {
		const dateStr = `${dateNum}`;
		return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(
			6,
			8,
		)}`;
	}

	static getMonthDayString(dateNum: number | string): string {
		const dateStr = `${dateNum}`;
		return `${dateStr.slice(5, 7)}.${dateStr.slice(8)}`;
	}

	static secondsToMMss(seconds: number): string {
		const min = Math.floor(seconds / 60);
		const sec = seconds % 60;

		let ret = '';
		if (min < 10) ret += '0';
		ret += `${min}:`;

		if (sec < 10) ret += '0';
		return ret + sec;
	}

	static addDashToDate(x: string): string {
		return x.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
	}

	static monthString(year: number | string, month: number | string): string {
		return `${year}-${`${month}`.padStart(2, '0')}`;
	}

	static getDataDate(date?: Optional<Date>): Date {
		let newDate: Date;
		if (date) {
			newDate = new Date(date);
		} else {
			newDate = new Date();
		}
		if (newDate.getHours() < 11) {
			newDate.setDate(newDate.getDate() - 1);
		}
		return newDate;
	}

	static getFullDateString(date?: Optional<Date>): Optional<string> {
		if (!date) {
			return null;
		}
		return dateformat(date, 'yyyy-mm-dd');
	}

	static getFullDateStringDot(date?: Optional<Date>): Optional<string> {
		if (!date) {
			return null;
		}
		return dateformat(date, 'yyyy.mm.dd');
	}

	static addDays(add: number, original: Date = new Date()): Date {
		const copied = new Date(original.getTime());
		const newDay = copied.getDate() + add;
		return new Date(copied.setDate(newDay));
	}

	static addMonths(add: number, original: Date = new Date()): Date {
		const copied = new Date(original.getTime());
		const newMonth = copied.getMonth() + add;
		return new Date(copied.setMonth(newMonth));
	}

	static dateWithDateStr(dateStr: string): Date {
		const curr = new Date();
		const targetDate = new Date(dateStr);
		targetDate.setHours(curr.getHours());
		targetDate.setMinutes(curr.getMinutes());
		targetDate.setSeconds(curr.getSeconds());
		targetDate.setMilliseconds(curr.getMilliseconds());
		return targetDate;
	}

	static daysInMonth(year: number, month: number): number {
		switch (month) {
			case 2:
				return year % 4 === 0 ? 29 : 28;
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
		}
		return 30;
	}

	static timeForToday(fromDate: Date): string {
		const today = new Date();
		const timeValue = new Date(fromDate);

		const betweenTime = Math.floor(
			(today.getTime() - timeValue.getTime()) / 1000 / 60,
		);
		if (betweenTime < 1) return '방금전';
		if (betweenTime < 60) {
			return `${betweenTime}분전`;
		}

		const betweenTimeHour = Math.floor(betweenTime / 60);
		if (betweenTimeHour < 24) {
			return `${betweenTimeHour}시간전`;
		}

		const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
		if (betweenTimeDay < 365) {
			return `${betweenTimeDay}일전`;
		}

		return `${Math.floor(betweenTimeDay / 365)}년전`;
	}
}

export default DateUtils;
