class PasswordsNotMatched extends Error {
	constructor(code: number, message: string) {
		super(message);
	}
}

export default PasswordsNotMatched;
