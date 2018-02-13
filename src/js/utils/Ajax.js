import axios from 'axios';
import Settings from 'utils/Settings';

var Ajax = {
	requests: [],
	storeResponse: res => {
		Ajax.requests.unshift({
			request: res.config,
			response: {
				data: res.data,
				headers: res.header,
				status: res.status,
				statusText: res.statusText
			}
		});
		Ajax.requests = Ajax.requests.slice(0, 5);
	}
};

['get', 'post', 'put', 'delete', 'patch'].forEach(m => {
	Ajax[m] = function (path, data, options) {
		var url = path[0] === '/' ? getBaseUrl() + path : path,
			ops = options || {},
			config = Object.assign({
				method: m,
				url: url,
				data: data,
				headers: {},
				withCredentials: true
			}, options || {})
		;

		return axios(config)
			.then(response => {
				Ajax.storeResponse(response);
				return response.data;
			})
		;
	}
});

function getBaseUrl(){
	return Settings.get(Settings.API_URL) || 'http://localhost:3333/api';
}


export default Ajax;
