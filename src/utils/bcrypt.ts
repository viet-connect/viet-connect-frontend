/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';

export class Password {
	password: string;

	hashedPassword: string;

	constructor(pass: string) {
		this.password = pass;
		console.log('inserted pass', this.password);
	}

	async createPassword() {
		try {
			const salt = bcrypt.genSaltSync(10);
			return bcrypt.hashSync(this.password, salt);
		} catch (err) {
			console.log('패스워드 생성에러', err);
		}
	}

	comparePassword() {
		bcrypt.genSalt(10, (saltErr, salt) => {
			if (saltErr) {
				return console.log('Cannot make salt');
			}

			bcrypt.hash(this.password, salt, (hashErr, hash) => {
				if (hashErr) {
					return console.log('Cannot encrypt');
				}

				this.hashedPassword = hash;

				bcrypt.compare(
					this.password,
					this.hashedPassword,

					async (compareErr, isMatch) => {
						if (compareErr) {
							return console.log('password compare error');
						}

						if (isMatch) {
							console.log('Encrypted password is: ', this.password);
							console.log('Decrypted password is: ', this.hashedPassword);
							return true;
						}

						console.log(
							`${this.hashedPassword} is not encryption of ${this.password}`,
						);
						return false;
					},
				);
			});
		});
	}
}
