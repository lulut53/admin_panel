import axios from 'axios'

const actions = {
	async updateBannerHalaman({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}banners/${payload.id}`
		const token = window.localStorage.getItem('access_token')
		const method = 'post'
		
		const headers = {
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/vnd.api+json',
		}
		let formData = new FormData();
		formData.set('banner', payload.banner);
		formData.set('_method', "PATCH");

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
	async updateDetailHalaman({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}pages/${payload.id}`
		const token = window.localStorage.getItem('access_token')
		const method = 'post'
		
		const headers = {
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/vnd.api+json',
		}
		let formData = new FormData();
		formData.set('title_page', payload.title_page)
		formData.set('meta_deskripsi', payload.meta_deskripsi)
		formData.set('share_title_page', payload.share_title_page)
		formData.set('share_image_desc', payload.share_image_desc)
		formData.set('url_youtube', payload.url_youtube)
		if (payload.share_image_page) formData.set('share_image_page', payload.share_image_page)
		if (payload.image_banner) formData.set('image_banner', payload.image_banner)
		if (payload.image_parallax) formData.set('image_parallax', payload.image_parallax)

		formData.set('_method', "PATCH");
		

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
	async updateSlider({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}images/${payload.id}`
		const token = window.localStorage.getItem('access_token')
		const method = 'post'
		
		const headers = {
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/vnd.api+json',
		}
		let formData = new FormData();
		formData.set('page_id', payload.page_id)
		formData.set('image', payload.image)

		formData.set('_method', "PATCH");
		

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
	async updateBannerProfile({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}images/profile/bundle`
		const token = window.localStorage.getItem('access_token')
		const method = 'post'
		
		const headers = {
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/vnd.api+json',
		}
		let formData = new FormData();
		formData.set('slug', payload.slug)
		formData.set('title_page', payload.title_page)
		formData.set('meta_deskripsi', payload.meta_deskripsi)
		formData.set('share_title_page', payload.share_title_page)
		formData.set('share_image_desc', payload.share_image_desc)
		formData.set('url_youtube', payload.url_youtube)
		if (payload.share_image_page) formData.set('share_image_page', payload.share_image_page)
		if (payload.image_banner) formData.set('image_banner', payload.image_banner)
		if (payload.image_parallax) formData.set('image_parallax', payload.image_parallax)

		formData.set('_method', "PATCH");
		

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
	async addNewSlider({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}images`
		const token = window.localStorage.getItem('access_token')
		const method = 'post'
		
		const headers = {
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/vnd.api+json',
		}
		let formData = new FormData();
		formData.set('page_id', payload.page_id)
		formData.set('image', payload.image)
		formData.set('alt_image', payload.alt_image)
		formData.set('slug', payload.slug)
		formData.set('type', 'slider')
		formData.set('position', 1)

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
	async getDetailHalaman({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}pages/${payload}`
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		
		const headers = {
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`
		}
		const params = {
			// "filter[user_id]": payload,
			// "include" : 'addresses'
		}
		params.include = "images"

		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			let data = response.data

			commit('setDetail', data.data)
			// commit('setIncluded', data.included)
			
			return data
		} catch (e) {
			return e
		}
	},
	async getDetailBanner({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}banners/${payload}`
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		
		const headers = {
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`
		}
		const params = {
			// "filter[user_id]": payload,
			// "include" : 'addresses'
		}

		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const {data} = await axios(config)
			let response = data.data

			commit('setDetail', response)
			// commit('setIncluded', response.included)
			
			return response
		} catch (e) {
			return e
		}
	},
	async deleteSlider({ commit }, payload = '') {
		const url = `${process.env.VUE_APP_URL_WEB_CONTENT_API}images/${payload}`
		const token = window.localStorage.getItem('access_token')
		const method = 'DELETE'
		
		const headers = {
			'Accept': 'application/vnd.api+json',
			'Authorization': `Bearer ${token}`
		}
		const params = {
			// "filter[user_id]": payload,
			// "include" : 'addresses'
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

			return data
		} catch (e) {
			return e
		}
	},
}

export default actions
