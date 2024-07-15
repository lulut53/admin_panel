const getters = {
	transaksis: state => state.transaksis,
	transaksi: state => state.transaksi,
	transaksi_detail: state => state.transaksi_detail,
	included: state => state.included,
	history: state => state.history,
	profile: state => state.profile,
	alamat: state => state.alamat,
	alamat_included: state => state.alamat_included,
	bank: state => state.bank,
	cabang: state => state.cabang,
	count_transaksi: state => state.count_transaksi,
	count_3bulan: state => state.count_3bulan,
	transactionStatusList: state => state.transactionStatusList,
}

export default getters
