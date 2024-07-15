import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	beritas: [],
	berita: {},
	included: [],
}

const module = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default module
