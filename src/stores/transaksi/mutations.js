const mutations = {
	setTransaksis(state, value) {
		state.transaksis = value
	},
	setTransaksi(state, value) {
		state.transaksi = value
	},
	setTransaksiDetail(state, value) {
		state.transaksi_detail = value
	},
	setIncluded(state, value) {
		state.included = value
	},
	setHistory(state, value) {
		state.history = value
	},
	setProfile(state, value) {
		state.profile = value
	},
	setAlamat(state, value) {
		state.alamat = value
	},
	setAlamatIncluded(state, value) {
		state.alamat_included = value
	},
	setBank(state, value) {
		state.bank = value
	},
	setCabang(state, value) {
		state.cabang = value
	},
	setCountTransaksi(state, value) {
		state.count_transaksi = value
	},
	setCount3Bulan(state, value) {
		state.count_3bulan = value
	},
	setTransactionStatusList(state, value) {
		state.transactionStatusList = value
	}
}

export default mutations
