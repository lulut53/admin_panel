<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-8 col-8">
          <h6 class="h2 d-inline-block mb-0">Edit Artikel</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/contents/news">Konten - Artikel & Berita</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Edit Artikel {{ idArtikel }}</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-4 pt-2 text-right">
          <router-link :to="{ name: 'artikel berita'}" class="btn btn-xl btn-primary">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            <span class="hidden-sm-down">Kembali</span>
          </router-link>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <card>
        <transition name="fade" mode="out-in">
          <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content: center;">
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
              <div style="display: flex; margin-top: 30px !important; justify-content: center;"></div>
              <h1 class="text-center">Error, silahkan coba lagi.</h1>
            <!-- </center> -->
          </div>
          <div key="2" v-if="isShow">
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="judul">Judul Artikel *</label>
                <input type="text" name="judul" id="judul" placeholder="Judul artikel Anda" class="form-control" required v-model="tmpAddData.nama" />
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="imgpreview">Gambar Artikel *</label> <br>
                    <img id="imgpreview" :src="gambarPreview" v-if="gambarPreview" width="200px" class="pb-2" alt="">
                    <div class="custom-file">
                      <file-input @change="gambarChange" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="bannerpreview">Gambar Banner *</label> <br>
                    <img id="bannerpreview" :src="bannerPreview" v-if="bannerPreview" width="200px" class="pb-2" alt="">
                    <div class="custom-file">
                      <file-input @change="bannerChange" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="kategori">Kategori *</label>
                    <el-select
                      class="select-primary pagination-select"
                      v-model="tmpAddData.kategori_id"
                      placeholder="Pilihan kategori"
                    >
                      <el-option
                        class="select-primary"
                        v-for="item in options"
                        :key="item.id"
                        :value="item.id"
                        :label="item.attributes.nama"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="slug">Slug *</label>
                    <input type="text" name="slug" id="slug" class="form-control" placeholder="Slug" v-model="tmpAddData.slug" required />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="status">Status *</label>
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
              <div class="form-group">
                <label for="excerpt">Excerpt *</label>
                <!-- <input type="text" name="excerpt" id="excerpt" class="form-control" placeholder="Excerpt" required /> -->
                <textarea v-model="tmpAddData.excerpt" name="excerpt" id="excerpt" cols="30" rows="7" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <label for="editor">Artikel *</label>
                <ckeditor :editor="editor" v-model="tmpAddData.deskripsi" :config="editorConfig" class="form-control"></ckeditor>
              </div>
              <div class="form-group">
                <el-button type="success" @click="submit">Kirim</el-button>
              </div>
            </form>
          </div>
        </transition>
      </card>
    </div>
    <modal :show.sync="showModalProcess" :clickToClose="false">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <div style="display: flex; margin-top: 30px !important; justify-content: center;"></div>
      <h3 class="text-center">Loading</h3>
      <br/>
      <!-- <center> -->
        <half-circle-spinner
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
      />
    <!-- </center> -->
    </modal>
  </div>
</template>

<script>
import { Select, Option, Button } from 'element-ui';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert2';
import { mapGetters, mapActions } from 'vuex'
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  components: {
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    HalfCircleSpinner,
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
      tmpAddData: {
        nama: '',
        slug: '',
        banner: '',
        image: '',
        excerpt: '',
        deskripsi: '',
        kategori_id: '',
        user_id: '',
        status_id: '',
      },
      options: [],
      optionsStatus: [
        {
          id: 21,
          attributes: {
            nama: 'Unpublish'
          }
        },
        {
          id: 22,
          attributes: {
            nama: 'Publish'
          }
        }
      ],
      showModalProcess: false,
      isLoading: true,
      isError: false,
      isShow: false,
      gambarPreview: null,
      bannerPreview: null,
    }
  },
  computed: {
    idArtikel() {
      return this.$route.params.id
    },
    ...mapGetters('kategori', ['kategoris']),
    ...mapGetters('berita', ['berita','included']),
  },
  methods: {
    ...mapActions('auth', [
      'checkAuth',
      'refreshToken',
    ]),
    ...mapActions('kategori', [
      'getKategoris',
    ]),
    ...mapActions('berita', [
      'getBerita',
      'updateBerita',
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
    async getData() {
      this.isLoading = true
      this.isShow = false

      let res = await this.getBerita(this.idArtikel)
      if (res.name != 'Error') {
        const dataBerita = JSON.parse(JSON.stringify(this.berita))

        this.tmpAddData = {
          nama: dataBerita.attributes.nama,
          slug: dataBerita.attributes.slug,
          banner: dataBerita.attributes.banner,
          image: dataBerita.attributes.image,
          excerpt: dataBerita.attributes.excerpt,
          deskripsi: dataBerita.attributes.deskripsi,
          kategori_id: dataBerita.relationships.category.data.id,
          user_id: dataBerita.attributes.user_id,
          status_id: parseInt(dataBerita.relationships.status.data.id),
        }
        this.gambarPreview = dataBerita.attributes.image
        this.bannerPreview = dataBerita.attributes.banner

        await this.getKategoris()
        this.options = this.kategoris

        this.isLoading = false
        this.isShow = true
      } else {
        this.isLoading = false
        this.isError = true
      }

    },
    async submit() {
      this.showModalProcess = true

      if (this.tmpAddData.image == this.berita.attributes.image) this.tmpAddData.image = null
      if (this.tmpAddData.banner == this.berita.attributes.banner) this.tmpAddData.banner = null
      this.tmpAddData.id = this.idArtikel

      let res = await this.updateBerita(this.tmpAddData)

      this.showModalProcess = false

      if (res.name != 'Error') {
        const that = this
        swal( 'Berhasil', 'Berhasil mengubah artikel', 'success' )
        .then((result) => {
          that.getData()
        });
      } else {
        swal( 'Gagal', res.response.status == 413 ? "Gagal mengubah artikel, ukuran file teralu besar. (maks 5MB)" : 'Gagal mengubah artikel', 'error' )
        .then((result) => {
          // that.getData()
        });
      }
    },
    gambarChange(files) {
      this.tmpAddData.image = files[0]
      this.gambarPreview = URL.createObjectURL(files[0]);
    },
    bannerChange(files) {
      this.tmpAddData.banner = files[0]
      this.bannerPreview = URL.createObjectURL(files[0]);
    },
  },
  async created() {
    await this.permissionAuth()
    this.getData()
  }
}
</script>

<style>
  .ck-editor__editable {
    min-height: 500px;
   }
</style>
