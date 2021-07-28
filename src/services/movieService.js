import http from './httpService';

const apiEndpoint = '/movies';

export function getMovies() {
	return http.get(apiEndpoint);
}

export function getMovie(movieId) {
	return http.get(apiEndpoint + '/' + movieId);
}
export function deleteMovie(movieId) {
	return http.delete(apiEndpoint + '/' + movieId);
}

export function saveMovie(movie) {
	const isExisted = movie._id;
	if (isExisted) {
		const body = { ...movie };
		delete body._id;
		return http.put(apiEndpoint + '/' + movie._id, body);
	}
	return http.post(apiEndpoint, movie);
}
