import PasswordValidator from 'password-validator';

/* eslint-disable no-useless-escape */
// 특수문자에 , 및 :는 제외
// pass rule: 최소 8~12자, 숫자와 문자로 이뤄진
const REGEX = {
	email:
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	blank: /[\s]/g,
	special: /[!@#$%^&*()_+\-=\[\]{};'"\\|.<>\/?]/,
	passwordRule: /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/,
	money: /^(?:[0-9]|[1-9][0-9]+)$/,
};

export default {
	isEmail: (val: string) => REGEX.email.test(val),
	hasBlank: (val: any) => REGEX.blank.test(val),
	hasSpecialCharacters: (val: string) => REGEX.special.test(val),
	isPasswordValid: (val: string) => {
		const schema = new PasswordValidator();
		schema
			.is()
			.min(8)
			.is()
			.max(12) // Maximum length 12
			.has()
			.not()
			.spaces() // Should not have spaces
			.has()
			.letters(1)
			.has()
			.digits(1); // Must have at least 1 digits

		return schema.validate(val);
	},
	isMoneyValid: (val: string) => {
		const number = val.replaceAll(',', '');
		return REGEX.money.test(number);
	},
};
