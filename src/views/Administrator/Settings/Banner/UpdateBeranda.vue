<template>
  <div>
    <base-header class="pb-6 " type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-12 col-7">
          <h6 class="h2 d-inline-block mb-0">Perbaharui Halaman Beranda</h6>
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
                  <div class="form-group">
                      <el-radio v-model="form.searchButton" label="1" @change=getData()
                        >Web</el-radio
                      >
                      <el-radio v-model="form.searchButton" label="6" @change=getData()
                        >Mobile Apps</el-radio
                      >
                    </div>
                  <!-- <div class="row">
                      <div class="form-group">
                        <div class="col-12">
                          <div class="row">
                            <div class="col-4 pr-0">
                              <el-select
                              class="select-primary pagination-select"
                              v-model="form.searchButton"
                              placeholder="Pilih.."
                              >
                              <el-option
                              class="select-primary"
                              v-for="option in columnSearched"
                              :value="option.value"
                              :label="option.text"
                              :key="option.value"
                            ></el-option>
                          </el-select>
                        </div>
                        <div class="col-8 pl-1">
                          <b-button class="ml-2" type="primary" @click.stop="searchForm()">Search</b-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
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
                      <template v-if="banner_images" >
                        <template v-for="row in Math.ceil(banner_images.length / 2)">
                          <div class="row" :key="row">
                            <template v-for="val in banner_images.slice((row - 1) * 2, (row - 1) * 2 + 2)">
                              <new-banner-list 
                                :key="val.id" 
                                :val="val"
                                :fileSingle="fileSingle[val.id]"
                                @getData="getData"
                                @showModalProcess="emitModalProcess"/>
                            </template>
                          </div>
                        </template>
                      </template>

                      <!-- <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <base-button block type="primary" @click="updateHalaman">Perbaharui Halaman</base-button>
                          </div>
                        </div>
                      </div> -->
                      <hr class="diver mt-0">

                      <div class="row">
                        <!-- <div class="col-md-12">
                          <div class="form-group">
                            <ValidationProvider>
                              <b-form-group>
                              <label for="page_id" class="form-control-label">Tujuan Upload *</label>
                              <b-form-select
                              id="subject-input-2"
                              name="subject-input-2"
                              v-model="form.subject"
                              :options="subjects"
                              aria-describedby="input-3-live-feedback"
                              placeholder = "Pilih.."
                              ></b-form-select>
                              </b-form-group>
                            </ValidationProvider>
                          </div>
                        </div> -->
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="banner_baru" class="form-control-label">Tambah Banner Baru *</label>
                            <dropzone-file-upload v-model="fileSingleTambah" id="banner_baru" ref="myFile" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"></dropzone-file-upload>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <base-input label="Title Banner Baru *" v-model="alt_image" placeholder=""></base-input>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <base-input label="Link Banner Baru *" v-model="slug" placeholder=""></base-input>
                          </div>
                        </div>
                      </div>
                      <hr class="diver mt-0">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <base-button block type="primary" @click="tambahBanner">Tambah Banner</base-button>
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
  import NewBannerList from '@/components/Inputs/NewBannerList'
  import { mapGetters, mapActions } from 'vuex';
  import swal from 'sweetalert2';
  import { HalfCircleSpinner } from 'epic-spinners'

  const MAX_SIZE = 1000000;
  //const MIN_SIZE = 100000;

  export default {
    components: {
      BaseHeader,
      BaseProgress,
      RouteBreadCrumb,
      DropzoneFileUpload,
      HalfCircleSpinner,
      NewBannerList
    },
    data() {
      return {
        image:{
        size:'',
        },
        imageError:'',
        title_page: '',
        meta_deskripsi: '',
        share_title_page: '',
        share_image_desc: '',

        banner_images: [],

        fileSingle: [],

        alt_image: '',
        slug: '',
        fileSingleTambah: [],

        showModalProcess: false,
        isLoading: false,
        isShow: false,
        isError: false,
        form: {
          subject: null,
          searchButton: "1",
          
        },
        subjects: [
          { value: "1", text: "Web"},
          { value: "6", text: "Apps" }
        ],
      };
    },
    computed: {
      ...mapGetters('banner', ['detail'])
    },
    methods: {
      ...mapActions('banner', [
        'addNewSlider',
        'updateSlider',
        'deleteSlider',
        'updateDetailHalaman',
        'getDetailHalaman',
      ]),
      emitModalProcess (value) {
        this.showModalProcess  = value
      },
      selectedFile() {
      this.imageError = '';
      let file = this.$refs.myFile.files[0];
      if(!file || file.type.indexOf('image/') !== 0) return;
      this.image.size = file.size;
      if(this.image.size > MAX_SIZE) {
        this.imageError = `Size banner terlalu besar (Maksimal size 1Mb).`;
        swal("Gagal",this.imageError,"error");
        this.fileSingleTambah = null;
        return;
      }
      // if(this.image.size < MIN_SIZE) {
      //   this.imageError = `Size banner terlalu kecil (Minimal size 100Kb).`;
      //   swal("Gagal",this.imageError,"error");
      //   return;
      // }
      
      let reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onerror = evt => {
        console.error(evt);
      }
    },
      async getData() {
        this.isLoading = true
        this.isShow = false

        let res = JSON.parse(JSON.stringify(await this.getDetailHalaman(this.form.searchButton)));
        if (res.name != 'Error') {
          let data = JSON.parse(JSON.stringify(this.detail))
          this.title_page = data.attributes.title_page
          this.meta_deskripsi = data.attributes.meta_deskripsi
          this.share_title_page = data.attributes.share_title_page
          this.share_image_desc = data.attributes.share_image_desc
          this.banner_images = res.included
          if (this.banner_images) {
            for (let val of this.banner_images) {
              this.fileSingle[val.id] = val.attributes
            }
            this.banner_images = this.banner_images.reverse()
          }
          

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
          id: 1,
          title_page: this.title_page,
          meta_deskripsi: this.meta_deskripsi,
          share_title_page: this.share_title_page,
          share_image_desc: this.share_image_desc,
        }

        let res = await this.updateDetailHalaman(payload)
        if (res.name == "Error") {
          this.showModalProcess= false

          swal("Gagal", "Gagal mengganti halaman", "error")
          .then(function () {
            // that.getData()
          })
        } else {
          let isError = false
          for (let [index,val] of this.fileSingle.entries()) {
            if (val && val.length != 0) {
              let payload = {
                id: index,
                image: val[0]
              }

              let res2 = await this.updateSlider(payload)
              if (res2.name == "Error") {
                isError = true
                break;
              }
            } 
          }
          this.showModalProcess= false
          
          const that = this
          
          if (isError) {
            swal("Gagal", res.response.status == 413 ? "Gagal mengganti halaman, ukuran file terlalu besar. (maks 5MB)" : "Gagal mengganti halaman", "error")
            .then(function () {
              // that.getData()
            })
          } else {
            swal("Sukses", "Berhasil mengganti halaman", "success")
            .then(function () {
              that.getData()
            })
          }
        }
      },
      async tambahBanner() {

        if (this.banner_images.length == 5) {
          swal("Gagal","Jumlah Banner Yang Diupload Sudah Mencapai Maksimum!","error");
          return;
        }
        if (this.fileSingleTambah == "") {
          swal.fire("Gambar Banner Harus Diupload!", "", "warning");
          return;
        }
        if (this.alt_image == "") {
          swal.fire("Title Banner Harus Diisi!", "", "warning");
          return;
        }
        if (this.slug == "") {
          swal.fire("Link Banner Harus Diisi!", "", "warning");
          return;
        }


        this.showModalProcess= true

        let payload = {
          image: this.fileSingleTambah[0],
          alt_image: this.alt_image,
          slug: this.slug,
          page_id: this.form.searchButton,
        }

        let res = await this.addNewSlider(payload)
        if (res.name == "Error") {
          this.showModalProcess= false
          this.alt_image = ""
          this.slug = ""


          swal("Gagal", "Gagal menambah banner", "error")
          .then(function () {
            // that.getData()
          })
        } else {
          this.showModalProcess= false
          this.alt_image = ""
          this.slug = ""
          const that = this

          swal("Sukses", "Berhasil menambah banner", "success")
          .then(function () {
            that.getData()
          })
        }
      },
      async deleteBanner(id) {
        const that = this
        swal({
          title: 'Apakah anda yakin untuk mengahpus banner ini ?',
          text: "",
          type: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
          cancelButtonText: 'Batal',
          reverseButtons: true
        })
        .then(async (result) => {
          if (result.value) {
            that.showModalProcess = true

            let res = await that.deleteSlider(id)
            if (res.name != 'Error') {
              that.showModalProcess = false
              swal.fire('Banner telah terhapus!', '', 'success')
              that.getData()
            } else {
              that.showModalProcess = false
              swal.fire('Banner gagal dihapus', '', 'error')
              that.getData()
            }
          }
        });
      }
    },
    created() {
      this.getData()
      
    }
  };
</script>
<style></style>