<template>
  <div>
    <base-header type>
      <div class="row align-items-center py-4">
        <div class="col-lg-12">
          <h6 class="h2 d-inline-block mb-0">
            Inform AXI - Gathering Info
          </h6>
        </div>
      </div>
    </base-header>

    <base-header class="pb-6" type>
      <div class="row align-items-center pb-4">
        <div class="col-lg-6">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard">
                  <i class="fas fa-home" /> Administrator
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Inform AXI
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Gathering Info
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 pt-2">
          <div class="d-flex justify-content-end">
            <el-button type="primary" @click="modals.upload = true" v-if="isShow">Update File  <i class="fa fa-upload"></i></el-button>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="card">
        <div class="card-body pr-0 pl-0">
          <transition name="fade" mode="out-in">
          <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 30px !important; justify-content: center;">
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
                <h1 class="text-center">Error, silahkan coba lagi.</h1>
            <!-- </center> -->
              </div>
          </div>
          <div key="2" v-if="isShow">
            <div>
              <div class="row-12 d-flex justify-content-center justify-content-sm-between flex-wrap pb-4">
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
                  <!-- <div class="row">
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
                  </div> -->
                </div>
              </div>
              <el-table :data="item"
                        header-row-class-name="thead-light"
                        class="table-responsive table-flush"
                        @sort-change="sortChange">
                <!-- <el-table-column
                  v-for="column in tableColumns"
                  :key="column.label"
                  v-bind="column"
                >
                </el-table-column> -->
                <el-table-column label="No."
                                min-width="75px"
                                sortable="custom"
                                prop="no">
                  <template v-slot="{row}">
                      {{ item.indexOf(row) + meta.from }}
                  </template>
                </el-table-column>
                <el-table-column label="Cabang"
                                min-width="150px"
                                prop="cabang_id"
                                sortable="custom">
                  <template v-slot="{row}">
                    {{ row.nama_cabang }}
                  </template>
                </el-table-column>
                <el-table-column label="Area"
                                min-width="150px"
                                prop="area">
                  <template v-slot="{row}">
                    {{ row.nama_area }}
                  </template>
                </el-table-column>
                <el-table-column label="Diperbarui Pada"
                                min-width="150px"
                                prop="updated_at"
                                sortable="custom">
                  <template v-slot="{row}">
                    {{ row.updated_at | convertDate }}
                  </template>
                </el-table-column>
                <el-table-column prop="id" min-width="125px" label="Aksi">
                  <template v-slot="{row}" class="d-flex">
                    <a :href="row.url" target="blank"><base-button size="sm" class="mt-2" type="info">
                      Lihat File
                    </base-button></a>
                  </template>
                </el-table-column>
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
              <!-- <base-pagination
                class="pagination-no-border"
                v-model="pagination.currentPage"
                :per-page="pagination.perPage"
                :total="pagination.total"
              >
              </base-pagination> -->
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
        </div>
      </div>
    </div>

    <modal :show.sync="modals.upload">
      <template slot="header">
        <h5 class="modal-title">Update File</h5>
      </template>

      <div key="1" v-if="!isModalProcess">

        <div class="form-group custom-file-upload">
          <label for="file">
            <div
              class="d-flex justify-content-center align-items-center flex-column"
              v-if="upload_info.files.length === 0"
            >
              <div class="text-primary"><i class="fa fa-upload" /></div>
              <h3 class="text-primary">Browse File</h3>
              <p class="text-primary">(.pdf, Max 5MB)</p>
            </div>

            <div class="d-flex justify-content-center align-items-center" v-else>
              <p class="text-primary ml-2">
                {{ upload_info.files.length }} file dipilih
              </p>
            </div>
          </label>
          <input
            ref="imageInput"
            type="file"
            name=""
            id="file"
            multiple="multiple"
            class="form-control"
            @change="filesChange"
            accept=".pdf"
          />
        </div>

        <div class="row">
          <div class="col-12">
            <label class="form-control-label"> Area </label>
            <div class="has-label form-group">
              <el-select 
                v-model="areaValue"
                placeholder="Area yang dipilih"
                @change="onChangeArea">
                <el-option
                  v-for="item in optionsArea"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                  >
                </el-option>
              </el-select>
            </div>
            <p class="text-sm mt-2">
              Daftar cabang akan berdasarkan area yang dipilih
            </p>

            <h5>File yang dipilih</h5>

            <template v-for="(f, i) in upload_info.files">
              <div class="row pb-2" :key="i">
                <div class="col-1">
                  <i class="fa fa-file" />
                </div>
                <div class="col-6">
                  <span class="text-sm">{{ f.name }}</span>
                </div>
                <div class="col-4">
                  <el-select 
                    v-model="upload_info.cabang[i]"
                    placeholder="Pilih Cabang"
                    :disabled="areaValue == ''">
                    <el-option
                      v-for="item in optionsCabang"
                      :key="item.id"
                      :value="item.id"
                      :label="item.attributes.nama"
                      >
                    </el-option>
                  </el-select>
                </div>
                <!-- <div class="col-1">
                  <i class="fa fa-upload" />
                </div> -->
                <div class="col-1">
                  <a class="pointer" @click.prevent="
                    upload_info.files.splice(i, 1);
                    upload_info.cabang.splice(i, 1);
                  "><i class="fa fa-trash"/></a>
                </div>
              </div>
            </template>
          </div>
        </div>

      </div>
      <div key="2" v-if="isModalProcess" class="text-center p-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
        <!-- <center><fulfilling-bouncing-circle-spinner
          :animation-duration="2000"
          :size="60"
          color="#ff1d5e"
        /></center> -->
        <!-- <center> -->
          <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#ff1d5e"
          />
        <!-- </center> -->
      </div>
      <template slot="footer" v-if="!isModalProcess">
        <base-button
          @click="uploadFile"
          type="warning"
          block
          :disabled="upload_info.files.length === 0 || upload_info.cabang.length === 0"
        >
          <div
            class="spinner-border text-light"
            role="status"
            v-if="upload_info.loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <span v-else>Upload File</span>
        </base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { Dialog, Button, Form, FormItem, Table, TableColumn, Select, Option, DropdownMenu, DropdownItem, Dropdown } from 'element-ui';
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import Modal from '@/components/Modal.vue'
import { BasePagination } from '@/components';
import swal from 'sweetalert2';
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment';
import 'moment/locale/id';
import { HalfCircleSpinner, FulfillingBouncingCircleSpinner } from 'epic-spinners'
// import _ from "lodash";

