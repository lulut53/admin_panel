<template>
  <div>

    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Profile</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links ">
              <li class="breadcrumb-item"><router-link to="/"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><a href="#">Administrator</a></li>
              <li class="breadcrumb-item active" aria-current="page">Profile</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-8 order-xl-1">
          <card>
            <transition name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 30px !important; justify-content: center;">
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
                <ValidationObserver v-slot="{invalid}" ref="editForm">
                  <form @submit.prevent="simpanData">
                    <div class="pl-lg-0">
                      <div class="row">
                        <div class="col-lg-6">
                          <base-input
                            type="text"
                            label="Nama"
                            placeholder="Nama"
                            v-model="dataUser.attributes.nama"
                          >
                          </base-input>
                        </div>
                        <div class="col-lg-6">
                          <ValidationProvider 
                            name="E-mail" 
                            :rules="{
                              required: true,
                              regex: /^[\w\.-]+@([\w\-]+\.)+[\w]{2,4}$/
                            }"
                            v-slot="{ errors }">
                            <base-input
                              type="email"
                              label="Email address"
                              placeholder="mike@email.com"
                              v-model="dataUser.attributes.email"/>
                            <span class="error">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>

                    <div class="pl-lg-0">
                      <div class="row">
                        <div class="col-md-12">
                          <base-input
                            type="text"
                            label="Alamat"
                            placeholder="Home Address"
                            v-model="dataUser.attributes.alamat.attributes.jalan"
                          >
                          </base-input>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6">
                          <ValidationProvider 
                            name="Nomor HP" 
                            :rules="{
                              required: true,
                              numeric: true,
                              min: 9,
                              max: 16,
                              regex: /^62[0-9]+$/
                            }"
                            v-slot="{ errors }">
                            <base-input
                              type="text"
                              label="No. HP"
                              placeholder="No HP"
                              v-model="dataUser.attributes.no_hp"/>
                            <span class="error">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="col-lg-6">
                          <base-input
                            type="text"
                            label="Jabatan"
                            placeholder="Jabatan"
                            v-model="dataUser.role"
                            disabled
                          >
                          </base-input>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-6">
                          
                          <label class="form-control-label"> Area </label>
                          <div class="has-label form-group">
                            <el-select 
                              v-model="areaValue"
                              filterable
                              remote 
                              reserve-keyword 
                              placeholder="Ketik Area Anda"
                              :remote-method="areaRemoteMethod"
                              :loading="loading">
                              <el-option
                                v-for="item in optionsArea"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                                >
                              </el-option>
                            </el-select>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <!-- <base-input
                            type="text"
                            label="Cabang"
                            placeholder="Cabang"
                            v-model="user.cabang"
                          >
                          </base-input> -->
                          <label class="form-control-label"> Cabang </label>
                          <div class="has-label form-group">
                            <el-select 
                              v-model="cabangValue"
                              filterable
                              remote 
                              reserve-keyword 
                              placeholder="Ketik Cabang Anda"
                              :remote-method="cabangRemoteMethod"
                              :loading="loading">
                              <el-option
                                v-for="item in optionsCabang"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                                >
                              </el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <br/>
                      <div class="row">
                        <div class="col-12">
                          <base-button class="btn btn-md btn-orange" @click="simpanData" :disabled="invalid">
                            Simpan
                          </base-button>
                        </div>
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </transition>
          </card>
        </div>
        <div class="col-xl-4 order-xl-2">
          <div class="card card-profile">
            <transition name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 40px !important; justify-content: center;">
                <br>
                <!-- <center> -->
                  <half-circle-spinner
                  :animation-duration="1000"
                  :size="60"
                  color="#ff1d5e"
                />
              <!-- </center> -->
              </div>
              <div key="2" v-if="isShow">
                <div class="row justify-content-center">
                  <div class="col-lg-3 order-lg-2">
                    <br><br><br><br>
                    <div class="card-profile-image">
                      <a href="#">
                        <img :src="foto" class="rounded-circle" alt ="">
                      </a>
                    </div>
                  </div>
                </div>

                <br/><br/><br/>

                <div class="card-body pt-0">
                  <br/>

                  <collapse>
                    <collapse-item name="1">
                      <h5 slot="title" class="mb-0">Ubah Password</h5>
                        <form @submit.prevent="ubahPassword">
                          <div class="pl-lg-0">
                              <div class="row-lg-6">
                                <base-input
                                  type="password"
                                  label="Password Lama"
                                  placeholder="Ketikkan password lama"
                                  v-model="password.old"
                                >
                                </base-input>
                              </div>
                              <div class="row-lg-6">
                                <base-input
                                  type="password"
                                  label="Password Baru"
                                  placeholder="Ketikkan password baru"
                                  v-model="password.new"
                                >
                                </base-input>
                              </div>
                              <div class="row-lg-6">
                                <base-input
                                  type="password"
                                  label="Ulangi Password Baru"
                                  placeholder="Ulangi password baru"
                                  v-model="password.newConfirm"
                                >
                                </base-input>
                              </div>
                              <base-button class="btn btn-md btn-orange" @click="ubahPassword">
                                <!-- <i class="ni ni-folder-17" aria-hidden="true"></i> -->
                                <!-- <span class="hidden-sm-down">Semua Pengajuan</span> -->
                                Simpan
                              </base-button>
                          </div>
                        </form>

                    </collapse-item>
                  </collapse>
                  <br>
                  <collapse>
                    <collapse-item name="1">
                      <h5 slot="title" class="mb-0">Ubah Foto</h5>
                        <form @submit.prevent="simpanFoto">
                          <div class="pl-lg-0">
                              <div class="row-lg-6">
                                <file-input class="form-group" @change="fotoProfilChange" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"></file-input>
                              </div>
                              <br>
                              <base-button type="primary" @click="simpanFoto">
                                <!-- <i class="ni ni-folder-17" aria-hidden="true"></i> -->
                                <!-- <span class="hidden-sm-down">Semua Pengajuan</span> -->
                                Simpan
                              </base-button>
                          </div>
                        </form>

                    </collapse-item>
                  </collapse>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="showModalLoading">
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
    <!-- </center> -->
      </div>
    </modal>
  </div>
