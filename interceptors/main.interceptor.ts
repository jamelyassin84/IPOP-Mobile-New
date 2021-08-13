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
	const { status } = error.response
	if (status === 404) {
		alert('There was a problem resolving the network. Check your internet and try again.')
	}
	if (status === 401) {
		alert('You are unauthorized to perform this operation')
	}
	if (status === 500) {
		alert('Internal Server Error. Contact Adminstrator')
	}

	return Promise.reject(error)
}
