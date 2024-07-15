<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-8 col-8">
          <h6 class="h2 d-inline-block mb-0">Setting Permission</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Pengaturan</li>
              <li class="breadcrumb-item" aria-current="page">Permission</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-4 pt-2 text-right" v-if="isShow && !isError">
          <base-button class="btn btn-xl" type="success" @click="showModalAdd = true">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span class="hidden-sm-down">Tambah Baru</span>
          </base-button>
        </div>
      </div>


    </base-header>

    <div class="container-fluid mt--6">
      <div>
        <div class="card">
          <div class="card-body">
                <!-- <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2"> -->
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
                          <el-table-column label="Group"
                                        min-width="200px"
                                        prop="grup"
                                        sortable="custom">
                            <template v-slot="{row}">
                              {{row.attributes.nama}}
                              <!-- <router-link :to="{ name: 'details', params: { id: row.id }}"></router-link> -->
                            </template>
                          </el-table-column>
                          <el-table-column prop="id" min-width="150px" align="right" label="Aksi">
                            <div slot-scope="{$index, row}" class="d-flex">
                              <el-tooltip content="Edit" placement="top">
                                <base-button
                                  @click.native="editModal(row)"
                                  class="like btn-link text-white"
                                  type="success"
                                  size="sm"
                                  icon>
                                  <i class="text-white fa fa-edit"></i> Edit
                                </base-button>
                              </el-tooltip>
                            </div>
                          </el-table-column>
                          <template v-for="(val, index) in permissions">
                            <el-table-column :label="val.attributes.nama"
                                          :key="index"
                                          min-width="180px"
                                          prop="size">                                          >
                              <template v-slot="{row}">
                                  <template v-if="checklistOrNot(row, val.id)">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                  </template>
                                  <!-- <template v-for="(val, index) in row.relationships.permissions.data"> -->
                                    <!-- {{ getIncluded('permissions', val, 'nama') }} -->
                                    <!-- {{ index != row.relationships.permissions.data.length -1 ? "," : "" }} -->
                                  <!-- </template> -->
                              </template>
                            </el-table-column>
                          </template>
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
                <!-- </card> -->
          </div>
        </div>
      </div>
    </div>
    <el-form @submit.prevent="editData">
      <el-dialog :visible.sync="showModalEdit" :title="modalEditTitle">
        <div key="1" v-if="!isModalProcess">
          <div class="form-group" v-if="currentRow.id">
            <div class="row mb-4">
              <label for="useby" class="col-md-4 col-form-label form-control-label">Permission</label>
            </div>
            <div class="row mb-4">
              <div class="col-md-4">
                <el-checkbox-group v-model="checkList">
                  <template v-for="(val, index) in permissions.slice(0, permissions.length / 3)">
                    <div :key="index">
                      <el-checkbox :label="val.id" :value="val.id" :key="val.id">{{ val.attributes.nama }}</el-checkbox><br>
                    </div>
                  </template>
                </el-checkbox-group>
              </div>
              <div class="col-md-4">
                <el-checkbox-group v-model="checkList">
                  <template v-for="(val, index) in permissions.slice((permissions.length / 3), (permissions.length / 3) * 2)">
                    <div :key="index">
                      <el-checkbox :label="val.id" :value="val.id" :key="val.id">{{ val.attributes.nama }}</el-checkbox><br>
                    </div>
                  </template>
                </el-checkbox-group>
              </div>
              <div class="col-md-4">
                <el-checkbox-group v-model="checkList">
                  <template v-for="(val, index) in permissions.slice((permissions.length / 3 * 2), permissions.length)">
                    <div :key="index">
                      <el-checkbox :label="val.id" :value="val.id" :key="val.id">{{ val.attributes.nama }}</el-checkbox><br>
                    </div>
                  </template>
                </el-checkbox-group>
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
          <el-button type="secondary" @click="showModalEdit = false; this.checkList = []">Tutup</el-button>
          <el-button type="success" @click="editData">Edit</el-button>
        </template>
      </el-dialog>
    </el-form>
    <el-form @submit.prevent="addData">
      <el-dialog :visible.sync="showModalAdd" title="Tambah Data">
        <div key="1" v-if="!isModalProcess">
          <div class="form-group">
            <div class="row mb-4">
              <label for="nama" class="col-md-4 col-form-label form-control-label">Nama Group</label>
              <div class="col-md-8">
                <el-input v-model="namaGroup" />
              </div>
            </div>
            <div class="row mb-4">
              <label for="nama" class="col-md-4 col-form-label form-control-label">Scope</label>
              <div class="col-md-8">
                <el-input v-model="scope" />
              </div>
            </div>
            <div class="row mb-4">
              <label for="useby" class="col-md-4 col-form-label form-control-label">Permission</label>
            </div>
            <div class="row mb-4">
              <div class="col-md-4">
                <el-checkbox-group v-model="checkList">
                  <template v-for="(val, index) in permissions.slice(0, permissions.length / 3)">
                    <div :key="index">
                      <el-checkbox :label="val.id" :value="val.id" :key="val.id">{{ val.attributes.nama }}</el-checkbox><br>
                    </div>
                  </template>
                </el-checkbox-group>
              </div>
              <div class="col-md-4">
                <el-checkbox-group v-model="checkList">
                  <template v-for="(val, index) in permissions.slice((permissions.length / 3), (permissions.length / 3) * 2)">
                    <div :key="index">
                      <el-checkbox :label="val.id" :value="val.id" :key="val.id">{{ val.attributes.nama }}</el-checkbox><br>
                    </div>
                  </template>
                </el-checkbox-group>
              </div>
              <div class="col-md-4">
                <el-checkbox-group v-model="checkList">
                  <template v-for="(val, index) in permissions.slice((permissions.length / 3 * 2), permissions.length)">
                    <div :key="index">
                      <el-checkbox :label="val.id" :value="val.id" :key="val.id">{{ val.attributes.nama }}</el-checkbox><br>
                    </div>
                  </template>
                </el-checkbox-group>
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
          <el-button type="secondary" @click="showModalAdd = false">Tutup</el-button>
          <el-button type="success" @click="addData">Edit</el-button>
        </template>
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
  // Components
  import { Table, TableColumn, Select, Option, Form, FormItem, Input, Dialog, Button, Checkbox, CheckboxButton, CheckboxGroup, } from 'element-ui';
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
  import { BasePagination } from '@/components';
  import swal from 'sweetalert2';
  import { mapGetters, mapActions } from 'vuex'
  import moment from 'moment';
  import 'moment/locale/id';
  import { HalfCircleSpinner } from 'epic-spinners'
  import FileInput from '@/components/Inputs/FileInput'
  import Tab from "@/components/Tabs/Tab";
  import Tabs from "@/components/Tabs/Tabs";

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
    [Checkbox.name]: Checkbox,
    [CheckboxButton.name]: CheckboxButton,
    [CheckboxGroup.name]: CheckboxGroup,
    Tabs,
    HalfCircleSpinner,
    FileInput,
  },
  data() {
    return {
      item: [],
      dataIncluded: [],
      columnSearched: [
        { name: 'Group', value: 'nama' },
        // { name: 'Kategori', value: 'kategori' },
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
      currentRow: {},
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
      fileMateri: '',
      modalEditTitle: 'Edit Permission ',
      checkList: [],
      namaGroup: "",
      scope: ""
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
    // datePicked: function () {
    //   this.dateRangePicked()
    // },
    'meta.current_page': function () {
      this.changePage()
    },
    currentColumnSearched: function() {
      this.searchByColumn();
    }
  },
  created () {
    this.getData()
    this.debouncedGetData = _.debounce(this.searchDatas, 3000)
  },
  computed: {
    ...mapGetters('permission', ['groups','permissions','included']),
  },
  methods: {
    ...mapActions('permission', [
      'getGroups',
      'getPermissions',
      'updateGroup',
      'createGroup',
    ]),
    assignMeta(metaPage) {
      this.meta.current_page = metaPage['current-page'];
      this.meta.per_page = metaPage['per-page'];
      this.meta.from = metaPage['from'];
      this.meta.to = metaPage['to'];
      this.meta.total = metaPage['total'];
      this.meta.last_page = metaPage['last-page'];
    },

    async assignData() {
      this.isError = false
      this.isLoading = true
      this.isShow = false

      let data = {}
      // data.include = ""
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = this.meta.current_page
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      let res = await this.getGroups(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.groups))
        this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included
        
        this.assignMeta(res.meta.page)

        this.isLoading = false
        this.isShow = true
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
      // data.include = ""
      data.pageSize = this.perPageCurrent
      data.searchAll = this.searchData
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order
      
      let res = JSON.parse(JSON.stringify(await this.getGroups(data)));

      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.groups))
        this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included
        
        this.assignMeta(res.meta.page)

        await this.getPermissions()
        
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
    checklistOrNot(row, idPermissions) {
      if (row.relationships.permissions.data.find(x => { return x.id == idPermissions })) {
        return true
      } else {
        return false
      }
    },
    // Everytime user click page on pagination, this method will called
    async changePage() {
      // if (this.isFirst) {
      //   this.isFirst = false
      // } else {
        this.assignData()
      // }
    },
    // AXIOS here to consume datas
    async searchDatas() { 
      this.isShow = false
      this.isError = false
      this.isLoading = true

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

      let res = await this.getGroups(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.groups))
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
    },
    editModal(row) {
      this.showModalEdit = true
      this.currentRow = JSON.parse(JSON.stringify(row))
      this.modalEditTitle = 'Edit Permission ' + this.currentRow.attributes.nama

      this.checkList = this.currentRow.relationships.permissions.data.map(x => { return x.id })

    },
    addModal(row) {
      this.showModalAdd = true

    },
    async editData() {
      this.isModalProcess = true

      let checkListData = this.checkList.map(x => { return { 'type': 'permissions', 'id': x } })
      delete this.currentRow.relationships
      this.currentRow.relationships = { 
        'permissions': {
          'data': []
        }
      }
      this.currentRow.relationships.permissions.data = checkListData

      let res = await this.updateGroup(this.currentRow)
      this.showModalEdit = false
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
    async addData() {
      this.isModalProcess = true

      let checkListData = this.checkList.map(x => { return { 'type': 'permissions', 'id': x } })
      
      const payload = {
        type: "groups",
        attributes: {
          nama: this.namaGroup,
          scope: this.scope
        },
        relationships: {
          permissions: {
            data: checkListData
          }
        }
      }

      let res = await this.createGroup(payload)
      this.showModalEdit = false
      this.isModalProcess = false
      const that = this

      if (res.name != 'Error') {
        swal("Sukses", "Berhasil menambah data", "success")
        .then(function () {
          that.checkList = []
          that.namaGroup = ''
          that.scope = ''
          that.changePage()
        }).catch(function (error ){
        })
      } else {
        swal("Error", "Tambah data gagal, mohon coba lagi", "error")
        .then(function () {
        }).catch(function (error ){
        })
      }
    },
    fileChange(files) {
      this.fileMateri = files[0]
    },

    handleLike(index, row) {
      swal({
        title: `You liked ${row.name}`,
        buttonsStyling: false,
        type: 'success',
        confirmButtonClass: 'btn btn-success btn-fill'
      });
    },
    handleEdit(index, row) {
      swal({
        title: `You want to edit ${row.name}`,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info btn-fill'
      });
    },
    handleDelete(index, row) {
      swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success btn-fill',
        cancelButtonClass: 'btn btn-danger btn-fill',
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.deleteRow(row);
          swal({
            title: 'Deleted!',
            text: `You deleted ${row.name}`,
            type: 'success',
            confirmButtonClass: 'btn btn-success btn-fill',
            buttonsStyling: false
          });
        }
      });
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
    }
  },
  filters: {
    convertDate(date) {
      return moment(date).format('LLLL');
    },
    convertSize(size) {
      return parseFloat(size * 0.000001).toFixed(2);
    },
  },
};
</script>
<style>
  .no-border-card .card-footer{
    border-top: 0;
  }
</style>