export default {
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
    HalfCircleSpinner,
    FulfillingBouncingCircleSpinner
  },
  data() {
    return {
      item: [],
      dataIncluded: [],
      columnSearched: [
        { name: 'All', value: 'all' },
        { name: 'Nama AXI', value: 'nama' },
        { name: 'AXI ID', value: 'nomor_axi_id' },
        { name: 'AXI Mentor', value: 'axi_id_reff' },
        { name: 'E-mail', value: 'email' },
        // { name: 'Dibuat pada', value: 'created_at' }
      ],
      currentColumnSearched: 'all',
      selectedRows: [],
      startDate: moment().format('LL'),
      endDate:  moment().format('LL'),
      opens: "left",//which way the picker opens, default "center", can be "left"/"right"
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
      modals: {
        upload: false,
        close_modal: false
      },
      upload_info: {
        loading: false,
        files: [],
        cabang: []
      },
      showModal: false,
      showModalExport: false,
      isModalProcess: false,
      currentRow: '',
      searchData: '',
      perPageCurrent: 10,
      perPageOptions: [5, 10, 25],
      datePicked: '',
      datePickerExport: {
        startDate: '',
        endDate: ''
      },
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
        order: 'asc',
        property: 'id'
      },
      isHideDownloadBtn: true,
      interval: null,
      countInterval: 0,
      optionsArea:[],
      areaValue: '',
      arealist: [],

      optionsCabang:[],
    };
  },
  computed: {
    ...mapGetters('area', ['all_cabang','included', 'areas']),
    ...mapGetters('informaxi', ['informaxi_gathering']),
  },
  methods: {
    filesChange(ev) {
      Array.from(ev.target.files).forEach(file => {
        this.upload_info.files.push(file);
      })
      this.$refs.imageInput.value = null
    },
    UrlHealer(dirtyUrl) {
      return sanitizeUrl(dirtyUrl);
  },
    ...mapActions('informaxi', [
      'getInformaxiGathering',
      'updateInformaxiGathering',
    ]),
    ...mapActions('area', [
      'getAllCabangWithArea',
      'getAreas'
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

      let data = {}
      data.pageNumber = 1
      data.pageSize = this.perPageCurrent
      data.order = this.columnClicked.order
      data.property = this.columnClicked.property
      
      let res = JSON.parse(JSON.stringify(await this.getInformaxiGathering(data)));
      if (res.name != 'Error') {
        const that = this
        await this.getAllCabangWithArea()

        this.item = JSON.parse(JSON.stringify(this.informaxi_gathering))
        this.item.map((data) => {
          let tempCabang = that.all_cabang.find(x => x.id == data.cabang_id)
          that.$set(data, 'nama_cabang', tempCabang.attributes.nama)
          that.$set(data, 'nama_area', that.included.find(x => x.id == tempCabang.relationships.area.data.id).attributes.nama)
        })

        await this.getAreas()
        this.arealist = this.areas.map(item => {
          return { value: item.id, label: item.attributes.nama }
        })
        this.optionsArea = this.arealist
        
        this.assignMeta(res.meta)
        this.isShow = true
        this.isLoading = false
      } else {
        this.isError = true
        this.isLoading = false
      }
    },

    async assignData() {
      this.isShow = false
      this.isError = false
      this.isLoading = true

      let data = {}
      data.pageNumber = this.meta.current_page
      data.pageSize = this.perPageCurrent
      data.order = this.columnClicked.order
      data.property = this.columnClicked.property
      
      let res = JSON.parse(JSON.stringify(await this.getInformaxiGathering(data)))
      if (res.name != 'Error') {
        const that = this

        this.item = JSON.parse(JSON.stringify(this.informaxi_gathering))
        this.item.map((data) => {
          let tempCabang = that.all_cabang.find(x => x.id == data.cabang_id)
          that.$set(data, 'nama_cabang', tempCabang.attributes.nama)
          that.$set(data, 'nama_area', that.included.find(x => x.id == tempCabang.relationships.area.data.id).attributes.nama)
        })

        this.assignMeta(res.meta)
        
        this.isShow = true
        this.isLoading = false
      } else {
        this.isError = true
        this.isLoading = false
      }
    },

    assignMeta(metaPage) {
      this.meta.current_page = metaPage['current_page'];
      this.meta.per_page = metaPage['per_page'];
      this.meta.from = metaPage['from'];
      this.meta.to = metaPage['to'];
      this.meta.total = metaPage['total'];
      this.meta.last_page = metaPage['last_page'];
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

    async changePage() {
      await this.assignData()
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


    editModal(row) {
      this.showModal = true
      this.currentRow = JSON.parse(JSON.stringify(row))
      this.$set(this.currentRow.attributes, 'nama', this.getIncluded('profiles', row.relationships.profile.data, 'nama'));
      this.$set(this.currentRow.attributes, 'email', this.getIncluded('profiles', row.relationships.profile.data, 'email'));
    },

    async updateRow() {
      this.isModalProcess = true
      this.currentRow.attributes.profile_id = this.currentRow.relationships.profile.data.id
      this.currentRow.attributes.npwp_id = this.currentRow.relationships.npwp.data.id
      const res = JSON.parse(JSON.stringify(await this.updateAxi(this.currentRow)))

      this.showModal = false
      this.isModalProcess = false
      const that = this

      if (res.name != 'Error') {
        swal("Sukses", "Berhasil memproses data", "success")
        .then(function () {
          that.changePage()
        }).catch(function (error ){
        })
      } else {
        swal("Error", "Edit data gagal, mohon coba lagi", "error")
        .then(function () {
        }).catch(function (error ){
        })
      }
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

    /**
     * ----------------------------------------
     * End of searching data here
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Sorting data here
     * ----------------------------------------
     */

    sortChange(sortProps){
      this.headerClick(sortProps.column,event) //optional: trigger header-click event
    },

    async getDataColumnClicked() { 
      this.assignData()
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
        col.property = 'id'
        col.order = 'asc'

        this.columnClicked = col
        this.getDataColumnClicked();
      }
    },

    /**
     * ----------------------------------------
     * End of sorting data here
     * ----------------------------------------
     */

    // Download Excel method
    downloadExcel() {
      
    },
    async downloadRow(row) {
      this.showModalLoading = true
      let res = await this.exportAxi(row.id)
      if (res.name != 'Error') {
        this.showModalLoading = false
        swal.fire('Download excel berhasil', 'Silahkan cek bagian download pada browser anda', 'success')
      } else {
        this.showModalLoading = false
        swal.fire('Download excel gagal', '', 'error')
      }
    },
    processExport() {
      this.countInterval = 0
      this.interval = setInterval(function () {
        this.countInterval++
      }.bind(this), 1000)
    },
    onChangeArea() {
      this.upload_info.cabang = []
      this.optionsCabang = this.all_cabang.filter(x => x.relationships.area.data.id == this.areaValue)
    },
    async uploadFile() {
      this.isModalProcess= true

      let success = true
      for (let i = 0; i < this.upload_info.files.length; i++) {
        let payload = {
          url: this.upload_info.files[i],
          cabang_id: this.upload_info.cabang[i]
        }

        let res = await this.updateInformaxiGathering(payload)
        if (res.name == "Error") {
          success = false
          this.modals.upload = false

          const that = this

          swal("Gagal", res.response.status == 413 ? "Gagal mengganti halaman, ukuran file teralu besar. (maks 5MB)" : "Gagal mengganti data", "error")
          .then(function () {
            that.modals.upload = true
            that.isModalProcess = false
            // that.getData()
          })
        }
      }

      if (success) {
        this.modals.upload = false
        this.isModalProcess= false
        
        const that = this

        swal("Sukses", "Berhasil mengganti data", "success")
        .then(function () {
          that.getData()
          that.upload_info.files = []
          that.upload_info.cabang = []
        })
      }
    }
  },
  
  // Watch Method(s) called when value on data (above) changed.
  watch: {
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
    'countInterval': function() {
      if (this.countInterval == 5) {
        clearInterval(this.interval);
      }
    }
  },
  
  // Created called when Vue Instance created
  async created() {
    await this.permissionAuth()
    this.getData()
  },
  
  // Called when Vue Instance created
  filters: {
    convertDate(date) {
      return moment(date).format('LLLL');
    },
  },
  mounted() {
     
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

