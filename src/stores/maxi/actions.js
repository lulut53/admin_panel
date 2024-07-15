import axios from 'axios'

const actions = {
	async getMaxis({ commit }) {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}partner-maxis`
		
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
			commit('setMaxis', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getMaxisQueried({ commit }, payload = {}) {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}partner-maxis`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"include": payload.include,
			"filter[status_id]": payload.status,
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
			commit('setMaxis', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getMaxi({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}partner-maxis/${payload}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			'include': 'profiles.addresses,npwps,sub_products.produk.program,products'
		}
		const config = {
			url,
			method,
			headers,
			params
		}
		try {
			const response = await axios(config)

			commit('setMaxi', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getAlamat({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}addresses/${payload}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"include": "village.district.city.province"
		}
		const config = {
			url,
			method,
			headers,
			params
		}
		try {
			const response = await axios(config)
			commit('setAlamat', response.data.data)
			commit('setAlamatIncluded', response.data.included)
			return response.data
		} catch (e) {
			return e
		}
	},
	async getSubProduk({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}sub_products?include=produk&filter[owner_id]=${payload}`
		
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
			
			commit('setSubProduk', response.data.data)
			commit('setSubProdukIncluded', response.data.included)
			return response.data
		} catch (e) {
			return e
		}
	},
	async getMaxiProduk({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}maxi_products`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			'filter[partner_maxi_id]': payload
		}
		const config = {
			url,
			method,
			headers,
			params
		}
		try {
			const response = await axios(config)

			// commit('setMaxi', response.data.data)
			// commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getCountPendaftaranMAXI({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}partner-maxis?filter[status_id]=13&page[size]=1`
		
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
			commit('setCountPendaftaranMAXI', response.data.meta.page.total)
			return response.data
		} catch (e) {
			return e
		}
	},
	async updateMaxi({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}partner-maxis/${payload.id}`
		
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
	async updateMaxiProduk({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PRODUCT_API}maxi_products/${payload.id}`
		
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
	async updateProfile({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}profiles/${payload.id}`
		
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
	async updateAlamat({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}addresses/${payload.id}`
		
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
	async updateNpwp({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}npwps/${payload.id}`
		
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
	async updateFotoMaxi({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}partner-maxis/${payload.id}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}

		let formData = new FormData();
		Object.keys(payload.attributes).forEach(function(key) {
			if (key != 'logo') {
				if (payload.attributes[key] == null || payload.attributes[key] == "") {
					formData.set(key, "")
				} else {
					formData.set(key, payload.attributes[key])
				}
			}
		});
		if (payload.logo) formData.set('logo', payload.logo);
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
	async updateFotoProfile({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}profiles/${payload.id}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}

		let formData = new FormData();
		Object.keys(payload.attributes).forEach(function(key) {
			if (key != 'avatar_url' && key != 'scan_ktp_url') {
				if (payload.attributes[key] == null || payload.attributes[key] == "") {
					formData.set(key, "")
				} else {
					formData.set(key, payload.attributes[key])
				}
			}
		});
		if (payload.avatar) formData.set('avatar', payload.avatar);
		if (payload.ktp) formData.set('ktp', payload.ktp);
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
	async updateFotoNpwp({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_PROFILE_API}npwps/${payload.id}`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'POST'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'multipart/form-data'
		}

		let formData = new FormData();
		Object.keys(payload.attributes).forEach(function(key) {
			if (key != 'scan_url') {
				if (payload.attributes[key] == null || payload.attributes[key] == "") {
					formData.set(key, "")
				} else {
					formData.set(key, payload.attributes[key])
				}
			}
		});
		if (payload.scan_url) formData.set('scan_url', payload.scan_url);
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
	async exportMaxiProcess({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}export/maxi`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`,
		}
		const params = {
			'from': payload.from,
			'to': payload.to,
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getExportMaxiStatus({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}export-axi-status/3`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`,
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

			return response.data
		} catch (e) {
			return e
		}
	},
	async getExportMaxiFile({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}export-axi-status/3`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`,
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
			window.open(response.data.data.attributes.file, '_self');

			return response.data
		} catch (e) {
			return e
		}
	},
}

export default actions
