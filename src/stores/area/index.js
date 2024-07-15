import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	provinsis: [],
	kotas: [],
	kecamatans: [],
	desas: [],
	areas: [],
	all_cabang: [],
	included: [],
	cabangById: [],
}

const module = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default module
