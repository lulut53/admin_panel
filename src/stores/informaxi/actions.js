import axios from 'axios'

const actions = {
	async getInformaxiTrip({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}axi/informasi-trip`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			page: payload.pageNumber,
			show: payload.pageSize,
			ot: payload.order,
			ob: payload.property,
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setInformaxiTrip', response.data.data)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getInformaxiGathering({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}axi/gathering`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			page: payload.pageNumber,
			show: payload.pageSize,
			ot: payload.order,
			ob: payload.property,
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setInformaxiGathering', response.data.data)

			return response.data
		} catch (e) {
			return e
		}
	},
	
	async updateInformaxiTrip({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}axi/update-inform-trip/${payload.cabang_id}`
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = { 
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'multipart/form-data' 
		}

		let formData = new FormData();

		formData.set('url', payload.url);
		formData.set('cabang_id', payload.cabang_id);
		// formData.set('_method', 'PATCH');

		const config = {
			url,
			data: formData,
			// body,
			method,
			headers,
		}
		try {
			const response = await axios(config)
			return response.data.data
		} catch (e) {
			return e
		}
	},
	async updateInformaxiGathering({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}axi/update-gathering/${payload.cabang_id}`
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = { 
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'multipart/form-data' 
		}

		let formData = new FormData();

		formData.set('url', payload.url);
		formData.set('cabang_id', payload.cabang_id);
		// formData.set('_method', 'PATCH');

		const config = {
			url,
			data: formData,
			// body,
			method,
			headers,
		}
		try {
			const response = await axios(config)
			return response.data.data
		} catch (e) {
			return e
		}
	},
}

export default actions
