const mutations = {
	setCountApprovalProduk(state, value) {
		state.count_approval_produk = value
	},
	setProduks(state, value) {
		state.produks = value
	},
	setTagProduks(state, value) {
		state.tag_produks = value
	},
	setTagByProduk(state, value) {
		state.tag_by_produk = value
	},
	setTagSubproduks(state, value) {
		state.tag_subproduks = value
	},
	setIncluded(state, value) {
		state.included_produk = value
	},
}

export default mutations
