import axios from "axios";

const actions = {
	async getProvinsis({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_AREA_API}provinces`

		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"filter[nama]": payload,
			"page[size]": 10,
			"page[number]": 1,
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setProvinsis', response.data.data)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getKotas({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_AREA_API}cities`

		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"filter[nama]": payload.nama,
			"filter[provinsi_id]": payload.provinsi,
			"page[size]": 10,
			"page[number]": 1,
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setKotas', response.data.data)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getKecamatans({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_AREA_API}districts`

		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"filter[nama]": payload.nama,
			"filter[kota_id]": payload.kota,
			"page[size]": 10,
			"page[number]": 1,
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setKecamatans', response.data.data)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getDesas({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_AREA_API}villages`

		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"filter[nama]": payload.nama,
			"filter[distrik_id]": payload.kecamatan,
			"page[size]": 10,
			"page[number]": 1,
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setDesas', response.data.data)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getAreas({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_AREA_API}areas`

		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"filter[nama]": payload.nama,
			"filter[distrik_id]": payload.kecamatan,
			"filter[transaksi]": "true",
			"page[size]": 10,
			"page[number]": 1,
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setAreas', response.data.data)

			return response.data
		} catch (e) {
			return e
		}
	},
	async getAllCabangWithArea({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_AREA_API}branches`

		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"page[size]": 500,
			"page[number]": 1,
			"include": 'area'
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setAllCabang', response.data.data)
			commit('setIncluded', response.data.included)

			return response.data
		} catch (e) {
			return e
		}
	},
}

export default actions
