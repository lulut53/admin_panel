<template>

  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-8 col-8">
          <h6 class="h2 d-inline-block mb-0">Detail Produk MAXI Travel</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item" aria-current="page">MAXI Travel</li>
              <li class="breadcrumb-item active" aria-current="page">{{idProduk}}</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-4 pt-2 text-right">
          <!-- <router-link to="" class="btn  btn-info">
            <i class="fa fa-edit" aria-hidden="true"></i>
            <span class="hidden-sm-down">Ubah Status</span>
          </router-link> -->
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6 small">
      <card>
        <div class="row">
          <div class="col-4">
            <p class="font-weight-bold">Informasi Produk</p>
          </div>
          <div class="col-8 pb-3 text-right" v-if="isShow">
            <base-dropdown class="mr-3">
              <base-button size="md" slot="title-container" type="primary" block class="dropdown-toggle">
              <i class="fa fa-edit" aria-hidden="true"></i>
                Ubah Status
              </base-button>
              <a @click="handleCommand('tidak_disetujui')" class="dropdown-item">Tidak Disetujui</a>
              <a @click="handleCommand('disetujui')" class="dropdown-item">Disetujui</a>
            </base-dropdown>
            <base-button size="md" type="info" @click="editModal">
              Edit Data
            </base-button>
            <base-button size="md" type="success" @click="showModalFoto = true">
              Edit Foto & Brosur
            </base-button>
          </div>
        </div>

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
            <div class="row">
              <div class="col-2">
                <p>Nama Program </p>
              </div>
              <div class="col-0">
                <p>:</p>
              </div>
              <div class="col-9">
                <p>{{ data.attributes.nama }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Kategori Produk</p>
              </div>
              <div class="col-0">
                <p>:</p>
              </div>
              <div class="col-9">
                <p>{{ getIncluded("products", data.relationships.produk.data, "nama") }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Harga</p>
              </div>
              <div class="col-0">
                <p>:</p>
              </div>
              <div class="col-9">
                <p>Rp. {{ data.attributes.harga }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Deskripsi Singkat</p>
              </div>
              <div class="col-0">
                <p>:</p>
              </div>
              <div class="col-9">
                <p>{{ data.attributes.excerpt }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Deskripsi</p>
              </div>
              <div class="col-0">
                <p>:</p>
              </div>
              <div class="col-9">
                <p><span v-html="data.attributes.deskripsi"></span></p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Brosur</p>

              </div>
              <div class="col-0">
                <p>:</p>
              </div>
              <div class="col-9" v-if="data.attributes.brosur">
                <p><button class="btn btn-sm btn-orange" @click.prevent="downloadBrosur(data.attributes.brosur)">Download</button></p>
              </div>
              <div class="col-9" v-else>
                <p><button class="btn btn-sm btn-orange" @click.prevent="downloadBrosur(data.attributes.brosur)" disabled>Download</button></p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Gambar Produk</p>

              </div>
              <div class="col-0">
                <p>:</p>
              </div>
              <div class="col-9">
                <template v-if="data.attributes.image">
                  <img v-bind:src="data.attributes.image" alt="" style="width:50%" class="img-fluid">
                </template>
                <template v-if="!data.attributes.image">
                  <img src="/images/image-empty-default.png" class="img-fluid" alt="" height="140">
                </template>

              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-2">
                <p>Tag</p>
              </div>
              <div class="col-0">
                <p>:</p>
              </div>
              <div class="col-9">
                <div v-if="subproduk.relationships.tags.data.length != 0">
                  <!-- <template v-for="val in subproduk.relationships.tags.data"> -->
                    <badge rounded class="mr-1" type="default" size="lg" :key="val.id" v-for="val in subproduk.relationships.tags.data">{{ getIncluded("tags", val, "nama") }}</badge>
                  <!-- </template> -->
                </div>
                <div v-else>
                  <p>Belum ada tag</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Dibuat Pada</p>
              </div>
              <div class="col-0">
                <p>:</p>
              </div>
              <div class="col-9">
              <p>{{ data.attributes['created-at'] | convertDate }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Status Pengajuan</p>
              </div>
              <div class="col-0">
                <p>:</p>
              </div>
              <div class="col-9">
              <p>{{ data.attributes.status_id == 10 ? 'Disetujui' : data.attributes.status_id == 11 ? 'Tidak disetujui' : 'Belum disetujui' }}</p>
              </div>
            </div>
          </div>
        </transition>
      </card>
    </div>

    <el-form ref="form" label-width="160px">
      <el-dialog width="75%" title="Edit Data" :visible.sync="showModal" v-if="isShow">
        <div key="1" v-if="!isModalProcess">
          <!-- Informasi Perusahaan -->
          <div class="form-group">
            <div class="row mb-4">
              <label class="col justify-content-center"><b>Informasi Produk</b></label>
            </div>
            <div class="row mb-4">
              <label class="col-md-4 col-form-label form-control-label">Nama Program</label>
              <div class="col-md-8">
                <el-input v-model="subproduk.attributes.nama" />
              </div>
            </div>
            <div class="row mb-4">
              <label class="col-md-4 col-form-label form-control-label">Kategori Produk</label>
              <div class="col-md-8">
                <el-select 
                  v-model="kategoriValue"
                  filterable
                  remote 
                  reserve-keyword 
                  placeholder="Ketik Kategori Produk Anda"
                  :remote-method="kategoriRemoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in optionsKategori"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                    >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="row mb-4">
              <label class="col-md-4 col-form-label form-control-label">Harga</label>
              <div class="col-md-8">
                <el-input v-model="subproduk.attributes.harga" type="number" />
              </div>
            </div>
            <div class="row mb-4">
              <label class="col-md-4 col-form-label form-control-label">Deskripsi Singkat</label>
              <div class="col-md-8">
                <el-input v-model="subproduk.attributes.excerpt" />
              </div>
            </div>
            <div class="row mb-4">
              <label class="col-md-4 col-form-label form-control-label">Deskripsi</label>
              <div class="col-md-8">
                <!-- <textarea class="form-control" name="" id="alamat" cols="30" rows="5" v-model="subproduk.attributes.deskripsi"></textarea> -->
                <ckeditor :editor="editor" v-model="subproduk.attributes.deskripsi" :config="editorConfig" class="form-control"></ckeditor>
              </div>
            </div>
            <div class="row mb-4">
              <label class="col-md-4 col-form-label form-control-label">List Tags</label>
              <div class="col-8">
                <div>
                  <multiselect v-model="tags" tag-placeholder="Add this as new tag" :searchable="false" placeholder="Add a tag" label="name" track-by="code" :multiple="true" :options="optionstag" :taggable="true" @tag="addTag">
                    <span slot="noOptions">Tidak ada tag untuk ditambahkan.</span>
                  </multiselect>
                </div>
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
        <!-- Lampiran -->
        <template slot="footer" v-if="!isModalProcess">
          <!-- <el-form-item> -->
            <el-button type="secondary" @click="showModal = false">Tutup</el-button>
            <el-button type="success" @click="simpanData">Simpan</el-button>
          <!-- </el-form-item> -->
        </template>
      </el-dialog>
    </el-form>

    <el-form ref="form" label-width="160px">
      <el-dialog title="Edit Foto" :visible.sync="showModalFoto" v-if="isShow">
        <div key="1" v-if="!isModalProcess">  
          <!-- Foto Profil -->
          <div class="form-group">
            <div class="row mt-2 mb-4">
              <label class="col-md-4 col-form-label form-control-label">Brosur</label>
              <div class="col-md-8">
                <file-input @change="brosurChange" accept=".pdf, .PDF"/>
              </div>
            </div>
            <!-- <div class="row">
              <label class="col-md-4 col-form-label form-control-label"></label>
              <div class="col-md-8 mt-2 mb-4">
                <img :src="imagePreview" v-if="imagePreview" width="200px">
              </div>
            </div> -->
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label">Gambar Produk</label>
              <div class="col-md-8">
                <file-input @change="productPhotoChange" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"/>
              </div>
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label"></label>
              <div class="col-md-8 mt-2 mb-4">
                <img :src="productPreview" v-if="productPreview" width="200px" alt="">
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
        <!-- Lampiran -->
        <template slot="footer" v-if="!isModalProcess">
          <el-form-item>
            <el-button type="secondary" @click="showModalFoto = false">Tutup</el-button>
            <el-button type="success" @click="simpanFoto">Simpan</el-button>
          </el-form-item>
        </template>
      </el-dialog>
    </el-form>

    <modal :show.sync="showModalProcess" :clickToClose="false">
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
import { Button, Icon, Input, Dialog, Form, FormItem, Select, Option, Table, TableColumn } from 'element-ui';
import { HalfCircleSpinner } from 'epic-spinners'
import { mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
import 'moment/locale/id';
import swal from 'sweetalert2';
import axios from 'axios'
import Multiselect from 'vue-multiselect'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Input.name]: Input,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    HalfCircleSpinner,
    Multiselect
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // CKEditor Custom Config
        toolbar: [ 
          'heading', 
          '|', 
          'bold', 
          'italic', 
          'link', 
          'bulletedList', 
          'numberedList', 
          'blockQuote', 
          '|', 
          'undo', 
          'redo' 
        ]
      },
      title: "details",
      tmpBrosur: "",
      tmpProduct: "",
      productPreview: null,
      showModalProcess: false,
      showModal: false,
      showModalFoto: false,
      isLoading: true,
      isError: false,
      isShow: false,
      isModalProcess: false,
      data: {},
      tempProduk: {},
      // Data Kategori
      optionsKategori:[],
      kategoriValue: '',
      kategorilist: [],
      loading: false,
      tags: [],
      optionstag: []
    };
  },
  computed: {
    idProduk() {
			return this.$route.params.id
    },
    ...mapGetters('subproduk', ['subproduk','included']),
    ...mapGetters('produk', ['produks','tag_by_produk', 'included_produk']),
  },
  methods: {
    UrlHealer(dirtyUrl) {
      return sanitizeUrl(dirtyUrl);
  },
    ...mapActions('subproduk', [
      'getSubproduk',
      'updateSubProduk',
      'updateFotoBrosur',
      'getDownloadBrosur'
    ]),
    ...mapActions('produk', [
      'getProduks',
      'getTagByProduk',
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
      if (window.localStorage.getItem('role') != "Super Admin" && window.localStorage.getItem('role') != "Mitra MAXI" && window.localStorage.getItem('role') != "Tasya Area") {
        swal("Error", "Role anda tidak memiliki akses untuk melihat halaman ini", "error")
        this.$router.push('/administrator/dashboard')
      }
    },

    async kategoriRemoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.optionsKategori = this.kategorilist.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.optionsKategori = []
      }
    },


    /**
     * --------------------------------------------------
     * Data Handling here
     * --------------------------------------------------
     */

    async getData() {
      this.isLoading = true
      this.isShow = false

      Promise.all([
        await this.getSubproduk(this.idProduk),
        this.getProduks(),
        // this.getSubProduk(this.idMaxiDetail)
      ]).then(res => {
        // ---- Kategori dropdown ----
        this.kategorilist = this.produks.map(item => {
          return { value: item.id, label: item.attributes.nama }
        })
        this.optionsKategori = this.kategorilist
        this.kategoriValue = this.subproduk.attributes.produk_id.toString()

        // this.maxiData = this.packData();
        this.data = JSON.parse(JSON.stringify(this.subproduk));
        this.tempProduk = this.included.find(x => x.type == "products")

        this.isLoading = false
        this.isShow = true
      }).catch(error => {
        this.isLoading = false
        this.isError = true
      })
    },

    getIncluded(type, detail, attr) {
      if (detail == null) {
        return ''
      } else {
        var result = this.included.find(obj => {
          return (obj.type == type && obj.id == detail.id)
        })
        return result.attributes[attr]
      }
    },

    async editModal() {
      this.showModal = true
      this.isModalProcess = true

      this.optionstag = []

      await this.getTagByProduk(2)
      if (this.tag_by_produk) {
        for (var val of this.tag_by_produk) {
          let data = this.included_produk.find(x => x.id == val.attributes.tag_id && x.type == "tags")
          if (data) {
            this.optionstag.push({name: data.attributes.nama, code: data.id})
          }
        }
      }
      
      this.tags = []
      for (var val of this.subproduk.relationships.tags.data) {
        let data = this.included.find(x => x.id == val.id && x.type == "tags")
        if (data) {
          this.tags.push({name: data.attributes.nama, code: data.id})
        }
      }

      this.isModalProcess = false
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.round() * 10000000))
      }
      this.tags.push(tag)
    },

    async simpanData() {
      this.isModalProcess= true

      // --- delete tidak perlu
      // AXI
      let payloadSubProduk = JSON.parse(JSON.stringify(this.subproduk))
      payloadSubProduk.type = 'sub_products'
      payloadSubProduk.attributes.produk_id = this.kategoriValue
      delete payloadSubProduk.relationships
      payloadSubProduk.relationships = {
        tags: {
          data: []
        }
      }

      for (var val of this.tags) {
        payloadSubProduk.relationships.tags.data.push({type: "tags", id: val.code})
      }


      try {
        await Promise.all([
          this.updateSubProduk(payloadSubProduk),
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
    },

    async simpanFoto() {
      this.isModalProcess = true

      if (this.tmpBrosur == "" && this.tmpProduct == "") {
        this.showModalFoto = false
        this.isModalProcess= false
        swal("Gagal", "Form ubah foto belum diisi", "error")
        .then(function () {
          // that.getData()
        })
      } else {
        let payload = JSON.parse(JSON.stringify(this.subproduk))
        payload.type = 'sub_products'
        payload.brosur = this.tmpBrosur == "" ? null : this.tmpBrosur 
        payload.image = this.tmpProduct == "" ? null : this.tmpProduct
        delete payload.relationships

        let res = JSON.parse(JSON.stringify(await this.updateFotoBrosur(payload)))
        this.showModalFoto = false
        this.isModalProcess= false

        // Reset form
        this.tmpBrosur = ""
        this.productPreview = "";
        this.tmpProduct = ""

        if (res.name == 'Error') {
          swal("Gagal", res.response.status == 413 ? "Gagal mengganti foto / brosur, ukuran file teralu besar. (maks 5MB)" : "Gagal mengganti foto / brosur", "error")
          .then(function () {
            // that.getData()
          })
        } else {
          const that = this
          swal("Sukses", "Berhasil mengganti foto / brosur", "success")
          .then(function () {
            that.getData()
          })
        }
      }
    },

    handleCommand(command) {
      command = command.replace("_", ' ')
      let payload = JSON.parse(JSON.stringify(this.subproduk))

      const that = this
      swal({
        title: 'Apakah anda yakin untuk mengubah status pengajuan produk menjadi ' + command + '?',
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
          if (command == 'disetujui') payload.attributes.status_id = 10
          else if (command == 'tidak disetujui') payload.attributes.status_id = 11

          payload.type = 'sub_products'
          delete payload.relationships

          that.showModalProcess = true
          
          const res = await that.updateSubProduk(payload);
          that.showModalProcess = false

          if (res.name != 'Error') {
            swal.fire('Status telah terubah!', '', 'success')
            
            that.getData()
          } else {
            that.showModalProcess = false
            swal.fire('Status gagal diubah', '', 'error')
          }
        }
      });
    },

    /**
     * ----------------------------------------
     * End of data handling
     * ----------------------------------------
     */

    // Methods below for image preview
    brosurChange(files) {
      this.tmpBrosur = files[0]
      // this.imagePreview = URL.createObjectURL(files[0]);
    },
    productPhotoChange(files) {
      this.tmpProduct = files[0]
      this.productPreview = URL.createObjectURL(files[0]);
    },
    
    downloadBrosur(url) {
      this.getDownloadBrosur(url)
    }
  },
  filters: {
    convertDate(date) {
      return moment(date).format('LLLL');
    },
  },
  async created() {
    await this.permissionAuth()
    this.getData()
  },
 
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>