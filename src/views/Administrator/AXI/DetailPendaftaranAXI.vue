<template>

  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-8 col-8">
          <h6 class="h2 d-inline-block mb-0">Detail Pendaftaran AXI</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/axi/pendaftaran">Pendaftaran AXI</router-link></li>
              <li class="breadcrumb-item active" aria-current="page"> {{idAxiDetail}}</li>
            </ol>
          </nav>
        </div>
        <div class=" col-lg-4 pt-2 text-right" v-if="isShow && !isError">
            <!-- <router-link to="" class="btn btn-sm btn-info">
              <i class="fa fa-edit" aria-hidden="true"></i>
              <span class="hidden-sm-down">Edit</span>
            </router-link> -->
          <base-button type="success" @click="downloadExcel" v-if="!isHideDownloadBtn">
            <i class="ni ni-cloud-download-95" aria-hidden="true"></i>
            <span class="hidden-sm-down">Download Excel</span>
          </base-button>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6 small">
      <div class="row">
        <div class="col-sm-8">
          <div class="card">
                <div class="card-header">
                  <div class="row">
                    <div class="col-8">
                      <h4>Informasi Umum</h4>
                    </div>
                  </div>
                </div>
                <transition name="fade" mode="out-in">
                  <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                    <br>
                    <!--  <center>-->
                      <half-circle-spinner
                      :animation-duration="1000"
                      :size="60"
                      color="#ff1d5e"
                    />
                    <!-- </center>-->
                  </div>
                  <div key="2" v-if="isError" class="text-center p-5">
                     <!-- <center>-->
                      <img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive">
                      <!-- </center>-->
                    <br>
                  <div style="display: flex; margin-top: 20px !important; justify-content: center;">
                    <h1 class="text-center">Error, silahkan coba lagi.</h1>
                </div>
                  </div>
                  <div key="2" v-if="isShow">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">Nama Lengkap</div>
                        <div class="col-8">: {{ axiData.nama }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kode Cabang Area</div>
                        <div class="col-8">: {{ axiData.cabang_id }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">AXI ID Referal</div>
                        <div class="col-8">: {{ axiData.axi_id_reff }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Jenis Kelamin</div>
                        <div class="col-8">: {{ axiData.jenis_kelamin }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Alamat Email</div>
                        <div class="col-8">: {{ axiData.email }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">No. Handphone</div>
                        <div class="col-8">: {{ axiData.no_hp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">No. KTP</div>
                        <div class="col-8">: {{ axiData.no_ktp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">No. NPWP</div>
                        <div class="col-8">: {{ axiData.no_npwp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Nama Bank</div>
                        <div class="col-8">: {{ axiData.nama_bank }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">No. Rekening</div>
                        <div class="col-8">: {{ axiData.no_rekening }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Tempat Tanggal Lahir</div>
                        <div class="col-8">: {{ axiData.kota_lahir }}, {{ axiData.tanggal_lahir }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Alamat KTP</div>
                        <div class="col-8">: {{ axiData.alamat }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Provinsi</div>
                        <div class="col-8">: {{ axiData.provinsi }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kota / Kabupaten</div>
                        <div class="col-8">: {{ axiData.kota }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kecamatan</div>
                        <div class="col-8">: {{ axiData.kecamatan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kelurahan</div>
                        <div class="col-8">: {{ axiData.kelurahan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">RT / RW</div>
                        <div class="col-8">: 0{{ axiData.rt }}/0{{ axiData.rw }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kode Pos</div>
                        <div class="col-8">: {{ axiData.kode_pos }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Status Perkawinan</div>
                        <div class="col-8">: {{ axiData.status_perkawinan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Nama Ibu Kandung</div>
                        <div class="col-8">: {{ axiData.nama_ibu_kandung }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Nama Pasangan</div>
                        <div class="col-8">: {{ axiData.nama_pasangan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">No KTP Pasangan</div>
                        <div class="col-8">: {{ axiData.no_ktp_pasangan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Cabang Bank</div>
                        <div class="col-8">: {{ axiData.cabang_bank }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">A/N Rekening</div>
                        <div class="col-8">: {{ axiData.an_rekening }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kota Bank</div>
                        <div class="col-8">: {{ axiData.kota_bank }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Nama NPWP</div>
                        <div class="col-8">: {{ axiData.nama_npwp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Status NPWP</div>
                        <div class="col-8">: {{ axiData.status_npwp == 1 ? "Pribadi" : "Perusahaan" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">PKP Status</div>
                        <div class="col-8">: {{ axiData.pkp == 1 ? "PKP" : "Non PKP" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Dibuat Pada</div>
                        <div class="col-8">: {{ axiData.created_at | convertDate }}</div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
        </div>
        <div class="col-sm-4">
          <div class="card" style="box-shadow:unset;">
                <div class="card-header">
                  <h4>Lampiran</h4>
                </div>
                <transition name="fade" mode="out-in">
                  <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                    <br>
                     <!--  <center>-->
                      <half-circle-spinner
                      :animation-duration="1000"
                      :size="60"
                      color="#ff1d5e"
                    />
                    <!-- </center>-->
                  </div>
                  <div key="2" v-if="isError" class="text-center p-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                    <!-- <center><img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive"></center>
                    <br>
                    <center><h1>Error, silahkan coba lagi.</h1></center> -->
                  </div>
                  <div key="2" v-if="isShow">
                    <div class="card-body" >
                      <collapse :multiple-active="false">
                        <collapse-item name="1">
                            <h5 slot="title" class="mb-0">Foto KTP</h5>
                            <div>
                                <div class="images" v-viewer>
                                    <template v-if="getIncluded('profiles', axi.relationships.profile.data, 'scan_ktp_url')">
                                      <img v-bind:src="getIncluded('profiles', axi.relationships.profile.data, 'scan_ktp_url')" class="img-fluid" alt="" height="140">
                                    </template>
                                    <template v-if="!getIncluded('profiles', axi.relationships.profile.data, 'scan_ktp_url')">
                                      <img src="/images/image-empty-default.png" class="img-fluid" alt="" height="140">
                                    </template>
                                </div>
                                <!-- <div class="btn-file-upload">
                                    <label for="ktp" class="btn btn-sm btn-secondary mt-3">Ganti Foto</label>
                                    <input type="file" id="ktp">
                                </div> -->
                            </div>
                        </collapse-item>
                        <collapse-item name="2">
                            <h5 slot="title" class="mb-0">Foto NPWP</h5>
                            <div>
                                <div class="images" v-viewer>
                                    <template v-if="getIncluded('npwps', axi.relationships.npwps.data, 'scan_url')">
                                      <img v-bind:src="getIncluded('npwps', axi.relationships.npwps.data, 'scan_url')" class="img-fluid" alt="" height="140">
                                    </template>
                                    <template v-if="!getIncluded('npwps', axi.relationships.npwps.data, 'scan_url')">
                                      <img src="/images/image-empty-default.png" class="img-fluid" alt="" height="140">
                                    </template>
                                </div>
                                <!-- <div class="btn-file-upload">
                                    <label for="npwp" class="btn btn-sm btn-secondary mt-3">Ganti Foto</label>
                                    <input type="file" id="npwp">
                                </div> -->
                            </div>
                        </collapse-item>
                        <collapse-item name="3">
                            <h5 slot="title" class="mb-0">Foto Buku Tabungan</h5>
                            <div>
                                <div class="images" v-viewer>
                                    <template v-if="getIncluded('accounts', axi.relationships.accounts.data, 'scan_url')">
                                      <img v-bind:src="getIncluded('accounts', axi.relationships.accounts.data, 'scan_url')" class="img-fluid" alt="" height="140">
                                    </template>
                                    <template v-if="!getIncluded('accounts', axi.relationships.accounts.data, 'scan_url')">
                                      <img src="/images/image-empty-default.png" class="img-fluid" alt="" height="140">
                                    </template>
                                </div>
                                <!-- <div class="btn-file-upload">
                                    <label for="buku_tabungan" class="btn btn-sm btn-secondary mt-3">Ganti Foto</label>
                                    <input type="file" id="buku_tabungan">
                                </div> -->
                            </div>
                        </collapse-item>
                      </collapse>
                    </div>
                  </div>
                </transition>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="showModalLoading">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <!-- <h3 class="text-center">Loading</h3> -->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
       <!--  <center>--><half-circle-spinner
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
      />  <!-- </center>-->
      </div>
    </modal>
  </div>
</template>

<script>
import { TimeLine, TimeLineItem } from "@/components";
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Collapse from "@/components/Collapse/Collapse";
import CollapseItem from "@/components/Collapse/CollapseItem";
import Badge from "@/components/Badge";
import DropzoneFileUpload from "@/components/Inputs/DropzoneFileUpload";
import moment from 'moment';
import 'moment/locale/id';
import swal from 'sweetalert2';
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  components: {
    Badge,
    TimeLine,
    TimeLineItem,
    Collapse,
    CollapseItem,
    DropzoneFileUpload,
    HalfCircleSpinner
  },
  data() {
    return {
      title: "details",
      isLoading: true,
      isError: false,
      isShow: false,
      isModalProcess: false,
      showModal: false,
      showModalLoading: false,
      axiData: {},
      isHideDownloadBtn: false,
    };
  },
  computed: {
    ...mapGetters('axi', [
      'axi',
      'included',
      'lokasi',
      'lokasiIncluded',
      'point'
    ]),
    idAxiDetail() {
			return this.$route.params.id
		},
  },
  methods: {
    ...mapActions('axi', [
      'getAxi',
      'getLokasi',
      'getPoint',
      'exportAxi'
    ]),
    ...mapActions('auth', [
      'checkAuth',
      'refreshToken',
    ]),
    async permissionAuth() {
      this.isLoading = true
      this.isShow = false

      if (!window.localStorage.getItem('access_token')) {
        swal.fire({
          type: 'error',
          title: 'Unauthenticated',
          text: 'Silahkan untuk login kembali',
          timer: 2500,
        })
        
        this.$router.push('/login')
      } else {
        let res = await this.checkAuth();
        if (res.name == 'Error' && res.response.status == 401) {
          window.localStorage.removeItem('access_token')
          window.localStorage.removeItem('refresh_token')
          window.localStorage.removeItem('role')
          window.localStorage.removeItem('user')
          
          swal.fire({
            type: 'error',
            title: 'Unauthenticated',
            text: 'Silahkan untuk login kembali',
            timer: 2500,
          })
          
          this.$router.push('/login')
        }
      }
      this.checkPermission()
    },
    checkPermission() {
      if (window.localStorage.getItem('role') != "Super Admin") {
        swal("Error", "Role anda tidak memiliki akses untuk melihat halaman ini", "error")
        this.$router.push('/administrator/dashboard')
      }
    },

    /**
     * --------------------------------------------------
     * Data Handling here
     *  -> getData for fetching data from endpoint
     *  -> assignData for handling sorting and filtering
     *  -> assignMeta for assigning from meta
     *  -> getIncluded for assigning from included
     * --------------------------------------------------
     */

		async getData() {
      this.isLoading = true
      this.isShow = false

      try {
        await Promise.all([
          await this.getAxi(this.idAxiDetail),
          this.getLokasi(this.included.find(x => x.type == "profiles").relationships.addresses.data[0].id),
        ])
        if (this.axi.attributes.status_id == 32) {
          this.$router.push('/administrator/axi/pendaftaran')
        } else {
          this.axiData = this.packData();
  
          this.isLoading = false
          this.isShow = true
        }
      } catch (error) {
        this.isLoading = false
        this.isError = true
      }
    },

    getIncluded(type, detail, attr) {
      if (detail == null) {
        return ''
      } else {
        let result = this.included.find(obj => {
          return (obj.type == type && obj.id == detail.id)
        })
        return result.attributes[attr]
      }
    },

    // this method usable until all backend ready
    packData() {
      const data = {}
      const tempProfile = this.included.find(x => x.type == "profiles")
      const tempRekening = this.included.find(x => x.type == "accounts")
      const tempNpwp = this.included.find(x => x.type == "npwps")

      data.nama = tempProfile.attributes.nama
      data.cabang_id = this.included.find(x => x.type == "branches").attributes.kode
      data.axi_id_reff = this.axi.attributes.axi_id_reff
      data.jenis_kelamin =  tempProfile.attributes.jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan'
      data.email =  tempProfile.attributes.email
      data.no_hp =  tempProfile.attributes.no_hp
      data.no_ktp =  tempProfile.attributes.no_ktp
      data.no_npwp =  tempNpwp.attributes.nomor

      data.nama_bank = this.getIncluded('banks', tempRekening.relationships.banks.data, 'nama')
      data.no_rekening = tempRekening.attributes.no_rekening

      data.kota_lahir = tempProfile.attributes.kota_lahir
      data.tanggal_lahir = moment(tempProfile.attributes.tanggal_lahir).format("YYYY-MM-DD")
      data.alamat = this.getIncluded('addresses', tempProfile.relationships.addresses.data[0], 'jalan')
      data.kelurahan = this.lokasiIncluded ?  this.lokasiIncluded.find(x => x.type == "villages").attributes.nama : "-"
      data.kota = this.lokasiIncluded ? this.lokasiIncluded.find(x => x.type == "cities").attributes.nama : "-"
      data.kecamatan = this.lokasiIncluded ? this.lokasiIncluded.find(x => x.type == "districts").attributes.nama : "-"
      data.provinsi = this.lokasiIncluded ? this.lokasiIncluded.find(x => x.type == "provinces").attributes.nama : "-"
      data.kode_pos = this.lokasiIncluded ? this.lokasiIncluded.find(x => x.type == "villages").attributes.kode_pos ? this.lokasiIncluded.find(x => x.type == "villages").attributes.kode_pos : "-" : "-"
      data.rt = this.getIncluded('addresses', tempProfile.relationships.addresses.data[0], 'rt')
      data.rw = this.getIncluded('addresses', tempProfile.relationships.addresses.data[0], 'rw')
      data.status_perkawinan = tempProfile.attributes.status_perkawinan
      data.nama_ibu_kandung = tempProfile.attributes.nama_ibu_kandung
      data.nama_pasangan = tempProfile.attributes.nama_pasangan
      data.no_ktp_pasangan = tempProfile.attributes.no_ktp_pasangan
      data.cabang_bank = tempRekening.attributes.cabang_bank
      data.an_rekening = tempRekening.attributes.an_rekening
      data.kota_bank = tempRekening.attributes.kota_bank
      data.nama_npwp = tempNpwp.attributes.nama
      data.status_npwp = tempNpwp.attributes.tipe
      data.status_npwp = tempNpwp.attributes.pkp
      data.created_at = moment(this.axi.attributes["created-at"]).format("YYYY-MM-DD")

      data.kelurahan = this.capitalize(data.kelurahan)
      data.kecamatan = this.capitalize(data.kecamatan)
      data.kota = this.capitalize(data.kota)
      data.provinsi = this.capitalize(data.provinsi)

      return data
    },

    capitalize: function (value) {
      if (!value) return ''
      if (value == 'DKI JAKARTA') return 'DKI Jakarta'
      // value = value.toLowerCase()
      // return value.charAt(0).toUpperCase() + value.slice(1)
      return value
        .toLowerCase()
        .split(' ')
        .map(function(word) {
          return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
    },
    

    /**
     * ----------------------------------------
     * End of data handling
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Modal Handling here
     * ----------------------------------------
     */

    simpanData() {
      this.isModalProcess= true
      this.showModal = false
      this.isModalProcess= false
      const that = this
      swal("Sukses", "Berhasil memproses data", "success")
      .then(function () {
        that.getData()
      }).catch(function (error){
      })
    },

    /**
     * ----------------------------------------
     * End of modal handling
     * ----------------------------------------
     */

    // Method for download excel
    async downloadExcel() {
      this.showModalLoading = true
      let res = await this.exportAxi(this.idAxiDetail)
      if (res.name != 'Error') {
        this.showModalLoading = false
        swal.fire('Download excel berhasil', 'Silahkan cek bagian download pada browser anda', 'success')
      } else {
        this.showModalLoading = false
        swal.fire('Download excel gagal', '', 'error')
      }
    }

  },
  filters: {
    convertDate(date) {
      return moment(date).format('LL');
    },
  },
  async created() {
    await this.permissionAuth()
    this.getData()
  },
};
</script>
