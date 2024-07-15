import axios from 'axios'

const actions = {
	async getUserAndGroups({ commit }, payload) {
		const url = `${process.env.VUE_APP_URL_AUTH_API}users`
		
		const method = 'GET'

		const token = window.localStorage.getItem('access_token')
		
		const headers = {
			"Accept": "application/vnd.api+json",
			"Authorization": `Bearer ${token}`
		}
		const params = {
			"include": 'groups,grup_users',
			"filter[status_id]": payload.status,
			// "filter[all]": payload.searchAll,
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
			let data = response.data
			
			commit('setUsers', data.data)
			commit('setIncluded', data.included)
			
			return data
		} catch (e) {
			return e
		}
	},
	async getGroups({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_AUTH_API}groups`
		
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		
		const headers = {
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"sort": payload.order == 'asc' ? payload.property : '-' + payload.property,
			"page[size]": payload.pageSize,
			"page[number]": payload.pageNumber,
		}
		// Additional params
		if (payload.searchColumn) {
			params['filter[' + payload.searchColumn.column + ']'] = payload.searchColumn.searchData
		}
		const config = {
			url,
			method,
			headers,
			params
		}
		try {
			const response = await axios(config)
			let data = response.data
			commit('setGroups', data.data)
			
			return data
		} catch (e) {
			return e
		}
	},
	async getPermissions({ commit }, payload) {
		// HARUSNYA KE PERMISSION BARU INCLUDE GROUPS
		const url = `${process.env.VUE_APP_URL_AUTH_API}permissions`
		
		const method = 'GET'
		const token = window.localStorage.getItem('access_token')
		const headers = {
			"Accept": "application/vnd.api+json",
			"Authorization": `Bearer ${token}`
		}
		const params = {
			"page[size]": "400",
			"page[number]": "1",
		}

		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			let data = response.data
			
			commit('setPermissions', data.data)
			// commit('setIncluded', data.included)
			
			return data
		} catch (e) {
			return e
		}
	},
	async updateGroup({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_AUTH_API}groups/${payload.id}`
		
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
	async createGroup({ dispatch }, payload) {
		const url = `${process.env.VUE_APP_URL_AUTH_API}groups`
		
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
}

export default actions
