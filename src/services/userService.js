import config from '../config.json';
import http from './httpService';

const apiEndpoint = config.apiUrl + '/users';

export function registerUser({ username, password, name }) {
	return http.post(apiEndpoint, {
		email: username,
		password: password,
		name: name,
	});
}
