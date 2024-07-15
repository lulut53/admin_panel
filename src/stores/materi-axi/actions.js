import axios from 'axios'
import fileDownload from 'js-file-download'

const actions = {
	async getMateriAxis({ commit }) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}downloads`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			// paginate: false,
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setMateriAxis', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getMateriAxisQueried({ commit }, payload = {}) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}downloads`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"include": payload.include,
			"filter[all]": payload.searchAll,
			"sort": payload.order == 'asc' ? payload.property : '-' + payload.property,
			"page[size]": payload.pageSize,
			"page[number]": payload.pageNumber,
		}

		// Additional params
		if (payload.searchColumn) {
			params['filter[' + payload.searchColumn.column + ']'] = payload.searchColumn.searchData
		}
		if (payload.start_date) {
			params['filter[start_date]'] = payload.start_date
		}
		if (payload.end_date) {
			params['filter[end_date]'] = payload.end_date
		}
		
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setMateriAxis', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async createMateriAxi({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}downloads`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}

		let formData = new FormData();
		formData.append('nama', payload.nama);
		formData.append('file', payload.file);

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
	async updateMateriAxi({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}downloads/${payload.id}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = { 
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`
		}

		let formData = new FormData();
		formData.append('nama', payload.nama);
		if (payload.file) formData.append('file', payload.file);
		formData.set('_method', 'PATCH');

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
	async hapusMateriAxi({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}downloads/${payload.id}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'DELETE'
		const headers = { 
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`
		}

		const config = {
			url,
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
	async getDownloadMateri({ commit }, xurl) {
		const url = xurl

		const name = xurl.split("/").slice(-1)[0];
		
		const token = window.localStorage.getItem('access_token')
		const method = 'GET'
		const headers = {
			// "Accept": "application/vnd.api+json",
			// "Authorization": `Bearer ${token}`,
		}
		const config = {
			url,
			method,
			responseType: 'blob',
			headers,
		}
		axios(config).then((res) => {
			fileDownload(res.data, name);
		}).catch(error => console.error(error))
	}
}

export default actions
