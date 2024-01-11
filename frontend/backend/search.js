import Config from '../backend/config.json';
import Axios from 'axios';

export async function movieSearch(accessToken, queryParams) {
	const options = {
		method: "GET",
		baseURL: Config.search.baseUrl,
		url: Config.search.movieSearch,
		headers: {
			Authorization: "Bearer " + accessToken
		},
		params: queryParams
	}

	return Axios.request(options);
}

export async function movieGetById(accessToken, movieId) {
	const options = {
		method: "GET",
		baseURL: Config.search.baseUrl,
		url: Config.search.movieGetByMovieId + movieId,
		headers: {
			Authorization: "Bearer " + accessToken
		}
	}

	return Axios.request(options);
}

export default {
	movieSearch,
	movieGetById
}
