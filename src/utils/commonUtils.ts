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

  static maskCellPhone(phoneNumber) {
    if (phoneNumber.length !== 11) {
      console.error('휴대폰 번호는 11자리여야 합니다.');
      return phoneNumber;
    }

    const maskedNumber = `${phoneNumber.substring(0, 3)}****${phoneNumber.substring(7)}`;
    return maskedNumber;
  }

  static removeHypenPhoneNumber(x) {
    const numericNumber = x.replace(/-/g, '');
    return numericNumber;
  }

  static addHyphenToPhoneNumber(x: any) {
    if (!x) {
      return '';
    }

    let value = x;
    value = value.replace(/[^0-9]/g, '');

    const result = [];
    let restNumber = '';

    // 지역번호와 나머지 번호로 나누기
    if (value.startsWith('02')) {
      // 서울 02 지역번호
      result.push(value.substr(0, 2));
      restNumber = value.substring(2);
    } else if (value.startsWith('1')) {
      // 지역 번호가 없는 경우
      // 1xxx-yyyy
      restNumber = value;
    } else {
      // 나머지 3자리 지역번호
      // 0xx-yyyy-zzzz
      result.push(value.substr(0, 3));
      restNumber = value.substring(3);
    }

    if (restNumber.length === 7) {
      // 7자리만 남았을 때는 xxx-yyyy
      result.push(restNumber.substring(0, 3));
      result.push(restNumber.substring(3));
    } else {
      result.push(restNumber.substring(0, 4));
      result.push(restNumber.substring(4));
    }

    return result.filter((val) => val).join('-');
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
      return 'regardlessOfGender';
    }
    if (num === 1) {
      return 'male';
    }

    return 'female';
  }

  static proficiencyConverter(num: number): string {
    if (num === 0) {
      return 'koLangExcellence';
    }
    if (num === 1) {
      return 'koLangAverage';
    }
    if (num === 2) {
      return 'koLangBasic';
    }

    return 'koLangirrelevance';
  }

  static DayConverter(num: number): string {
    if (num === 0) {
      return 'monday';
    }
    if (num === 1) {
      return 'tuesday';
    }
    if (num === 2) {
      return 'wednesday';
    }
    if (num === 3) {
      return 'thursday';
    }
    if (num === 4) {
      return 'friday';
    }
    if (num === 5) {
      return 'saturday';
    }

    return 'sunday';
  }

  static DayConverterInKorean(num: number): string {
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

  static proficiencyConverterInKorean(num: number): string {
    if (num === 0) {
      return '잘함';
    }
    if (num === 1) {
      return '보통';
    }
    if (num === 2) {
      return '기초';
    }

    return '무관';
  }

  static retry = (url: string, retries: number, options = {}) =>
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res;
        }

        if (retries > 0) {
          return CommonUtils.retry(url, retries - 1, options);
        }

        throw new Error('stop retry');
      })
      .catch((err) => console.error(err));
}

export default CommonUtils;
