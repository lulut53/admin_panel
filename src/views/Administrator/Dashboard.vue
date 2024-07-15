<template>
  <div>
    <base-header class="pb-6 bg-gradient-orange">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Dashboard</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
              <li class="breadcrumb-item"><router-link to="/"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><a href="#">Administrator</a></li>
              <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card type="gradient-red"
                      icon="fa fa-inbox">
            <div class="row">
                <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Pengajuan Masuk</h5>
                    <br>
                    <span class="h2 font-weight-bold mb-0">{{ pengajuanMasuk }}</span>
                </div>
            </div>
            <template slot="footer">
              <p class="mt-3 mb-0 text-sm">
                <router-link to="/administrator/requests" class="text-nowrap font-weight-600">Semua Pengajuan</router-link>
              </p>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card type="gradient-orange"
                      icon="fas fa-bolt">
            <div class="row">
                <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Pendaftaran AXI</h5>
                    <br>
                    <span class="h2 font-weight-bold mb-0">{{ pendaftaranAXI }}</span>
                </div>
            </div>
            <template slot="footer">
              <p class="mt-3 mb-0 text-sm">
                <router-link to="/administrator/axi/pendaftaran" class="text-nowrap font-weight-600">Semua Pendaftaran AXI</router-link>
              </p>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card type="gradient-green"
                      icon="fas fa-handshake">
            <div class="row">
                <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Pendaftaran MAXI</h5>
                    <br>
                    <span class="h2 font-weight-bold mb-0">{{ pendaftaranMAXI }}</span>
                </div>
            </div>
            <template slot="footer">
              <p class="mt-3 mb-0 text-sm">
                <router-link to="/administrator/maxi/pendaftaran" class="text-nowrap font-weight-600">Semua Pendaftaran MAXI</router-link>
              </p>
            </template>
          </stats-card>

        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card type="gradient-info"
                      icon="fas fa-th">
            <div class="row">
                <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Pengajuan Produk</h5>
                    <br>
                    <span class="h2 font-weight-bold mb-0">{{ approvalProduk }}</span>
                </div>
            </div>
            <template slot="footer">
              <p class="mt-3 mb-0 text-sm">
                <router-link to="/administrator/maxi/pengajuan" class="text-nowrap font-weight-600">Semua Pengajuan Produk</router-link>
              </p>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <!-- <div class="row-md-12">
        <div class="card border-0">
          <div class="card-body text-center">
              <h3>SELAMAT DATANG DI ADMIN DASHBOARD</h3>
              <p>Website Dicicilaja.com<br>Solusi Semua Kebutuhan Anda</p>
          </div>
        </div>
      </div> -->

      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-8">
          <card header-classes="bg-transparent">
            <!-- <div slot="header" class="row align-items-center">
              <div class="col">

              </div>
            </div> -->

              <div class="row-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div class="col-6 pl-0">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Overview</h6>
                  <h5 class="h3 mb-2">Pengajuan Terbaru</h5>
                </div>
                <div class="col-6 pr-0 text-right">
                  <!-- <base-input v-model="searchData"
                              prepend-icon="fas fa-search"
                              placeholder="Search...">
                  </base-input> -->
                  <router-link :to="{ name: 'Pengajuan Cicilan'}">
                  <base-button class="btn btn-xl btn-orange">
                    <i class="ni ni-folder-17" aria-hidden="true"></i>
                    <!-- <span class="hidden-sm-down">Semua Pengajuan</span> -->
                    &nbsp;Semua Pengajuan
                  </base-button>
                  </router-link>
                </div>

              </div>

            <div>
              <transition name="fade" mode="out-in">
                <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                  <br>
                 <!-- <center>-->
                  <half-circle-spinner
                    :animation-duration="1000"
                    :size="60"
                    color="#ff1d5e"
                  />
                  <!--</center>-->
                </div>
                <div key="2" v-if="isError" class="text-center p-5">
                 <!-- <center>--><img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive"><!--</center>-->
                  <br>
                  <div style="display: flex; margin-top: 20px !important; justify-content: center;">
                    <h1 class="text-center">Error, silahkan coba lagi.</h1>
               </div>
                </div>
                <div key="2" v-if="isShow">
                  <el-table :data="item"
                            row-key="id"
                            header-row-class-name="thead-light"
                            class="table-responsive table-flush pt-2"
                            v-show="isShow">
                    <el-table-column label="No."
                                  min-width="100px"
                                  prop="id">
                      <template v-slot="{row}">
                          {{ item.indexOf(row) + 1}}
                      </template>
                    </el-table-column>
                    <el-table-column label="No. Pengajuan"
                                  min-width="200px"
                                  prop="no_pengajuan">
                      <template v-slot="{row}">
                        <router-link :to="{ name: 'details', params: { id: row.id }}">
                          {{row.attributes.no_pengajuan ? row.attributes.no_pengajuan : 'Belum Ada'}}
                        </router-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="Pemohon"
                                  min-width="200px"
                                  prop="pemohon">
                      <template v-slot="{row}">
                        {{ row.relationships.agent.data ? getIncluded('profiles', row.relationships.agent.data, 'nama') : "-"}}
                      </template>
                    </el-table-column>
                    <el-table-column label="Nama Nasabah"
                                  min-width="200px"
                                  prop="namanasabah">
                      <template v-slot="{row}">
                        {{ getIncluded('profiles', row.relationships.prospective_customer.data, 'nama') }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Area"
                                  min-width="200px"
                                  prop="area">
                      <template v-slot="{row}">
                          {{getIncluded('areas', row.relationships.area.data, 'nama')}}
                      </template>
                    </el-table-column>
                    <el-table-column label="Cabang"
                                  min-width="200px"
                                  prop="cabang">
                      <template v-slot="{row}">
                          {{getIncluded('branches', row.relationships.branch.data, 'nama')}}
                      </template>
                    </el-table-column>
                    <el-table-column label="Produk"
                                  min-width="200px"
                                  prop="produk">
                      <template v-slot="{row}">
                          {{ row.relationships.sub_product.data.id != "" && row.attributes.produk_id != 1 ? getIncluded('sub-products', row.relationships.sub_product.data, 'nama') : "-"}}
                      </template>
                    </el-table-column>
                    <el-table-column label="Status"
                                  min-width="140px"
                                  prop="status">
                      <template v-slot="{row}">
                        <div v-if="row.attributes.status == 15">
                          <badge rounded type="secondary">
                            Permohonan
                          </badge>
                        </div>
                        <div v-else-if="row.attributes.status == 16">
                          <badge rounded type="primary">
                            Proses
                          </badge>
                        </div>
                        <div v-else-if="row.attributes.status == 17">
                          <badge rounded type="info">
                            Survei
                          </badge>
                        </div>
                        <div v-else-if="row.attributes.status == 18">
                          <badge rounded type="success">
                            Disetujui
                          </badge>
                        </div>
                        <div v-else-if="row.attributes.status == 19">
                          <badge rounded type="danger">
                            Tolak
                          </badge>
                        </div>
                        <div v-else>
                          <badge rounded type="secondary">
                            Permohonan
                          </badge>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Dibuat Pada"
                                  min-width="160px"
                                  prop="created-at">
                      <template v-slot="{row}">
                              {{row.attributes["created-at"] | convertDate}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" min-width="150px" label="Aksi">
                      <template v-slot="{row}">
                        <el-dropdown trigger="click" class="dropdown">
                        <base-button class="like btn-link text-white" type="info" size="sm" icon>
                          <!-- <i class="text-white"></i> -->
                          Ubah Status
                        </base-button>
                            <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
                              <el-dropdown-item @click.native="handleCommand('permohonan', row)">Permohonan</el-dropdown-item>
                              <el-dropdown-item @click.native="handleCommand('proses', row)">Proses</el-dropdown-item>
                              <el-dropdown-item @click.native="handleCommand('survei', row)">Survei</el-dropdown-item>
                              <el-dropdown-item @click.native="handleCommand('disetujui', row)">Disetujui</el-dropdown-item>
                              <el-dropdown-item @click.native="handleCommand('tolak', row)">Tolak</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </transition>
            </div>
          </card>
        </div>

        <div class="col-xl-4">
          <card header-classes="bg-transparent" style="height:540px" >
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Pengajuan</h5>
              </div>
            </div>
            <transition name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                <br>
                <!-- <center>--><half-circle-spinner
                  :animation-duration="1000"
                  :size="60"
                  color="#ff1d5e"
                /> <!--</center>-->
              </div>
              <!-- <div key="2" v-if="isError" class="text-center p-5">
                <center><img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive"></center>
                <br>
                <center><h1>Error, silahkan coba lagi.</h1></center>
              </div> -->
              <!-- <div key="2" v-if="isShow"> -->
              <div key="2" v-if="isShow || isError">
                <line-chart
                  :height="400"
                  :width="220"
                  :chart-data="redBarChart.chartData"/>
              </div>
            </transition>
          </card>
        </div>
      </div>
    </div>
    <modal :show.sync="showModal" :clickToClose="false">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
       <!--<center>--><half-circle-spinner
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
      /> <!--</center>-->
      </div>
    </modal>
  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';

  // Components
  import BaseProgress from '@/components/BaseProgress';
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import StatsCard from '@/components/Cards/StatsCard';
  import { Table, TableColumn, Select, Option, DropdownMenu, DropdownItem, Dropdown } from 'element-ui';
  import swal from 'sweetalert2';
  import users from '@/views/Tables/users2';
  import { BasePagination } from '@/components';
  import { mapGetters, mapActions } from 'vuex'
  import _ from 'lodash';
  import moment from 'moment';
  import 'moment/locale/id';
  import { HalfCircleSpinner, FulfillingBouncingCircleSpinner } from 'epic-spinners'

  export default {
    components: {
      LineChart,
      BarChart,
      BaseProgress,
      RouteBreadCrumb,
      StatsCard,
      BasePagination,
      [Select.name]: Select,
      [Option.name]: Option,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
      HalfCircleSpinner,
      FulfillingBouncingCircleSpinner
    },
    data() {
      return {
        item: [],
        dataIncluded: [],
        pengajuanMasuk: '-',
        pendaftaranAXI: '-',
        pendaftaranMAXI: '-',
        approvalProduk: '-',
        selectedRows: [],
        redBarChart: {
          chartData: {
            labels: [
            ],
            datasets: [
              {
                label: 'Masuk',
                backgroundColor: "rgba(159,170,174,0.8)",
                data: [
                  // 10, 7, 20
                ]
              }
            ]
          }
        },
        searchData: '',
        meta: {},
        varChart: {
          data: [],
          month: []
        },
        isLoading: true,
        isError: false,
        isShow: false,
        showModal: false,
      }
    },
    computed: {
      ...mapGetters('axi', ['count_pendaftaran_axi']),
      ...mapGetters('maxi', ['count_pendaftaran_maxi']),
      ...mapGetters('transaksi', ['count_transaksi','count_3bulan','transaksis','included']),
      ...mapGetters('subproduk', ['count_approval_produk']),
    },
    methods: {
      ...mapActions('auth', [
        'checkAuth',
        'refreshToken',
      ]),
      ...mapActions('axi', [
        'getCountPendaftaranAXI',
      ]),
      ...mapActions('maxi', [
        'getCountPendaftaranMAXI',
      ]),
      ...mapActions('transaksi', [
        'getCountTransaksi',
        'getCount3Bulan',
        'getTransaksis',
        'getTransaksisQueried',
        'updateTransaksi'
      ]),
      ...mapActions('subproduk', [
        'getCountApprovalProduk',
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
        if (window.localStorage.getItem('role') == "Mitra MAXI") {
          this.$router.push('/administrator/maxi/produk-saya')
        } else if (window.localStorage.getItem('role') == "Tasya Area") {
          this.$router.push('/administrator/maxi/pengajuan')
        }
        if (window.localStorage.getItem('role') != "Super Admin" || window.localStorage.getItem('role') != "Reporting SPDM" ) {
          swal("Error", "Role anda tidak memiliki akses untuk melihat halaman ini", "error")
          this.$router.push('/administrator/dashboard')
        }
      },

      async assignCountTransaksi() {
        await this.getCountTransaksi();
        this.pengajuanMasuk = this.count_transaksi
      },
      async assignCountPendaftaranAXI() {
        await this.getCountPendaftaranAXI();
        this.pendaftaranAXI = this.count_pendaftaran_axi
      },
      async assignCountPendaftaranMAXI() {
        await this.getCountPendaftaranMAXI();
        this.pendaftaranMAXI = this.count_pendaftaran_maxi
      },
      async assignCountApprovalProduk() {
        await this.getCountApprovalProduk();
        this.approvalProduk = this.count_approval_produk
      },
      async assignCount3Bulan() {
        await this.getCount3Bulan();

        for (const val of this.count_3bulan) {
          this.varChart.month.push(moment.months(val.month - 1))
          this.varChart.data.push(val.data)
        }

        this.redBarChart.chartData = {
          datasets: [
            {
              label: 'Masuk',
              data: this.varChart.data,
            }
          ],
          labels: this.varChart.month,
        }
      },

      async getData() {
        this.isLoading = true
        this.isShow = false

        this.assignCountTransaksi();
        this.assignCountPendaftaranAXI();
        this.assignCountPendaftaranMAXI();
        this.assignCountApprovalProduk();
        this.assignCount3Bulan();

        let data = {}
        data.property = 'created-at'
        data.order = 'desc'
        data.pageSize = 5
        data.pageNumber = 1
        data.searchAll = ""
        data.include = "branch,area,current_pic,prospective_customer,agent,sub_product"

        let res = await this.getTransaksisQueried(data);
        if (res.name != 'Error') {
          this.item = JSON.parse(JSON.stringify(this.transaksis));
          this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included

          this.isShow = true
          this.isLoading = false
        } else {
          this.isError = true
          this.isLoading = false
        }
      },

      // Get data from included
      getIncluded(type, detail, attr) {
        if (detail == null) {
          return ''
        } else {
          var result = this.dataIncluded.find(obj => {
            return (obj.type == type && obj.id == detail.id)
          })
          return result.attributes[attr]
        }
      },

      // To handle the modal
      handleCommand(command, row) {
        row = JSON.parse(JSON.stringify(row))

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
            if (command == 'permohonan') row.attributes.status = 15
            else if (command == 'proses') row.attributes.status = 16
            else if (command == 'survei') row.attributes.status = 17
            else if (command == 'disetujui') row.attributes.status = 18
            else if (command == 'tolak') row.attributes.status = 19

            row.attributes.current_pic_id = JSON.parse(window.localStorage.getItem('user')).id

            that.showModal = true

            const res = await that.updateTransaksi(row);

            that.showModal = false

            if (res.name != 'Error') {
              swal.fire('Status telah terubah!', '', 'success')

              let data = {}
              data.property = 'created-at'
              data.order = 'desc'
              data.pageSize = 5
              data.pageNumber = 1
              data.searchAll = ""
              data.include = "branch,area,current_pic,prospective_customer,agent,sub_product"

              this.isShow = false
              this.isLoading = true

              let res = await this.getTransaksisQueried(data);
              if (res.name != 'Error') {
                this.item = JSON.parse(JSON.stringify(this.transaksis));
                this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included

                this.isShow = true
                this.isLoading = false
              } else {
                this.isError = true
                this.isLoading = false
              }
            } else {
              that.showModal = false
              swal.fire('Status gagal diubah', '', 'error')
            }
          }
        });
      },

      // This method receive data from created below
      searchDatas () {
      },
    },
    watch: {
      searchData: function () {
        this.debouncedGetData()
      }
    },
    created: async function () {
      await this.permissionAuth()
      this.getData()
      this.debouncedGetData = _.debounce(this.searchDatas, 3000)
    },
    filters: {
      convertDate(date) {
        return moment(date).format('LLLL');
      },
    },
  };
</script>
<style>
  .el-table .cell {
    word-break: break-word;
  }
</style>
