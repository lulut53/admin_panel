import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	profile: {},
	user: {},
	internals: [],
	groups: [],
	group_user:{},
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
