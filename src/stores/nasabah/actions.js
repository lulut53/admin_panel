import axios from 'axios'

const actions = {
	async getNasabahs({ commit }, payload = {}) {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}customers`
		
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
			commit('setNasabahs', response.data.data)
			commit('setIncluded', response.data.included)
			return response.data
		} catch (e) {
			return e
		}
	},
}

export default actions
