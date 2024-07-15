import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	maxis: [],
	maxi: {},
	included: [],
	alamat: {},
	sub_produk: [],
	sub_produk_included: [],
	count_pendaftaran_maxi: {},
}

const module = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default module
