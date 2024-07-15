<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Pendaftaran MAXI</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">MAXI</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 pt-2 text-right" v-if="isShow && !isError">
          <date-range-picker
            v-model="datePicked"
            ref="picker"
            :locale-data="locale"
            :opens="opens" class="pr-2">
          </date-range-picker>
          <base-button class="btn btn-xl mr-4" type="secondary" @click="dateRangeClear">
            <span class="hidden-sm-down">Clear Date</span>
          </base-button>
          <base-button class="btn btn-xl" type="success" @click="downloadExcel" v-if="!isHideDownloadBtn">
            <i class="ni ni-cloud-download-95" aria-hidden="true"></i>
            <span class="hidden-sm-down">Download Excel</span>
          </base-button>
          <base-button @click="showModalExport = true" type="success" class="btn btn-xl">Export Data</base-button>
        </div>
      </div>


    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <div>
        <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
          <transition name="fade" mode="out-in">
            <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content: center;">
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
              <!-- <center> -->
                <div style="display: flex; margin-top: 20px !important; justify-content: center;">
                <h1>Error, silahkan coba lagi.</h1>
                </div>
              <!-- </center> -->
            </div>
            <div key="2" v-if="isShow">
              <div>
                <div class="row-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                  <div class="col-2">
                    <el-select
                      class="select-primary pagination-select"
                      v-model="perPageCurrent"
                      placeholder="Per page"
                    >
                      <el-option
                        class="select-primary"
                        v-for="item in perPageOptions"
                        :key="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-4 pr-0">
                        <el-select
                          class="select-primary pagination-select"
                          v-model="currentColumnSearched"
                          placeholder="Per page"
                        >
                          <el-option
                            class="select-primary"
                            v-for="item in columnSearched"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <div class="col-8 pl-1">
                        <base-input v-model="searchData"
                                    append-icon="fas fa-search"
                                    placeholder="Search...">
                        </base-input>
                      </div>
                    </div>
                  </div>
                </div>
                <el-table :data="item"
                          row-key="id"
                          header-row-class-name="thead-light"
                          class="table-responsive table-flush"
                          @sort-change="sortChange">
                  <el-table-column label="No."
                                  min-width="100px"
                                  sortable
                                  prop="id">
                    <template v-slot="{row}">
                        {{ item.indexOf(row) + meta.from }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Nama MAXI"
                                min-width="200px"
                                prop="nama"
                                sortable="custom">
                    <template v-slot="{row}">
                      <router-link :to="{ name: 'details_maxipendaftaran', params: { id: row.id }}">{{row.attributes.nama}}</router-link>
                      <!-- <a v-bind:href="'/administrator/requests/'+ row.id +'/detail'">
                          {{row.name}}
                      </a> -->
                    </template>
                  </el-table-column>
                  <el-table-column label="Kategori Produk"
                                min-width="200px"
                                prop="kategoriproduk">
                    <template v-slot="{row}">
                        {{ getIncluded('products', row.relationships.products.data[0], 'nama') ? getIncluded('products', row.relationships.products.data[0], 'nama') : '-' }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Kota"
                                min-width="150px"
                                prop="kota">
                    <template v-slot="{row}">
                        {{getIncludedCity('cities', row.relationships.village.data, 'nama') | capitalize}}
                    </template>
                  </el-table-column>
                  <el-table-column label="Status"
                                min-width="150px"
                                prop="status_id"
                                sortable="custom">
                    <template v-slot="{row}">
                        {{row.attributes.status_id == '13' ? 'Belum Disetujui' : "-"}}
                    </template>
                  </el-table-column>
                  <el-table-column label="Dibuat Pada"
                                min-width="160px"
                                prop="created-at"
                                sortable>
                    <template v-slot="{row}">
                            {{ row.attributes["created-at"] | convertDate}}
                    </template>
                  </el-table-column>
                  <el-table-column label="Status"
                                min-width="160px"
                                prop="status">
                    <template v-slot="{row}">
                      <el-dropdown trigger="click" class="dropdown">
                      <base-button class="like btn-link text-white" type="info" size="sm" icon>
                        <!-- <i class="text-white"></i> -->
                        Ubah Status
                      </base-button>
                          <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
                              <el-dropdown-item @click.native="handleCommand('disetujui', row)">Disetujui</el-dropdown-item>
                              <!-- <el-dropdown-item @click.native="handleCommand('tolak', row)">Tolak</el-dropdown-item> -->
                          </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="id" min-width="150px" label="Tugas">
                    <template v-slot="{row}">
                        <el-tooltip content="Edit" placement="top">
                          <base-button
                            @click.native="modalProcess(row)"
                            class="like btn-link text-white"
                            type="info"
                            size="sm"
                            icon
                          >
                            <i class="text-white fa fa-edit"></i>
                            Edit
                          </base-button>
                        </el-tooltip>
                    </template>
                  </el-table-column> -->
                </el-table>
              </div>
              <div slot="footer" class="pr-5 pl-5 pb-3 pt-3 col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div class="">
                  <p class="card-category">
                    Showing {{ meta.from }} to {{ meta.to }} of {{ meta.total }} entries
                    <span v-if="selectedRows.length">
                      &nbsp; &nbsp; {{selectedRows.length}} rows selected
                    </span>
                  </p>
                </div>
                <base-pagination
                  class="pagination-no-border"
                  :pageCount="meta.last_page"
                  :total="meta.total"
                  v-model="meta.current_page"
                >
                </base-pagination>
              </div>
            </div>
          </transition>
        </card>
      </div>
    </div>
    <modal :show.sync="showModal" :clickToClose="false">
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
      </div>
    <!-- </center> -->
    </modal>
    <el-form>
      <el-dialog :visible.sync="showModalExport" width="30%" title="Export Data">
        <div class="form-group">
          <div class="row">
            <label for="" class="col-md-12">Choose Date</label>
          </div>
          <div class="row">
            <div class="col-md-8">
              <date-range-picker
                v-model="datePickerExport"
                ref="picker"
                :locale-data="locale"
                :opens="opensExport">
              </date-range-picker>
            </div>
            <div class="col-md-2">
              <el-button @click="dateRangeExportClear" class="text-left">Clear Date</el-button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <label for="" class="col-md-12">Export Action</label>
          </div>
          <div class="row">
            <div class="col-md-6 text-center">
              <el-button type="primary" :disabled="datePickerExport == ''" :loading="loadingExport" @click="processExport">Process Export</el-button>
            </div>
            <div class="col-md-6 text-center">
              <el-button type="success" :disabled="!wasExportDataBefore" @click="downloadExcel">Download Excel</el-button>
            </div>
          </div>
          <div class="row pt-4 pb-0">
            <p class="col-md-12 text-center">{{ keterangan }}</p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="secondary" @click="showModalExport = false">Tutup</el-button>
            <!-- <el-button type="success" @click="simpanFoto">Simpan</el-button> -->
        </span>
      </el-dialog>
    </el-form>
    <modal :show.sync="showModalLoading">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
      <br/>
      <!-- <center> -->
        <half-circle-spinner
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
      />
      </div>
    <!-- </center> -->
    </modal>
  </div>
</template>
<script>
import { Dialog, Button, Form, FormItem, Table, TableColumn, Select, Option, DropdownMenu, DropdownItem, Dropdown } from 'element-ui';
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import { BasePagination } from '@/components';
// import clientPaginationMixin from './PaginatedTables/clientPaginationMixin'
import swal from 'sweetalert2';
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment';
import 'moment/locale/id';
import { HalfCircleSpinner } from 'epic-spinners'
// import _ from "lodash";

export default {
  // mixins: [clientPaginationMixin],
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    DateRangePicker,
    HalfCircleSpinner
  },
  data() {
    return {
      item: [],
      dataIncluded: [],
      columnSearched: [
        // { name: 'All', value: 'all' },
        { name: 'Nama MAXI', value: 'nama' },
        // { name: 'Kategori Produk', value: 'produk' },
        // { name: 'Kota', value: 'kota' },
        // { name: 'E-mail', value: 'email' },
        // { name: 'Dibuat pada', value: 'created_at' }
      ],
      currentColumnSearched: 'nama',
      selectedRows: [],
      startDate: moment().format('LL'),
      endDate:  moment().format('LL'),
      opens: "left",//which way the picker opens, default "center", can be "left"/"right"
      opensExport: "center",//which way the picker opens, default "center", can be "left"/"right"
      locale: {
          direction: 'ltr', //direction of text
          format: 'MMM DD, YYYY', //fomart of the dates displayed
          separator: ' - ', //separator between the two ranges
          applyLabel: 'Apply',
          cancelLabel: 'Cancel',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
          monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
          firstDay: 1, //ISO first day of week - see moment documenations for details
          showWeekNumbers: true //show week numbers on each row of the calendar
      },
      ranges: { //default value for ranges object (if you set this to false ranges will no be rendered)
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'This month': [moment().startOf('month'), moment().endOf('month')],
          'This year': [moment().startOf('year'), moment().endOf('year')],
          'Last week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
          'Last month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      },
      showModal: false,
      showModalExport: false,
      loadingExport: false,
      isModalProcess: false,
      currentRow: '',
      searchData: '',
      perPageCurrent: 10,
      perPageOptions: [5, 10, 25],
      datePicked: '',
      datePickerExport: '',
      meta: {
        current_page: 1,
        per_page: '',
        from: '',
        to: '',
        total: '',
        last_page: ''
      },
      isLoading: true,
      showModalLoading: false,
      isError: false,
      isShow: false,
      isFirst: true,
      wasExportDataBefore: false,
      columnClicked: {
        order: 'desc',
        property: 'created-at'
      },
      isHideDownloadBtn: true,
      interval: null,
      keterangan: "File excel belum tersedia di server",
      isDoneExport: true,
    };
  },
  computed: {
    ...mapGetters('maxi', ['maxis','included', 'sub_produk', 'sub_produk_included']),
  },  
  methods: {
    ...mapActions('maxi', [
      'getMaxis',
      'getMaxisQueried',
      'getSubProduk',
      'updateMaxi',
      'exportMaxiProcess',
      'getExportMaxiStatus',
      'getExportMaxiFile',
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
      if (window.localStorage.getItem('role') != "Super Admin" && window.localStorage.getItem('role') != "Tasya Area") {
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

      let data = {}
      data.include = "profiles.addresses,sub_products.produk,village.district.city,products"
      data.status= 13
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order
      
      let res = JSON.parse(JSON.stringify(await this.getMaxisQueried(data)));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.maxis))
        this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included

        this.assignMeta(res.meta.page)

        this.isShow = true
        this.isLoading = false
      } else {
        this.isError = true
        this.isLoading = false
      }
    },

    async assignData() {
      this.isLoading = true
      this.isShow = false

      let data = {}
      data.include = "profiles.addresses,sub_products.produk,village.district.city,products"
      data.status= 13
      data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = this.meta.current_page
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      let res = JSON.parse(JSON.stringify(await this.getMaxisQueried(data)));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.maxis))
        this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included
        
        this.assignMeta(res.meta.page)
        
        this.isShow = true
        this.isLoading = false
      } else {
        this.isError = true
        this.isLoading = false
        this.isShow = false
      }
    },

    assignMeta(metaPage) {
      this.meta.current_page = metaPage['current-page'];
      this.meta.per_page = metaPage['per-page'];
      this.meta.from = metaPage['from'];
      this.meta.to = metaPage['to'];
      this.meta.total = metaPage['total'];
      this.meta.last_page = metaPage['last-page'];
    },

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
    getIncludedCity(type, desa, attr) {
      if (!desa) {
        return ''
      } else {
        var village = this.dataIncluded.find(x => (x.id == desa.id && x.type == 'villages'))
        var district = this.dataIncluded.find(x => (x.id == village.relationships.district.data.id && x.type == 'districts'))
        var result = this.dataIncluded.find(x => (x.id == district.relationships.city.data.id && x.type == 'cities'))

        return result.attributes[attr]
      }
    },

    /**
     * ----------------------------------------
     * End of data handling
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Page handling
     * ----------------------------------------
     */

    // Everytime user click page on pagination, this method will called
    async changePage() {
      this.assignData()
    },

    /**
     * ----------------------------------------
     * End of page handling
     * ----------------------------------------
     */
    
    /**
     * ----------------------------------------
     * Date Range Picker handling
     * ----------------------------------------
     */

    // Date Range Picker method goes here when user clicked apply
    async dateRangePicked() {
      if (this.datePicked != '') {
        this.assignData()
      }
    },

    async dateRangeClear() {
      if(this.datePicked != '') {
        this.datePicked.startDate = null
        this.datePicked.endDate = null
        // call endpoint getalldata here
        this.assignData()
      }
    },

    async dateRangeExportClear() {
      if(this.datePickerExport != '') {
        this.datePickerExport = ''
        this.datePickerExport.startDate = null
        this.datePickerExport.endDate = null
        // call endpoint getalldata here
        // this.assignData()
      }
    },

    /**
     * ----------------------------------------
     * End of Date Range Picker handling
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Modal Handling here
     * ----------------------------------------
     */

    // Modal method when user click "Proses"
    modalProcess(row) {
      this.showModal = true
      this.currentRow = row
    },

    handleCommand(command, row) {
      row = JSON.parse(JSON.stringify(row))

      const that = this
      swal({
        title: 'Apakah anda yakin untuk mengubah status MAXI menjadi ' + command + '?',
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
          let payloadMaxi = JSON.parse(JSON.stringify(row))
          if (command == 'disetujui') payloadMaxi.attributes.status_id = 14
          // else if (command == 'tolak') payloadMaxi.attributes.status_id = 6

          delete payloadMaxi.relationships

          that.showModal = true
          
          const res = await that.updateMaxi(payloadMaxi);

          that.showModal = false

          if (res.name != 'Error') {
            swal.fire('Status telah terubah!', '', 'success')
            
            that.assignData()
          } else {
            that.showModal = false
            swal.fire('Status gagal diubah', '', 'error')
          }
        }
      });
    },

    process() {
      var that = this
      swal("Sukses", "Berhasil memproses data", "success")
      .then(function () {
        that.showModal = false
      }).catch(function (error ){
      })
    },

    /**
     * ----------------------------------------
     * End of modal handling
     * ----------------------------------------
     */
    
    /**
     * ----------------------------------------
     * Searching Data from here
     * ----------------------------------------
     */

    // AXIOS here to consume datas
    async searchDatas() { 
      let data = {}
      if(this.searchData != "") {
        if(this.currentColumnSearched == 'all') {
          data.searchAll = this.searchData
        } else {
          data.searchAll = ""
          data.searchColumn = {
            column: this.currentColumnSearched,
            searchData: this.searchData,
          }
        }
      } else {
        data.searchAll = this.searchData
      }
      data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""
      data.pageSize = this.perPageCurrent
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order
      data.include = "profiles.addresses,sub_products.produk,village.district.city,products"
      data.status= 13

      this.isShow = false
      this.isLoading = true

      let res = JSON.parse(JSON.stringify(await this.getMaxisQueried(data)));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.maxis))
        this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included
        
        this.assignMeta(res.meta.page)
        
        this.isShow = true
        this.isLoading = false
      } else {
        this.isError = true
        this.isLoading = false
        this.isShow = false
      }

    },

    searchByColumn() {
      if (this.searchData != '') this.searchDatas()
    },

    /**
     * ----------------------------------------
     * End of searching here
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Sorting data here
     * ----------------------------------------
     */

    // Method when sort clicked
    sortChange(sortProps){
      this.headerClick(sortProps.column,event) //optional: trigger header-click event
    },

    headerClick(column, event){
      let col = JSON.parse(JSON.stringify(column))
      if (col != null) {
        col.property = col.property == 'no' ? 'id' : col.property
        col.order = col.order == 'descending' ? 'desc' : 'asc'

        this.columnClicked = col

        this.getDataColumnClicked();
      } else {
        col = {}
        col.property = 'created-at'
        col.order = 'desc'

        this.columnClicked = col
        this.getDataColumnClicked();
      }
    },

    async getDataColumnClicked() { 
      this.assignData()
    },

    /**
     * ----------------------------------------
     * End of sorting data here
     * ----------------------------------------
     */

    // Download Excel method
    async downloadExcel() {
      this.showModalExport = false
      this.showModalLoading = true
      
      let res = await this.getExportMaxiFile()
      if (res.name != 'Error') {
        this.showModalLoading = false
        swal.fire('Download excel berhasil', 'Silahkan cek bagian download pada browser anda', 'success')
      } else {
        this.showModalLoading = false
        swal.fire('Download excel gagal', '', 'error')
      }
    },

    async processExport() {
      this.loadingExport = true
      this.isDoneExport = false
      this.wasExportDataBefore = false

      this.keterangan = "Sedang memproses export excel"

      let payload = {}
      payload.from = moment(this.datePickerExport.startDate).format('YYYY-MM-DD')
      payload.to = moment(this.datePickerExport.endDate).format('YYYY-MM-DD')

      const resCode = this.exportMaxiProcess(payload)
      resCode.then(function (result) {
        if (result.response.status == 500) {
          that.isDoneExport = true
          that.isDoneExport = false
          that.loadingExport = false
          that.keterangan = "Export gagal, silahkan coba kembali"
        }
      })
      
      this.interval = setInterval(async function () {
        let res = await this.getExportMaxiStatus()
        if (res.data.attributes.is_done == 1) {
          this.isDoneExport = true
          this.loadingExport = false
        }
      }.bind(this), 5000)
    },
  },
  
  // Watch Method(s) called when value on data (above) changed.
  watch: {
    searchData: function () {
      this.debouncedGetData()
    },
    perPageCurrent: function () {
      this.searchDatas()
    },
    datePicked: function () {
      this.dateRangePicked()
    },
    'meta.current_page': function () {
      this.changePage()
    },
    currentColumnSearched: function() {
      this.searchByColumn();
    },
    'isDoneExport': async function() {
      if (this.isDoneExport) {
        clearInterval(this.interval);
        this.wasExportDataBefore = true

        let res = await this.getExportMaxiStatus()
        this.keterangan = `File excel tersedia dengan format export dari ${moment(res.data.attributes.register_from).format('Do MMMM YYYY')} - ${moment(res.data.attributes.register_to).format('Do MMMM YYYY')}`
      }
    }
  },
  async mounted() {
    let res = await this.getExportMaxiStatus()
    if (res.data.attributes.is_done == 1) {
      this.wasExportDataBefore = true
      this.keterangan = `File excel tersedia dengan format export dari ${moment(res.data.attributes.register_from).format('Do MMMM YYYY')} - ${moment(res.data.attributes.register_to).format('Do MMMM YYYY')}`
    } else if (res.data.attributes.is_done == 2) {
      this.loadingExport = true
      this.isDoneExport = false
      this.wasExportDataBefore = false

      this.keterangan = "Sedang memproses export excel"

      this.interval = setInterval(async function () {
        let res = await this.getExportMaxiStatus()
        if (res.data.attributes.is_done == 1) {
          this.isDoneExport = true
          this.loadingExport = false
        }
      }.bind(this), 5000)
    }
  },

  async created () {
    await this.permissionAuth()
    this.getData()
    this.debouncedGetData = _.debounce(this.searchDatas, 3000)
  },

  filters: {
    convertDate(date) {
      return moment(date).format('LLLL');
    },
    capitalize(value) {
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
  beforeDestroy: function(){
    clearInterval(this.interval);
  }
};
</script>
<style>
  .no-border-card .card-footer{
    border-top: 0;
  }
  .el-table .cell {
    word-break: break-word;
  }
</style>
