import Config from '../backend/config.json';
import Axios from 'axios';

export async function login(loginRequest) {
	const requestBody = {
		email: loginRequest.email,
		password: loginRequest.password
	};

	const options = {
		method: "POST",
		baseURL: Config.idm.baseUrl,
		url: Config.idm.login,
		data: requestBody
	}

	return Axios.request(options);
}

export async function register(registerRequest) {
	const requestBody = {
		email: registerRequest.email,
		password: registerRequest.password
	};

	const options = {
		method: "POST",
		baseURL: Config.idm.baseUrl,
		url: Config.idm.register,
		data: requestBody
	}

	return Axios.request(options);
}

export default {
	login, register
}
