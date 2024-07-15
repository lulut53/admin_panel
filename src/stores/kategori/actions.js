import axios from 'axios'

const actions = {
	async getKategoris({ commit }) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}categories`
		
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
			commit('setKategoris', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getKategorisQueried({ commit }, payload = {}) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}categories`
		
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
			commit('setKategoris', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getKategori({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}categories/${payload}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"include": "",
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			const data = response.data
			commit('setKategori', data.data)
			commit('setIncluded', data.included)

			return data
		} catch (e) {
			return e
		}
	},
	async createKategori({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}categories`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = { 
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json',
			'Access-Control-Allow-Origin': '',
			'Authorization': `Bearer ${token}`
		}

		const config = {
			url,
			data: {
				"data": {
					"type": "categories",
					"attributes": payload
				}
			},
			method,
			// body,
			headers,
		}
		try {
			const response = await axios(config)
			return response.data
		} catch (e) {
			return e
		}
	},
	async updateKategori({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}categories/${payload.id}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'PATCH'
		const headers = {
			'Authorization': `Bearer ${token}`,
			'Content-Type' : 'application/vnd.api+json',
			'Access-Control-Allow-Origin': ''
		}
		const config = {
			url,
			// body,
			method,
			data: { 
				"data": payload
			},
			headers,
		}
		try {
			const response = await axios(config)
			dispatch('getKategori', payload.id)
			return response
		} catch (e) {
			return e
		}
	},
}

export default actions
