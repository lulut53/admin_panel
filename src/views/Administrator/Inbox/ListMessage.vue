<template>
    <div>
        <base-header class="pb-6" type="">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Message</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                  <ol class="breadcrumb breadcrumb-links">
                    <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
                    <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Inbox - Message</li>
                  </ol>
              </nav>
            </div>
            <div class="col-lg-6 pt-2 text-right">
              <router-link :to="{ name: 'newmessage', params: {  }}" class="btn btn-xl btn-success">
                <i class="fas fa-plus"></i>
                <span>New Message</span>
              </router-link>
            </div>
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
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content: center;">
                <br>
                <half-circle-spinner
                  :animation-duration="1000"
                  :size="60"
                  color="#ff1d5e"
                />
              </div>
              <div key="2" v-if="isError" class="text-center p-5">
                <img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive">
                <br>
                <div style="display: flex; margin-top: 20px !important; justify-content: center;">
                <h1>Error, silahkan coba lagi.</h1>
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
                    <el-table-column label="Judul"
                                    min-width="200px"
                                    prop="title"
                                    sortable="custom">
                      <template v-slot="{row}">
                        <!-- <router-link :to="{ name: 'details axi', params: { id: row.id }}">{{row.name}}</router-link> -->
                        <!-- <a v-bind:href="'/administrator/requests/'+ row.id +'/detail'"> -->
                          <router-link :to="{ name: 'details axi', params: { id: row.id }}">
                            <!-- {{row.attributes.nama}} -->
                            {{ row.attributes.title }}
                          </router-link>
                        <!-- </a> -->
                      </template>
                    </el-table-column>
                    <el-table-column label="Pesan"
                                    min-width="220px"
                                    prop="message"
                                    sortable="custom">
                      <template v-slot="{row}">
                          {{ row.attributes.message }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Kategori"
                                    min-width="200px"
                                    prop="category"
                                    sortable="custom">
                      <template v-slot="{row}">
                          {{ row.attributes.category }}
                      </template>
                    </el-table-column>
                    <el-table-column label="Target User"
                                    min-width="200px"
                                    prop="audience"
                                    sortable="custom">
                      <template v-slot="{row}">
                          {{ row.attributes.audience }}
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
    </div>
</template>

<script>
import { Table, TableColumn, Select, Option, DropdownMenu, DropdownItem, Dropdown } from 'element-ui';
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import { BasePagination } from '@/components';
import swal from 'sweetalert2';
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment';
import 'moment/locale/id';
import { HalfCircleSpinner, FulfillingBouncingCircleSpinner } from 'epic-spinners'

export default {
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
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
        order: 'asc',
        property: 'id'
      },
      isHideDownloadBtn: true
    };
  },
  computed: {
    ...mapGetters('notifikasi', ['manualNotifs']),
  },
  methods: {
    ...mapActions('notifikasi', [
      'getManualNotifs',
    ]),
    ...mapActions('auth', [
      'checkAuth',
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

      // let data = {}
      // data.status = 5
      // data.include = "profile"
      // data.pageSize = this.perPageCurrent
      // data.searchAll = this.searchData
      // data.pageNumber = 1
      // data.property = this.columnClicked.property
      // data.order = this.columnClicked.order
      
      let res = JSON.parse(JSON.stringify(await this.getManualNotifs()));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.manualNotifs))
        
        this.assignMeta(res.meta.page)
        
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
      data.status = 5
      // data.include = "accounts,profiles,npwps,branch"
      data.include = "profile"
      data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = this.meta.current_page
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      let res = await this.getAxisQueriedSingleService(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.axis))
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

    // Date Range Picker method goes here when user clicked apply
    async dateRangePicked() {
      if (this.datePicked != '') {
        // Raw Date Picker Object
        console.log(this.datePicked)
        // Date Picker props named: startDate
        console.log("StartDate: " + moment(this.datePicked.startDate).format('YYYY-MM-DD'))
        // Date Picker props named: endDate
        console.log("EndDate: " + moment(this.datePicked.endDate).format('YYYY-MM-DD'))

        this.assignData()
      }
    },

    async dateRangeClear() {
      if(this.datePicked != '') {
        console.log('cleared')
        this.datePicked.startDate = null
        this.datePicked.endDate = null
        // call endpoint getalldata here
        this.assignData()
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

    handleCommand(command) {
      if (command == 'edit') {
      } else {
        alert("Download Button Clicked")
      }
    },

    editModal(row) {
      this.showModal = true
      this.currentRow = JSON.parse(JSON.stringify(row))
      this.$set(this.currentRow.attributes, 'nama', this.getIncluded('profiles', row.relationships.profile.data, 'nama'));
      this.$set(this.currentRow.attributes, 'email', this.getIncluded('profiles', row.relationships.profile.data, 'email'));

      console.log(this.currentRow)
    },

    async updateRow() {
      this.isModalProcess = true
      this.currentRow.attributes.profile_id = this.currentRow.relationships.profile.data.id
      this.currentRow.attributes.npwp_id = this.currentRow.relationships.npwp.data.id
      
      console.log(this.currentRow)
      
      const res = JSON.parse(JSON.stringify(await this.updateAxi(this.currentRow)))
      console.log(res)

      this.showModal = false
      this.isModalProcess = false
      const that = this

      if (res.name != 'Error') {
        swal("Sukses", "Berhasil memproses data", "success")
        .then(function () {
          console.log("sudah diproses")
          that.changePage()
          // that.showModal = false
        }).catch(function (error ){
          console.log(error)
        })
      } else {
        swal("Error", "Edit data gagal, mohon coba lagi", "error")
        .then(function () {
          console.log("gagal diproses")
          console.log(res.response.data)
        }).catch(function (error ){
          console.log(error)
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
      console.log("queried: " + this.searchData + " , with datas: " + this.perPageCurrent)
      console.log(this.currentColumnSearched)
      // this.isShow = false

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
      data.status = 5
      data.include = "profile"
      data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""
      data.pageSize = this.perPageCurrent
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      this.isShow = false
      this.isLoading = true

      let res = await this.getAxisQueriedSingleService(data)
      this.item = JSON.parse(JSON.stringify(this.axis))
      this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included
      this.assignMeta(res.meta.page)

      this.isShow = true
      this.isLoading = false
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
      console.log(column.order)
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
    this.debouncedGetData = _.debounce(this.searchDatas, 500)
  },
  
  // Called when Vue Instance created
  filters: {
    convertDate(date) {
      return moment(date).format('LLLL');
    },
  },
}
</script>