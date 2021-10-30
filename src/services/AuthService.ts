import getConfig from 'next/config';
import BaseHttpService from 'services/BaseHttpService';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

type CreateUser = {
	confirmPassword?: string;
	email: string;
	lastname: string;
	name: string;
	password: string;
};

type LoginUser = {
	email: string;
	password: string;
};

class AuthService extends BaseHttpService {
	readonly CODE_APP = applicationConfig.codeApp;
	readonly CODE_PROJECT = applicationConfig.codeProject;
	readonly CODE_ROLE = applicationConfig.codeRole;
	readonly COMPANY_TOKEN = applicationConfig.companyToken;

	constructor() {
		super(applicationConfig.authService);
	}

	login = async (user: LoginUser) => {
		const data = {
			...user,
			provider: 1,
			codeApp: this.CODE_APP
		};

		return this.post('/signin/auth', data, {
			headers: { Authorization: `Bearer ${this.COMPANY_TOKEN}` }
		});
	};

	register = async (user: CreateUser) => {
		delete user.confirmPassword;

		const data = {
			...user,
			codeApp: this.CODE_APP,
			codeProject: this.CODE_PROJECT,
			codeRole: this.CODE_ROLE,
			activation: 0
		};

		return this.post('/customers-public', data, {
			headers: { Authorization: `Bearer ${this.COMPANY_TOKEN}` }
		});
	};

	confirmEmail = async (token: string) => {
		return this.post(
			'confirm/email',
			{ token },
			{
				headers: { Authorization: `Bearer ${this.COMPANY_TOKEN}` }
			}
		);
	};

	tokenConfirm = async (token: string) => {
		const url: string = '/customers/current';
		const headers = {
			headers: { Authorization: `Bearer ${token}` }
		};
		return this.get(url, headers);
	};
}

export default AuthService;
