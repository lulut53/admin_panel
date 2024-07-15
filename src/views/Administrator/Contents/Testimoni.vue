<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Testimoni</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Konten</li>
              <li class="breadcrumb-item" aria-current="page">Testimoni</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 pt-2 text-right" v-if="isShow && !isError">
          <el-button type="success" @click="showModalAdd = true;">
            <i class="fas fa-plus"></i>
            Testimoni Baru
          </el-button>
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
              <!--<center>-->
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
             <!-- <center><h1>Error, silahkan coba lagi.</h1></center>-->
             <div style="display: flex; margin-top: 20px !important; justify-content: center;">
              <h1 class="text-center">Error, silahkan coba lagi.</h1>
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
                  <el-table-column label="Nama AXI"
                                min-width="250px"
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
                  <el-table-column label="Testimoni"
                                min-width="450px"
                                prop="salary">
                    <template v-slot="{row}">
                      <span v-html="row.attributes.testimoni"></span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Dibuat Pada"
                                min-width="160px"
                                prop="created-at"
                                sortable>
                    <template v-slot="{row}">
                            {{row.attributes["created-at"] | convertDate}}
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
    </div>
    <el-form @submit.prevent="addData">
      <el-dialog width="75%" title="Tambah Testimoni" :visible.sync="showModalAdd">
        <div key="1" v-if="!isModalProcess">
          <div class="row mb-4">
            <div class="col-md-6">
              <label class="form-control-label">Nama</label>
              <!-- Add v-model here -->
              <el-input v-model="tmpAddData.nama" />
            </div>
            <div class="col-md-6">
              <label class="form-control-label">Pekerjaan</label>
              <!-- Add v-model here -->
              <el-input v-model="tmpAddData.job" /> 
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6">
              <label class="form-control-label">Gambar</label>
              <!-- Add v-model here -->
              <file-input @change="imageChange"/>
            </div>
            <div class="col-md-6">
              <label class="form-control-label">Nama Gambar (Opsional)</label>
              <!-- Add v-model here -->
              <el-input v-model="tmpAddData.alt_image" /> 
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-8">
              <img :src="imagePreview" v-if="imagePreview" style="max-width: 1000px; max-height=500px;" alt="">
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-control-label">Status</label>
                <!-- Add v-model here -->
                <el-select
                  class="select-primary pagination-select"
                  v-model="tmpAddData.status_id"
                  placeholder="Pilihan status"
                >
                  <el-option
                    class="select-primary"
                    v-for="item in optionsStatus"
                    :key="item.id"
                    :value="item.id"
                    :label="item.attributes.nama"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-12">
              <label for="ckeditor" class="form-control-label">Kisah Sukses</label>
              <ckeditor v-model="tmpAddData.testimoni" :editor="editor" :config="editorConfig" class="form-control"></ckeditor>
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
          <base-button type="secondary" @click="showModalAdd = false">Tutup</base-button>
          <button type="submit" class="btn btn-primary" @click="addData">Kirim Testimonial</button>
        </template>
      </el-dialog>
    </el-form>
    <el-form @submit.prevent="editData">
      <el-dialog width="75%" title="Tambah Testimoni" :visible.sync="showModalEdit" v-if="currentRow.attributes">
        <div key="1" v-if="!isModalProcess">
          <div class="row mb-4">
            <div class="col-md-6">
              <label class="form-control-label">Nama</label>
              <!-- Add v-model here -->
              <el-input v-model="currentRow.attributes.nama" />
            </div>
            <div class="col-md-6">
              <label class="form-control-label">Pekerjaan</label>
              <!-- Add v-model here -->
              <el-input v-model="currentRow.attributes.job" /> 
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6">
              <label class="form-control-label">Gambar</label>
              <!-- Add v-model here -->
              <file-input @change="imageChangeEdit"/>
            </div>
            <div class="col-md-6">
              <label class="form-control-label">Nama Gambar (Opsional)</label>
              <!-- Add v-model here -->
              <el-input v-model="currentRow.attributes.alt_image" /> 
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-8">
              <img :src="imageEditPreview" v-if="imageEditPreview" style="max-width: 1000px; max-height=500px;" alt="">
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-control-label">Status</label>
                <!-- Add v-model here -->
                <el-select
                  class="select-primary pagination-select"
                  v-model="currentRow.attributes.status_id"
                  placeholder="Pilihan status"
                >
                  <el-option
                    class="select-primary"
                    v-for="item in optionsStatus"
                    :key="item.id"
                    :value="item.id"
                    :label="item.attributes.nama"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-12">
              <label for="ckeditor" class="form-control-label">Kisah Sukses</label>
              <ckeditor v-model="currentRow.attributes.testimoni" :editor="editor" :config="editorConfig" class="form-control"></ckeditor>
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
          <base-button type="secondary" @click="showModalEdit = false">Tutup</base-button>
          <button type="submit" class="btn btn-primary" @click="editData">Edit Testimonial</button>
        </template>
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
// Components
import { Dialog, Button, Form, FormItem, Table, TableColumn, Select, Option, DropdownMenu, DropdownItem, Dropdown } from 'element-ui';
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    FileInput,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // CKEditor Custom Config
      },
      item: [],
      dataIncluded: [],
      columnSearched: [
        // { name: 'All', value: 'all' },
        { name: 'Nama', value: 'nama' },
        { name: 'Testimoni', value: 'testimoni' },
      ],
      currentColumnSearched: 'nama',
      tmpAddData: {
        nama: '',
        foto: '',
        alt_image: '',
        job: '',
        testimoni: '',
        user_id: '',
        status_id: 27,
      },
      image: "",
      imagePreview: null,
      imageEditPreview: null,
      selectedRows: [],
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
      optionsStatus: [
        {
          id: 27,
          attributes: {
            nama: 'Unpublish'
          }
        },
        {
          id: 28,
          attributes: {
            nama: 'Publish'
          }
        }
      ],
    }
  },
  computed: {
    ...mapGetters('testimoni', ['testimonis','included']),
  },
  methods: {

    UrlHealer(dirtyUrl) {
      return sanitizeUrl(dirtyUrl);
  },
    ...mapActions('testimoni', [
      'getTestimonis',
      'getTestimonisQueried',
      'createTestimoni',
      'updateTestimoni',
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
      // data.include = ""
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = 1
      // data.property = '-id'
      // remove the dash from id since cloudcreativity package is upgrade from 4.x to 6.x version 
      data.property = 'id'
      data.order = this.columnClicked.order
      
      let res = JSON.parse(JSON.stringify(await this.getTestimonisQueried(data)));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.testimonis))
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
      // data.include = "category,status"
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = this.meta.current_page
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order
      data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""

      let res = JSON.parse(JSON.stringify(await this.getTestimonisQueried(data)));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.testimonis))
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
        foto: '',
        alt_image: '',
        job: '',
        testimoni: '',
        user_id: '',
        status_id: 27
      }

      this.imagePreview = null
    },
    
    async addData() {
      this.isModalProcess = true

      let data = JSON.parse(window.localStorage.getItem('user'))
      this.tmpAddData.user_id = data.attributes.user_id

      const res = await this.createTestimoni(this.tmpAddData);
      
      this.showModalAdd = false
      this.isModalProcess = false

      const that = this

      if (res.name != 'Error') {
        swal("Sukses", "Berhasil membuat data testimoni baru", "success")
        .then(function () {
          that.refreshData();
          that.getData()
          // that.showModal = false
        }).catch(function (error ){
        })
      } else {
        swal("Error", "Membuat data gagal, mohon coba lagi", "error")
        .then(function () {
        }).catch(function (error ){
        })
      }

    },

    async editData() {
      this.isModalProcess = true

      let data = JSON.parse(window.localStorage.getItem('user'))
      this.currentRow.attributes.user_id = data.attributes.user_id

      if (this.currentRow.attributes.foto == this.testimonis.find(x => x.id == this.currentRow.id).attributes.foto) this.currentRow.attributes.foto = null

      const res = JSON.parse(JSON.stringify(await this.updateTestimoni(this.currentRow)))

      this.showModalEdit = false
      this.isModalProcess = false
      const that = this

      if (res.name != 'Error') {
        swal("Sukses", "Berhasil memproses data", "success")
        .then(function () {
          that.refreshData();
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
      this.$set(this.currentRow.attributes, 'status_id', parseInt(this.currentRow.relationships.status.data.id))
      this.imageEditPreview = this.currentRow.attributes.foto
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
      // data.include = "category,status"
      data.start_date = this.datePicked.startDate ? moment(this.datePicked.startDate).format('YYYY-MM-DD') : ""
      data.end_date = this.datePicked.endDate ? moment(this.datePicked.endDate).format('YYYY-MM-DD') : ""
      data.pageSize = this.perPageCurrent
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      this.isShow = false
      this.isLoading = true

      let res = await this.getTestimonisQueried(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.testimonis))
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
      this.tmpAddData.foto = files[0]
      this.imagePreview = URL.createObjectURL(files[0]);
    },
    imageChangeEdit(files) {
      this.currentRow.attributes.foto = files[0]
      this.imageEditPreview = URL.createObjectURL(files[0]);
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
  .ck-editor__editable {
    min-height: 300px;
   }
</style>