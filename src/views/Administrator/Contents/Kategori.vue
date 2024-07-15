<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Kategori</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Contents</li>
              <li class="breadcrumb-item" aria-current="page">Categories</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 pt-2 text-right" v-if="isShow && !isError">
          <base-button class="btn btn-xl" type="success" @click="showModalAdd = true">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span class="hidden-sm-down">Tambah Baru</span>
          </base-button>
        </div>
      </div>

    </base-header>

    <div class="container-fluid mt--6">
      <div>
        <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
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
                  <el-table-column label="No."
                                  min-width="100px"
                                  sortable="custom"
                                  prop="no">
                    <template v-slot="{row}">
                        {{ item.indexOf(row) + meta.from }}
                        <!-- {{ row.id }} -->
                    </template>
                  </el-table-column>
                  <el-table-column label="Judul"
                                min-width="300px"
                                prop="nama"
                                sortable="custom">
                    <template v-slot="{row}">
                      {{row.attributes.nama}}
                      <!-- <router-link :to="{ name: 'details', params: { id: row.id }}"></router-link> -->
                    </template>
                  </el-table-column>
                  <el-table-column label="Penerima"
                                min-width="150px"
                                prop="useby"
                                sortable="custom">
                    <template v-slot="{row}">
                        {{row.attributes.useby | firstLetterUpper }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Dibuat Pada"
                                  min-width="250px"
                                  prop="created-at"
                                  sortable="custom">
                    <template v-slot="{row}">
                      {{ row.attributes["created-at"] | convertDate }}
                    </template>
                  </el-table-column>

                  <el-table-column prop="id" min-width="250px" align="right" label="Aksi">
                    <div slot-scope="{$index, row}" class="d-flex">
                      <el-tooltip content="Edit" placement="top">
                        <base-button
                          @click.native="editModal(row)"
                          class="like btn-link text-white"
                          type="info"
                          size="sm"
                          icon>
                          <i class="text-white fa fa-edit"></i> Edit
                        </base-button>
                      </el-tooltip>
                      <!-- <base-button
                        @click.native="handleEdit($index, row)"
                        class="edit"
                        type="warning"
                        size="sm"
                        icon
                      >
                        <i class="text-white ni ni-ruler-pencil"></i>
                      </base-button> -->
                      <!-- <el-tooltip content="Change to Waiting" placement="top">
                      <base-button
                        @click.native="handleDelete($index, row)"
                        class="remove btn-link text-white"
                        type="warning"
                        size="sm"
                        icon
                      >
                        <i class="text-white fa fa-ban"></i>
                      </base-button>
                      </el-tooltip> -->
                    </div>
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

    </div>
    <el-form @submit.prevent="editData">
      <el-dialog :visible.sync="showModalEdit" title="Edit Data Kategori">
        <div key="1" v-if="!isModalProcess">
          <div class="form-group" v-if="currentRow.attributes">
            <div class="row mb-4">
              <label for="nama" class="col-md-4 col-form-label form-control-label">Nama Kategori</label>
              <div class="col-md-8">
                <el-input v-model="currentRow.attributes.nama" />
              </div>
            </div>
            <div class="row mb-4">
              <label for="useby" class="col-md-4 col-form-label form-control-label">Penerima</label>
              <div class="col-md-8">
                <el-select
                  v-model="currentRow.attributes.useby"
                  placeholder="Penerima"
                >
                  <el-option
                    class="select-primary"
                    v-for="item in penerimaList"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
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
            <half-circle-spinner
              :animation-duration="1000"
              :size="60"
              color="#ff1d5e"
            />
        </div>
        <!-- </transition> -->
        <template slot="footer" v-if="!isModalProcess">
          <el-button type="secondary" @click="showModalEdit = false">Tutup</el-button>
          <el-button type="success" @click="editData">Edit</el-button>
        </template>
      </el-dialog>
    </el-form>
    <el-form @submit.prevent="addData">
      <el-dialog :visible.sync="showModalAdd" title="Tambah Data Kategori">
          <div key="1" v-if="!isModalProcess">
            <div class="form-group">
              <div class="row mb-4">
                <label for="nama" class="col-md-4 col-form-label form-control-label">Nama Kategori</label>
                <div class="col-md-8">
                  <el-input v-model="tmpAddData.nama" />
                </div>
              </div>
              <div class="row mb-4">
                <label for="useby" class="col-md-4 col-form-label form-control-label">Penerima</label>
                <div class="col-md-8">
                  <el-select
                    v-model="tmpAddData.useby"
                    placeholder="Penerima"
                  >
                    <el-option
                      class="select-primary"
                      v-for="item in penerimaList"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
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
              <half-circle-spinner
                :animation-duration="1000"
                :size="60"
                color="#ff1d5e"
              />
          </div>
        <!-- </transition> -->
        <template slot="footer" v-if="!isModalProcess">
          <el-button type="secondary" @click="showModalAdd = false">Tutup</el-button>
          <el-button type="success" @click="addData">Tambah</el-button>
        </template>
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
  // Components
  import { Table, TableColumn, Select, Option, Form, FormItem, Input, Dialog, Button } from 'element-ui';
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
  import { BasePagination } from '@/components';
  import swal from 'sweetalert2';
  import { mapGetters, mapActions } from 'vuex'
  import moment from 'moment';
  import 'moment/locale/id';
  import { HalfCircleSpinner } from 'epic-spinners'
  import FileInput from '@/components/Inputs/FileInput'

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
    HalfCircleSpinner,
    FileInput,
  },
  data() {
    return {
      item: [],
      dataIncluded: [],
      columnSearched: [
        // { name: 'All', value: 'all' },
        { name: 'Judul', value: 'nama' },
        { name: 'Penerima', value: 'useby' },
        // { name: 'Author', value: 'author' },
        // { name: 'E-mail', value: 'email' },
        // { name: 'Dibuat pada', value: 'created_at' }
      ],
      currentColumnSearched: 'nama',
      selectedRows: [],
      showModal: false,
      showModalAdd: false,
      showModalEdit: false,
      isModalProcess: false,
      currentRow: '',
      searchData: '',
      perPageCurrent: 10,
      perPageOptions: [5, 10, 25],
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
      tmpAddData: {
        nama: '',
        useby: '',
      },
      penerimaList: ['guest', 'axi']
    };
  },
  computed: {
    ...mapGetters('kategori', ['kategoris','included']),
  },
  methods: {
    ...mapActions('kategori', [
      'getKategoris',
      'getKategorisQueried',
      'createKategori',
      'updateKategori'
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
      data.include = ""
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order
      
      let res = JSON.parse(JSON.stringify(await this.getKategorisQueried(data)));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.kategoris))
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
      this.isShow = false
      this.isError = false
      this.isLoading = true

      let data = {}
      data.include = ""
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = this.meta.current_page
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      let res = await this.getKategorisQueried(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.kategoris))
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

    deleteRow(row) {
      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },

    selectionChange(selectedRows) {
      this.selectedRows = selectedRows
    },

    async editData() {
      this.isModalProcess = true
      const res = JSON.parse(JSON.stringify(await this.updateKategori(this.currentRow)))
      this.showModalEdit = false
      this.isModalProcess = false
      const that = this

      if (res.name != 'Error') {
        swal("Sukses", "Berhasil mengubah data", "success")
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

    refreshData() {
			this.tmpAddData = {
				nama: '',
        useby: '',
			}
    },
    
    async addData() {
      this.isModalProcess = true
      const res = await this.createKategori(this.tmpAddData);      
      this.refreshData();
      this.showModalAdd = false
      this.isModalProcess = false
      const that = this

      if (res.name != 'Error') {
        swal("Sukses", "Berhasil membuat data kategori baru", "success")
        .then(function () {
          that.getData()
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
     * Modal Handling here
     * ----------------------------------------
     */

    editModal(row) {
      this.showModalEdit = true
      this.currentRow = JSON.parse(JSON.stringify(row))
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
      data.include = ""
      data.pageSize = this.perPageCurrent
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      this.isShow = false
      this.isLoading = true

      let res = await this.getKategorisQueried(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.kategoris))
        this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included

        this.assignMeta(res.meta.page)

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
     * End of searching here
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Sorting data here
     * ----------------------------------------
     */

    async getDataColumnClicked() { 
      this.assignData()
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

  async created() {
    await this.permissionAuth()
    this.getData()
    this.debouncedGetData = _.debounce(this.searchDatas, 3000)
  },

  filters: {
    convertDate(date) {
      return moment(date).format('LLLL');
    },
    firstLetterUpper(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
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