</template>
<script>
  import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
  import id from 'vee-validate/dist/locale/id.json'
  import * as Rules from 'vee-validate/dist/rules'
  import Collapse from '@/components/Collapse/Collapse'
  import CollapseItem from '@/components/Collapse/CollapseItem'
  import { mapGetters, mapActions } from 'vuex'
  import swal from 'sweetalert2'
  import { HalfCircleSpinner } from 'epic-spinners'
  import { Select, Option } from 'element-ui';

  for (var rule in Rules) {
    extend(rule, Rules[rule])
  }

  localize('id', id)
  localize({
    id: {
      fields: {
        'Nomor HP': {
          regex: "Format Nomor HP salah. Contoh: (6281234567890)"
        }
      }
    }
  })

  export default {
    components: {
      Collapse,
      CollapseItem,
      HalfCircleSpinner,
      ValidationObserver,
      ValidationProvider,
      [Select.name]: Select,
      [Option.name]: Option,
    },
    data() {
      return {
        dataUser: {},
        password: {
          old: "",
          new: "",
          newConfirm: "",
        },
        isLoading: true,
        isShow: false,
        isError: false,
        loading: false,

        tmpProfil: "",

        showModalLoading: false,
        // --------- Dropdown search ---------
        optionsArea:[],
        areaValue: '',
        arealist: [],
        optionsCabang:[],
        cabangValue: '',
        cabanglist: [],

        foto: "/images/default-avatar.jpg"
      }
    },
    computed: {
      ...mapGetters('auth', ['group_user', 'user']),
      ...mapGetters('area', ['areas']),
      ...mapGetters('axi', ['cabangs','cabang']),
    },
    methods: {
      ...mapActions('auth', [
        'checkAuth',
      'refreshToken',
        'getUser',
        'getGroupUser',
        'updateGroupUser',
        'updateUser',
        'changePassword',
      ]),
      ...mapActions('area', [
        'getAreas',
      ]),
      ...mapActions('axi', [
        'getCabangs',
        'getCabang',
        'updateProfile',
        'updateAlamat',
        'updateFotoProfile',
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
        // if (window.localStorage.getItem('role') != "Super Admin") {
        //   swal("Error", "Role anda tidak memiliki akses untuk melihat halaman ini", "error")
        //   this.$router.push('/administrator/dashboard')
        // }
      },
      async areaRemoteMethod(query) {
        if (query !== '') {
          this.loading = true

          this.arealist = this.areas.map(item => {
            return { value: item.id, label: item.attributes.nama }
          })
          this.loading = false
          this.optionsArea = this.arealist.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        } else {
          this.optionsArea = []
        }
      },
      async cabangRemoteMethod(query) {
        if (query !== '') {
          this.loading = true

          await this.getCabangs(query);
          this.cabanglist = this.cabangs.map(item => {
            return { value: item.id, label: item.attributes.nama }
          })
          this.loading = false
          this.optionsCabang = this.cabanglist.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        } else {
          this.optionsCabang = []
        }
      },
      async getData() {
        this.isLoading = true
        this.isShow = false

        let data = JSON.parse(window.localStorage.getItem('user'))

        await Promise.all([
          await this.getGroupUser(data.attributes.user_id),
          this.getUser(data.attributes.user_id),
          this.getAreas(),
          this.getCabang(this.group_user[0].attributes.branch_id),
        ])

        this.dataUser = data
        this.dataUser.role = window.localStorage.getItem('role')
        // Alamat checked
        if (typeof this.dataUser.attributes.alamat.attributes === 'undefined') {
          this.dataUser.attributes.alamat.attributes = {}
          this.dataUser.attributes.alamat.attributes.jalan = null
        }
        // Avatar URL checked
        this.foto = this.dataUser.attributes.avatar_url && !this.dataUser.attributes.avatar_url.includes("lorempixel") 
          ? this.dataUser.attributes.avatar_url 
          : "/images/default-avatar.jpg"

        this.assignDropdownSearch()

        this.isLoading = false
        this.isShow = true
      },
      assignDropdownSearch() {
        this.arealist = this.areas.map(item => {
          return { value: item.id, label: item.attributes.nama }
        })
        this.optionsArea = this.arealist
        this.areaValue = this.group_user[0].attributes.area_id.toString()

        // -------------
        this.cabanglist = [
          { value: this.cabang.id, label: this.cabang.attributes.nama }
        ]
        this.optionsCabang = this.cabanglist
        this.cabangValue = this.group_user[0].attributes.branch_id.toString()
      },
      fotoProfilChange(files) {
        this.tmpProfil = files[0]
      },

      async simpanData() {
        const valid = await this.$refs.editForm.validate()

        if (valid) {
          this.showModalLoading = true

          // User
          this.user.attributes.email = this.dataUser.attributes.email
          delete this.user.relationships
          // Profile
          const tempRelationships = this.dataUser.relationships
          delete this.dataUser.relationships
          // Alamat
          const tempRelationshipsAddress = this.dataUser.attributes.alamat.relationships
          delete this.dataUser.attributes.alamat.relationships

          // group user
          this.group_user[0].attributes.area_id = this.areaValue
          this.group_user[0].attributes.branch_id = this.cabangValue
          delete this.group_user[0].relationships

          try {
            await Promise.all([
              this.updateProfile(this.dataUser),
              this.updateUser(this.user),
              this.updateAlamat(this.dataUser.attributes.alamat),
              this.updateGroupUser(this.group_user[0])
            ])

            this.showModalLoading= false

            // Set back relationship
            this.dataUser.relationships = tempRelationships
            this.dataUser.attributes.alamat.relationships = tempRelationshipsAddress
            window.localStorage.setItem('user', JSON.stringify(this.dataUser))

            this.$root.$emit('nama_profil', this.dataUser.attributes.nama);

            const that = this
            swal("Sukses", "Berhasil mengganti data", "success")
            .then(function () {
              that.getData()
            })
          } catch (error) {
            this.showModalLoading= false

            swal("Gagal", "Gagal mengganti data", "error")
            .then(function () {
              // that.getData()
            })
          }
        }
      },
      async simpanFoto() {
        this.showModalLoading= true

        if (this.tmpProfil == "") {
          this.showModalLoading = false
          swal("Gagal", "Form ubah foto belum diisi", "error")
          .then(function () {
            // that.getData()
          })
        } else {
          const tempRelationships = this.dataUser.relationships
          delete this.dataUser.relationships

          this.dataUser.avatar = this.tmpProfil
          this.dataUser.ktp = null

          // ------------------
          const that = this
          try {
            let res = await this.updateFotoProfile(this.dataUser)
            that.showModalLoading= false

            // Reset form
            that.tmpProfil = ""

            this.dataUser.relationships = tempRelationships
            this.dataUser.attributes.avatar_url = res.data.data.attributes.avatar_url
            window.localStorage.setItem('user', JSON.stringify(this.dataUser))
            this.$root.$emit('foto_profil', res.data.data.attributes.avatar_url);

            swal("Sukses", "Berhasil mengganti foto", "success")
            .then(function () {
              that.getData()
            })
          } catch (error) {
            that.showModalLoading= false

            // Reset form
            that.tmpProfil = ""

            swal("Gagal", error.response.status == 413 ? "Gagal mengganti foto, ukuran file teralu besar. (maks 5MB)" : "Gagal mengganti foto", "error")
            .then(function () {
              // that.getData()
            })
          }
          // ------------------
        }

      },
      async ubahPassword() {
        this.showModalLoading= true

        if (this.password.old == "" || this.password.new == "" || this.password.newConfirm == "") {
          this.showModalLoading = false
          swal("Gagal", "Form ubah password belum diisi", "error")
          .then(function () {
            // that.getData()
          })
        } else {
          // ------------------
          const that = this
          try {
            let res = await this.changePassword(this.password)
            that.showModalLoading= false

            swal("Sukses", "Berhasil mengganti password", "success")
            .then(function () {
              that.getData()
            })
          } catch (error) {
            that.showModalLoading= false

            // Reset form
            that.tmpProfil = ""

            swal("Gagal", "Gagal mengganti password", "error")
            .then(function () {
              // that.getData()
            })
          }
        }
      }
    },
    async created() {
      await this.permissionAuth()
      this.getData()
    }
  };
</script>
<style>
  .profile-header {
    background-image: url(/images/default-avatar.jpg);
    background-size: cover;
    background-position: center top;
    min-height: 500px;
  }
  span .error {
    color: red;
  }
</style>
