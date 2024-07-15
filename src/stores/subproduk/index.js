import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	subproduks: [],
	subproduk: {},
	included: [],
	maxi: {},
	maxiIncluded: [],
	count_approval_produk: {},
}

const module = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default module
