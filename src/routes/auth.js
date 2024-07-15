import axios from 'axios'

// eslint-disable-next-line
export const checkToken = async (to, from, next) => {
	const url = `${process.env.VUE_APP_URL_API}/auth`
	const token = window.localStorage.getItem('access_token')
	const method = 'get'
	const headers = {
		Authorization: `Bearer ${token}`
	}
	const config = {
		url,
		method,
		headers,
	}
	try {
		const check = await axios(config)
		if (check) next()
	} catch (error) {
		next({ path: '/login' })
	}
}

export const doLogout = () => {
	window.localStorage.removeItem('access_token')
}

export const checkLogin = async () => {
	const url = `${process.env.VUE_APP_URL_API}/auth`
	const token = window.localStorage.getItem('access_token')
	const method = 'get'
	const headers = {
		Authorization: `Bearer ${token}`
	}
	const config = {
		url,
		method,
		headers,
	}
	if (token) {
		try {
			const check = await axios(config)
			return check
		} catch (e) {
			return e
		}
	}
}