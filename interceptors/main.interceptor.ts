import axios from 'axios'

axios.interceptors.request.use(
	(response) => {
		if (response.method !== 'GET') {
			//Global State na loading = true
			//Componets Reload
		}
		return response
	},
	(error) => handleError(error)
)

axios.interceptors.response.use(
	(response) => {
		if (response.config.method !== 'GET') {
			//Global State na loading = false
		}
		return response
	},
	(error) => handleError(error)
)

const handleError = (error: any) => {
	const { status, data, config } = error.response
	if (status === 404) {
	}
	if (status === 401) {
	}

	if (status === 500) {
	}

	return Promise.reject(error)
}
