import axios from 'axios'

const actions = {
	async getProduks({ commit }) {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}products`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			"Authorization": `Bearer ${token}`
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
			commit('setProduks', response.data.data)

			return response.data
		} catch (e) {
			return Promise.reject(e.response)
		}
	},
	async getTagProduks({ commit }) {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}products/tags`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			"Authorization": `Bearer ${token}`
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
			commit('setTagProduks', response.data.data)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getTagByProduk({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}produk_tags?filter[produk_id]=${payload}&include=tag`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			"Authorization": `Bearer ${token}`
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
			commit('setTagByProduk', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getTagSubproduks({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}detail_tags?filter[sub_produk_id]=${payload}&include=sub_produk`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			"Authorization": `Bearer ${token}`
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
			commit('setTagSubproduks', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async updateTagProduk({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}products/${payload.id}/sync-tags`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}

		let formData = new FormData();
		for (var val of payload.data) {
			formData.append('tags[]', val.name);	
		}

		const config = {
			url,
			// body,
			method,
			data: formData,
			headers,
		}
		try {
			const response = await axios(config)
			return response
		} catch (e) {
			return e
		}
	},
}

export default actions
