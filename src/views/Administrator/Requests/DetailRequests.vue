<template>

  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-8 col-8">
          <h6 class="h2 d-inline-block mb-0">Detail Pengajuan</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/requests">Requests</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Request By ID: {{ idTransaksiDetail }}</li>
            </ol>
          </nav>
        </div>
        <div class=" col-lg-4 pt-2 text-right">
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
          <div class="card" >
            <div class="card-header">
              <div class="row">
                <div class="col-8">
                  <h3>PENGAJUAN DAN JAMINAN</h3>
                  <!-- <h4>Informasi Pengajuan</h4> -->
                </div>
                <div class="col-4 text-right" v-if="isShow && !isError">
                  <base-dropdown>
                  <base-button size="sm" slot="title-container" type="info" block class="dropdown-toggle">
                    Proses Pengajuan
                  </base-button>
                      <a @click="ubahStatus('permohonan')" class="dropdown-item">Permohonan</a>
                      <a @click="ubahStatus('proses')" class="dropdown-item">Proses</a>
                      <a @click="ubahStatus('survei')" class="dropdown-item">Survei</a>
                      <a @click="ubahStatus('disetujui')" class="dropdown-item">Disetujui</a>
                      <a @click="ubahStatus('tolak')" class="dropdown-item">Tolak</a>
                  </base-dropdown>
                </div>
              </div>
            </div>
            <transition name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                <br>
                <!-- <center> -->
                  <half-circle-spinner
                  :animation-duration="1000"
                  :size="60"
                  color="#ff1d5e"
                />
              <!-- </center> -->
              </div>
              <div key="2" v-if="isError" class="text-center p-5">
                <!-- <center> -->
                  <img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive">
                <!-- </center> -->
                <br>
                <div style="display: flex; margin-top: 20px !important; justify-content: center;">
                <!-- <center> -->
                  <h1 class="text-center">Error, silahkan coba lagi.</h1>
                <!-- </center> -->
                </div>
              </div>
              <div key="2" v-if="isShow">
                <div class="card-body">
                  <div class="card">
                    <div class="card-header">
                      <h4>Informasi Pengajuan</h4>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">Nomor Pengajuan</div>
                        <div class="col-8">: {{ transaksiData.no_pengajuan ? transaksiData.no_pengajuan : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Program Cicilan</div>
                        <div class="col-8">: {{ transaksiData.program_cicilan ? transaksiData.program_cicilan : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Nama Produk</div>
                        <div class="col-8">: {{ transaksiData.nama_produk ? transaksiData.nama_produk : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Jumlah Produk</div>
                        <div class="col-8">: {{ transaksiData.qty ? transaksiData.qty : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Channel Penjualan</div>
                        <div class="col-8">: {{ transaksiData.channel_penjualan ? transaksiData.channel_penjualan : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Voucher Code</div>
                        <div class="col-8">: {{ transaksiData.voucher ? transaksiData.voucher : "-" }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header">
                      <h4>Informasi Jaminan</h4>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">Jaminan</div>
                        <div class="col-8">: {{ transaksiData.kolateral ? transaksiData.kolateral : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Merk Kendaraan</div>
                        <div class="col-8">: {{ transaksiData.merk ? transaksiData.merk : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Tipe Kendaraan</div>
                        <div class="col-8">: {{ transaksiData.tipe ? transaksiData.tipe : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Tahun Kendaraan</div>
                        <div class="col-8">: {{ transaksiData.tahun ? transaksiData.tahun : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Plat Kendaraan</div>
                        <div class="col-8">: {{ transaksiData.plat_nomor ? transaksiData.plat_nomor : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Tenor</div>
                        <div class="col-8">: {{ transaksiData.tenor ? transaksiData.tenor : "-" }} Bulan</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Tipe Asuransi</div>
                        <div class="col-8">: {{ transaksiData.tipe_asuransi ? transaksiData.tipe_asuransi : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Tipe Pinjaman</div>
                        <div class="col-8">: {{ transaksiData.tipe_pinjaman ? transaksiData.tipe_pinjaman : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Jumlah Pinjaman</div>
                        <div class="col-8">: Rp. {{ transaksiData.jumlah_pinjaman ? transaksiData.jumlah_pinjaman : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Area Pengajuan</div>
                        <div class="col-8">: {{ transaksiData.area ? transaksiData.area : "-" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Nama Cabang</div>
                        <div class="col-8">: {{ transaksiData.nama_cabang ? transaksiData.nama_cabang : '-' }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Status Pinjaman</div>
                        <div class="col-8">
                          <div v-if="transaksiData.status == 15">
                            <badge rounded type="secondary">
                              Permohonan
                            </badge>
                          </div>
                          <div v-else-if="transaksiData.status == 16">
                            <badge rounded type="primary">
                              Proses
                            </badge>
                          </div>
                          <div v-else-if="transaksiData.status == 17">
                            <badge rounded type="info">
                              Survei
                            </badge>
                          </div>
                          <div v-else-if="transaksiData.status == 18">
                            <badge rounded type="success">
                              Disetujui
                            </badge>
                          </div>
                          <div v-else-if="transaksiData.status == 19">
                            <badge rounded type="danger">
                              Tolak
                            </badge>
                          </div>
                          <div v-else>
                            <badge rounded type="secondary">
                              Permohonan
                            </badge>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="row">
                        <div class="col-4">Foto KTP</div>
                        <div class="col-8">: <img v-bind:src="transaksiData.foto_ktp" class="img-responsive" alt="" height="50"></div>
                      </div>
                      <div class="row">
                        <div class="col-4">Foto Kolateral</div>
                        <div class="col-8">: <img v-bind:src="transaksiData.foto_kolateral" class="img-responsive" alt="" height="50"></div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="card" >
            <div class="card-header">
              <h3>NASABAH & PEMOHON</h3>
            </div>
            <transition name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                <br>
                <!-- <center> -->
                  <half-circle-spinner
                  :animation-duration="1000"
                  :size="60"
                  color="#ff1d5e"
                />
              <!-- </center> -->
              </div>
              <div key="2" v-if="isShow">
                <div class="card-body">
                    <div class="row-12">
                      <div class="card">
                        <div class="card-header">
                          <h4>Informasi Nasabah</h4>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div class="col-4">Nama Lengkap</div>
                            <div class="col-8">: {{ nasabahData.nama ? nasabahData.nama : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">No. Handphone</div>
                            <div class="col-8">: {{ nasabahData.no_hp ? nasabahData.no_hp : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Email</div>
                            <div class="col-8">: {{ nasabahData.email ? nasabahData.email : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">No. KTP</div>
                            <div class="col-8">: {{ nasabahData.no_ktp ? nasabahData.no_ktp : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Alamat Domisili</div>
                            <div class="col-8">: {{ nasabahData.alamat ? nasabahData.alamat : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Kelurahan</div>
                            <div class="col-8">: {{ nasabahData.kelurahan ? nasabahData.kelurahan : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Kecamatan</div>
                            <div class="col-8">: {{ nasabahData.kecamatan ? nasabahData.kecamatan : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Kota Domisili</div>
                            <div class="col-8">: {{ nasabahData.kota ? nasabahData.kota : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Provinsi Domisili</div>
                            <div class="col-8">: {{ nasabahData.provinsi ? nasabahData.provinsi : "-" }}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row-12">
                      <div class="card">
                        <div class="card-header">
                          <h4>Informasi Pemohon</h4>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div class="col-4">Nama</div>
                            <div class="col-8">: {{ pemohonData.nama ? pemohonData.nama : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">No. HP</div>
                            <div class="col-8">: {{ pemohonData.no_hp ? pemohonData.no_hp : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Email</div>
                            <div class="col-8">: {{ pemohonData.email ? pemohonData.email : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">AXI ID</div>
                            <div class="col-8">: {{ pemohonData.axi_id ? pemohonData.axi_id : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Kecamatan</div>
                            <div class="col-8">: {{ pemohonData.kecamatan ? pemohonData.kecamatan : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Kota</div>
                            <div class="col-8">: {{ pemohonData.kota ? pemohonData.kota : "-" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Provinsi</div>
                            <div class="col-8">: {{ pemohonData.provinsi ? pemohonData.provinsi : "-" }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="col-md-4">
          <!-- <button class="btn btn-info btn-block">Proses Pengajuan</button> -->
          <!-- <div class="pb-2">
            <base-dropdown>
            <base-button slot="title-container" type="info" block class="dropdown-toggle">
              Proses Pengajuan
            </base-button>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
            </base-dropdown>
          </div>
          <br> -->
          <div class="card" v-if="isHideDownloadBtn">
            <div class="card-header">
              <h3>RIWAYAT PENGAJUAN</h3>
            </div>
            <div class="card-body">
              <transition name="fade" mode="out-in">
                <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                  <br>
                  <!-- <center> -->
                    <half-circle-spinner
                    :animation-duration="1000"
                    :size="60"
                    color="#ff1d5e"
                  />
                <!-- </center> -->
                </div>
                <div key="2" v-if="isShow">
                  <div class="card">
                    <div class="card-header">
                      <h4>Penanggung Jawab</h4>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">Nama</div>
                        <div class="col-8">: {{ picData.nama }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Jabatan</div>
                        <div class="col-8">: {{ picData.jabatan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">NIK</div>
                        <div class="col-8">: {{ picData.no_ktp }}</div>
                      </div>
                    </div>
                  </div>
                  <card header-classes="bg-transparent">
                      <h4 slot="header" class="mb-0">Riwayat Pengajuan</h4>

                      <time-line type="one-side">

                        <time-line-item badge-type="success"
                                        badge-icon="ni ni-bell-55">
                          <!-- <small class="text-muted font-weight-bold">10:30 AM</small> -->
                          <h5 class="mb-0">Terkirim</h5>
                          <div class="mb-0">PIC : -</div>
                          <div class="mb-0">{{ transaksiData.created_at | convertDateAgo }} - {{ transaksiData.created_at | convertDate }}</div>
                        </time-line-item>
                        
                        <div v-for="(val, index) in historyData" :key="index" class="pb-2">
                          <div v-if="val.status === 15">
                            <time-line-item badge-type="secondary"
                                            badge-icon="ni ni-bell-55">
                              <h5 class="mb-0">Permohonan</h5>
                              <h5 class="mb-0">PIC : {{ val.profile ? val.profile.nama : "-" }} ({{ val.profile ? val.profile.no_ktp : "-" }})</h5>
                              <div class="mb-0">{{ val.created_at | convertDateAgo }} - {{ val.created_at | convertDate }}</div>
                            </time-line-item>
                          </div>
                          <div v-else-if="val.status === 16">
                            <time-line-item badge-type="primary"
                                            badge-icon="ni ni-bell-55">
                              <h5 class="mb-0">Proses</h5>
                              <h5 class="mb-0">PIC : {{ val.profile ? val.profile.nama : "-" }} ({{ val.profile ? val.profile.no_ktp : "-" }})</h5>
                              <div class="mb-0">{{ val.created_at | convertDateAgo }} - {{ val.created_at | convertDate }}</div>
                            </time-line-item>
                          </div>
                          <div v-else-if="val.status === 17">
                            <time-line-item badge-type="info"
                                            badge-icon="ni ni-bell-55">
                              <h5 class="mb-0">Survey</h5>
                              <h5 class="mb-0">PIC : {{ val.profile ? val.profile.nama : "-" }} ({{ val.profile ? val.profile.no_ktp : "-" }})</h5>
                              <div class="mb-0">{{ val.created_at | convertDateAgo }} - {{ val.created_at | convertDate }}</div>
                            </time-line-item>
                          </div>
                          <div v-else-if="val.status === 18">
                            <time-line-item badge-type="success"
                                            badge-icon="ni ni-bell-55">
                              <h5 class="mb-0">Disetujui</h5>
                              <h5 class="mb-0">PIC : {{ val.profile ? val.profile.nama : "-" }} ({{ val.profile ? val.profile.no_ktp : "-" }})</h5>
                              <div class="mb-0">{{ val.created_at | convertDateAgo }} - {{ val.created_at | convertDate }}</div>
                            </time-line-item>
                          </div>
                          <div v-else-if="val.status === 19">
                            <time-line-item badge-type="success"
                                            badge-icon="ni ni-bell-55">
                              <h5 class="mb-0">Ditolak</h5>
                              <h5 class="mb-0">PIC : {{ val.profile ? val.profile.nama : "-" }} ({{ val.profile ? val.profile.no_ktp : "-" }})</h5>
                              <div class="mb-0">{{ val.created_at | convertDateAgo }} - {{ val.created_at | convertDate }}</div>
                            </time-line-item>
                          </div>
                          <div v-else>
                            <time-line-item badge-type="secondary"
                                            badge-icon="ni ni-bell-55">
                              <h5 class="mb-0">Permohonan</h5>
                              <h5 class="mb-0">PIC : {{ val.profile.nama }} ({{ val.profile.no_ktp }})</h5>
                              <div class="mb-0">{{ val.created_at | convertDateAgo }} - {{ val.created_at | convertDate }}</div>
                            </time-line-item>
                          </div>
                          <br/>
                        </div>
                      </time-line>
                  </card>
                </div>
              </transition>
            </div>
            
          </div>
          <div class="card" >
            <div class="card-header">
              <!-- <h3>RIWAYAT PENGAJUAN</h3> -->
              <h3>Lampiran Foto</h3>
            </div>
            <div class="card-body pt-0 pb-0">
              <p class="font-weight-bold">Foto KTP</p>
              <card>
                <transition name="fade" mode="out-in">
                <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                  <br>
                  <!-- <center> -->
                    <half-circle-spinner
                    :animation-duration="1000"
                    :size="60"
                    color="#ff1d5e"
                  />
                <!-- </center> -->
                </div>
                <div key="2" v-if="isShow">
                  <div class="row">
                    <div>
                      <div class="images" v-viewer>
                        <template v-if="transaksiData.foto_ktp">
                          <img v-bind:src="transaksiData.foto_ktp" class="img-fluid" alt="" height="125">
                        </template>
                        <template v-if="!transaksiData.foto_ktp">
                          <img src="/images/image-empty-default.png" class="img-fluid" alt="" height="140">
                        </template>
                      </div>
                      <br>
                      <!-- <div class="btn-file-upload">
                        <label for="profile" class="btn btn-sm btn-secondary">Ganti Foto</label>
                        <input type="file" id="profile">
                      </div> -->
                    </div>
                  </div>
                </div>
              </transition>
              </card>
            </div>
            <div class="card-body pt-0 pb-0">
              <p class="font-weight-bold">Foto Kolateral</p>
              <card>
                <transition name="fade" mode="out-in">
                <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                  <br>
                  <!-- <center> -->
                    <half-circle-spinner
                    :animation-duration="1000"
                    :size="60"
                    color="#ff1d5e"
                  />
                <!-- </center> -->
                </div>
                <div key="2" v-if="isShow">
                  <div class="row">
                    <div>
                      <div class="images" v-viewer>
                        <template v-if="transaksiData.foto_kolateral">
                          <img v-bind:src="transaksiData.foto_kolateral" class="img-fluid" alt="" height="125">
                        </template>
                        <template v-if="!transaksiData.foto_kolateral">
                          <img src="/images/image-empty-default.png" class="img-fluid" alt="" height="140">
                        </template>
                      </div>
                      <br>
                      <!-- <div class="btn-file-upload">
                        <label for="profile" class="btn btn-sm btn-secondary">Ganti Foto</label>
                        <input type="file" id="profile">
                      </div> -->
                    </div>
                  </div>
                </div>
              </transition>
              </card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="showModal">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
      <!-- <center> -->
        <half-circle-spinner
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
      />
    <!-- </center> -->
      </div>
    </modal>
  </div>

</template>

<script>
import { TimeLine, TimeLineItem } from '@/components';
import Badge from '@/components/Badge';
import moment from 'moment';
import 'moment/locale/id';
import swal from 'sweetalert2';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  components: {
    Badge,
    TimeLine,
    TimeLineItem,
    HalfCircleSpinner
  },
  // name:'details',
  data() {
    return {
      // title:"details",
      isLoading: true,
      isError: false,
      isShow: false,
      isModalProcess: false,
      errormsg: '',
      showModal: false,
      transaksiData: {},
      nasabahData: {},
      pemohonData: {},
      picData: {},
      historyData: [],
      isHideDownloadBtn: true,
    }
  },
  methods: {
    ...mapActions('transaksi', [
      'getTransaksi',
      'getHistory',
      'getProfile',
      'getTransaksiDetail',
      'updateTransaksi',
      'getAlamat',
      // 'getBank',
      // 'getPoint',
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

    // this method usable until all backend ready
    packData() {
      const data = {}
      const tempCol = this.included.find(x => x.type == "collaterals")
      const tempVoc = this.included.find(x => x.type == "voucher-codes")
      const tempIns = this.included.find(x => x.type == "insurance-types")
      const tempOB = this.included.find(x => x.type == "object-brands") // object brand
      const tempOM = this.included.find(x => x.type == "object-models") // object model

      data.no_pengajuan = this.transaksi.attributes.no_pengajuan
      data.program_cicilan = this.getIncluded('products', this.transaksi.relationships.product.data, 'nama')
      data.nama_produk = this.transaksi.relationships.sub_product.data.id == "" || this.transaksi.relationships.product.data.id == "1" ? '-' : this.getIncluded('sub-products', this.transaksi.relationships.sub_product.data, 'nama')
      data.qty = this.transaksi.attributes.qty
      data.channel_penjualan = this.transaksi.attributes.channel_id == 1 ? "dicicilaja.com" : ""
      data.voucher = tempVoc ? tempVoc.attributes.nama : '-'

      data.status = this.transaksi.attributes.status
      data.kolateral = tempCol.attributes.nama
      data.merk = tempOB.attributes ? tempOB.attributes.nama : '-'
      data.tipe = tempOM.attributes ? tempOM.attributes.nama : '-'
      data.tahun = this.transaksi.attributes.tahun
      data.plat_nomor = this.transaksi.attributes.vehicle_id
      data.tenor = this.transaksi.attributes.tenor
      data.jumlah_pinjaman = this.transaksi.attributes.amount.toLocaleString()
      data.tipe_asuransi = tempIns.attributes ? tempIns.attributes.nama : '-'
      data.tipe_pinjaman = this.transaksi.attributes.jenis_angsuran_id == 1 ? 'Angsuran Per Bulan (ADDB)' : this.transaksi.attributes.jenis_angsuran_id == 2 ? 'Pembayaran Pertama (ADDM)' : '-'
      data.area = this.getIncluded('areas', this.transaksi.relationships.area.data, 'nama')
      data.nama_cabang = this.getIncluded('branches', this.transaksi.relationships.branch.data, 'nama')
      data.foto_ktp = this.transaksi.attributes.ktp_image
      data.foto_kolateral = this.transaksi.attributes.bpkb
      data.created_at = this.transaksi.attributes["created-at"]


      this.transaksiData = data
    },
    async packDataN() {
      const data = {}
      const temp = this.included.find(x => x.type == "profiles" && x.id == this.transaksi.relationships.prospective_customer.data.id)

      let res = await this.getAlamat(temp.relationships.addresses.data[0].id)

      data.nama = temp.attributes.nama
      data.no_hp = temp.attributes.no_hp
      data.email = temp.attributes.email
      data.no_ktp = temp.attributes.no_ktp
      data.alamat = this.included.find(x => x.type == "addresses" && x.id == temp.relationships.addresses.data[0].id).attributes ? this.included.find(x => x.type == "addresses" && x.id == temp.relationships.addresses.data[0].id).attributes.jalan : "-"
      data.kelurahan = this.alamat_included.find(x => x.type == "villages").attributes.nama
      data.kecamatan = this.alamat_included.find(x => x.type == "districts").attributes.nama
      data.kota = this.alamat_included.find(x => x.type == "cities").attributes.nama
      data.provinsi = this.alamat_included.find(x => x.type == "provinces").attributes.nama
      data.kelurahan = this.capitalize(data.kelurahan)
      data.kecamatan = this.capitalize(data.kecamatan)
      data.kota = this.capitalize(data.kota)
      data.provinsi = this.capitalize(data.provinsi)

      this.nasabahData = data
    },
    async packDataP() {
      const data = {}
const temp = this.transaksi.relationships.agent.data ? this.included.find(x => x.type == "profiles" && x.id == this.transaksi.relationships.agent.data.id) : {id: ""}
      const tempAxi = this.included.find(x => x.type == "detail-axis" && x.id == temp.relationships['detail-axis'].data[0].id)
      
      if (temp.id != "") { await this.getAlamat(temp.relationships.addresses.data[0].id) }

      data.nama = temp.id != "" ? temp.attributes.nama : "-"
      data.no_hp = temp.id != "" ? temp.attributes.no_hp : "-"
      data.email = temp.id != "" ? temp.attributes.email : "-"
      data.axi_id = tempAxi ? tempAxi.attributes.nomor_axi_id : "-"
      data.kecamatan = temp.id != "" ? this.alamat_included.find(x => x.type == "districts").attributes.nama : "-"
      data.kota = temp.id != "" ? this.alamat_included.find(x => x.type == "cities").attributes.nama : "-"
      data.provinsi = temp.id != "" ? this.alamat_included.find(x => x.type == "provinces").attributes.nama : "-"
      
      data.kecamatan = temp.id != "" ? this.capitalize(data.kecamatan) : "-"
      data.kota = temp.id != "" ?  this.capitalize(data.kota) : "-"
      data.provinsi = temp.id != "" ?  this.capitalize(data.provinsi) : "-"

      this.pemohonData = data
    },
    async currentPIC() {
      const data = {}
      const temp = this.history.length != 0 ? this.profile : {id: ""}

      data.nama = temp.id != "" ? temp.attributes.nama : "-"
      data.no_ktp = temp.id != "" ? temp.attributes.no_ktp : "-"
      data.jabatan = temp.id != "" ? temp.attributes.role : "-"

      this.picData = data
    },
    async packHistory() {
      await this.getHistory(this.idTransaksiDetail)

      let data = []
      let objHistory = {
        status: 0,
        created_at: "",
        profile: {}
      }
      
      if (this.history.length != 0) {
        let count = 0
        for (var val of this.history) {
          objHistory.status = JSON.parse(val.event_properties).transaksiAttributes.status
          objHistory.created_at = val.created_at

          if (JSON.parse(val.event_properties).transaksiAttributes.current_pic_id) {
            let payload = {}
            payload.id = JSON.parse(val.event_properties).transaksiAttributes.current_pic_id
            payload.params = count == (this.history.length - 1) ? 'user.groups' : ""

            await this.getProfile(payload)
          
            objHistory.profile = this.profile.attributes
          }

          data.push(objHistory)
          // reset
          objHistory = {
            status: 0,
            created_at: "",
            profile: {}
          }

          count++
        }
      }

      this.historyData = data
    },
    simpanData() {
      this.showModal = false
      swal("Sukses", "Data berhasil diubah!", "success").then(function(){
      })
    },
		async getData() {
      this.isLoading = true
      this.isShow = false

      let res = await this.getTransaksi(this.idTransaksiDetail)
      if (res.name != 'Error') {
        try {
          await Promise.all([
            this.packData(),
            await this.packDataN(),
            await this.packDataP(),
            await this.packHistory(),
            this.currentPIC()
          ])

          this.isLoading = false
          this.isShow = true
        } catch (error) {
          this.isLoading = false
          this.isError = true
        }
      } else {
        this.isError = true
        this.isLoading = false
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
    ubahStatus(command) {
      let tempTransaksi = this.included.find(x => x.type == "transaksi")
      // row = JSON.parse(JSON.stringify(row))

      const that = this
      swal({
        title: 'Apakah anda yakin untuk mengubah status pengajuan menjadi ' + command + '?',
        text: "",
        type: 'question',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Batal',
        reverseButtons: true
      })
      .then(async (result) => {
        if (result.value) {
          if (command == 'permohonan') this.transaksi.attributes.status = 15
          else if (command == 'proses') this.transaksi.attributes.status = 16
          else if (command == 'survei') this.transaksi.attributes.status = 17
          else if (command == 'disetujui') this.transaksi.attributes.status = 18
          else if (command == 'tolak') this.transaksi.attributes.status = 19

          this.transaksi.attributes.current_pic_id = parseInt(JSON.parse(window.localStorage.getItem('user')).id)

          that.showModal = true
          
          const res = await that.updateTransaksi(this.transaksi);
          that.showModal = false

          if (res.name != 'Error') {
            swal.fire('Status telah terubah!', '', 'success')
            
            that.getData()
          } else {
            that.showModal = false
            swal.fire('Status gagal diubah', '', 'error')
          }
        }
      });
    },
    downloadExcel() {
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
    }
  },
  filters: {
    convertDate(date) {
      return moment(date).format('LLLL');
    },
    convertDateAgo(date) {
      return moment(date).fromNow();
    },
  },
  computed: {
    ...mapGetters('transaksi', [
      'transaksi',
      'transaksi_detail',
      'included',
      'history',
      'profile',
      'alamat_included',
    ]),
    idTransaksiDetail() {
			return this.$route.params.id
		},
  },
  async created() {
    await this.permissionAuth()
    this.getData()
  },
}
</script>
