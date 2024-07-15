<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-12 col-7">
          <h6 class="h2 d-inline-block mb-0">Ubah Gambar</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item">Settings</li>
              <li class="breadcrumb-item" aria-current="page">Change Banner</li>
            </ol>
          </nav>
          <div class="pt-2">
            <router-link to="/administrator/settings/banner" class="btn btn-sm btn-primary">
              <i class="ni ni-bold-left" aria-hidden="true"></i>
              <span class="hidden-sm-down">Kembali</span>
            </router-link>
          </div>
        </div>

      </div>

    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">

      <div class="row-md-12">
          <div class="card border-0">
            <!-- <div class="card-header">
              <h2 class="h2 card-title text-default mb-0">Ubah Detail Halaman</h2>
            </div> -->
            <div class="card-body">

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

              <template>
              <form action="">
              <div class="row">
                <new-banner
                  :title="'Banner AXI ' + namaMenu"
                  :val="fileSingle"
                  :fileSingle="fileSingle"
                  @getData="getData"
                  @showModalProcess="emitModalProcess"/>
              </div>
              <hr class="diver mt-0">
              <div class="row">
                 <div class="col-md-12">
                  <div class="form-group">
                    <base-button block type="primary" @click="updateBanner">Perbaharui Halaman</base-button>
                  </div>
                </div>
              </div>
              </form>

              </template>
            </div>
              </transition>
            </div>
          </div>
      </div>

    </div>
    <modal :show.sync="showModalProcess" :clickToClose="false">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <h3 class="text-center" style="display: flex; justify-content: center;">Loading</h3>
      <br/>
      <half-circle-spinner
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
      />
    </modal>
  </div>
</template>
<script>
  // Components
  import BaseHeader from '@/components/BaseHeader';
  import BaseProgress from '@/components/BaseProgress';
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import DropzoneFileUpload from '@/components/Inputs/DropzoneFileUpload'
  import NewBanner from '@/components/Inputs/NewBanner'
  import { mapGetters, mapActions } from 'vuex';
  import swal from 'sweetalert2';
  import { HalfCircleSpinner } from 'epic-spinners'

  export default {
    components: {
      BaseHeader,
      BaseProgress,
      RouteBreadCrumb,
      DropzoneFileUpload,
      HalfCircleSpinner,
      NewBanner
    },
    data() {
      return {
        fileSingle: [],
        showModalProcess: false,
        isLoading: false,
        isShow: false,
        isError: false
      };
    },
    methods: {
      ...mapActions('banner', [
        'updateBannerHalaman',
        'getDetailBanner',
      ]),
      emitModalProcess (value) {
        this.showModalProcess  = value
      },
      async getData() {
        this.isLoading = true
        this.isShow = false

        let res = JSON.parse(JSON.stringify(await this.getDetailBanner(this.$route.params.id)));
        
        if (res.name != 'Error') {
          // let data = JSON.parse(JSON.stringify(this.detail))
          // this.title_page = data.attributes.title_page
          // this.meta_deskripsi = data.attributes.meta_deskripsi
          // this.share_title_page = data.attributes.share_title_page
          // this.share_image_desc = data.attributes.share_image_desc
          // this.url_youtube = data.attributes.url_youtube ? data.attributes.url_youtube.slice(32,) : ""
          
          this.fileSingle = res

          this.isShow = true
          this.isLoading = false
        } else {
          this.isError = true
          this.isLoading = false
        }
      },
      async updateBanner() {
        this.showModalProcess= true

        let payload = {
          id: this.$route.params.id,
          banner: this.fileSingle
        }

        let res = await this.updateBannerHalaman(payload)
        if (res.name == "Error") {
          this.showModalProcess= false

          swal("Gagal", res.response.status == 413 ? "Gagal mengganti banner, ukuran file teralu besar. (maks 5MB)" : "Gagal mengganti banner", "error")
          .then(function () {
            // that.getData()
          })
        } else {
          this.showModalProcess= false
          
          // const that = this

          swal("Sukses", "Berhasil mengganti banner", "success")
          .then(function () {
            // that.getData()
          })
        }
      }
    },
    computed: {
      namaMenu() {
        if (this.$route.params.id == 1) {
          return "Dana Tunai (Landscape)"
        } else if (this.$route.params.id == 2) {
          return "Menjadi Mitra Bisnis (Landscape)"
        } else if (this.$route.params.id == 3) {
          return "Dana Tunai (Potrait)"
        } else if (this.$route.params.id == 4) {
          return "Menjadi Mitra Bisnis (Potrait)"
        }
      },
    },
    created() {
      this.getData()
    }
  };
</script>
<style></style>
