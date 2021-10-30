import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

class BaseHttpService {
	service: AxiosInstance;

	constructor(baseURL: string) {
		this.service = axios.create({
			timeout: 30000,
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		});
		this.service.interceptors.response.use(
			this.handleSuccess,
			this.handleError
		);
	}

	handleSuccess = (response: AxiosResponse): AxiosResponse => {
		return response;
	};

	handleError = (error: AxiosError): AxiosError<Error> => {
		throw error;
	};

	async get(path: string, options = {}): Promise<AxiosResponse> {
		return this.service.get(path, options);
	}

	async post(path: string, data = {}, options = {}): Promise<AxiosResponse> {
		return this.service.post(path, data, options);
	}
}

export default BaseHttpService;
