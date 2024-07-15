import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	transaksis: [],
	transaksi: {},
	transaksi_detail: {},
	included: [],
	history: [],
	profile: {},
	alamat: {},
	alamat_included: [],
	bank: {},
	cabang: {},
	count_transaksi: {},
	count_3bulan: {},
	transactionStatusList: [],
}

const module = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default module
