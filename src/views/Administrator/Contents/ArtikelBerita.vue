<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Artikel dan Berita</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Konten</li>
              <li class="breadcrumb-item" aria-current="page">Artikel & Berita</li>
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
          <!-- <base-button class="btn btn-xl" type="success" @click="showModalAdd = true">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span class="hidden-sm-down">Tambah Baru</span>
          </base-button> -->
          <router-link :to="{ name: 'tambah artikel' }" class="btn btn-xl btn-success">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span class="hidden-sm-down">Tambah Baru</span>
          </router-link>
        </div>
      </div>


    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <div>
        <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
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
                      <!-- <a v-bind:href="'/administrator/requests/'+ row.id +'/detail'">
                          {{row.name}}
                      </a> -->
                    </template>
                  </el-table-column>
                  <el-table-column label="Kategori"
                                min-width="220px"
                                prop="kategori.nama"
                                sortable="custom">
                    <template v-slot="{row}">
                        {{ getIncluded('categories', row.relationships.category.data, 'nama') }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Author"
                                min-width="160px"
                                prop="salary">
                    <!-- <template v-slot="{row}"> -->
                        <!-- <badge rounded type="default">
                            Accept
                        </badge> -->
                        Dicicilaja Admin
                    <!-- </template> -->
                  </el-table-column>
                  <el-table-column label="Dibuat Pada"
                                min-width="160px"
                                prop="created-at"
                                sortable>
                    <template v-slot="{row}">
                            {{row.attributes["created-at"] | convertDate}}
                    </template>
                  </el-table-column>

                  <el-table-column prop="id" min-width="150px" align="right" label="Status">
                    <div slot-scope="{$index, row}" class="d-flex">
                      <el-tooltip content="Edit" placement="top">
                        <router-link :to="{ name: 'edit artikel', params: { id: row.id } }" class="btn btn-sm btn-info">
                          <i class="text-white fa fa-edit"></i> 
                          <span class="hidden-sm-down">Edit</span>
                        </router-link>
                      </el-tooltip>
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
    <form @submit.prevent="editData">
      <modal :show.sync="showModalEdit">
        <template slot="header">
          <h5 class="modal-title">Edit Data Berita</h5>
        </template>
        <!-- <transition name="fade" mode="out-in"> -->
          <div key="1" v-if="!isModalProcess">
            <div class="form-group" v-if="currentRow.attributes">
              <div class="row">
                <label for="judul" class="col-md-4 col-form-label form-control-label">Judul Berita</label>
                <div class="col-md-8">
                  <base-input alternative id="judul" v-model="tmpAddData.nama" required></base-input>
                </div>
              </div>
              <div class="row">
                <label for="slug" class="col-md-4 col-form-label form-control-label">Slug</label>
                <div class="col-md-8">
                  <base-input alternative id="slug" v-model="tmpAddData.slug" required></base-input>
                </div>
              </div>
              <div class="row">
                <label for="image" class="col-md-4 col-form-label form-control-label">Upload Gambar</label>
                <div class="col-md-8 pb-4">
                  <file-input id="image" @change="imageChange" class="form-group"></file-input>
                </div>
              </div>
              <div class="row">
                <label for="preview_gambar" class="col-md-4 col-form-label form-control-label">Preview Gambar</label>
                <div class="col-md-8 pb-4">
                  <img :src="imagePreview" v-if="imagePreview" id="preview_gambar" width="200px" alt = "">
                </div>
              </div>
              <div class="row">
                <label for="banner" class="col-md-4 col-form-label form-control-label">Upload Banner</label>
                <div class="col-md-8 pb-4">
                  <file-input id="banner" @change="bannerChange" class="form-group"></file-input>
                </div>
              </div>
              <div class="row">
                <label for="preview_banner" class="col-md-4 col-form-label form-control-label">Preview Banner</label>
                <div class="col-md-8 pb-4">
                  <img :src="bannerPreview" v-if="bannerPreview" id="preview_gambar" width="200px" alt = "">
                </div>
              </div>
              <div class="row">
                <label for="expect" class="col-md-4 col-form-label form-control-label">Expect</label>
                <div class="col-md-8">
                  <base-input id="expect" alternative>
                    <textarea class="form-control" name="expect" id="expect" cols="30" rows="3" v-model="tmpAddData.expect" required></textarea>
                  </base-input>
                </div>
              </div>
              <div class="row">
                <label for="deskripsi" class="col-md-4 col-form-label form-control-label">Deskripsi</label>
                <div class="col-md-8">
                  <base-input id="deskripsi" alternative>
                    <textarea class="form-control" name="deskripsi" id="deskripsi" cols="30" rows="5" v-model="tmpAddData.deskripsi" required></textarea>
                  </base-input>
                </div>
              </div>
              <div class="row">
                <label for="kategori" class="col-md-4 col-form-label form-control-label">Kategori</label>
                <div class="col-md-8">
                  <base-input>
                    <select class="form-control" v-model="tmpAddData.kategori_id" required>
                      <option v-for="value in kategoris" 
                              :selected="value.id == tmpAddData.kategori_id" :key="value.id" :value="value.id">{{ value.attributes.nama }}</option>
                    </select>
                  </base-input>
                </div>
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
        <!-- </transition> -->
        <template slot="footer" v-if="!isModalProcess">
          <base-button type="secondary" @click="showModalEdit = false">Tutup</base-button>
          <button type="submit" class="btn btn-primary">Edit</button>
        </template>
      </modal>
    </form>
    <form @submit.prevent="addData">
      <modal :show.sync="showModalAdd">
        <template slot="header">
          <h5 class="modal-title">Tambah Data Berita</h5>
        </template>
        <!-- <transition name="fade" mode="out-in"> -->
          <div key="1" v-if="!isModalProcess">
            <div class="row">
              <label for="judul" class="col-md-4 col-form-label form-control-label">Judul Berita</label>
              <div class="col-md-8">
                <base-input alternative id="judul" v-model="tmpAddData.nama" required></base-input>
              </div>
            </div>
            <div class="row">
              <label for="slug" class="col-md-4 col-form-label form-control-label">Slug</label>
              <div class="col-md-8">
                <base-input alternative id="slug" v-model="tmpAddData.slug" required></base-input>
              </div>
            </div>
            <div class="row">
              <label for="image" class="col-md-4 col-form-label form-control-label">Upload Gambar</label>
              <div class="col-md-8 pb-4">
                <file-input id="image" @change="imageChange" class="form-group" required></file-input>
              </div>
            </div>
            <div class="row">
              <label for="banner" class="col-md-4 col-form-label form-control-label">Upload Banner</label>
              <div class="col-md-8 pb-4">
                <file-input id="banner" @change="bannerChange" class="form-group" required></file-input>
              </div>
            </div>
            <div class="row">
              <label for="expect" class="col-md-4 col-form-label form-control-label">Expect</label>
              <div class="col-md-8">
                <base-input id="expect" alternative>
                  <textarea class="form-control" name="" id="" cols="30" rows="3" v-model="tmpAddData.expect" required></textarea>
                </base-input>
              </div>
            </div>
            <div class="row">
              <label for="deskripsi" class="col-md-4 col-form-label form-control-label">Deskripsi</label>
              <div class="col-md-8">
                <base-input id="deskripsi" alternative>
                  <textarea class="form-control" name="" id="" cols="30" rows="5" v-model="tmpAddData.deskripsi" required></textarea>
                </base-input>
              </div>
            </div>
            <div class="row">
              <label for="kategori" class="col-md-4 col-form-label form-control-label">Kategori</label>
              <div class="col-md-8">
                <base-input>
                  <select class="form-control" v-model="tmpAddData.kategori_id" required>
                    <option v-for="value in kategoris" :key="value.id" :value="value.id">{{ value.attributes.nama }}</option>
                  </select>
                </base-input>
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
        <!-- </transition> -->
        <template slot="footer" v-if="!isModalProcess">
          <base-button type="secondary" @click="showModalAdd = false">Tutup</base-button>
          <button type="submit" class="btn btn-primary">Tambah</button>
        </template>
      </modal>
    </form>
  </div>
</template>
<script>
  // Components
  import { Table, TableColumn, Select, Option } from 'element-ui';
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
  import { BasePagination } from '@/components';
  // import clientPaginationMixin from '@/views/Tables/PaginatedTables/clientPaginationMixin'
  import swal from 'sweetalert2';
  import DateRangePicker from 'vue2-daterange-picker'
  import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'
  import { mapGetters, mapActions } from 'vuex'
  import moment from 'moment';
  import 'moment/locale/id';
  import { HalfCircleSpinner, FulfillingBouncingCircleSpinner } from 'epic-spinners'
  import users from '@/views/Tables/users2';
  import FileInput from '@/components/Inputs/FileInput'

export default {
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    DateRangePicker,
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
        { name: 'Kategori', value: 'kategori' },
      ],
      currentColumnSearched: 'nama',
      tmpAddData: {
        nama: '',
        slug: '',
        expect: '',
        deskripsi: '',
        image: '',
        banner: '',
        kategori_id: '',
        user_id: 1,
        status_id: 21,
      },
      imagePreview: null,
      bannerPreview: null,
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
      datePicked: '',
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
    }
  },
  computed: {
    ...mapGetters('berita', ['beritas','included']),
    ...mapGetters('kategori', ['kategoris']),
  },
  methods: {
    ...mapActions('berita', [
      'getBeritas',
      'getBeritasQueried',
      'createBerita',
      'updateBerita',
    ]),
    ...mapActions('kategori', [
      'getKategoris',
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
      data.include = "category,status"
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = 1
      // data.property = '-id'
      // remove the dash from id since cloudcreativity package is upgrade from 4.x to 6.x version 
      data.property = 'id'
      data.order = this.columnClicked.order
      
      let res = JSON.parse(JSON.stringify(await this.getBeritasQueried(data)));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.beritas))
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
      data.include = "category,status"
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = this.meta.current_page
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order
      data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""

      let res = await this.getBeritasQueried(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.beritas))
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

    refreshData() {
			this.tmpAddData = {
				nama: '',
        slug: '',
        expect: '',
        deskripsi: '',
        image: '',
        banner: '',
        kategori_id: '',
        user_id: 1,
        status_id: 21,
			}
    },
    
    async addData() {

      this.isModalProcess = true

      const res = await this.createBerita(this.tmpAddData);
      
      this.refreshData();

      this.showModalAdd = false
      this.isModalProcess = false

      const that = this

      if (res.name != 'Error') {
        swal("Sukses", "Berhasil membuat data berita baru", "success")
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

    async editData() {
      this.isModalProcess = true

      if (this.tmpAddData.image == this.currentRow.attributes.image || this.tmpAddData.banner == this.currentRow.attributes.banner) {
        this.tmpAddData.patch = 'raw'
      } else {
        this.tmpAddData.patch = 'form'
      }

      const res = JSON.parse(JSON.stringify(await this.updateBerita(this.tmpAddData)))

      this.showModalEdit = false
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
      this.showModalEdit = true
      this.currentRow = JSON.parse(JSON.stringify(row))

      this.tmpAddData = {
        id: this.currentRow.id,
				nama: this.currentRow.attributes.nama,
        slug: this.currentRow.attributes.slug,
        banner: this.currentRow.attributes.banner,
        expect: this.currentRow.attributes.expect,
        deskripsi: this.currentRow.attributes.deskripsi,
        image: this.currentRow.attributes.image,
        kategori_id: this.currentRow.relationships.kategori.data.id,
        user_id: 1,
        status_id: this.currentRow.relationships.status.data.id,
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
      data.include = "category,status"
      data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""
      data.pageSize = this.perPageCurrent
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      this.isShow = false
      this.isLoading = true

      let res = await this.getBeritasQueried(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.beritas))
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

    // Methods below for handling image preview
    imageChange(files) {
      this.tmpAddData.image = files[0]
      this.imagePreview = URL.createObjectURL(files[0])
    },
    bannerChange(files) {
      this.tmpAddData.banner = files[0]
      this.bannerPreview = URL.createObjectURL(files[0])
    }
  },
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
