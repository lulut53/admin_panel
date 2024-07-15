<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-12 col-7">
          <h6 class="h2 d-inline-block mb-0">Perbaharui Halaman Mitra Bisnis</h6>
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
                  <template>
                    <form action="">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                              <base-input label="Judul Halaman" v-model="title_page" placeholder=""/>
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div class="form-group">
                              <base-input label="Meta Deskripsi" v-model="meta_deskripsi" placeholder=""/>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                              <base-input label="Judul Social Share" v-model="share_title_page" placeholder=""/>
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div class="form-group">
                              <base-input label="Deskripsi Social Share" v-model="share_image_desc" placeholder=""/>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <base-input v-model="url_youtube">
                                  <template slot="prepend">https://www.youtube.com/watch?v=</template>
                            </base-input>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <new-banner-single
                          :title="'Banner Mitra Bisnis'"
                          :val="fileSingle"
                          :fileSingle="fileSingle"
                          @getData="getData"
                          @showModalProcess="emitModalProcess"/>
                      </div>
                      <hr class="diver mt-0">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <base-button block type="primary" @click="updateHalaman">Perbaharui Halaman</base-button>
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
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
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
  // Components
  import BaseHeader from '@/components/BaseHeader';
  import BaseProgress from '@/components/BaseProgress';
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import DropzoneFileUpload from '@/components/Inputs/DropzoneFileUpload'
  import NewBannerSingle from '@/components/Inputs/NewBannerSingle'
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
      NewBannerSingle
    },
    data() {
      return {
        title_page: '',
        meta_deskripsi: '',
        share_title_page: '',
        share_image_desc: '',
        url_youtube: '',
        fileSingle: [],

        showModalProcess: false,
        isLoading: false,
        isShow: false,
        isError: false,
      };
    },
    computed: {
      ...mapGetters('banner', ['detail']),
    },
    methods: {
      ...mapActions('banner', [
        'updateDetailHalaman',
        'getDetailHalaman',
      ]),
      emitModalProcess (value) {
        this.showModalProcess  = value
      },
      async getData() {
        this.isLoading = true
        this.isShow = false

        let res = JSON.parse(JSON.stringify(await this.getDetailHalaman(5)));
        if (res.name != 'Error') {
          let data = JSON.parse(JSON.stringify(this.detail))
          this.title_page = data.attributes.title_page
          this.meta_deskripsi = data.attributes.meta_deskripsi
          this.share_title_page = data.attributes.share_title_page
          this.share_image_desc = data.attributes.share_image_desc
          this.url_youtube = data.attributes.url_youtube ? data.attributes.url_youtube.slice(32,) : ""
          this.fileSingle = res.included[0]

          this.isShow = true
          this.isLoading = false
        } else {
          this.isError = true
          this.isLoading = false
        }
      },
      async updateHalaman() {
        this.showModalProcess= true

        let payload = {
          id: 5,
          title_page: this.title_page,
          meta_deskripsi: this.meta_deskripsi,
          share_title_page: this.share_title_page,
          share_image_desc: this.share_image_desc,
          url_youtube: "https://www.youtube.com/watch?v=" + this.url_youtube
        }

        if (this.fileSingle) payload.share_image_page = this.fileSingle[0]

        let res = await this.updateDetailHalaman(payload)
        if (res.name == "Error") {
          this.showModalProcess= false

          swal("Gagal", res.response.status == 413 ? "Gagal mengganti halaman, ukuran file teralu besar. (maks 5MB)" : "Gagal mengganti halaman", "error")
          .then(function () {
            // that.getData()
          })
        } else {
          this.showModalProcess= false
          
          const that = this

          swal("Sukses", "Berhasil mengganti halaman", "success")
          .then(function () {
            that.getData()
          })
        }
      }
    },
    created() {
      this.getData()
    }
  };
</script>
<style></style>
