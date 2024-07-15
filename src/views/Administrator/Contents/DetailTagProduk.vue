<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-12 col-12">
          <h6 class="h2 d-inline-block mb-0">Detail Tag Produk {{ namaProduk }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard/tag-products">Tag Produk</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Detail Tag Produk {{ namaProduk }}</li>
            </ol>
          </nav>
        </div>
        <!-- <div class="col-lg-6 pt-2 text-right" v-if="isShow && !isError">
          <base-button class="btn btn-xl" type="success" @click="showModalAdd = true">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span class="hidden-sm-down">Tambah Baru</span>
          </base-button>
        </div> -->
      </div>


    </base-header>

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
                color="#ff1d5e" />
              <!-- </center> -->
              <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
            </div>
            <!-- <div key="2" v-if="isError" class="text-center p-5">
              <center><img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive"></center>
              <br>
              <center><h1>Error, silahkan coba lagi.</h1></center>
            </div> -->
            <div key="2" v-if="isError" class="text-center p-5" style="display: flex; justify-content: center; align-items: center;">
                <img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive">
                <br>
                <h1>Error, silahkan coba lagi.</h1>
            </div>
            <div key="2" v-if="isShow">
              <div>
                <div class="row-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                  <div class="col-2">
                    <!-- <el-select
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
                    </el-select> -->
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-4 pr-0">
                        <!-- <el-select
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
                        </el-select> -->
                      </div>
                      <div class="col-8 pl-1">
                        <!-- <base-input v-model="searchData"
                                    append-icon="fas fa-search"
                                    placeholder="Search...">
                        </base-input> -->
                      </div>
                    </div>
                  </div>
                </div>
                <el-table :data="item"
                          header-row-class-name="thead-light"
                          class="table-responsive table-flush">
                  <el-table-column label="No."
                                  min-width="100px"
                                  sortable
                                  prop="no">
                    <template v-slot="{row}">
                        {{ item.indexOf(row) + meta.from }}
                        <!-- {{ row.id }} -->
                    </template>
                  </el-table-column>
                  <el-table-column label="Nama Produk"
                                min-width="300px"
                                prop="nama"
                                sortable>
                    <template v-slot="{row}">
                      {{ row.attributes.nama }}
                    </template>
                  </el-table-column>
                  <el-table-column label="Jumlah Tag"
                                min-width="150px"
                                prop="useby"
                                sortable>
                    <template v-slot="{row}">
                        {{row.relationships.tags.data.length}} Tag
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
                          <!-- <i class="text-white fa fa-edit"></i> Edit -->
                          Kelola Tag
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
                    <!-- <span v-if="selectedRows.length">
                      &nbsp; &nbsp; {{selectedRows.length}} rows selected
                    </span> -->
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
    <form @submit.prevent="">
      <el-dialog :visible.sync="showModalAdd" title="Tambah Data Tag Produk">
        <!-- <transition name="fade" mode="out-in"> -->
          <div key="1" v-if="!isModalProcess">
            <div class="row mb-4">
              <label for="nama" class="col-md-4 col-form-label form-control-label">Nama Produk</label>
              <div class="col-md-8">
                <label class="col-form-label form-control-label">{{ tmpAddData.namaProduk }}</label>
              </div>
            </div>
            <div class="row mb-4">
              <label for="useby" class="col-md-4 col-form-label form-control-label">List Tags</label>
              <div class="col-8">
                <div>
                  <multiselect v-model="tmpAddData.tags" tag-placeholder="Add this as new tag" :searchable="false" placeholder="Add a tag" label="name" track-by="code" :multiple="true" :options="optionstag" :taggable="true" @tag="addTag">
                    <span slot="noOptions">Tidak ada tag untuk ditambahkan.</span>
                  </multiselect>
                </div>
              </div>
            </div>
          </div>
          <div key="2" v-if="isModalProcess" class="text-center p-5" style="display: flex; justify-content: center;">
            <!-- <center> --> -->
              <fulfilling-bouncing-circle-spinner
              :animation-duration="2000"
              :size="60"
              color="#ff1d5e" />
            <!-- </center> --> -->
                <half-circle-spinner
                :animation-duration="1000"
                :size="60"
                color="#ff1d5e" />
              <!-- </center> -->
          </div>
        <!-- </transition> -->
        <template slot="footer" v-if="!isModalProcess">
          <el-button type="secondary" @click="showModalAdd = false">Tutup</el-button>
          <template v-if="optionstag.length != 0">
            <el-button type="success" @click="addData">Tambah</el-button>
          </template>
          <template v-else="">
            <el-button type="success" @click="addData" disabled="">Tambah</el-button>
          </template>
        </template>
      </el-dialog>
    </form>
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
  // import TagsInput from '@/components/Inputs/TagsInput'
  import VueTagsInput from '@johmun/vue-tags-input';
  import Multiselect from 'vue-multiselect'

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
    // TagsInput
    VueTagsInput,
    Multiselect
  },
  data() {
    return {
      item: [],
      dataIncluded: [],
      columnSearched: [
        { name: 'All', value: 'all' },
        { name: 'Judul', value: 'nama' },
        { name: 'Penerima', value: 'useby' },
        // { name: 'Author', value: 'author' },
        // { name: 'E-mail', value: 'email' },
        // { name: 'Dibuat pada', value: 'created_at' }
      ],
      currentColumnSearched: 'all',
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
        per_page: 1,
        from: 1,
        to: 1,
        total: 1,
        last_page: 1
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
        idProduk: 0,
        namaProduk: 'kategori',
        tag: '',
        tags: ['Tag1', 'Tag2'],
      },
      optionstag: []
    };
  },
  computed: {
    ...mapGetters('produk', ['tag_by_produk', 'included_produk']),
    ...mapGetters('subproduk', ['subproduks', 'included']),
    idProduk() {
			return this.$route.params.id
    },
    namaProduk() {
   

      switch(this.$route.params.id) {

        case "1":
        //this.params.id = 'Dana Multiguna'
          return 'Dana Multiguna'
          //break;
        case "2":
       //this.params.id = 'Maxi Travel'
          return 'Maxi Travel'
         // break;
        case "3":
        //this.params.id = 'Maxi Edukasi'
          return 'Maxi Edukasi'
         // break;
        case "4":
       // this.params.id = 'Maxi Usaha'
          return 'Maxi Usaha'
          //break;
        case "5":
       // this.params.id = 'Maxi Sehat'
          return 'Maxi Sehat'
         // break;
        case "6":
        //this.params.id = 'Maxi Griya'
         return 'Maxi Griya'
         // break;
        case "7":
        //this.params.id = 'Maxi Extraguna'
          return 'Maxi Extraguna'
         // break;
        default:
        //this.params.id = 'Maxi'
        return 'Maxi'
         // break;
          //code block
      }
    }
  },
  methods: {
    ...mapActions('produk', [
      'getTagByProduk',
    ]),
    ...mapActions('subproduk', [
      'getSubproduksQueriedTag',
    ]),
    ...mapActions('auth', [
      'checkAuth',
      'refreshToken',
    ]),
    addData() {

    },
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
      data.include = "tags"
      data.produk_id = this.idProduk
      data.pageSize = 10
      data.searchAll = ""
      data.pageNumber = 1
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      let res = JSON.parse(JSON.stringify(await this.getSubproduksQueriedTag(data)));
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.subproduks))
        this.dataIncluded = this.included ? JSON.parse(JSON.stringify(this.included)) : this.included
        // this.item["count"] = res.meta.page.total;
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
      data.include = "tags"
      data.produk_id = this.idProduk
      data.pageSize = 10
      data.searchAll = ""
      data.pageNumber = this.meta.current_page
      data.property = this.columnClicked.property
      data.order = this.columnClicked.order

      let res = await this.getSubproduksQueriedTag(data)
      if (res.name != 'Error') {
        this.item = JSON.parse(JSON.stringify(this.subproduks))
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
        let result = this.included.find(obj => {
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

    async editModal(row) {
      this.showModalAdd = true
      this.isModalProcess = true

      this.optionstag = []

      await this.getTagByProduk(this.idProduk)
      if (this.tag_by_produk) {
        for (var val of this.tag_by_produk) {
          let data = this.included_produk.find(x => x.id == val.attributes.tag_id && x.type == "tags")
          if (data) {
            this.optionstag.push({name: data.attributes.nama, code: data.id})
          }
        }
      }
      
      this.currentRow = JSON.parse(JSON.stringify(row))
      this.tmpAddData.id = this.currentRow.id
      this.tmpAddData.namaProduk = this.currentRow.attributes.nama
      this.tmpAddData.tags = []

      for (var val of this.currentRow.relationships.tags.data) {
        let data = this.included.find(x => x.id == val.id && x.type == "tags")
        if (data) {
          this.tmpAddData.tags.push({name: data.attributes.nama, code: data.id})
        }
      }

      this.isModalProcess = false
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.round() * 10000000))
      }
      this.tmpAddData.tags.push(tag)
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
  },

  async created() {
    await this.permissionAuth()
    this.getData()
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
  /* we defined a custom css class in the data model, now we are using it to style the tag */
  .ti-tag[data-v-61d92e31] {
    padding: 5px;
    font-size: 1.1em;
  }
  .ti-new-tag-input-wrapper input[data-v-61d92e31] {
    font-size: 1.1em;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
