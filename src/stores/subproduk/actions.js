import axios from 'axios'
import fileDownload from 'js-file-download'

const actions = {
	async getSubproduks({ commit }) {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}sub-products`
		
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
			commit('setSubproduks', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getSubproduksQueried({ commit }, payload = {}) {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}sub-products`

		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			"Authorization": `Bearer ${token}`
		}
		const params = {
			"include": payload.include,
			"filter[status_id]": payload.status,
			"filter[all]": payload.searchAll,
			"filter[owner_id]": payload.ownerId,
			"sort": payload.order == 'asc' ? payload.property : '-' + payload.property,
			"page[size]": payload.pageSize,
			"page[number]": payload.pageNumber,
		}

		// Additional params
		if (payload.produk_id) {
			params['filter[produk_id]'] = payload.produk_id
		}
		if (payload.searchColumn) {
			params['filter[' + payload.searchColumn.column + ']'] = payload.searchColumn.searchData
		}
		if (payload.start_date) {
			params['filter[tanggal_start]'] = payload.start_date
		}
		if (payload.end_date) {
			params['filter[tanggal_end]'] = payload.end_date
		}
		
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setSubproduks', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	// async getSubproduksQueriedTag({ commit }, payload = {}) {
	// 	const url = `${process.env.VUE_APP_URL_PRODUCT_API}sub_products`

	// 	const token = window.localStorage.getItem('access_token')
	// 	const method = 'get'
	// 	const headers = {
	// 		"Accept": "application/vnd.api+json",
	// 		"Authorization": `Bearer ${token}`
	// 	}
	// 	const params = {
	// 		"include": payload.include,
	// 		"filter[status_id]": payload.status,
	// 		"filter[all]": payload.searchAll,
	// 		"sort": payload.order == 'asc' ? payload.property : '-' + payload.property,
	// 		"page[size]": payload.pageSize,
	// 		"page[number]": payload.pageNumber,
	// 	}

	// 	// Additional params
	// 	if (payload.produk_id) {
	// 		params['filter[produk_id]'] = payload.produk_id
	// 	}
		
	// 	const config = {
	// 		url,
	// 		method,
	// 		headers,
	// 		params,
	// 	}
	// 	try {
	// 		const response = await axios(config)
	// 		commit('setSubproduks', response.data.data)
	// 		commit('setIncluded', response.data.included)

	// 		return response.data
	// 	} catch (e) {
	// 		return e
	// 	}
	// },
	async getSubproduk({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}sub-products/${payload}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			"Authorization": `Bearer ${token}`
		}
		const params = {
			'include': 'produk,owner,tags'
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setSubproduk', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getMaxi({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_API}profile/partner-maxis/${payload}?include=profile,npwp`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			"Authorization": `Bearer ${token}`
		}
		const config = {
			url,
			method,
			headers,
		}
		try {
			const response = await axios(config)

			commit('setMaxi', response.data.data)
			commit('setMaxiIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getCountApprovalProduk({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}sub_products?filter[status_id]=9,10&page[size]=1`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			"Authorization": `Bearer ${token}`
		}
		const config = {
			url,
			method,
			headers,
		}
		try {
			const response = await axios(config)
			commit('setCountApprovalProduk', response.data.meta.page.total)
			return response.data
		} catch (e) {
			return e
		}
	},
	async updateSubProduk({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}sub_products/${payload.id}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/vnd.api+json'
		}
		const config = {
			url,
			// body,
			method,
			data: { 
				"data": payload,
    			"_method": "PATCH"
			},
			headers,
		}
		try {
			const response = await axios(config)
			return response
		} catch (e) {
			return e
		}
	},
	async updateFotoBrosur({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}sub_products/${payload.id}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}

		let formData = new FormData();
		Object.keys(payload.attributes).forEach(function(key) {
			if (key != 'brosur' && key != 'image') {
				if (payload.attributes[key] != null) {
					formData.set(key, payload.attributes[key])
				}
			}
		});
		if (payload.brosur) formData.set('brosur', payload.brosur);
		if (payload.image) formData.set('image', payload.image);
		formData.set('_method', 'PATCH');

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

	async getDownloadBrosur({ commit }, xurl) {
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
