import BaseHttpService from 'services/BaseHttpService';

class BankAccountService extends BaseHttpService {
	readonly API = 'bank-account-public';

	constructor() {
		super('https://sales.makipos.la');
	}

	getBankAccount = async (hash: string) => {
		const URL = `${this.API}`;

		return this.get(URL, {
			headers: { Authorization: `Bearer ${hash}` }
		});
	};
}

export default BankAccountService;
