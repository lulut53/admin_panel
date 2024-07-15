<template>
    <div>
        <base-header class="pb-6" type="">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Popup</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                  <ol class="breadcrumb breadcrumb-links">
                    <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
                    <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Inbox - Popup</li>
                  </ol>
              </nav>
            </div>
            <!-- <div class="col-lg-6 pt-2 text-right">
              <router-link :to="{ name: 'newpopup', params: {  }}" class="btn btn-xl btn-success">
                <i class="fas fa-plus"></i>
                <span>New Popup</span>
              </router-link>
            </div> -->
          </div>
        </base-header>
        <div class="container-fluid mt--6">
          <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
            <!-- <template slot="header">
              <h3 class="mb-0">Paginated tables</h3>
              <p class="text-sm mb-0">
                This is a client side example of paginated tables using element-ui tables.
              </p>
            </template> -->
            <transition name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content:center;">
                <br>
                <!-- <center> -->
                  <half-circle-spinner
                  :animation-duration="1000"
                  :size="60"
                  color="#ff1d5e"
                />
              <!-- </center> -->
              </div>
              <div key="2" v-if="isError" class="text-center p-5" style="display: flex; justify-content: center;">
                <!-- <center> -->
                  <img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive">
                <!-- </center> -->
                <br>
                <!-- <center> -->
                  <h1>Error, silahkan coba lagi.</h1>
                <!-- </center> -->
              </div>
              <div key="2" v-if="isShow">
                <div>
                  <!-- <div class="row-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
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
                  </div> -->
                  <el-table :data="item"
                            header-row-class-name="thead-light"
                            class="table-responsive table-flush">
                    <!-- <el-table-column
                      v-for="column in tableColumns"
                      :key="column.label"
                      v-bind="column"
                    >
                    </el-table-column> -->
                    <el-table-column label="No."
                                    min-width="100px"
                                    prop="no"
                                    sortable>
                      <template v-slot="{row}">
                          {{ item.indexOf(row) + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Role"
                                    min-width="125px"
                                    prop="role"
                                    sortable>
                      <template v-slot="{row}">
                          {{ row.attributes.role }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Banner"
                                    min-width="250px"
                                    prop="message"
                                    sortable>
                      <template v-slot="{row}">
                          <img v-bind:src="row.attributes.image" alt="" height="200" class="img-fluid">
                      </template>
                    </el-table-column>
                    <el-table-column label="Link"
                                    min-width="200px"
                                    prop="url"
                                    sortable>
                      <template v-slot="{row}">
                        <a :href="row.attributes.url" target="blank">
                          {{ row.attributes.url }}
                        </a>
                      </template>
                    </el-table-column>
                    <el-table-column label="Status"
                                    min-width="200px"
                                    prop="status_id"
                                    sortable>
                      <template v-slot="{row}">
                          {{ row.attributes.status_id == 25 ? 'Aktif' : 'Tidak Aktif' }}
                      </template>
                    </el-table-column>
                    <!-- <el-table-column label="Received"
                                    min-width="200px"
                                    prop="received"
                                    sortable="custom">
                      <template v-slot="{row}">
                          {{ row.attributes.received }}
                      </template>
                    </el-table-column> -->
                    <!-- <el-table-column label="Dibuat Pada"
                                    min-width="180px"
                                    prop="created_at"
                                    sortable="custom">
                      <template v-slot="{row}">
                        {{ row.attributes["created-at"] | convertDate }}
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="id" min-width="150px" label="Aksi">
                      <template v-slot="{row}" class="d-flex">
                        <base-button
                              @click.native="editModal(row)"
                              class="like btn-link text-white"
                              type="info"
                              size="md"
                              icon>
                              <i class="text-white fa fa-edit"></i> Edit
                            </base-button>
                          <!-- <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
                          <span class="btn btn-sm btn-icon-only">
                            <i class="fa fa-ellipsis-h"></i>
                          </span>
                              <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
                                  <el-dropdown-item @click.native="editModal(row)" command="edit">Edit</el-dropdown-item>
                                  <el-dropdown-item command="download">Download</el-dropdown-item>
                              </el-dropdown-menu>
                          </el-dropdown> -->
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!-- <div slot="footer" class="pr-5 pl-5 pb-3 pt-3 col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
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
                </div> -->
              </div>
            </transition>
          </card>
        </div>
      <el-form @submit.prevent="editData">
        <el-dialog :visible.sync="showModalEdit" title="Edit Popup">
          <div key="1" v-if="!isModalProcess">
            <div class="form-group" v-if="currentRow.id">
              <div class="row mb-4">
                <label for="link" class="col-md-4 col-form-label form-control-label">Link</label>
                <div class="col-md-8">
                  <el-input v-model="currentRow.attributes.url" />
                </div>
              </div>
              <div class="row mb-4">
                <label for="link" class="col-md-4 col-form-label form-control-label">Role</label>
                <div class="col-md-8">
                  <el-select
                    v-model="currentRow.attributes.role"
                    placeholder="Status"
                    disabled
                  >
                    <el-option
                      class="select-primary"
                      v-for="item in rolelist"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                  <!-- <el-input v-model="currentRow.attributes.role" /> -->
                </div>
              </div>
              <div class="row mb-4">
                <label for="link" class="col-md-4 col-form-label form-control-label">Status</label>
                <div class="col-md-8">
                  <el-select
                    v-model="currentRow.attributes.status_id"
                    placeholder="Status"
                  >
                    <el-option
                      class="select-primary"
                      v-for="item in statuslist"
                      :key="item.id"
                      :label="item.nama"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <!-- <el-input v-model="currentRow.attributes.status_id" /> -->
                </div>
              </div>
              <div class="row">
                <label class="col-md-4 col-form-label form-control-label">Gambar</label>
                <div class="col-md-8">
                  <file-input @change="imagePhotoChange" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"/>
                </div>
              </div>
              <div class="row">
                <label class="col-md-4 col-form-label form-control-label"></label>
                <div class="col-md-8 mt-2 mb-4">
                  <img :src="imagePreview" v-if="imagePreview" width="200px" alt="">
                </div>
              </div>
            </div>
          </div>
          <div key="2" v-if="isModalProcess" class="text-center p-5" style="display: flex; justify-content:center;">
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
            <el-button type="secondary" @click="showModalEdit = false">Tutup</el-button>
            <el-button type="success" @click="editData">Edit</el-button>
          </template>
        </el-dialog>
      </el-form>
    </div>
</template>

<script>
import { Table, TableColumn, Select, Option, Form, FormItem, Input, Dialog, Button, DropdownMenu, DropdownItem, Dropdown } from 'element-ui';
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import { BasePagination } from '@/components';
import swal from 'sweetalert2';
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment';
import 'moment/locale/id';
import { HalfCircleSpinner, FulfillingBouncingCircleSpinner } from 'epic-spinners'
var sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl;

export default {
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Input.name]: Input,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    DateRangePicker,
    HalfCircleSpinner,
  },
  data() {
    return {
      item: [],
      dataIncluded: [],
      columnSearched: [
        // { name: 'All', value: 'all' },
        { name: 'Role', value: 'role' },
        { name: 'Link', value: 'link' },
        // { name: 'Dibuat pada', value: 'created_at' }
      ],
      currentColumnSearched: 'role',
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
      showModalEdit: false,
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
        order: 'asc',
        property: 'id'
      },
      isHideDownloadBtn: true,
      rolelist: ['axi', 'nasabah', 'sh', 'cro'],
      statuslist: [
        {
          id: 25,
          nama: 'active',
        },
        {
          id: 26,
          nama: 'unactive',
        }
      ],
      imagePreview: null,
    };
  },
  computed: {
    ...mapGetters('notifikasi', ['popupNotifs']),
  },
  methods: {
    
    UrlHealer(dirtyUrl) {
      return sanitizeUrl(dirtyUrl);
  },
    ...mapActions('notifikasi', [
      'getPopupNotifs',
      'updatePopup'
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

      let res = JSON.parse(JSON.stringify(await this.getPopupNotifs()));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.popupNotifs))
        
        // this.assignMeta(res.meta)
        
        this.isShow = true
        this.isLoading = false
      } else {
        this.isError = true
        this.isLoading = false
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

    imagePhotoChange(files) {
      this.currentRow.attributes.image = files[0]
      this.imagePreview = URL.createObjectURL(files[0]);
    },


    editModal(row) {
      this.showModalEdit = true
      this.currentRow = JSON.parse(JSON.stringify(row))
    },

    async editData() {
      this.isModalProcess = true
      
      if (this.item.find(x => x.id == this.currentRow.id).attributes.image == this.currentRow.attributes.image) {
        this.currentRow.attributes.image = null
      }

      let res = await this.updatePopup(this.currentRow)

      this.showModalEdit = false
      this.isModalProcess = false
      const that = this

      if (res.name != 'Error') {
        swal("Sukses", "Berhasil memproses data", "success")
        .then(function () {
          that.getData()
        }).catch(function (error ){
        })
      } else {
        swal("Error", res.response.status == 413 ? "Edit data gagal, ukuran file teralu besar. (maks 5MB)" : "Edit data gagal, mohon coba lagi", "error")
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
    async searchDatas() { 

      // let data = {}
      // if(this.searchData != "") {
      //   if(this.currentColumnSearched == 'all') {
      //     data.searchAll = this.searchData
      //   } else {
      //     data.searchAll = ""
      //     data.searchColumn = {
      //       column: this.currentColumnSearched,
      //       searchData: this.searchData,
      //     }
      //   }
      // } else {
      //   data.searchAll = this.searchData
      // }
      // data.status = 5
      // data.include = "profile"
      // data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      // data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""
      // data.pageSize = this.perPageCurrent
      // data.pageNumber = 1
      // data.property = this.columnClicked.property
      // data.order = this.columnClicked.order

      this.isShow = false
      this.isLoading = true

      let res = JSON.parse(JSON.stringify(await this.getPopupNotifs()));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.popupNotifs))
        
        this.assignMeta(res.meta)
        
        this.isShow = true
        this.isLoading = false
      } else {
        this.isError = true
        this.isLoading = false
      }
    },
    
    searchByColumn() {
      if (this.searchData != '') this.searchDatas()
    },

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
  created () {
    this.permissionAuth()
    this.getData()
    this.debouncedGetData = _.debounce(this.searchDatas, 3000)
  },
  
  // Called when Vue Instance created
  filters: {
    convertDate(date) {
      return moment(date).format('LLLL');
    },
  },
}
</script>
<style>
  .no-border-card .card-footer{
    border-top: 0;
  }
  .el-table .cell {
    word-break: break-word;
  }
</style>