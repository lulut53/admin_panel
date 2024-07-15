import axios from 'axios'

const actions = {
	async getBeritas({ commit }) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}news`
		
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
			commit('setBeritas', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getBeritasQueried({ commit }, payload = {}) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}news`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"include": payload.include,
			// "filter[status_id]": payload.status,
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
			commit('setBeritas', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getBerita({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}news/${payload}?include=category`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const config = {
			url,
			method,
			headers,
		}
		try {
			const response = await axios(config)
			const data = response.data
			commit('setBerita', data.data)
			commit('setIncluded', data.included)

			return data
		} catch (e) {
			return e
		}
	},
	async createBerita({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}news`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`,
			"Content-Type": "application/vnd.api+json",
		}

		let formData = new FormData();
		Object.keys(payload).forEach(function(key) {
			if (key != 'image' && key != 'banner') {
				formData.set(key, payload[key])
			}
		});
		formData.append('image', payload.image);
		formData.append('banner', payload.banner);

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
	async updateBerita({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}news/${payload.id}`
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = { 
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'multipart/form-data' 
		}

		let formData = new FormData();


		Object.keys(payload).forEach(function(key) {
			if (key != 'image' && key != 'banner') {
				if (key != 'id' && key != 'patch')
				formData.set(key, payload[key])
			}
		});
		if(payload.image) formData.append('image', payload.image)
		if(payload.banner) formData.append('banner', payload.banner)
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
}

export default actions
