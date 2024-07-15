<template>
  <div>
    <base-header class="pb-6" type>
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Detail AXI</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard">
                  <i class="fas fa-home"></i>
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard">Administrator</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/administrator/axi/list">AXI</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{idAxiDetail}}</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 pt-2 text-right" v-if="isShow && !isError">
          <!-- <base-button type="info" @click="kirimEmail">
            <span class="hidden-sm-down">Kirim Credential</span>
          </base-button>-->
          <base-button type="warning" @click="resetPass">
            <span class="hidden-sm-down">Reset Password</span>
          </base-button>
          <!-- tombol ini didisable karena sudah diakomodasi oleh fitur reporting -->
          <!-- <base-button type="success" @click="downloadExcel" v-if="!isHideDownloadBtn">
            <i class="ni ni-cloud-download-95" aria-hidden="true"></i>
            <span class="hidden-sm-down">Download Excel</span>
          </base-button> -->
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6 small">
      <div class="row">
        <div class="col-sm-8">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-6">
                  <h4>Detail AXI</h4>
                </div>
                <div class="col-6 text-right" v-if="isShow && !isError">
                  <base-button size="sm" type="info" @click="showModal = true">Edit Data</base-button>
                  <base-button
                    size="sm"
                    type="primary"
                    @click="showModalPoint = true"
                    v-if="point[0].attributes.point_reward"
                  >Edit Point</base-button>
                  <base-button size="sm" type="success" @click="showModalFoto = true">Edit Foto</base-button>
                </div>
              </div>
            </div>
            <transition name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content: center;">
                <br />
                <!-- <center> -->
                  <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
                <!-- </center> -->
              </div>
              <div key="2" v-if="isError" class="text-center p-5" style="display: flex; justify-content: center;">
                <!-- <center> -->
                  <img
                    alt="Error Image"
                    src="/images/undraw_cancel_u1it.svg"
                    height="300px"
                    class="img-fluid"
                  />
                <!-- </center> -->
                <br />
                <div style="display: flex; justify-content: center; align-items: center;">
                  Error, silahkan coba lagi.
                </div>
                <!-- <center>
                  <h1>Error, silahkan coba lagi.</h1>
                </center> -->
              </div>
              <div key="2" v-if="isShow">
                <div class="card-body">
                  <div class="card">
                    <div class="card-header">
                      <div class="row">
                        <div class="col-8">
                          <h4>Informasi Umum</h4>
                        </div>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">Nama AXI</div>
                        <div class="col-8">: {{ axiData.nama }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">AXI ID</div>
                        <div class="col-8">: {{ axiData.nomor_axi_id }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kode Cabang</div>
                        <div class="col-8">: {{ axiData.kode_cabang }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Cabang</div>
                        <div class="col-8">: {{ axiData.nama_cabang }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kode Cabang Daftar</div>
                        <div class="col-8">: {{ axiData.kode_cabang_daftar }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Cabang Daftar</div>
                        <div class="col-8">: {{ axiData.nama_cabang_daftar }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Tanggal Daftar</div>
                        <div class="col-8">: {{ axiData.tanggal_daftar | convertDate }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">No. KTP</div>
                        <div class="col-8">: {{ axiData.no_ktp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Tempat Lahir</div>
                        <div class="col-8">: {{ axiData.kota_lahir }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Tanggal lahir</div>
                        <div class="col-8">: {{ axiData.tanggal_lahir | convertDate }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">ID Mentor</div>
                        <div class="col-8">: {{ axiData.axi_id_reff }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">No. HP</div>
                        <div class="col-8">: {{ axiData.no_hp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Email</div>
                        <div class="col-8">: {{ axiData.email }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Alamat</div>
                        <div class="col-8">: {{ axiData.jalan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">RT/RW</div>
                        <div class="col-8">: 0{{ axiData.rt }}/0{{ axiData.rw }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Provinsi</div>
                        <div class="col-8">: {{ axiData.provinsi }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kota / Kabupaten</div>
                        <div class="col-8">: {{ axiData.kota }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kecamatan</div>
                        <div class="col-8">: {{ axiData.kecamatan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kelurahan</div>
                        <div class="col-8">: {{ axiData.kelurahan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kode Pos</div>
                        <div class="col-8">: {{ axiData.kode_pos }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Status Perkawinan</div>
                        <div class="col-8">: {{ axiData.status_perkawinan }}</div>
                      </div>
                      <!-- <div class="row">
                        <div class="col-4">Nama Ibu Kandung</div>
                        <div class="col-8">: {{ axiData.nama_ibu_kandung }}</div>
                      </div> -->
                      <div class="row">
                        <div class="col-4">Nama Pasangan</div>
                        <div class="col-8">: {{ axiData.nama_pasangan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">No. KTP Pasangan</div>
                        <div class="col-8">: {{ axiData.no_ktp_pasangan }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Jenis Kelamin</div>
                        <div class="col-8">: {{ axiData.jenis_kelamin }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">No. NPWP</div>
                        <div class="col-8">: {{ axiData.no_npwp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Nama NPWP</div>
                        <div class="col-8">: {{ axiData.nama_npwp }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Status NPWP</div>
                        <div
                          class="col-8"
                        >: {{ axiData.status_npwp == 1 ? "Pribadi" : "Perusahaan" }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">PKP Status</div>
                        <div class="col-8">: {{ axiData.pkp == 1 ? "PKP" : "Non PKP" }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header">
                      <h4>Informasi Rekening</h4>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">Nama Bank</div>
                        <div class="col-8">: {{ axiData.nama_bank }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Cabang Bank</div>
                        <div class="col-8">: {{ axiData.cabang_bank }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Kota Bank</div>
                        <div class="col-8">: {{ axiData.kota_bank }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">No. Rekening</div>
                        <div class="col-8">: {{ axiData.no_rekening }}</div>
                      </div>
                      <div class="row">
                        <div class="col-4">Atas nama rekening</div>
                        <div class="col-8">: {{ axiData.an_rekening }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="card" v-if="!hideMLM">
            <div class="card-header">
              <h4>Informasi Jaringan</h4>
            </div>
            <transition name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content: center;">
                <br />
                <!-- <center> -->
                  <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
                <!-- </center> -->
              </div>
              <div key="2" v-if="isShow">
                <div class="card-body">
                  <tabs
                    tabNavClasses="nav-fill flex-column flex-sm-row nav-wrapper"
                    tabContentClasses="card shadow"
                  >
                    <tab-pane id="home">
                      <span slot="title">
                        <!-- <i class="ni ni-cloud-upload-96"></i> -->
                        RB 1
                      </span>
                      <!-- TableMLM here! -->
                      <el-table
                        :data="item"
                        header-row-class-name="thead-light"
                        class="table-responsive table-flush"
                      >
                        <el-table-column label="No" prop="no" width="100"></el-table-column>
                        <el-table-column label="Nama AXI" prop="nama_axi" width="250"></el-table-column>
                        <el-table-column label="AXI ID" prop="axi_id" width="150"></el-table-column>
                        <el-table-column label="Poin Reward" prop="poin_reward" width="150"></el-table-column>
                        <el-table-column label="Poin Trip" prop="poin_trip" width="150"></el-table-column>
                        <el-table-column label="No Telp" prop="no_telp" width="150"></el-table-column>
                        <el-table-column label="Cabang" prop="cabang" width="120"></el-table-column>
                        <el-table-column prop="id" min-width="130px" label="Aksi">
                          <template class="d-flex">
                            <base-button
                              class="like btn-link text-white"
                              type="info"
                              size="sm"
                              icon
                            >Lihat RB</base-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </tab-pane>

                    <tab-pane id="profile">
                      <span slot="title">RB 2</span>
                      <!-- TableMLM here! -->
                      <el-table
                        :data="item"
                        header-row-class-name="thead-light"
                        class="table-responsive table-flush"
                      >
                        <el-table-column label="No" prop="no" width="100"></el-table-column>
                        <el-table-column label="Nama AXI" prop="nama_axi" width="250"></el-table-column>
                        <el-table-column label="AXI ID" prop="axi_id" width="150"></el-table-column>
                        <el-table-column label="Poin Reward" prop="poin_reward" width="150"></el-table-column>
                        <el-table-column label="Poin Trip" prop="poin_trip" width="150"></el-table-column>
                        <el-table-column label="No Telp" prop="no_telp" width="150"></el-table-column>
                        <el-table-column label="Cabang" prop="cabang" width="120"></el-table-column>
                        <el-table-column prop="id" min-width="130px" label="Aksi">
                          <template class="d-flex">
                            <base-button
                              class="like btn-link text-white"
                              type="info"
                              size="sm"
                              icon
                            >Lihat RB</base-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </tab-pane>

                    <tab-pane id="rb3">
                      <span slot="title">RB 3</span>
                      <!-- TableMLM here! -->
                      <el-table
                        :data="item"
                        header-row-class-name="thead-light"
                        class="table-responsive table-flush"
                      >
                        <el-table-column label="No" prop="no" width="100"></el-table-column>
                        <el-table-column label="Nama AXI" prop="nama_axi" width="250"></el-table-column>
                        <el-table-column label="AXI ID" prop="axi_id" width="150"></el-table-column>
                        <el-table-column label="Poin Reward" prop="poin_reward" width="150"></el-table-column>
                        <el-table-column label="Poin Trip" prop="poin_trip" width="150"></el-table-column>
                        <el-table-column label="No Telp" prop="no_telp" width="150"></el-table-column>
                        <el-table-column label="Cabang" prop="cabang" width="120"></el-table-column>
                        <el-table-column prop="id" min-width="130px" label="Aksi">
                          <template class="d-flex">
                            <base-button
                              class="like btn-link text-white"
                              type="info"
                              size="sm"
                              icon
                            >Lihat RB</base-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </tab-pane>
                    <tab-pane id="rb4">
                      <span slot="title">RB 4</span>
                      <!-- TableMLM here! -->
                      <el-table
                        :data="item"
                        header-row-class-name="thead-light"
                        class="table-responsive table-flush"
                      >
                        <el-table-column label="No" prop="no" width="100"></el-table-column>
                        <el-table-column label="Nama AXI" prop="nama_axi" width="250"></el-table-column>
                        <el-table-column label="AXI ID" prop="axi_id" width="150"></el-table-column>
                        <el-table-column label="Poin Reward" prop="poin_reward" width="150"></el-table-column>
                        <el-table-column label="Poin Trip" prop="poin_trip" width="150"></el-table-column>
                        <el-table-column label="No Telp" prop="no_telp" width="150"></el-table-column>
                        <el-table-column label="Cabang" prop="cabang" width="120"></el-table-column>
                        <el-table-column prop="id" min-width="130px" label="Aksi">
                          <template class="d-flex">
                            <base-button
                              class="like btn-link text-white"
                              type="info"
                              size="sm"
                              icon
                            >Lihat RB</base-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </tab-pane>
                  </tabs>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="col-sm-4">
          <card>
            <p class="font-weight-bold">Foto Profil</p>
            <card>
              <transition name="fade" mode="out-in">
                <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content: center;">
                  <br />
                  <!-- <center> -->
                    <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
                  <!-- </center> -->
                </div>
                <div key="2" v-if="isShow">
                  <div class="row">
                    <div>
                      <div class="images" v-viewer>
                        <template
                          v-if="getIncluded('profiles', axi.relationships.profile.data, 'avatar_url')"
                        >
                          <img
                            v-bind:src="getIncluded('profiles', axi.relationships.profile.data, 'avatar_url')"
                            class="img-fluid"
                            alt
                            height="125"
                            v-if="axi.attributes"
                          />
                        </template>
                        <template
                          v-if="!getIncluded('profiles', axi.relationships.profile.data, 'avatar_url')"
                        >
                          <img
                            src="/images/image-empty-default.png"
                            class="img-fluid"
                            alt
                            height="140"
                            v-if="axi.attributes"
                          />
                        </template>
                      </div>
                      <br />
                      <!-- <div class="btn-file-upload"> -->
                      <!-- <label for="profile" class="btn btn-sm btn-secondary">Ganti Foto</label> -->
                      <!-- <input type="file" id="profile"> -->
                      <!-- </div> -->
                    </div>
                  </div>
                </div>
              </transition>
            </card>
            <p class="font-weight-bold">Info Point</p>
            <card>
              <transition name="fade" mode="out-in">
                <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content: center;">
                  <br />
                  <!-- <center> -->
                    <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
                  <!-- </center> -->
                </div>
                <div key="2" v-if="isShow">
                  <div class="row">
                    <div class="col-6">Point Reward</div>
                    <div class="col-6" v-if="point">: {{ axiData.point_reward }}</div>
                  </div>
                  <div class="row">
                    <div class="col-6">Point Trip</div>
                    <div class="col-6" v-if="point">: {{ axiData.point_trip }}</div>
                  </div>
                  <div class="row">
                    <div class="col-6">Insentive Car</div>
                    <div class="col-6" v-if="point">: Rp. {{ axiData.insentif_car }}</div>
                  </div>
                  <div class="row">
                    <div class="col-6">Insentive Mcy</div>
                    <div class="col-6" v-if="point">: Rp. {{ axiData.insentif_mcy }}</div>
                  </div>
                </div>
              </transition>
            </card>
            <p class="font-weight-bold">Lampiran</p>
            <transition name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content: center;">
                <br />
                <!-- <center> -->
                  <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
                <!-- </center> -->
              </div>
              <div key="2" v-if="isShow">
                <collapse :multiple-active="false">
                  <collapse-item name="1">
                    <h5 slot="title" class="mb-0">Foto KTP</h5>
                    <div>
                      <div class="images" v-viewer>
                        <template
                          v-if="getIncluded('profiles', axi.relationships.profile.data, 'scan_ktp_url')"
                        >
                          <img
                            v-bind:src="getIncluded('profiles', axi.relationships.profile.data, 'scan_ktp_url')"
                            class="img-fluid"
                            alt
                            height="140"
                            v-if="axi.attributes"
                          />
                        </template>
                        <template
                          v-if="!getIncluded('profiles', axi.relationships.profile.data, 'scan_ktp_url')"
                        >
                          <img
                            src="/images/image-empty-default.png"
                            class="img-fluid"
                            alt
                            height="140"
                            v-if="axi.attributes"
                          />
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
                        <template
                          v-if="getIncluded('npwps', axi.relationships.npwps.data, 'scan_url')"
                        >
                          <img
                            v-bind:src="getIncluded('npwps', axi.relationships.npwps.data, 'scan_url')"
                            class="img-fluid"
                            alt
                            height="140"
                            v-if="axi.attributes"
                          />
                        </template>
                        <template
                          v-if="!getIncluded('npwps', axi.relationships.npwps.data, 'scan_url')"
                        >
                          <img
                            src="/images/image-empty-default.png"
                            class="img-fluid"
                            alt
                            height="140"
                            v-if="axi.attributes"
                          />
                        </template>
                      </div>
                      <!-- <div class="btn-file-upload"> -->
                      <!-- <label for="npwp" class="btn btn-sm btn-secondary mt-3">Ganti Foto</label> -->
                      <!-- <input type="file" id="npwp"> -->
                      <!-- </div> -->
                    </div>
                  </collapse-item>
                  <collapse-item name="3">
                    <h5 slot="title" class="mb-0">Foto Buku Tabungan</h5>
                    <div>
                      <div class="images" v-viewer>
                        <template
                          v-if="getIncluded('accounts', axi.relationships.accounts.data, 'scan_url')"
                        >
                          <img
                            v-bind:src="getIncluded('accounts', axi.relationships.accounts.data, 'scan_url')"
                            class="img-fluid"
                            alt
                            height="140"
                            v-if="axi.attributes"
                          />
                        </template>
                        <template
                          v-if="!getIncluded('accounts', axi.relationships.accounts.data, 'scan_url')"
                        >
                          <img
                            src="/images/image-empty-default.png"
                            class="img-fluid"
                            alt
                            height="140"
                            v-if="axi.attributes"
                          />
                        </template>
                      </div>
                      <!-- <div class="btn-file-upload"> -->
                      <!-- <label for="buku_tabungan" class="btn btn-sm btn-secondary mt-3">Ganti Foto</label> -->
                      <!-- <input type="file" id="buku_tabungan"> -->
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
    <ValidationObserver v-slot="{ invalid }" ref="editForm">
      <el-form @submit.prevent="simpanData">
        <el-dialog :visible.sync="showModal" title="Ubah Data" v-if="isShow">
          <template slot="header">
            <h5 class="modal-title">
              <b>Edit Data</b>
            </h5>
          </template>
          <div key="1" v-if="!isModalProcess">
            <div class="form-group">
              <h5 class="modal-title">Informasi Umum</h5>
            </div>
            <div class="form-group">
              <div class="row mb-4">
                <label for="nama_axi" class="col-md-4 col-form-label form-control-label">Nama AXI</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Nama AXI"
                    :rules="{
                        required: true,
                        regex: /^[a-z.'/ A-Z]+$/
                    }"
                    v-slot="{ errors }"
                  >
                    <el-input id="nama_axi" v-model="tempProfile.attributes.nama" required></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="axi_id" class="col-md-4 col-form-label form-control-label">AXI ID</label>
                <div class="col-md-8">
                  <ValidationProvider name="AXI ID" rules="required" v-slot="{ errors }">
                    <el-input id="axi_id" v-model="axi.attributes.nomor_axi_id" required></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="cabang" class="col-md-4 col-form-label form-control-label">Cabang</label>
                <div class="col-md-8">
                  <ValidationProvider name="Cabang" rules="required" v-slot="{ errors }">
                    <!-- <el-input id="provinsi" type="text" v-model="axiData.provinsi" required></el-input> -->
                    <el-select
                      v-model="cabangValue"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="Ketik Cabang Anda"
                      :remote-method="cabangRemoteMethod"
                      :loading="loading"
                    >
                      <el-option
                        v-for="item in optionsCabang"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <!-- <label for="cabang" class="col-md-4 col-form-label form-control-label">Cabang</label>
                <div class="col-md-8">
                  <el-input id="cabang" v-model="tempCabang.attributes.nama" required></el-input>
                </div>-->
              </div>
              <div class="row mb-4">
                <label
                  for="tanggal_daftar"
                  class="col-md-4 col-form-label form-control-label"
                >Tanggal Daftar</label>
                <div class="col-md-8">
                  <ValidationProvider name="Tanggal Daftar" rules="required" v-slot="{ errors }">
                    <el-input
                      id="tanggal_daftar"
                      type="date"
                      v-model="axi.attributes.tanggal_daftar"
                      required
                    ></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="no_ktp" class="col-md-4 col-form-label form-control-label">Nomor KTP</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Nomor KTP"
                    :rules="{
                      required: true,
                      digits: 16,
                      regex:/^(?!0)([0-9]{12})(?=[0-9]{4})(?!(0{4})).{4}$/,
                      numeric: true
                    }"
                    v-slot="{ errors }"
                  >
                    <el-input
                      type="text"
                      id="no_ktp"
                      v-model="tempProfile.attributes.no_ktp"
                      maxlength="16"
                      required
                    ></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label
                  for="tempat_lahir"
                  class="col-md-4 col-form-label form-control-label"
                >Tempat Lahir</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Kota Lahir"
                    :rules="{
                        required: true,
                        regex: /^[a-z.'/ A-Z]+$/
                    }"
                    v-slot="{ errors }"
                  >
                    <el-input
                      id="tempat_lahir"
                      v-model="tempProfile.attributes.kota_lahir"
                      required
                    ></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label
                  for="tanggal_lahir"
                  class="col-md-4 col-form-label form-control-label"
                >Tanggal Lahir</label>
                <div class="col-md-8">
                  <ValidationProvider name="Tanggal Lahir" rules="required" v-slot="{ errors }">
                    <el-input
                      id="tanggal_lahir"
                      type="date"
                      v-model="tempProfile.attributes.tanggal_lahir"
                      required
                    ></el-input>
                    <!-- <el-input id="tanggal_lahir" addon-left-icon="ni ni-calendar-grid-58" required>
                      <flat-picker slot-scope="{focus, blur}"
                                  @on-open="focus"
                                  @on-close="blur"
                                  :config="{allowInput: true, dateFormat: 'd-m-Y'}"
                                  class="form-control datepicker"
                                  v-model="axiData.tanggal_lahir">
                      </flat-picker>
                    </el-input>-->
                    <!-- <el-input id="tanggal_lahir" type="date" v-model="axiData.tanggal_lahir" required></el-input> -->
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="mentor" class="col-md-4 col-form-label form-control-label">Mentor</label>
                <div class="col-md-8">
                  <ValidationProvider name="Mentor" rules="required" v-slot="{ errors }">
                    <el-input id="mentor" type="text" v-model="axi.attributes.axi_id_reff" required></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="no_hp" class="col-md-4 col-form-label form-control-label">Nomor HP</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Nomor HP"
                    :rules="{
                      required: true,
                      numeric: true,
                      min: 9,
                      max: 16,
                      regex: /^62[0-9]+$/
                    }"
                    v-slot="{ errors }"
                  >
                    <el-input
                      type="text"
                      id="no_hp"
                      name="no_hp"
                      v-model="tempProfile.attributes.no_hp"
                      maxlength="16"
                      required
                    ></el-input>
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
                    <el-input
                      id="email"
                      type="email"
                      v-model="tempProfile.attributes.email"
                      required
                    ></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="alamat" class="col-md-4 col-form-label form-control-label">Alamat</label>
                <div class="col-md-8">
                  <!-- <el-input id="alamat" required> -->
                  <ValidationProvider
                    name="Alamat"
                    :rules="{
                      required: true,
                      regex: /^[a-z.'/ A-Z0-9-]+$/
                    }"
                    v-slot="{ errors }"
                  >
                    <textarea
                      class="form-control"
                      name
                      id="alamat"
                      cols="30"
                      rows="5"
                      v-model="tempAlamat.attributes.jalan"
                    ></textarea>
                    <span class="error">{{ errors[0] }}</span>
                    <!-- </el-input> -->
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="provinsi" class="col-md-4 col-form-label form-control-label">Provinsi</label>
                <div class="col-md-8">
                  <!-- <el-input id="provinsi" type="text" v-model="axiData.provinsi" required></el-input> -->
                  <ValidationProvider name="Provinsi" rules="required" v-slot="{ errors }">
                    <el-select
                      v-model="provinsiValue"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="Ketik Provinsi Anda"
                      @change="onChangeProvinsi"
                      :remote-method="provinsiRemoteMethod"
                      :loading="loading"
                    >
                      <el-option
                        v-for="item in optionsProvinsi"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="kota" class="col-md-4 col-form-label form-control-label">Kota</label>
                <div class="col-md-8">
                  <ValidationProvider name="Kota" rules="required" v-slot="{ errors }">
                    <!-- <el-input id="kecamatan" type="text" v-model="axiData.kecamatan" required></el-input> -->
                    <el-select
                      v-model="kotaValue"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="Ketik Kota Anda"
                      @change="onChangeKota"
                      :disabled="provinsiValue == ''"
                      :remote-method="kotaRemoteMethod"
                      :loading="loading"
                    >
                      <el-option
                        v-for="item in optionsKota"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="kecamatan" class="col-md-4 col-form-label form-control-label">Kecamatan</label>
                <div class="col-md-8">
                  <ValidationProvider name="Kecamatan" rules="required" v-slot="{ errors }">
                    <!-- <el-input id="kecamatan" type="text" v-model="axiData.kecamatan" required></el-input> -->
                    <el-select
                      v-model="kecamatanValue"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="Ketik Kecamatan Anda"
                      @change="onChangeKecamatan"
                      :disabled="kotaValue == ''"
                      :remote-method="kecamatanRemoteMethod"
                      :loading="loading"
                    >
                      <el-option
                        v-for="item in optionsKecamatan"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label
                  for="kelurahan"
                  class="col-md-4 col-form-label form-control-label"
                >Kelurahan/Desa</label>
                <div class="col-md-8">
                  <ValidationProvider name="Kelurahan" rules="required" v-slot="{ errors }">
                    <!-- <el-input id="kelurahan" type="text" v-model="axiData.kelurahan" required></el-input> -->
                    <el-select
                      v-model="kelurahanValue"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="Ketik Kelurahan Anda"
                      @change="onChangeKelurahan"
                      :disabled="kecamatanValue == ''"
                      :remote-method="kelurahanRemoteMethod"
                      :loading="loading"
                    >
                      <el-option
                        v-for="item in optionsKelurahan"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="kode_pos" class="col-md-4 col-form-label form-control-label">Kode Pos</label>
                <div class="col-md-8">
                  <el-input id="kode_pos" type="number" v-model="kode_pos" required disabled></el-input>
                </div>
              </div>
              <div class="row mb-4">
                <label for="rw" class="col-md-4 col-form-label form-control-label">RW</label>
                <div class="col-md-8">
                  <ValidationProvider name="RW" rules="required|numeric" v-slot="{ errors }">
                    <el-input
                      id="rw"
                      type="text"
                      v-model="tempAlamat.attributes.rw"
                      maxlength="3"
                      required
                    ></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label for="rt" class="col-md-4 col-form-label form-control-label">RT</label>
                <div class="col-md-8">
                  <ValidationProvider name="RT" rules="required|numeric" v-slot="{ errors }">
                    <el-input
                      id="rt"
                      type="text"
                      v-model="tempAlamat.attributes.rt"
                      maxlength="3"
                      required
                    ></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label
                  for="status_perkawinan"
                  class="col-md-4 col-form-label form-control-label"
                >Status Perkawinan</label>
                <div class="col-md-8">
                  <ValidationProvider name="Status Perkawinan" rules="required" v-slot="{ errors }">
                    <el-select v-model="tempProfile.attributes.status_perkawinan">
                      <el-option value="Belum Menikah" label="Belum Menikah">Belum Menikah</el-option>
                      <el-option value="Menikah" label="Menikah">Menikah</el-option>
                    </el-select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label
                  for="nama_ibu_kandung"
                  class="col-md-4 col-form-label form-control-label"
                >Nama Ibu Kandung</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Nama Ibu Kandung"
                    :rules="{
                        required: true,
                        regex: /^[a-z.'/ A-Z]+$/
                    }"
                    v-slot="{ errors }"
                  >
                    <el-input
                      id="nama_ibu_kandung"
                      type="text"
                      v-model="tempProfile.attributes.nama_ibu_kandung"
                      required
                    ></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label
                  for="nama_pasangan"
                  class="col-md-4 col-form-label form-control-label"
                >Nama Pasangan</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Nama Pasangan"
                    :rules="{
                        required: true,
                        regex: /^[a-z.'/ A-Z]+$/
                    }"
                    v-slot="{ errors }"
                  >
                    <el-input
                      id="nama_pasangan"
                      type="text"
                      v-model="tempProfile.attributes.nama_pasangan"
                      required
                    ></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label
                  for="no_ktp_pasangan"
                  class="col-md-4 col-form-label form-control-label"
                >No. KTP Pasangan</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Nomor KTP Pasangan"
                    :rules="{
                      required: true,
                      digits: 16,
                      regex:/^(?!0)([0-9]{12})(?=[0-9]{4})(?!(0{4})).{4}$/
                    }"
                    v-slot="{ errors }"
                  >
                    <el-input
                      id="no_ktp_pasangan"
                      type="text"
                      v-model="tempProfile.attributes.no_ktp_pasangan"
                      maxlength="16"
                      required
                    ></el-input>
                    <!-- <span class="error" v-if="failedRules.regex">Masukan Nomor KTP dengan benar</span> -->
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-4">
                <label
                  for="jenis_kelamin"
                  class="col-md-4 col-form-label form-control-label"
                >Jenis Kelamin</label>
                <div class="col-md-8">
                  <!-- <base-input id="jenis_kelamin" required>
                    <select class="form-control" v-model="tempProfile.attributes.jenis_kelamin">
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </base-input>-->
                  <ValidationProvider name="Jenis Kelamin" rules="required" v-slot="{ errors }">
                    <el-select v-model="tempProfile.attributes.jenis_kelamin">
                      <el-option value="L" label="Laki-laki">Laki-laki</el-option>
                      <el-option value="P" label="Perempuan">Perempuan</el-option>
                    </el-select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row mb-6">
                <label for="no_npwp" class="col-md-4 col-form-label form-control-label">Nomor NPWP</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Nomor NPWP"
                    :rules="'required|digits:15|numeric'"
                    v-slot="{ errors }"
                  >
                    <el-input
                      id="no_npwp"
                      type="text"
                      v-model="tempNpwp.attributes.nomor"
                      maxlength="15"
                      required
                    ></el-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="form-group">
              <h5 class="modal-title">Informasi Rekening</h5>
            </div>
            <div class="form-group">
              <div class="row mb-4">
                <!-- <label for="nama_bank" class="col-md-4 col-form-label form-control-label">Nama Bank</label>
                <div class="col-md-8">-->
                <label for="bank" class="col-md-4 col-form-label form-control-label">Nama Bank</label>
                <div class="col-md-8">
                  <!-- <el-input id="kelurahan" type="text" v-model="axiData.kelurahan" required></el-input> -->
                  <ValidationProvider name="Nama Bank" :rules="'required'" v-slot="{ errors }">
                    <el-select
                      v-model="bankValue"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="Ketik Nama Bank"
                      :remote-method="bankRemoteMethod"
                      :loading="loading"
                    >
                      <el-option
                        v-for="item in optionsBank"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <!-- <base-input id="nama_bank" type="text" v-model="tempBank.attributes.nama" required></base-input> -->
                <!-- </div> -->
              </div>
              <div class="row">
                <label
                  for="no_rekening"
                  class="col-md-4 col-form-label form-control-label"
                >Nomor Rekening</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Nomor Rekening"
                    :rules="'required|numeric'"
                    v-slot="{ errors }"
                  >
                    <base-input
                      id="no_rekening"
                      type="text"
                      v-model="tempRekening.attributes.no_rekening"
                      required
                    ></base-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row">
                <label
                  for="cabang_bank"
                  class="col-md-4 col-form-label form-control-label"
                >Cabang Bank</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Cabang Bank"
                    :rules="{
                        required: true,
                        regex: /^[a-z.'/ A-Z]+$/
                    }"
                    v-slot="{ errors }"
                  >
                    <base-input
                      id="cabang_bank"
                      type="text"
                      v-model="tempRekening.attributes.cabang_bank"
                      required
                    ></base-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row">
                <label for="kota_bank" class="col-md-4 col-form-label form-control-label">Kota Bank</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Kota Bank"
                    :rules="{
                        required: true,
                        regex: /^[a-z.'/ A-Z]+$/
                    }"
                    v-slot="{ errors }"
                  >
                    <base-input
                      id="kota_bank"
                      type="text"
                      v-model="tempRekening.attributes.kota_bank"
                      required
                    ></base-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row">
                <label
                  for="an_rekening"
                  class="col-md-4 col-form-label form-control-label"
                >Atas Nama Rekening</label>
                <div class="col-md-8">
                  <ValidationProvider
                    name="Atas Nama Rekening"
                    :rules="{
                        required: true,
                        regex: /^[a-z.'/ A-Z]+$/
                    }"
                    v-slot="{ errors }"
                  >
                    <base-input
                      id="an_rekening"
                      type="text"
                      v-model="tempRekening.attributes.an_rekening"
                      required
                    ></base-input>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
          <div key="2" v-if="isModalProcess" class="text-center p-5" style="display: flex; justify-content: center;">
            <!-- <center><fulfilling-bouncing-circle-spinner
              :animation-duration="2000"
              :size="60"
              color="#ff1d5e"
            /></center>-->
            <!-- <center> -->
              <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
            <!-- </center> -->
          </div>
          <template slot="footer" v-if="!isModalProcess">
            <el-form-item>
              <el-button type="secondary" @click="showModal = false">Tutup</el-button>
              <el-button type="success" @click="simpanData" :disabled="invalid">Simpan</el-button>
            </el-form-item>
          </template>
        </el-dialog>
      </el-form>
    </ValidationObserver>
    <el-form @submit.prevent="simpanPoint">
      <el-dialog :visible.sync="showModalPoint" title="Ubah Point" v-if="isShow">
        <template slot="header">
          <h5 class="modal-title">
            <b>Edit Point</b>
          </h5>
        </template>
        <div key="1" v-if="!isModalProcess">
          <!-- <div class="form-group">
              <h5 class="modal-title">Informasi Umum</h5>
          </div>-->
          <div class="form-group">
            <div class="row mb-4">
              <label
                for="point_reward"
                class="col-md-4 col-form-label form-control-label"
              >Point Reward</label>
              <div class="col-md-8">
                <el-input
                  id="point_reward"
                  type="number"
                  v-model="point[0].attributes.point_reward"
                  placeholder="Masukkan point reward"
                  required
                ></el-input>
              </div>
            </div>
            <div class="row mb-4">
              <label for="point_trip" class="col-md-4 col-form-label form-control-label">Point Trip</label>
              <div class="col-md-8">
                <el-input
                  id="point_trip"
                  type="number"
                  v-model="point[0].attributes.point_trip"
                  placeholder="Masukkan point trip"
                  required
                ></el-input>
              </div>
            </div>
            <div class="row mb-4">
              <label
                for="insentif_car"
                class="col-md-4 col-form-label form-control-label"
              >Insentive Car</label>
              <div class="col-md-8">
                <el-input
                  id="insentif_car"
                  type="number"
                  v-model="point[0].attributes.insentif_car"
                  placeholder="Masukkan point insentif car"
                  required
                >
                  <template slot="prepend">Rp</template>
                </el-input>
              </div>
            </div>
            <div class="row mb-4">
              <label
                for="insentif_mcy"
                class="col-md-4 col-form-label form-control-label"
              >Insentive Mcy</label>
              <div class="col-md-8">
                <el-input
                  id="insentif_mcy"
                  type="number"
                  v-model="point[0].attributes.insentif_mcy"
                  placeholder="Masukkan point insentif mcy"
                  required
                >
                  <template slot="prepend">Rp</template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <div key="2" v-if="isModalProcess" class="text-center p-5" style="display: flex; justify-content: center;">
          <!-- <center><fulfilling-bouncing-circle-spinner
              :animation-duration="2000"
              :size="60"
              color="#ff1d5e"
          /></center>-->
          <!-- <center> -->
            <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
          <!-- </center> -->
        </div>
        <template slot="footer" v-if="!isModalProcess">
          <el-form-item>
            <el-button type="secondary" @click="showModalPoint = false">Tutup</el-button>
            <el-button type="success" @click="simpanPoint">Simpan</el-button>
          </el-form-item>
        </template>
      </el-dialog>
    </el-form>
    <el-form @submit.prevent="simpanFoto">
      <el-dialog :visible.sync="showModalFoto" title="Ubah Foto" v-if="isShow">
        <template slot="header">
          <h5 class="modal-title">
            <b>Edit Foto</b>
          </h5>
        </template>
        <div key="1" v-if="!isModalProcess">
          <!-- Foto Profil -->
          <div class="form-group">
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label">Foto Profil</label>
              <div class="col-md-8">
                <file-input
                  @change="fotoProfilChange"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <label class="col-md-4 col-form-label form-control-label"></label>
            <div class="col-md-8 mt-2 mb-4">
              <img :src="imagePreview" v-if="imagePreview" width="200px" alt="" />
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label">Foto KTP</label>
              <div class="col-md-8">
                <file-input @change="fotoKtpChange" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG" />
              </div>
            </div>
          </div>
          <div class="row">
            <label class="col-md-4 col-form-label form-control-label"></label>
            <div class="col-md-8 mt-2 mb-4">
              <img :src="ktpPreview" v-if="ktpPreview" width="200px" alt="" />
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label">Foto NPWP</label>
              <div class="col-md-8">
                <file-input @change="fotoNpwpChange" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG" />
              </div>
            </div>
          </div>
          <div class="row">
            <label class="col-md-4 col-form-label form-control-label"></label>
            <div class="col-md-8 mt-2 mb-4">
              <img :src="npwpPreview" v-if="npwpPreview" width="200px" alt="" />
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label form-control-label">Foto Buku</label>
              <div class="col-md-8">
                <file-input @change="fotoBukuChange" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG" />
              </div>
            </div>
          </div>
          <div class="row">
            <label class="col-md-4 col-form-label form-control-label"></label>
            <div class="col-md-8 mt-2 mb-4">
              <img :src="bukuPreview" v-if="bukuPreview" width="200px" alt="" />
            </div>
          </div>
        </div>
        <div key="2" v-if="isModalProcess" class="text-center p-5" style="display: flex; justify-content: center;">
          <!-- <center><fulfilling-bouncing-circle-spinner
              :animation-duration="2000"
              :size="60"
              color="#ff1d5e"
          /></center>-->
          <!-- <center> -->
            <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
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

    <modal :show.sync="showModalLoading">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template>-->
      <!-- <h3 class="text-center">Loading</h3> -->
      <h3 class="text-center" style="display: flex; justify-content: center;">Loading</h3>
      <br />
      <!-- <center> -->
        <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
      <!-- </center> -->
    </modal>
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import id from "vee-validate/dist/locale/id.json";
import * as Rules from "vee-validate/dist/rules";
import { TimeLine, TimeLineItem } from "@/components";
import {
  Button,
  Table,
  TableColumn,
  Select,
  Option,
  Dialog,
  Form,
  FormItem,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "element-ui";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Collapse from "@/components/Collapse/Collapse";
import CollapseItem from "@/components/Collapse/CollapseItem";
import Tab from "@/components/Tabs/Tab";
import Tabs from "@/components/Tabs/Tabs";
import Badge from "@/components/Badge";
import DropzoneFileUpload from "@/components/Inputs/DropzoneFileUpload";
import moment from "moment";
import "moment/locale/id";
import swal from "sweetalert2";
import {
  HalfCircleSpinner,
  FulfillingBouncingCircleSpinner
} from "epic-spinners";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import FileInput from "@/components/Inputs/FileInput";

for (var rule in Rules) {
  extend(rule, Rules[rule]);
}

localize("id", id);
localize({
  id: {
    fields: {
      "Nomor HP": {
        regex: "Format Nomor HP salah. Contoh: (6281234567890)"
      }
    }
  }
});

export default {
  components: {
    Badge,
    TimeLine,
    TimeLineItem,
    [Tab.name]: Tab,
    Tabs,
    Collapse,
    CollapseItem,
    DropzoneFileUpload,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    HalfCircleSpinner,
    FulfillingBouncingCircleSpinner,
    flatPicker,
    ValidationObserver,
    ValidationProvider,
    FileInput
  },
  data() {
    return {
      title: "details",
      // IMAGE HERE
      imagePreview: null,
      ktpPreview: null,
      npwpPreview: null,
      bukuPreview: null,
      tmpAvatar: "",
      tmpKtp: "",
      tmpNpwp: "",
      tmpBuku: "",

      // --------- Dropdown search ---------
      // Data Provinsi
      optionsProvinsi: [],
      provinsiValue: "",
      provinsilist: [],

      // Data Kota
      optionsKota: [],
      kotaValue: "",
      kotalist: [],

      // Data Kecamatan
      optionsKecamatan: [],
      kecamatanValue: "",
      kecamatanlist: [],

      // Data Kelurahan
      optionsKelurahan: [],
      kelurahanValue: "",
      kelurahanlist: [],
      // Data Bank
      optionsBank: [],
      bankValue: "",
      banklist: [],
      // Data Cabang
      optionsCabang: [],
      cabangValue: "",
      cabanglist: [],

      // Essential
      loading: false,
      isLoading: true,
      isError: false,
      isShow: false,
      isModalProcess: false,
      errormsg: "",
      showModal: false,
      showModalPoint: false,
      showModalFoto: false,
      showModalLoading: false,
      axiData: {},
      isHideDownloadBtn: false,
      item: [
        // dummy for mlm table
        {
          no: 1,
          nama_axi: "Darwis Triadi Intermediate",
          axi_id: "12093812",
          poin_reward: 5000,
          poin_trip: 9000,
          no_telp: "087842810",
          cabang: "Jaksel 1"
        },
        {
          no: 2,
          nama_axi: "Tedday",
          axi_id: "12093812",
          poin_reward: 5000,
          poin_trip: 9000,
          no_telp: "087842810",
          cabang: "Jaksel 1"
        }
      ],

      // Data for submit edit
      tempProfile: {},
      tempRekening: {},
      tempNpwp: {},
      tempCabang: {},
      tempCabangDaftar: {},
      tempAlamat: {},
      tempBank: {},
      kode_pos: "",
      hideMLM: true
    };
  },
  computed: {
    ...mapGetters("axi", [
      "axi",
      "included",
      "lokasi",
      "lokasiIncluded",
      "banks",
      "cabangs",
      "provinsis",
      "kotas",
      "kecamatans",
      "desas",
      "point"
    ]),
    ...mapGetters("auth", ["user"]),
    idAxiDetail() {
      return this.$route.params.id;
    }
  },
  methods: {
    ...mapActions("axi", [
      "getAxi",
      "getLokasi",
      "getPoint",
      "getBanks",
      "getCabangs",
      "getProvinsis",
      "getKotas",
      "getKecamatans",
      "getDesas",
      "updateAxi",
      "updateProfile",
      "updateAlamat",
      "updateNpwp",
      "updateRekening",
      "updatePoint",
      "updateFotoProfile",
      "updateFotoNpwp",
      "updateFotoRekening",
      "exportAxi"
    ]),
    ...mapActions("auth", [
      "checkAuth",
      "refreshToken",
      "resetPassword",
      "updateUser",
      "getUser"
    ]),
    async permissionAuth() {
      this.isLoading = true;
      this.isShow = false;

      if (!window.localStorage.getItem("access_token")) {
        swal.fire({
          type: "error",
          title: "Unauthenticated",
          text: "Silahkan untuk login kembali",
          timer: 2500
        });

        this.$router.push("/login");
      } else {
        let res = await this.checkAuth();
        if (res.name == "Error" && res.response.status == 401) {
          window.localStorage.removeItem("access_token");
          window.localStorage.removeItem("refresh_token");
          window.localStorage.removeItem("role");
          window.localStorage.removeItem("user");

          swal.fire({
            type: "error",
            title: "Unauthenticated",
            text: "Silahkan untuk login kembali",
            timer: 2500
          });

          this.$router.push("/login");
        }
      }
      this.checkPermission();
    },
    checkPermission() {
        console.log(window.localStorage.getItem('role'))
      if (window.localStorage.getItem('role') != "Super Admin") {
        swal("Error", "Role anda tidak memiliki akses untuk melihat halaman ini", "error")
        this.$router.push('/administrator/dashboard')
      }
    },

    /**
     * --------------------------------------------------
     * Data Handling here
     *  -> remoteMethods for handling edit data input form
     *  -> getData for fetching data from endpoint
     *  -> assignMeta for assigning from meta
     *  -> getIncluded for assigning from included
     * --------------------------------------------------
     */

    async cabangRemoteMethod(query) {
      if (query !== "") {
        this.loading = true;

        await this.getCabangs(query);
        this.cabanglist = this.cabangs.map(item => {
          return { value: item.id, label: item.attributes.nama };
        });
        this.loading = false;
        this.optionsCabang = this.cabanglist.filter(item => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      } else {
        this.optionsCabang = [];
      }
    },

    async provinsiRemoteMethod(query) {
      if (query !== "") {
        this.loading = true;

        await this.getProvinsis(query);
        this.provinsilist = this.provinsis.map(item => {
          return { value: item.id, label: item.attributes.nama };
        });
        this.loading = false;
        this.optionsProvinsi = this.provinsilist.filter(item => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      } else {
        this.optionsProvinsi = [];
      }
    },

    async kotaRemoteMethod(query) {
      if (query !== "") {
        this.loading = true;

        const payload = {
          nama: query,
          provinsi: this.provinsiValue
        };

        await this.getKotas(payload);
        this.kotalist = this.kotas.map(item => {
          return { value: item.id, label: item.attributes.nama };
        });
        this.loading = false;
        this.optionsKota = this.kotalist.filter(item => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      } else {
        this.optionsKota = [];
      }
    },

    async kecamatanRemoteMethod(query) {
      if (query !== "") {
        this.loading = true;

        const payload = {
          nama: query,
          kota: this.kotaValue
        };

        await this.getKecamatans(payload);
        this.kecamatanlist = this.kecamatans.map(item => {
          return { value: item.id, label: item.attributes.nama };
        });
        this.loading = false;
        this.optionsKecamatan = this.kecamatanlist.filter(item => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      } else {
        this.optionsKecamatan = [];
      }
    },

    async kelurahanRemoteMethod(query) {
      if (query !== "") {
        this.loading = true;

        const payload = {
          nama: query,
          kecamatan: this.kecamatanValue
        };

        await this.getDesas(payload);
        this.kelurahanlist = this.desas.map(item => {
          return {
            value: item.id,
            label: item.attributes.nama,
            kode_pos: item.attributes.kode_pos
          };
        });
        this.loading = false;
        this.optionsKelurahan = this.kelurahanlist.filter(item => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      } else {
        this.optionsKelurahan = [];
      }
    },
    async bankRemoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.optionsBank = this.banklist.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.optionsBank = [];
      }
    },

    assignDropdownSearch() {
      // Dropdown
      this.cabanglist = [
        {
          value: this.tempCabang.id,
          label: this.tempCabang.attributes.nama
        }
      ];
      this.optionsCabang = this.cabanglist;
      this.cabangValue = this.tempCabang.id;

      // ---- Provinsi ----
      this.provinsilist = [
        {
          value: this.lokasiIncluded.find(x => x.type == "provinces").id,
          label: this.lokasiIncluded.find(x => x.type == "provinces").attributes
            .nama
        }
      ];
      this.optionsProvinsi = this.provinsilist;
      this.provinsiValue = this.lokasiIncluded.find(
        x => x.type == "provinces"
      ).id;
      // ---- Kota ----
      this.kotalist = [
        {
          value: this.lokasiIncluded.find(x => x.type == "cities").id,
          label: this.lokasiIncluded.find(x => x.type == "cities").attributes
            .nama
        }
      ];
      this.optionsKota = this.kotalist;
      this.kotaValue = this.lokasiIncluded.find(x => x.type == "cities").id;
      // ---- Kecamatan ----
      this.kecamatanlist = [
        {
          value: this.lokasiIncluded.find(x => x.type == "districts").id,
          label: this.lokasiIncluded.find(x => x.type == "districts").attributes
            .nama
        }
      ];
      this.optionsKecamatan = this.kecamatanlist;
      this.kecamatanValue = this.lokasiIncluded.find(
        x => x.type == "districts"
      ).id;
      // ---- Kelurahan ----
      this.kelurahanlist = [
        {
          value: this.lokasiIncluded.find(x => x.type == "villages").id,
          label: this.lokasiIncluded.find(x => x.type == "villages").attributes
            .nama
        }
      ];
      this.optionsKelurahan = this.kelurahanlist;
      this.kelurahanValue = this.lokasiIncluded.find(
        x => x.type == "villages"
      ).id;
      this.kode_pos = this.lokasiIncluded.find(x => x.type == "villages")
        .attributes.kode_pos
        ? this.lokasiIncluded.find(x => x.type == "villages").attributes
            .kode_pos
        : "-";
      // ====================================

      this.banklist = this.banks.map(item => {
        return { value: item.id, label: item.attributes.nama };
      });
      this.optionsBank = this.banklist;
      this.bankValue = this.tempRekening.attributes.bank_id.toString();
    },
    onChangeProvinsi() {
      this.kotaValue = "";
      this.kecamatanValue = "";
      this.kelurahanValue = "";
      this.optionsKota = [];
      this.optionsKecamatan = [];
      this.optionsKelurahan = [];
      this.kode_pos = "";
    },
    onChangeKota() {
      this.kecamatanValue = "";
      this.kelurahanValue = "";
      this.optionsKecamatan = [];
      this.optionsKelurahan = [];
      this.kode_pos = "";
    },
    onChangeKecamatan() {
      this.kelurahanValue = "";
      this.optionsKelurahan = [];
      this.kode_pos = "";
    },
    onChangeKelurahan() {
      this.kode_pos = this.kelurahanlist.find(
        x => x.value == this.kelurahanValue
      ).kode_pos
        ? this.kelurahanlist.find(x => x.id == this.kelurahanValue).kode_pos
        : "-";
    },

    async getData() {
      this.isLoading = true;
      this.isShow = false;

      try {
        await Promise.all([
          await this.getAxi(this.idAxiDetail),
          this.getUser(
            this.included.find(x => x.type == "profiles").relationships.user
              .data.id
          ),
          this.getLokasi(
            this.included.find(x => x.type == "profiles").relationships
              .addresses.data[0].id
          ),
          this.getPoint(this.axi.attributes.nomor_axi_id),
          this.getBanks()
        ]);

        console.log(this.user);

        if (this.axi.attributes.status_id != 32) {
          this.$router.push("/administrator/axi/list");
        } else {
          this.axi.attributes.tanggal_daftar = moment(
            this.axi.attributes.tanggal_daftar
          ).format("YYYY-MM-DD");

          this.tempProfile = this.included.find(x => x.type == "profiles");
          this.tempRekening = this.included.find(x => x.type == "accounts");
          this.tempNpwp = this.included.find(x => x.type == "npwps");
          this.tempCabang = this.included.find(
            x => x.type == "branches" && x.id == this.axi.attributes.cabang_id
          );
          this.tempCabangDaftar = this.included.find(
            x =>
              x.type == "branches" && x.id == this.axi.attributes.cabang_daftar
          );
          this.tempAlamat = this.included.find(
            x =>
              x.type == "addresses" &&
              x.id == this.tempProfile.relationships.addresses.data[0].id
          );
          this.tempBank = this.included.find(x => x.type == "banks");

          if (!this.point[0])
            this.point[0] = {
              attributes: {
                point_reward: null,
                point_trip: null,
                insentif_car: null,
                insentif_mcy: null
              }
            };
          this.axiData = this.packData();

          this.assignDropdownSearch();

          this.isLoading = false;
          this.isShow = true;
        }
      } catch (error) {
        this.isLoading = false;
        // this.isError = true;
        
        this.isError = false;
        this.isShow = true; 
      }
    },

    getIncluded(type, detail, attr) {
      if (detail == null) {
        return "";
      } else {
        let result = this.included.find(obj => {
          return obj.type == type && obj.id == detail.id;
        });
        return result.attributes[attr];
      }
    },

    // this method usable until all backend ready
    packData() {
      const data = {};

      data.nama = this.tempProfile.attributes.nama;
      data.nomor_axi_id = this.axi.attributes.nomor_axi_id;
      data.kode_cabang = this.tempCabang.attributes.kode;
      data.nama_cabang = this.tempCabang.attributes.nama;
      data.kode_cabang_daftar = this.tempCabangDaftar.attributes.kode;
      data.nama_cabang_daftar = this.tempCabangDaftar.attributes.nama;
      data.tanggal_daftar = this.axi.attributes.tanggal_daftar
        ? moment(this.axi.attributes.tanggal_daftar).format("YYYY-MM-DD")
        : "-";
      data.no_ktp = this.tempProfile.attributes.no_ktp
        ? this.tempProfile.attributes.no_ktp
        : "-";
      data.kota_lahir = this.tempProfile.attributes.kota_lahir
        ? this.tempProfile.attributes.kota_lahir
        : "-";
      data.tanggal_lahir = this.tempProfile.attributes.tanggal_lahir
        ? moment(this.tempProfile.attributes.tanggal_lahir).format("YYYY-MM-DD")
        : "-";
      data.axi_id_reff = this.axi.attributes.axi_id_reff
        ? this.axi.attributes.axi_id_reff
        : "-";
      data.no_hp = this.tempProfile.attributes.no_hp
        ? this.tempProfile.attributes.no_hp
        : "-";
      data.email = this.tempProfile.attributes.email
        ? this.tempProfile.attributes.email
        : "-";
      data.jalan = this.tempAlamat ? this.tempAlamat.attributes.jalan : "-";
      data.rt = this.tempAlamat ? this.tempAlamat.attributes.rt : "-";
      data.rw = this.tempAlamat ? this.tempAlamat.attributes.rw : "-";
      data.desa_id = this.tempAlamat ? this.tempAlamat.attributes.desa_id : "-";

      data.kelurahan = this.tempAlamat
        ? this.lokasiIncluded
          ? this.lokasiIncluded.find(x => x.type == "villages").attributes.nama
          : "-"
        : "-";
      data.kecamatan = this.tempAlamat
        ? this.lokasiIncluded
          ? this.lokasiIncluded.find(x => x.type == "districts").attributes.nama
          : "-"
        : "-";
      data.kota = this.tempAlamat
        ? this.lokasiIncluded
          ? this.lokasiIncluded.find(x => x.type == "cities").attributes.nama
          : "-"
        : "-";
      data.provinsi = this.tempAlamat
        ? this.lokasiIncluded
          ? this.lokasiIncluded.find(x => x.type == "provinces").attributes.nama
          : "-"
        : "-";
      data.kode_pos = this.tempAlamat
        ? this.lokasiIncluded
          ? this.lokasiIncluded.find(x => x.type == "villages").attributes
              .kode_pos
            ? this.lokasiIncluded.find(x => x.type == "villages").attributes
                .kode_pos
            : "-"
          : "-"
        : "-";

      data.status_perkawinan = this.tempProfile.attributes.status_perkawinan
        ? this.tempProfile.attributes.status_perkawinan
        : "-";
      data.nama_ibu_kandung = this.tempProfile.attributes.nama_ibu_kandung
        ? this.tempProfile.attributes.nama_ibu_kandung
        : "-";
      data.nama_pasangan = this.tempProfile.attributes.nama_pasangan
        ? this.tempProfile.attributes.nama_pasangan
        : "-";
      data.no_ktp_pasangan = this.tempProfile.attributes.no_ktp_pasangan
        ? this.tempProfile.attributes.no_ktp_pasangan
        : "-";

      data.jenis_kelamin =
        this.tempProfile.attributes.jenis_kelamin == "L"
          ? "Laki-laki"
          : "Perempuan";
      data.no_npwp = this.tempNpwp.attributes.nomor
        ? this.tempNpwp.attributes.nomor
        : "-";

      data.created_at = this.axi.attributes["created-at"];
      data.nama_bank = this.tempBank ? this.tempBank.attributes.nama : "-";
      data.cabang_bank = this.tempRekening
        ? this.tempRekening.attributes.cabang_bank
        : "-";
      data.kota_bank = this.tempRekening
        ? this.tempRekening.attributes.kota_bank
        : "-";
      data.an_rekening = this.tempRekening
        ? this.tempRekening.attributes.an_rekening
        : "-";
      data.no_rekening = this.tempRekening
        ? this.tempRekening.attributes.no_rekening
        : "-";
      data.nama_npwp = this.tempNpwp.attributes.nama;
      data.status_npwp = this.tempNpwp.attributes.tipe;
      data.pkp = this.tempNpwp.attributes.pkp;

      data.kelurahan = this.capitalize(data.kelurahan);
      data.kecamatan = this.capitalize(data.kecamatan);
      data.kota = this.capitalize(data.kota);
      data.provinsi = this.capitalize(data.provinsi);

      data.point_reward = this.point[0].attributes.point_reward
        ? this.point[0].attributes.point_reward
        : "-";
      data.point_trip = this.point[0].attributes.point_trip
        ? this.point[0].attributes.point_trip
        : "-";
      data.insentif_car = this.point[0].attributes.insentif_car
        ? this.point[0].attributes.insentif_car
        : "-";
      data.insentif_mcy = this.point[0].attributes.insentif_mcy
        ? this.point[0].attributes.insentif_mcy
        : "-";

      return data;
    },

    /**
     * ----------------------------------------
     * End of data handling
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Modal Handling here
     * ----------------------------------------
     */

    async simpanData() {
      const valid = await this.$refs.editForm.validate();
      if (valid) {
        this.isModalProcess = true;

        // --- delete tidak perlu
        // AXI
        let payloadAxi = JSON.parse(JSON.stringify(this.axi));
        payloadAxi.attributes.cabang_id = this.cabangValue;
        delete payloadAxi.relationships;
        delete payloadAxi.attributes.nomor_tagihan;

        // Profile
        delete this.tempProfile.relationships;

        // Alamat
        let payloadAlamat = JSON.parse(JSON.stringify(this.tempAlamat));
        payloadAlamat.attributes.desa_id = this.kelurahanValue;
        delete payloadAlamat.relationships;

        // Npwp
        delete this.tempNpwp.relationships;

        // Rekening
        let payloadRekening = JSON.parse(JSON.stringify(this.tempRekening));
        payloadRekening.attributes.bank_id = this.bankValue;
        delete payloadRekening.relationships;

        // User
        let payloadUser = JSON.parse(JSON.stringify(this.user));
        delete payloadUser.relationships;
        if (payloadUser)
          payloadUser.attributes.email = this.tempProfile.attributes.email;

        try {
          await Promise.all([
            this.updateAxi(payloadAxi),
            this.updateProfile(this.tempProfile),
            this.updateAlamat(payloadAlamat),
            this.updateNpwp(this.tempNpwp),
            this.updateRekening(payloadRekening),
            this.updateUser(payloadUser)
          ]);

          this.showModal = false;
          this.isModalProcess = false;

          const that = this;

          swal("Sukses", "Berhasil mengganti data", "success").then(function() {
            that.getData();
          });
        } catch (error) {
          this.showModal = false;
          this.isModalProcess = false;

          swal("Gagal", "Gagal mengganti data", "error").then(function() {
            console.log(error);
          });
        }
      }
    },

    async simpanPoint() {
      this.isModalProcess = true;

      // --- delete tidak perlu
      // AXI
      const payloadPoint = JSON.parse(JSON.stringify(this.point[0]));
      delete payloadPoint.relationships;

      try {
        await Promise.all([this.updatePoint(payloadPoint)]);

        this.showModalPoint = false;
        this.isModalProcess = false;

        const that = this;

        swal("Sukses", "Berhasil mengganti point", "success").then(function() {
          that.getData();
        });
      } catch (error) {
        this.showModalPoint = false;
        this.isModalProcess = false;

        const that = this;

        swal("Gagal", "Gagal mengganti point", "error").then(function() {
          that.isModalProcess = true;
          // that.getData()
        });
      }
    },

    async simpanFoto() {
      this.isModalProcess = true;

      if (
        this.tmpAvatar == "" &&
        this.tmpNpwp == "" &&
        this.tmpKtp == "" &&
        this.tmpBuku == ""
      ) {
        this.showModalFoto = false;
        this.isModalProcess = false;

        const that = this;
        swal("Gagal", "Form ubah foto belum diisi", "error").then(function() {
          that.showModalFoto = true;
          // that.getData()
        });
      } else {
        let tempProfile = this.included.find(x => x.type == "profiles");
        tempProfile.avatar = this.tmpAvatar == "" ? null : this.tmpAvatar;
        tempProfile.ktp = this.tmpKtp == "" ? null : this.tmpKtp;
        delete tempProfile.relationships;

        let tempNpwp = this.included.find(x => x.type == "npwps");
        tempNpwp.scan_url = this.tmpNpwp == "" ? null : this.tmpNpwp;
        delete tempNpwp.relationships;

        let tempRekening = this.included.find(x => x.type == "accounts");
        tempRekening.scan_url = this.tmpBuku == "" ? null : this.tmpBuku;
        delete tempRekening.relationships;

        // ------------------
        const that = this;
        try {
          await Promise.all([
            this.updateFotoProfile(tempProfile),
            this.updateFotoNpwp(tempNpwp),
            this.updateFotoRekening(tempRekening)
          ]);
          that.showModalFoto = false;
          that.isModalProcess = false;

          // Reset form
          that.tmpAvatar = "";
          that.imagePreview = "";
          that.tmpKtp = "";
          that.ktpPreview = "";
          that.tmpNpwp = "";
          that.npwpPreview = "";
          that.tmpBuku = "";
          that.bukuPreview = "";

          swal("Sukses", "Berhasil mengganti foto", "success").then(function() {
            that.getData();
          });
        } catch (error) {
          // that.showModalFoto = false

          // Reset form
          that.tmpAvatar = "";
          that.imagePreview = "";
          that.tmpKtp = "";
          that.ktpPreview = "";
          that.tmpNpwp = "";
          that.npwpPreview = "";
          that.tmpBuku = "";
          that.bukuPreview = "";

          swal("Gagal", error.response.status == 413 ? "Gagal mengganti foto, ukuran file teralu besar. (maks 5MB)" : "Gagal mengganti foto", "error")
          .then(function () {
            // that.getData()
            that.isModalProcess = false;
          });
        }
        // ------------------
      }
    },

    kirimEmail() {
      swal({
        title: "Apakah anda yakin untuk mengirim email berisi credential AXI ?",
        text: "",
        type: "question",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Batal",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          swal.fire("Email telah terkirim!", "", "success");
        }
      });
    },

    resetPass() {
      const that = this;
      swal({
        title: "Apakah anda yakin untuk reset password ?",
        text:
          "AXI akan diberikan dikirimkan e-mail untuk mendapatkan link reset password",
        type: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Batal",
        reverseButtons: true
      }).then(async result => {
        if (result.value) {
          that.showModalLoading = true;

          let res = await that.resetPassword(that.tempProfile.attributes.email);
          if (res.name != "Error") {
            that.showModalLoading = false;
            swal.fire("Email reset password telah terkirim!", "", "success");
          } else {
            that.showModalLoading = false;
            swal.fire(
              "Email reset password gagal dikirim",
              res.response.data.errors.email[0],
              "error"
            );
          }
        }
      });
    },

    /**
     * ----------------------------------------
     * End of modal handling
     * ----------------------------------------
     */

    // Download excel method
    async downloadExcel() {
      this.showModalLoading = true;
      let res = await this.exportAxi(this.idAxiDetail);
      if (res.name != "Error") {
        this.showModalLoading = false;
        swal.fire(
          "Download excel berhasil",
          "Silahkan cek bagian download pada browser anda",
          "success"
        );
      } else {
        this.showModalLoading = false;
        swal.fire("Download excel gagal", "", "error");
      }
    },

    // Methods below for handling image preview
    fotoProfilChange(files) {
      this.tmpAvatar = files[0];
      this.imagePreview = URL.createObjectURL(files[0]);
    },
    fotoKtpChange(files) {
      this.tmpKtp = files[0];
      this.ktpPreview = URL.createObjectURL(files[0]);
    },
    fotoNpwpChange(files) {
      this.tmpNpwp = files[0];
      this.npwpPreview = URL.createObjectURL(files[0]);
    },
    fotoBukuChange(files) {
      this.tmpBuku = files[0];
      this.bukuPreview = URL.createObjectURL(files[0]);
    },

    capitalize: function(value) {
      if (!value) return "";
      if (value == "DKI JAKARTA") return "DKI Jakarta";
      // value = value.toLowerCase()
      // return value.charAt(0).toUpperCase() + value.slice(1)
      return value
        .toLowerCase()
        .split(" ")
        .map(function(word) {
          return word[0].toUpperCase() + word.substr(1);
        })
        .join(" ");
    }
  },
  mounted() {
    // this.provinsilist = this.provinsi.map(item => {
    //   return { value: item, label: item }
    // })
    // this.kotalist = this.kota.map(item => {
    //   return { value: item, label: item }
    // })
    // this.kecamatanlist = this.kecamatan.map(item => {
    //   return { value: item, label: item }
    // })
    // this.kelurahanlist = this.kelurahan.map(item => {
    //   return { value: item, label: item }
    // })
  },
  watch: {
    "axi.jenis_kelamin": function() {
      // alert(this.axi.jenis_kelamin)
    }
  },

  async created() {
    await this.permissionAuth();
    this.getData();
  },

  filters: {
    convertDate(date) {
      return moment(date).format("LL");
    },
    formatEditDate(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  }
};
</script>

<style>
span .error {
  color: red;
}
</style>
