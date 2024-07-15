<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Data Calon Nasabah</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Calon Nasabah</li>
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
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
        <!-- <template slot="header">
          <h3 class="mb-0">Paginated tables</h3>
          <p class="text-sm mb-0">
            This is a client side example of paginated tables using element-ui tables.
          </p>
        </template> -->
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
            <!-- <center> -->
              <div style="display: flex; margin-top: 20px !important; justify-content: center;">
              <h1 class="text-center">Error, silahkan coba lagi.</h1>
            <!-- </center> -->
              </div>
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
                                min-width="100px"
                                sortable="custom"
                                prop="no">
                  <template v-slot="{row}">
                      {{ item.indexOf(row) + meta.from }}
                  </template>
                </el-table-column>
                <el-table-column label="Nama Nasabah"
                                min-width="200px"
                                prop="nama"
                                sortable="custom">
                  <template v-slot="{row}">
                    <!-- <router-link :to="{ name: 'details axi', params: { id: row.id }}">{{row.name}}</router-link> -->
                    <!-- <a v-bind:href="'/administrator/requests/'+ row.id +'/detail'"> -->
                      <!-- <router-link :to="{ name: 'details axi', params: { id: row.id }}"> -->
                        <!-- {{row.attributes.nama}} -->
                        {{ row.attributes.nama }}
                      <!-- </router-link> -->
                    <!-- </a> -->
                  </template>
                </el-table-column>
                <el-table-column label="Email"
                                min-width="220px"
                                prop="email"
                                sortable="custom">
                  <template v-slot="{row}">
                      {{ row.attributes.email }}
                  </template>
                </el-table-column>
                <el-table-column label="No HP"
                                min-width="200px"
                                prop="no_hp"
                                sortable="custom">
                  <template v-slot="{row}">
                      {{ row.attributes.no_hp }}
                      <!-- {{ getIncluded('detailAxi', row.relationships.detailAxi.data[0], 'axi_id_reff') }} -->
                  </template>
                </el-table-column>
                <el-table-column label="Status"
                                min-width="200px"
                                prop="profile.email">
                  <template v-slot="{row}">
                      {{ row.relationships.user.data ? getIncluded('users', row.relationships.user.data, 'email_verified_at') ? "Verified" : "Unverified" : "-" }}
                  </template>
                </el-table-column>
                <el-table-column label="Dibuat Pada"
                                min-width="180px"
                                prop="created_at"
                                sortable="custom">
                  <template v-slot="{row}">
                    {{ row.attributes["created-at"] | convertDate }}
                  </template>
                </el-table-column>
                <el-table-column prop="id" min-width="150px" label="Aksi">
                  <template v-slot="{row}">
                    <base-button
                      @click.native="editModal(row)"
                      class="like btn-link text-white"
                      type="info"
                      size="sm"
                      icon>
                      <i class="text-white fa fa-edit"></i> Edit
                    </base-button>
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
      </card>
    </div>
    <ValidationObserver v-slot="{invalid}" ref="editForm">
      <el-form @submit.prevent="editData">
        <el-dialog :visible.sync="showModal" title="Edit Data Kategori">
          <div key="1" v-if="!isModalProcess">
            <div class="form-group" v-if="currentRow.attributes">
              <div class="row mb-4">
                <label for="nama" class="col-md-4 col-form-label form-control-label">Nama User</label>
                <div class="col-md-8">
                  <el-input v-model="currentRow.attributes.nama" />
                </div>
              </div>
              <div class="row mb-4">
                <label for="email" class="col-md-4 col-form-label form-control-label">Email</label>
                <div class="col-md-8">
                  <ValidationProvider 
                    name="E-mail" 
                    :rules="{
                      required: true,
                      regex: /^[\w\.-]+@([\w\-]+\.)+[\w]{2,4}$/
                    }"
                    v-slot="{ errors }">
                    <el-input v-model="currentRow.attributes.email" />
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="no_hp" class="col-md-4 col-form-label form-control-label">No. HP</label>
                <div class="col-md-8">
                  <ValidationProvider 
                    name="Nomor HP" 
                    :rules="{
                      required: true,
                      numeric: true,
                      min: 9,
                      max: 16,
                      regex: /^62[0-9]+$/
                    }"
                    v-slot="{ errors }">
                    <el-input v-model="currentRow.attributes.no_hp" />
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
          <div key="2" v-if="isModalProcess" class="text-center p-5" style="display: flex; justify-content: center;">
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
          <!-- </transition> -->
          <template slot="footer" v-if="!isModalProcess">
            <el-button type="secondary" @click="showModal = false">Tutup</el-button>
            <el-button type="success" @click="editData" :disabled="invalid">Edit</el-button>
          </template>
        </el-dialog>
      </el-form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import id from 'vee-validate/dist/locale/id.json'
import * as Rules from 'vee-validate/dist/rules'
import { Table, TableColumn, Select, Option, DropdownMenu, DropdownItem, Dropdown, Form, FormItem, Input, Dialog, Button } from 'element-ui';
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import { BasePagination } from '@/components';
// import clientPaginationMixin from './PaginatedTables/clientPaginationMixin'
import swal from 'sweetalert2';
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment';
import 'moment/locale/id';
import { HalfCircleSpinner, FulfillingBouncingCircleSpinner } from 'epic-spinners'
// import _ from "lodash";

for (var rule in Rules) {
  extend(rule, Rules[rule])
}

