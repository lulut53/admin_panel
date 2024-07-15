import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	axis: [],
	axi: {},
	listRegAxi: {},
	detailRegAxi: {},
	included: [],
	lokasi: {},
	lokasiIncluded: [],
	banks: [],
	cabangs: [],
	cabang: [],
	provinsis: [],
	kotas: [],
	kecamatans: [],
	desas: [],
	point: {},
	count_pendaftaran_axi: {},
	jenis_axi: [],
	jenis_kelamin: [],
	agama: [],
	statusPernikahan: [],
	legalForm: [],
	templateId: [],
}

const module = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default module
