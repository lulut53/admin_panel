<template>

  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-8 col-8">
          <h6 class="h2 d-inline-block mb-0">Detail Pendaftaran MAXI</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/maxi/pendaftaran">Pendaftaran MAXI</router-link></li>
              <li class="breadcrumb-item active" aria-current="page"> {{idMaxiDetail}}</li>
            </ol>
          </nav>
        </div>
        <div class=" col-lg-6 pt-2 text-right">
            <!-- <router-link to="" class="btn btn-sm btn-info">
              <i class="fa fa-edit" aria-hidden="true"></i>
              <span class="hidden-sm-down">Edit</span>
            </router-link> -->
            <!-- <router-link to="" class="btn  btn-info">
              <span class="hidden-sm-down">Kirim Email</span>
            </router-link>
            <router-link to="" class="btn  btn-warning">
              <span class="hidden-sm-down">Reset Password</span>
            </router-link> -->
            <base-button type="success" @click="downloadExcel" v-if="!isHideDownloadBtn">
              <i class="ni ni-cloud-download-95" aria-hidden="true"></i>
              <span class="hidden-sm-down">Download Excel</span>
            </base-button>
        </div>
      </div>


    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6 small">
      <div class="row">
        <div class="col-sm-8">
          <div class="card" >
            <div class="card-header">
              <div class="row">
                <div class="col-6">
                  <h4>Detail MAXI</h4>
                </div>
                <div class="col-6 text-right" v-if="isShow && !isError">
                    <base-button size="sm" type="info" @click="showModal = true">
                      Edit Data
                    </base-button>
                    <base-button size="sm" type="success" @click="showModalFoto = true">
                      Edit Foto
                    </base-button>
                    <base-dropdown>
                    <base-button size="sm" slot="title-container" type="info" block class="dropdown-toggle">
                      Ubah Status
                    </base-button>
                        <a @click="ubahStatus('disetujui')" class="dropdown-item">Disetujui</a>
                        <!-- <a @click="ubahStatus('tolak')" class="dropdown-item">Tolak</a> -->
                    </base-dropdown>
                </div>
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
                <div class="card-body">
                  <div class="card">
                    <div class="card-header">
                      <div class="row">
                        <div class="col-8">
                          <h4>Informasi Perusahaan</h4>
                        </div>

                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">Nama Perusahaan</div>
                        <div class="col-8">: {{ maxiData.nama }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Alamat Perusahaan</div>
                        <div class="col-8">: {{ maxiData.alamat }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">NPWP Perusahaan</div>
                        <div class="col-8">: {{ maxiData.npwp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kategori</div>
                        <div class="col-8">: {{ maxiData.kategori }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Status</div>
                        <div class="col-8">: {{ maxiData.status }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Telp</div>
                        <div class="col-8">: {{ maxiData.telp_perusahaan }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header">
                      <h4>Informasi Pemilik</h4>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">Nama Pemilik</div>
                        <div class="col-8">: {{ maxiData.nama_pemilik }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Jenis Kelamin</div>
                        <div class="col-8">: {{ maxiData.jenis_kelamin }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Telp</div>
                        <div class="col-8">: {{ maxiData.telp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Handphone</div>
                        <div class="col-8">: {{ maxiData.hp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Alamat Pemilik</div>
                        <div class="col-8">: {{ maxiData.alamat_pemilik }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">E-mail</div>
                        <div class="col-8">: {{ maxiData.email }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kelurahan</div>
                        <div class="col-8">: {{ maxiData.kelurahan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kota</div>
                        <div class="col-8">: {{ maxiData.kota }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">KTP Pemilik</div>
                        <div class="col-8">: {{ maxiData.ktp_pemilik }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">NPWP Pemilik</div>
                        <div class="col-8">: {{ maxiData.npwp_pemilik }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div class="col-sm-4">
          <card>
            <p class="font-weight-bold">Foto Profil</p>
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
                <!-- <center><img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive"></center>
                <br>
                <center><h1>Error, silahkan coba lagi.</h1></center> -->
              </div>
              <div key="2" v-if="isShow">
                <card>
                    <div class="row">
                        <div class="images" v-viewer>
                            <template v-if="maxi.attributes.logo_url">
                              <img v-bind:src="maxi.attributes.logo_url" class="img-fluid" alt="" height="140">
                            </template>
                            <template v-if="!maxi.attributes.logo_url">
                              <img src="/images/image-empty-default.png" class="img-fluid" alt="" height="140">
                            </template>
                        </div>
                        <!-- <div class="col-4"> -->
                            <!-- <img v-bind:src="maxi.attributes.logo_url" alt="" height="75"> -->
                        <!-- </div> -->
                        <!-- <div class="col-8 d-flex align-items-center"> -->
                            <!-- <div class="btn-file-upload"> -->
                                <!-- <label for="profile" class="btn btn-sm btn-secondary">Ganti Foto</label> -->
                                <!-- <input type="file" id="profile"> -->
                            <!-- </div> -->
                        <!-- </div> -->
                    </div>
                </card>

                <p class="font-weight-bold">Lampiran</p>

                <collapse :multiple-active="false">
                    <collapse-item name="1">
                        <h5 slot="title" class="mb-0">Foto KTP</h5>
                        <div>
                            <div class="images" v-viewer>
                                <template v-if="getIncluded('profiles', maxi.relationships.profiles.data[0], 'scan_ktp_url')">
                                  <img v-bind:src="getIncluded('profiles', maxi.relationships.profiles.data[0], 'scan_ktp_url')" class="img-fluid" alt="" height="140">
                                </template>
                                <template v-if="!getIncluded('profiles', maxi.relationships.profiles.data[0], 'scan_ktp_url')">
                                  <img src="/images/image-empty-default.png" class="img-fluid" alt="" height="140">
                                </template>
                            </div>
                            <!-- <div class="btn-file-upload"> -->
                                <!-- <label for="ktp" class="btn btn-sm btn-secondary mt-3">Ganti Foto</label> -->
                                <!-- <input type="file" id="ktp"> -->
                            <!-- </div> -->
                        </div>
                    </collapse-item>
                    <collapse-item name="2">
                        <h5 slot="title" class="mb-0">Foto NPWP</h5>
                        <div>
                            <div class="images" v-viewer>
                                <template v-if="getIncluded('npwps', maxi.relationships.npwps.data, 'scan_url')">
                                  <img v-bind:src="getIncluded('npwps', maxi.relationships.npwps.data, 'scan_url')" class="img-fluid" alt="" height="140">
                                </template>
                                <template v-if="!getIncluded('npwps', maxi.relationships.npwps.data, 'scan_url')">
                                  <img src="/images/image-empty-default.png" class="img-fluid" alt="" height="140">
                                </template>
                            </div>
                            <!-- <div class="btn-file-upload"> -->
                                <!-- <label for="npwp" class="btn btn-sm btn-secondary mt-3">Ganti Foto</label> -->
                                <!-- <input type="file" id="npwp"> -->
                            <!-- </div> -->
                        </div>
                    </collapse-item>
                </collapse>
              </div>
            </transition>
          </card>
        </div>

      </div>
    </div>

    <ValidationObserver v-slot="{ invalid }" ref="editModal">
      <el-form @submit.prevent="simpanData">
        <el-dialog title="Edit Data" :visible.sync="showModal" v-if="isShow">
          <div key="1" v-if="!isModalProcess">
            <!-- Informasi Perusahaan -->
            <div class="form-group">
              <div class="row mb-4">
                <label class="col justify-content-center"><b>Informasi Perusahaan</b></label>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Nama Perusahaan</label>
                <div class="col-md-8">
                  <ValidationProvider
                    :rules="{
                      required: true,
                      regex: /^[a-z.'/ A-Z]+$/
                    }"
                    v-slot="{ errors, failedRules }"
                    name="Nama Perusahaan"
                  >
                    <el-input v-model="maxi.attributes.nama" />
                    <span class="error" v-if="failedRules.regex">Masukan nama perusahaan dengan benar</span>
                    <span class="error" v-else>{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Alamat Perusahaan</label>
                <div class="col-md-8">
                  <ValidationProvider
                    :rules="{
                      required: true,
                      regex: /^[a-z.'/ A-Z0-9-]+$/
                    }"
                    v-slot="{ errors }"
                    name="Alamat Perusahaan"
                  >
                    <textarea class="form-control" name="" id="alamat_perusahaan" cols="30" rows="5" v-model="maxi.attributes.alamat_jalan_perusahaan"></textarea>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">NPWP Perusahaan</label>
                <div class="col-md-8">
                  <ValidationProvider
                    :rules="'required|digits:15'"
                    v-slot="{ errors }"
                    name="Nomor NPWP Perusahaan">
                    <el-input v-model="tempNpwp.attributes.nomor" />
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Kategori Produk</label>
                <div class="col-md-8">
                  <ValidationProvider name="Kategori Produk" rules="required" v-slot="{ errors }">
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
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

              <!-- Informasi Pemilik -->
              <div class="row mb-4 mt-6">
                <label class="col-md-12 col-form-label form-control-label"><b>Informasi Pemilik</b></label>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Nama Pemilik</label>
                <div class="col-md-8">
                  <ValidationProvider
                    :rules="{
                      required: true,
                      regex: /^[a-z.'/ A-Z]+$/
                    }"
                    v-slot="{ errors, failedRules }"
                    name="Nama Pemilik">
                    <el-input v-model="tempProfile.attributes.nama" />
                    <span class="error" v-if="failedRules.regex">Masukan nama pemilik dengan benar</span>
                    <span class="error" v-else>{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Jenis Kelamin</label>
                <div class="col-md-8">
                  <ValidationProvider name="Jenis Kelamin" rules="required" v-slot="{ errors }">
                    <el-select v-model="tempProfile.attributes.jenis_kelamin">
                      <el-option v-for="jk in jenisKelamin" :key="jk.val" :label="jk.label" :value="jk.val" :selected="jk.val === maxiData.jenis_kelamin" />
                    </el-select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Telepon</label>
                <div class="col-md-8">
                  <ValidationProvider
                    :rules="{
                      required: true,
                      numeric: true
                    }"
                    v-slot="{ errors }"
                    name="Nomor Telepon">
                    <el-input v-model="tempProfile.attributes.no_telp" />
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Handphone</label>
                <div class="col-md-8">
                  <ValidationProvider
                    :rules="{
                      required: true,
                      numeric: true,
                      min: 9,
                      max: 16,
                      regex: /^62[0-9]+$/
                    }"
                    v-slot="{ errors, failedRules }"
                    name="Nomor Handphone">
                    <el-input v-model="tempProfile.attributes.no_hp" />
                    <span class="error" v-if="failedRules.regex">Format No. Handphone salah (Contoh: 6281234567890)</span>
                    <span class="error" v-else>{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Alamat</label>
                <div class="col-md-8">
                  <ValidationProvider
                    :rules="{
                      required: true,
                      regex: /^[a-z.'/ A-Z0-9-]+$/
                    }"
                    v-slot="{ errors }"
                    name="Alamat Rumah">
                    <textarea class="form-control" name="" id="alamat" cols="30" rows="5" v-model="tempAlamat.attributes.jalan"></textarea>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="email" class="col-md-4 col-form-label form-control-label">Email</label>
                <div class="col-md-8">
                  <ValidationProvider 
                    name="E-mail" 
                    :rules="{
                      required: true,
                      regex: /^[\w\.-]+@([\w\-]+\.)+[\w]{2,4}$/
                    }"
                    v-slot="{ errors }"
                  >
                    <el-input id="email" type="email" v-model="tempProfile.attributes.email" required></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Provinsi</label>
                <div class="col-md-8">
                  <ValidationProvider name="Provinsi" rules="required" v-slot="{ errors }">
                    <el-select 
                      v-model="provinsiValue"
                      filterable
                      remote 
                      reserve-keyword 
                      placeholder="Ketik Provinsi Anda"
                      @change="onChangeProvinsi"
                      :remote-method="provinsiRemoteMethod"
                      :loading="loading">
                      <el-option
                        v-for="item in optionsProvinsi"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                        >
                      </el-option>
                    </el-select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Kota</label>
                <div class="col-md-8">
                  <el-select 
                    v-model="kotaValue"
                    filterable
                    remote 
                    reserve-keyword 
                    placeholder="Ketik Kota Anda"
                    @change="onChangeKota"
                    :disabled="provinsiValue == ''"
                    :remote-method="kotaRemoteMethod"
                    :loading="loading">
                    <el-option
                      v-for="item in optionsKota"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                      >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Kecamatan</label>
                <div class="col-md-8">
                  <el-select 
                    v-model="kecamatanValue"
                    filterable
                    remote 
                    reserve-keyword 
                    placeholder="Ketik Kecamatan Anda"
                    @change="onChangeKecamatan"
                    :disabled="kotaValue == ''"
                    :remote-method="kecamatanRemoteMethod"
                    :loading="loading">
                    <el-option
                      v-for="item in optionsKecamatan"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                      >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">Kelurahan/Desa</label>
                <div class="col-md-8">
                  <el-select 
                    v-model="kelurahanValue"
                    filterable
                    remote 
                    reserve-keyword 
                    placeholder="Ketik Kelurahan Anda"
                    :disabled="kecamatanValue == ''"
                    :remote-method="kelurahanRemoteMethod"
                    :loading="loading">
                    <el-option
                      v-for="item in optionsKelurahan"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                      >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="row mb-4">
                <label class="col-md-4 col-form-label form-control-label">KTP Pemilik</label>
                <div class="col-md-8">
                  <ValidationProvider name="KTP" rules="required|numeric|length:16" v-slot="{ errors }">
                    <el-input v-model="tempProfile.attributes.no_ktp" />
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
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
    </ValidationObserver>

    <el-form @submit.prevent="simpanFoto">
      <el-dialog title="Edit Foto" :visible.sync="showModalFoto" v-if="isShow">
        <!-- Foto Profil -->
        <div key="1" v-if="!isModalProcess">
          <div class="form-group">
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label">Foto Profil</label>
              <div class="col-md-8">
                <file-input @change="profilePhotoChange"/>
              </div>
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label"></label>
              <div class="col-md-8 mt-2 mb-4">
                <img :src="imagePreview" v-if="imagePreview" width="200px" alt="">
              </div>
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label">Foto KTP</label>
              <div class="col-md-8">
                <file-input @change="ktpPhotoChange"/>
              </div>
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label"></label>
              <div class="col-md-8 mt-2 mb-4">
                <img :src="ktpPreview" v-if="ktpPreview" width="200px" alt="">
              </div>
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label">Foto NPWP</label>
              <div class="col-md-8">
                <file-input @change="npwpPhotoChange"/>
              </div>
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label"></label>
              <div class="col-md-8 mt-2 mb-4">
                <img :src="npwpPreview" v-if="npwpPreview" width="200px" alt="">
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
import { Button, Icon, Image, Input, Dialog, Form, FormItem, Select, Option, Table, TableColumn, DropdownMenu, DropdownItem, Dropdown } from 'element-ui';
import { TimeLine, TimeLineItem } from "@/components";
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Collapse from "@/components/Collapse/Collapse";
import CollapseItem from "@/components/Collapse/CollapseItem";
import Badge from "@/components/Badge";
import DropzoneFileUpload from "@/components/Inputs/DropzoneFileUpload";
import moment from 'moment';
import 'moment/locale/id';
import { HalfCircleSpinner } from 'epic-spinners'
import swal from 'sweetalert2';
import FileInput from '@/components/Inputs/FileInput';

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
  // name: 'details maxi',
  components: {
    Badge,
    TimeLine,
    TimeLineItem,
    Collapse,
    CollapseItem,
    DropzoneFileUpload,
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
    ValidationObserver,
    ValidationProvider,
    FileInput
  },
  data() {
    return {
      tmpLogo: "",
      tmpKtp: "",
      tmpNpwp: "",
      imagePreview: null,
      ktpPreview: null,
      npwpPreview: null,

      dialogVisible: false,
      title: "details",

      // Data Provinsi
      optionsProvinsi:[],
      provinsiValue: '',
      provinsilist: [],

      // Data Kota
      optionsKota:[],
      kotaValue: '',
      kotalist: [],

      // Data Kecamatan
      optionsKecamatan:[],
      kecamatanValue: '',
      kecamatanlist: [],

      // Data Kelurahan
      optionsKelurahan:[],
      kelurahanValue: '',
      kelurahanlist: [],

      // Data Kategori
      optionsKategori:[],
      kategoriValue: '',
      kategorilist: [],

      loading: false,
      isLoading: true,
      isError: false,
      isShow: false,
      isModalProcess: false,
      errormsg: '',
      showModal: false,
      showModalFoto: false,
      showModalProcess: false,
      maxiData: {},
      isHideDownloadBtn: true,
      dataMaxiProduk: "",
      item: [
        {
          nama_produk: 'Darwis Triadi Intermediate',
          kategori: 'MAXI Edukasi',
          harga: 'Rp. 3.000.000',
          created_at: '1 Tahun yang lalu',
          status: 'Menunggu'
        },
        {
          nama_produk: 'Darwis Triadi Advance',
          kategori: 'MAXI Edukasi',
          harga: 'Rp. 8.000.000',
          created_at: '1 Tahun yang lalu',
          status: 'Disetujui'
        }
      ],
      jenisKelamin: [
        { 
          val: "L",
          label: "Laki-Laki"
        },
        { 
          val: "P",
          label: "Perempuan"
        }
      ],
      tempProfile: {},
      tempNpwp: {},
      tempAlamat: {},
      tempProgram: {},
      tempProduk: {},
    };
  },
  computed: {
    ...mapGetters('area', [
      'provinsis',
      'kotas',
      'kecamatans',
      'desas',
    ]),
    ...mapGetters('axi', [
      'lokasi',
      'lokasiIncluded',
    ]),
    ...mapGetters('maxi', [
      'maxi',
      'included',
      'sub_produk',
      'sub_produk_included',
      'included',
      'alamat',
    ]),
    ...mapGetters('produk', [
      'produks'
    ]),
    idMaxiDetail() {
			return this.$route.params.id
		},
  },
  methods: {
    ...mapActions('area', [
      'getProvinsis',
      'getKotas',
      'getKecamatans',
      'getDesas',
    ]),
    ...mapActions('axi', [
      'getLokasi'
    ]),
    ...mapActions('maxi', [
      'getMaxi',
      'getSubProduk',
      'getAlamat',
      'getMaxiProduk',
      'updateMaxi',
      'updateMaxiProduk',
      'updateProfile',
      'updateAlamat',
      'updateNpwp',
      'updateFotoMaxi',
      'updateFotoProfile',
      'updateFotoNpwp',
    ]),
    ...mapActions('produk', [
      'getProduks',
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
      if (window.localStorage.getItem('role') != "Super Admin" && window.localStorage.getItem('role') != "Tasya Area") {
        swal("Error", "Role anda tidak memiliki akses untuk melihat halaman ini", "error")
        this.$router.push('/administrator/dashboard')
      }
    },

    /**
     * --------------------------------------------------
     * Data Handling here
     * --------------------------------------------------
     */

    async provinsiRemoteMethod(query) {
      if (query !== '') {
        this.loading = true

        await this.getProvinsis(query);
        this.provinsilist = this.provinsis.map(item => {
          return { value: item.id, label: item.attributes.nama }
        })
        this.loading = false
        this.optionsProvinsi = this.provinsilist.filter(item => {
          return item.label.toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.optionsProvinsi = []
      }
    },

    async kotaRemoteMethod(query) {
      if (query !== '') {
        this.loading = true

        const payload = {
          'nama': query,
          'provinsi': this.provinsiValue
        }
        
        await this.getKotas(payload);
        this.kotalist = this.kotas.map(item => {
          return { value: item.id, label: item.attributes.nama }
        })
        this.loading = false
        this.optionsKota = this.kotalist.filter(item => {
          return item.label.toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.optionsKota = []
      }
    },

    async kecamatanRemoteMethod(query) {
      if (query !== '') {
        this.loading = true

        const payload = {
          'nama': query,
          'kota': this.kotaValue,
        }

        await this.getKecamatans(payload);
        this.kecamatanlist = this.kecamatans.map(item => {
          return { value: item.id, label: item.attributes.nama }
        })
        this.loading = false
        this.optionsKecamatan = this.kecamatanlist.filter(item => {
          return item.label.toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.optionsKecamatan = []
      }
    },

    async kelurahanRemoteMethod(query) {
      if (query !== '') {
        this.loading = true

        const payload = {
          'nama': query,
          'kecamatan': this.kecamatanValue,
        }
        
        await this.getDesas(payload);
        this.kelurahanlist = this.desas.map(item => {
          return { value: item.id, label: item.attributes.nama }
        })
        this.loading = false
        this.optionsKelurahan = this.kelurahanlist.filter(item => {
          return item.label.toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.optionsKelurahan = []
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

    assignDropdownSearch() {
      // Dropdown
      // ---- Provinsi ----
      this.provinsilist = [{
        value: this.lokasiIncluded.find(x => x.type == "provinces").id,
        label: this.lokasiIncluded.find(x => x.type == "provinces").attributes.nama,
      }]
      this.optionsProvinsi = this.provinsilist
      this.provinsiValue = this.lokasiIncluded.find(x => x.type == "provinces").id
      // ---- Kota ----
      this.kotalist = [{
        value: this.lokasiIncluded.find(x => x.type == "cities").id,
        label: this.lokasiIncluded.find(x => x.type == "cities").attributes.nama,
      }]
      this.optionsKota = this.kotalist
      this.kotaValue = this.lokasiIncluded.find(x => x.type == "cities").id
      // ---- Kecamatan ----
      this.kecamatanlist = [{
        value: this.lokasiIncluded.find(x => x.type == "districts").id,
        label: this.lokasiIncluded.find(x => x.type == "districts").attributes.nama,
      }]
      this.optionsKecamatan = this.kecamatanlist
      this.kecamatanValue = this.lokasiIncluded.find(x => x.type == "districts").id
      // ---- Kelurahan ----
      this.kelurahanlist = [{
        value: this.lokasiIncluded.find(x => x.type == "villages").id,
        label: this.lokasiIncluded.find(x => x.type == "villages").attributes.nama,
      }]
      this.optionsKelurahan = this.kelurahanlist
      this.kelurahanValue = this.lokasiIncluded.find(x => x.type == "villages").id
      // ---- Kategori dropdown ----
      this.kategorilist = this.produks.map(item => {
        return { value: item.id, label: item.attributes.nama }
      })
      this.optionsKategori = this.kategorilist
      this.kategoriValue = this.tempProduk.id.toString()
      // ====================================
    },
    onChangeProvinsi() {
      this.kotaValue = ''
      this.kecamatanValue = ''
      this.kelurahanValue = ''
      this.optionsKota = []
      this.optionsKecamatan = []
      this.optionsKelurahan = []
    },
    onChangeKota() {
      this.kecamatanValue = ''
      this.kelurahanValue = ''
      this.optionsKecamatan = []
      this.optionsKelurahan = []
    },
    onChangeKecamatan() {
      this.kelurahanValue = ''
      this.optionsKelurahan = []
    },

		async getData() {
      this.isLoading = true
      this.isShow = false

      try {
        await Promise.all([
          await this.getMaxi(this.idMaxiDetail),
          this.getLokasi(this.included.find(x => x.type == "profiles").relationships.addresses.data[0].id),
          this.getProduks(),
        ])

        if (this.maxi.attributes.status_id == 14) {
          this.$router.push('/administrator/maxi/pendaftaran')
        } else {
          // Delete after included added
          const res = await this.getMaxiProduk(this.idMaxiDetail)

          if (res.name != "Error") {
            this.dataMaxiProduk = res.data[0]
          } else {
            this.dataMaxiProduk = ""
          }

          this.tempProfile = this.included.find(x => x.type == "profiles")
          this.tempNpwp = this.included.find(x => x.type == "npwps")
          this.tempAlamat = this.included.find(x => x.type == "addresses")
          this.tempProduk = this.maxi.relationships.products.data.length != 0 ? this.included.find(x => x.id == this.maxi.relationships.products.data[0].id && x.type == "products") : ""
          this.maxiData = this.packData();

          this.assignDropdownSearch();

          this.isLoading = false
          this.isShow = true
        }
      } catch (error) {
        this.isLoading = false
        this.isError = true
      }
    },

    packData() {
      const data = {}

      data.nama = this.maxi.attributes.nama
      data.alamat = this.maxi.attributes.alamat_jalan_perusahaan ? this.maxi.attributes.alamat_jalan_perusahaan : "-"
      data.npwp = this.tempNpwp.attributes.nomor
      data.kategori = this.tempProduk ? this.tempProduk.attributes.nama : '-'
      data.status = this.maxi.attributes.status_id == '4' ? 'Belum Disetujui' : this.maxi.attributes.status_id == '5' ? 'Disetujui' : 'Tolak'
      data.telp_perusahaan = this.maxi.attributes.no_telp

      data.nama_pemilik = this.tempProfile ? this.tempProfile.attributes.nama : '-'
      data.jenis_kelamin = this.tempProfile ? this.tempProfile.attributes.jenis_kelamin == 'L' ? 'Laki-Laki' : 'Perempuan' : '-'
      data.telp = this.tempProfile ? this.tempProfile.attributes.no_telp : '-'
      data.hp = this.tempProfile ? this.tempProfile.attributes.no_hp : '-'
      data.alamat_pemilik = this.tempAlamat ? this.tempAlamat.attributes.jalan : '-'
      data.email = this.tempProfile ? this.tempProfile.attributes.email : '-'
      data.kelurahan = this.tempAlamat ? this.lokasiIncluded ? this.lokasiIncluded.find(x => x.type == "villages").attributes.nama : "-" : "-"
      data.kota = this.tempAlamat ? this.lokasiIncluded ? this.lokasiIncluded.find(x => x.type == "cities").attributes.nama : "-" : "-"
      data.ktp_pemilik = this.tempProfile ? this.tempProfile.attributes.no_ktp : '-'
      data.npwp_pemilik = this.tempNpwp.attributes.nomor


      data.kelurahan = this.capitalize(data.kelurahan)
      data.kota = this.capitalize(data.kota)
      
      return data
    },

    capitalize: function (value) {
      if (!value) return ''
      if (value == 'DKI JAKARTA') return 'DKI Jakarta'
      return value
        .toLowerCase()
        .split(' ')
        .map(function(word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
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
    
    getIncludedSubProduk(type, detail, attr) {
      if (detail == null) {
        return ''
      } else {
        let result = this.sub_produk_included.find(obj => {
          return (obj.type == type && obj.id == detail.id)
        })
        return result.attributes[attr]
      }
    },

    async simpanData() {
      this.isModalProcess= true

      // --- delete tidak perlu
      // AXI
      const payloadMaxi = JSON.parse(JSON.stringify(this.maxi))
      payloadMaxi.attributes.alamat = payloadMaxi.attributes.alamat_jalan_perusahaan
      delete payloadMaxi.attributes.kota_id
      delete payloadMaxi.relationships

      this.dataMaxiProduk.attributes.produk_id = this.kategoriValue
      delete this.dataMaxiProduk.relationships

      // Profile
      delete this.tempProfile.relationships

      // Alamat
      const payloadAlamat = JSON.parse(JSON.stringify(this.tempAlamat))
      payloadAlamat.attributes.desa_id = this.kelurahanValue
      delete payloadAlamat.relationships

      // Npwp
      delete this.tempNpwp.relationships

      try {
        await Promise.all([
          this.updateMaxi(payloadMaxi),
          this.updateProfile(this.tempProfile),
          this.updateAlamat(payloadAlamat),
          this.updateNpwp(this.tempNpwp),
          this.updateMaxiProduk(this.dataMaxiProduk),
        ])

        this.showModal = false
        this.isModalProcess= false
        
        const that = this

        swal("Sukses", "Berhasil mengganti data", "success")
        .then(function () {
          that.getData()
        })
      } catch (error) {
        this.showModal = false
        this.isModalProcess= false

        swal("Gagal", "Gagal mengganti data", "error")
        .then(function () {
          // that.getData()
        })
      }
    },

    async simpanFoto() {
      this.isModalProcess= true

      if (this.tmpLogo == "" && this.tmpNpwp == "" && this.tmpKtp == "") {
        this.showModalFoto = false
        this.isModalProcess= false
        swal("Gagal", "Form ubah foto belum diisi", "error")
        .then(function () {
          // that.getData()
        })
      } else {
        const tempLogo = JSON.parse(JSON.stringify(this.maxi))
        tempLogo.logo = this.tmpLogo == "" ? null : this.tmpLogo
        delete tempLogo.relationships
        
        const tempProfile = this.included.find(x => x.type == "profiles")
        tempProfile.avatar = null
        tempProfile.ktp = this.tmpKtp == "" ? null : this.tmpKtp
        delete tempProfile.relationships

        const tempNpwp = this.included.find(x => x.type == "npwps")
        tempNpwp.scan_url = this.tmpNpwp == "" ? null : this.tmpNpwp 
        delete tempNpwp.relationships

        
        // ------------------
        const that = this
        await Promise.all([
          this.updateFotoMaxi(tempLogo),
          this.updateFotoProfile(tempProfile),
          this.updateFotoNpwp(tempNpwp),
        ]).catch(function(error) {
          that.showModalFoto = false
          that.isModalProcess= false

          // Reset form
          that.tmpLogo = ""
          that.imagePreview = "";
          that.tmpKtp = ""
          that.ktpPreview = "";
          that.tmpNpwp = ""
          that.npwpPreview = "";

          swal("Gagal", "Gagal mengganti foto", "error")
          .then(function () {
            // that.getData()
          })
        }).then(function (result) {
          that.showModalFoto = false
          that.isModalProcess= false

          // Reset form
          that.tmpLogo = ""
          that.imagePreview = "";
          that.tmpKtp = ""
          that.ktpPreview = "";
          that.tmpNpwp = ""
          that.npwpPreview = "";
          
          swal("Sukses", "Berhasil mengganti foto", "success")
          .then(function () {
            that.getData()
          })
        })
        // ------------------
      }
    },
    ubahStatus(command) {
      const that = this
      swal({
        title: 'Apakah anda yakin untuk mengubah status MAXI menjadi ' + command + '?',
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
          const payloadMaxi = JSON.parse(JSON.stringify(this.maxi))
          
          if (command == 'disetujui') payloadMaxi.attributes.status_id = 14
          // else if (command == 'tolak') payloadMaxi.attributes.status_id = 6

          delete payloadMaxi.relationships
          
          that.showModalProcess = true
          
          const res = await that.updateMaxi(payloadMaxi);

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
    profilePhotoChange(files) {
      this.tmpLogo = files[0]
      this.imagePreview = URL.createObjectURL(files[0]);
    },
    ktpPhotoChange(files) {
      this.tmpKtp = files[0]
      this.ktpPreview = URL.createObjectURL(files[0]);
    },
    npwpPhotoChange(files) {
      this.tmpNpwp = files[0]
      this.npwpPreview = URL.createObjectURL(files[0]);
    },
  },
  mounted() {
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
  watch: {
    // 'axi.jenis_kelamin': function () {
      // alert(this.axi.jenis_kelamin)
    // }
  },
};
</script>

<style>
span .error {
  color: red;
}
</style>