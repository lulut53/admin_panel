import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  areas: [],
  areaById: [],
  cabangById: [],
  axis: [],
  axi: {},
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
  resBCA: [],
  resDanamon: [],
  desaId: [],
  kecamatanbyId: [],
  kotabyId: [],
  provinsibyId: [],
  resUpdate: [],
  crhName: [],
  crhEmail: [],
  approveList: [],
  verifikasiDataList: [],
  jenisKaryawan: [],
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