localize('id', id)
localize({
  id: {
    fields: {
      'Nomor HP': {
        regex: "Format Nomor HP salah. Contoh: (6281234567890)"
      }
    }
  }
})

export default {
  // mixins: [clientPaginationMixin],
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Input.name]: Input,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    DateRangePicker,
    HalfCircleSpinner,
    ValidationObserver,
    ValidationProvider,
    FulfillingBouncingCircleSpinner
  },
  data() {
    return {
      item: [],
      dataIncluded: [],
      columnSearched: [
        // { name: 'All', value: 'all' },
        { name: 'Nama Nasabah', value: 'nama' },
        { name: 'Email', value: 'email' },
        { name: 'No. HP', value: 'no_hp' },
        // { name: 'E-mail', value: 'email' },
        // { name: 'Dibuat pada', value: 'created_at' }
      ],
      currentColumnSearched: 'nama',
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
      showModal: false,
      isModalProcess: false,
      currentRow: '',
      searchData: '',
      perPageCurrent: 10,
      perPageOptions: [5, 10, 25],
      datePicked: '',
      meta: {
        current_page: 1,
        per_page: '',
        from: '',
        to: '',
        total: '',
        last_page: ''
      },
      isLoading: true,
      isError: false,
      isShow: false,
      isFirst: true,
      columnClicked: {
        order: 'desc',
        property: 'created-at'
      },
      isHideDownloadBtn: true
    };
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
    }
  },
  // Created called when Vue Instance created
  methods: {
    ...mapActions('nasabah', [
      'getNasabahs',
      // 'getAxisQueried',
      // 'getAxisQueriedSingleService',
      // 'updateAxi',
    ]),
    ...mapActions('auth', [
      'checkAuth',
      'refreshToken',
    ]),
    ...mapActions('axi', [
      'updateProfile',
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

    assignMeta(metaPage) {
      this.meta.current_page = metaPage['current-page'];
      this.meta.per_page = metaPage['per-page'];
      this.meta.from = metaPage['from'];
      this.meta.to = metaPage['to'];
      this.meta.total = metaPage['total'];
      this.meta.last_page = metaPage['last-page'];
    },

    async assignData() {
      this.isShow = false
      this.isError = false
      this.isLoading = true

      let data = {}
      data.include = "user"
      data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = this.meta.current_page
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      let res = await this.getNasabahs(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.nasabahs))
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

    async getData() {
      this.isLoading = true
      this.isShow = false

      let data = {}
      data.include = "user"
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order
      
      let res = JSON.parse(JSON.stringify(await this.getNasabahs(data)));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.nasabahs))
        this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included
        
        this.assignMeta(res.meta.page)
        
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

    // Everytime user click page on pagination, this method will called
    async changePage() {
      await this.assignData()
    },

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
      data.include = "user"
      data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""
      data.pageSize = this.perPageCurrent
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      this.isShow = false
      this.isLoading = true

      let res = await this.getNasabahs(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.nasabahs))
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

    async getDataColumnClicked() { 
      this.assignData()
    },

    async dateRangeClear() {
      if(this.datePicked != '') {
        this.datePicked.startDate = null
        this.datePicked.endDate = null
        // call endpoint getalldata here
        this.assignData()
      }
    },

    // Date Range Picker method goes here when user clicked apply
    async dateRangePicked() {
      if (this.datePicked != '') {
        this.assignData()
      }
    },

    handleCommand(command) {
      if (command == 'edit') {
      } else {
        alert("Download Button Clicked")
      }
    },

    editModal(row) {
      this.showModal = true
      this.currentRow = JSON.parse(JSON.stringify(row))

    },

    async editData() {
      const valid = await this.$refs.editForm.validate()

      if (valid) {
        this.isModalProcess= true

        // --- delete tidak perlu
        // Profile
        delete this.currentRow.relationships

        try {
          await Promise.all([
            this.updateProfile(this.currentRow),
          ])
        } catch (error) {
          this.showModal = false
          this.isModalProcess= false

          swal("Gagal", "Gagal mengganti data", "error")
          .then(function () {
            // that.getData()
          })
        } finally {
          this.showModal = false
          this.isModalProcess= false
          
          const that = this

          swal("Sukses", "Berhasil mengganti data", "success")
          .then(function () {
            that.getData()
          })
        }
      }      
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
          // that.showModal = false
        }).catch(function (error ){
        })
      } else {
        swal("Error", "Edit data gagal, mohon coba lagi", "error")
        .then(function () {
        }).catch(function (error ){
        })
      }
    },

    // Download Excel method
    downloadExcel() {
    },

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
        col.property = 'id'
        col.order = 'asc'

        this.columnClicked = col
        this.getDataColumnClicked();
      }
    },
    searchByColumn() {
      if (this.searchData != '') this.searchDatas()
    }
  },
  async created() {
    await this.permissionAuth()
    this.getData()
    this.debouncedGetData = _.debounce(this.searchDatas, 3000)
  },
  filters: {
    convertDate(date) {
      return moment(date).format('LLLL');
    },
  },
  computed: {
    ...mapGetters('nasabah', ['nasabahs','included']),
  },
  // Watch Method(s) called when value on data (above) changed.
};
</script>
<style>
  .no-border-card .card-footer{
    border-top: 0;
  }
  .el-table .cell {
    word-break: break-word;
  }
  span .error {
    color: red;
  }
</style>
