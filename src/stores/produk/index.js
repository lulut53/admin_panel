import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	count_approval_produk: {},
	produks: [],
	tag_produks: [],
	tag_by_produk: [],
	tag_subproduks: [],
	included_produk: [],
}

const module = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default module
