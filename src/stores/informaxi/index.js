import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	informaxi_trip: [],
	informaxi_gathering: [],
}

const module = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default module
