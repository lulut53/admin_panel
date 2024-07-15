<template>
  <div>
    <base-header class="pb-6" type>
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-9">
          <h6 class="h2 d-inline-block mb-0">Detail Pendaftaran E-PKS</h6>
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
              <li class="breadcrumb-item" aria-current="page">AXI</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6 small">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-sm-8">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-6">
                    <h4>Detail AXI</h4>
                  </div>

                  <!-- <div class="col-6 text-right" v-if="isShow && !isError">
                  <base-button size="sm" type="info" @click="showModal = true">Edit Data</base-button>
                  <base-button
                    size="sm"
                    type="primary"
                    @click="showModalPoint = true"
                    v-if="point[0].attributes.point_reward"
                  >Edit Point</base-button>
                  <base-button size="sm" type="success" @click="showModalFoto = true">Edit Foto</base-button>
                  </div>-->
                </div>
              </div>
              <transition name="fade" mode="out-in">
                <div key="1" v-if="isLoading" class="text-center pb-5">
                  <br />
                  <!-- <center>
                    <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
                  </center>-->
                </div>
                <div key="2" v-if="isError" class="text-center p-5">
                   <!--<center>-->
                    <img
                      alt="Error Image"
                      src="/images/undraw_cancel_u1it.svg"
                      height="300px"
                      class="img-fluid"
                    />
                  <!--</center>-->
                  <br />
                 <!-- <center>
                    <h1>Error, silahkan coba lagi.</h1>
                  </center>-->

              <div style="text-align: center;">
                  <h1>Error, silahkan coba lagi.</h1>
               </div>
                </div>
                <div key="2" v-if="isShow">
                  <collapse :active-index="0" key="1">
                    <collapse-item name="1">
                      <h5 slot="title" class="mb-0">Informasi Umum</h5>
                      <div class="card">
                        <!-- <div class="card-header">
                      <div class="row">
                        <div class="col-8">
                          <h4>Informasi Umum</h4>
                        </div>
                      </div>
                        </div>-->

                        <div class="card-body">
                          <div class="row">
                            <div class="col-4">Nama AXI</div>
                            <div class="col-8">: {{ listData.nama }}</div>
                          </div>
                          <!-- <div class="row">
                          <div class="col-4">AXI ID</div>
                          <div class="col-8">: {{ listData.nomor_axi_id }}</div>
                        </div>
                        <div class="row">
                          <div class="col-4">Kode Cabang</div>
                          <div class="col-8">: {{ listData.cabang_daftar }}</div>
                        </div>
                        <div class="row">
                          <div class="col-4">Cabang</div>
                          <div class="col-8">: {{ listData.nama_cabang }}</div>
                        </div>
                        <div class="row">
                          <div class="col-4">Kode Cabang Daftar</div>
                          <div class="col-8">: {{ listData.kode_cabang_daftar }}</div>
                        </div>
                        <div class="row">
                          <div class="col-4">Cabang Daftar</div>
                          <div class="col-8">: {{ listData.nama_cabang_daftar }}</div>
                        </div>
                        <div class="row">
                          <div class="col-4">Tanggal Daftar</div>
                          <div class="col-8">: {{ listData.tanggal_daftar | convertDate }}</div>
                          </div>-->
                          <div class="row">
                            <div class="col-4">No. KTP</div>
                            <div class="col-8 input-group">
                              :
                              <!-- : {{ listData.no_ktp }} -->
                              <input
                                type="text"
                                placeholder="No. KTP"
                                class="form-control-flush ml-2"
                                maxlength="16"
                                v-model="no_ktp"
                              />
                              <div class="input-group-append">
                                <a
                                  class="btn btn-orange btn-check semibold m-b-10 ml-2"
                                  @click="checkKTP"
                                >Check</a>
                              </div>
                              <small
                                v-if="no_ktp != '' && isKtpValid"
                                :class="[isKtpValid.includes('!') ? 'text-danger' : 'text-success','pl-2']"
                              >{{ isKtpValid }}</small>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-4">Tempat Lahir</div>
                            <div class="col-8">: {{ listData.kota_lahir }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Tanggal lahir</div>
                            <div class="col-8">: {{ listData.tanggal_lahir }}</div>
                          </div>
                          <!-- <div class="row">
                          <div class="col-4">ID Mentor</div>
                          <div class="col-8">: {{ listData.axi_id_reff }}</div>
                          </div>-->
                          <div class="row">
                            <div class="col-4">No. HP</div>
                            <div class="col-8">: {{ listData.no_hp }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Email</div>
                            <div class="col-8">: {{ listData.email }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Alamat</div>
                            <div class="col-8">: {{ listData.jalan }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">RT/RW</div>
                            <div class="col-8">: 0{{ listData.rt }}/0{{ listData.rw }}</div>
                          </div>
                          <!-- <div class="row">
                            <div class="col-4">Provinsi</div>
                            <div class="col-8">: {{ listData.provinsi }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Kota / Kabupaten</div>
                            <div class="col-8">: {{ listData.kota }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Kecamatan</div>
                            <div class="col-8">: {{ listData.kecamatan }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Kelurahan</div>
                            <div class="col-8">: {{ listData.kelurahan }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Kode Pos</div>
                            <div class="col-8">: {{ listData.kode_pos }}</div>
                          </div>-->
                          <div class="row">
                            <div class="col-4">Status Perkawinan</div>
                            <div
                              class="col-8"
                            >: {{ listData.status_perkawinan == 0 ? "Single" : listData.status_perkawinan == 1 ? "Menikah" : listData.status_perkawinan }}</div>
                          </div>
                          <!-- <div class="row">
                            <div class="col-4">Nama Ibu Kandung</div>
                            <div class="col-8">: {{ listData.nama_ibu_kandung }}</div>
                          </div> -->
                          <div class="row">
                            <div class="col-4">Nama Pasangan</div>
                            <div class="col-8">: {{ listData.nama_pasangan }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">No. KTP Pasangan</div>
                            <div class="col-8">: {{ listData.no_ktp_pasangan }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Jenis Kelamin</div>
                            <div
                              class="col-8"
                            >: {{ listData.jenis_kelamin == 1 ? "Perempuan" : "Laki - Laki" }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">No. NPWP</div>
                            <div class="col-8">: {{ listData.no_npwp }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Nama NPWP</div>
                            <div class="col-8">: {{ listData.nama_npwp }}</div>
                          </div>
                          <!-- <div class="row">
                          <div class="col-4">Status NPWP</div>
                          <div
                          class="col-8"
                          >: {{ listData.status_npwp == 1 ? "Pribadi" : "Perusahaan" }}</div>
                          </div>-->
                          <div class="row">
                            <div class="col-4">PKP Status</div>
                            <div class="col-8">: {{ listData.pkp == 1 ? "PKP" : "Non PKP" }}</div>
                          </div>
                        </div>
                      </div>
                    </collapse-item>
                    <collapse-item name="2">
                      <h5 slot="title" class="mb-0">Informasi Rekening</h5>
                      <div class="card">
                        <!-- <div class="card-header">
                      <h4>Informasi Rekening</h4>
                        </div>-->
                        <div class="card-body">
                          <div class="row">
                            <div class="col-4">Nama Bank</div>
                            <div class="col-8">: {{ listData.nama_bank }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Cabang Bank</div>
                            <div class="col-8">: {{ listData.cabang_bank }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Kota Bank</div>
                            <div class="col-8">: {{ listData.kota_bank }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">No. Rekening</div>
                            <div class="col-8">: {{ listData.no_rekening }}</div>
                          </div>
                          <div class="row">
                            <div class="col-4">Atas nama rekening</div>
                            <div class="col-8">: {{ listData.an_rekening }}</div>
                          </div>
                        </div>
                      </div>
                    </collapse-item>
                  </collapse>
                </div>
              </transition>
            </div>
          </div>
          <div class="col-sm-4">
            <collapse :active-index="2" key="2" multipleActive>
              <collapse-item name="4">
                <h5 slot="title" class="font-weight-bold">Foto KTP</h5>
                <div class="card">
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
                            <template v-if="listData.foto_ktp">
                              <img :src="listData.foto_ktp" class="img-fluid" alt height="140" />
                            </template>
                            <template v-else>
                              <img
                                src="/images/image-empty-default.png"
                                class="img-fluid"
                                alt
                                height="140"
                              />
                            </template>
                          </div>
                          <br />
                          <!-- <div class="btn-file-upload">
                        <label for="profile" class="btn btn-sm btn-secondary">Ganti Foto</label>
                        <input type="file" id="profile" />
                          </div>-->
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </collapse-item>
              <collapse-item name="5">
                <h5 slot="title" class="font-weight-bold">Foto Selfie</h5>
                <div class="card">
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
                            <template v-if="listData.foto_selfie">
                              <img :src="listData.foto_selfie" class="img-fluid" alt height="140" />
                            </template>
                            <template v-else>
                              <img
                                src="/images/image-empty-default.png"
                                class="img-fluid"
                                alt
                                height="140"
                              />
                            </template>
                          </div>
                          <br />
                          <!-- <div class="btn-file-upload">
                        <label for="profile" class="btn btn-sm btn-secondary">Ganti Foto</label>
                        <input type="file" id="profile" />
                          </div>-->
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </collapse-item>
              <collapse-item name="6">
                <h5 slot="title" class="font-weight-bold">Status</h5>
                <div class="card">
                  <transition name="fade" mode="out-in">
                    <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content: center;">
                      <br />
                      <!-- <center> -->
                        <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
                      <!-- </center> -->
                    </div>
                    <div key="2" v-if="isShow">
                      <div class="row">
                        <div class="col-sm">
                          <el-form label-position="top" label-width="100px">
                            <el-select
                              filterable
                              clearable
                              class="select-danger"
                              placeholder="Pilih Status"
                              v-model="selects.status"
                            >
                              <el-option
                                v-for="option in selects.languages"
                                class="select-danger"
                                :value="option.value"
                                :label="option.label"
                                :key="option.label"
                              ></el-option>
                            </el-select>
                            <br />
                            <el-form-item v-if="selects.status == 'Revisi'">
                              <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="Silahkan masukkan alasan"
                                v-model="alasan"
                              ></el-input>
                            </el-form-item>
                          </el-form>
                        </div>
                      </div>
                      <div class="row">
                        <button
                          type="submit"
                          class="btn btn-orange btn-block semibold mx-3 my-2"
                        >Update</button>
                      </div>
                    </div>
                  </transition>
                </div>
              </collapse-item>
            </collapse>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Select, Option, Input, Form } from "element-ui";
import Collapse from "@/components/Collapse/Collapse";
import CollapseItem from "@/components/Collapse/CollapseItem";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Swal from "sweetalert2";

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Input.name]: Input,
    Collapse,
    CollapseItem,
  },
  data() {
    return {
      isShow: true,
      isLoading: false,
      isError: false,
      selects: {
        status: "",
        languages: [
          { value: "REVISI", label: "Revisi" },
          { value: "SELESAI", label: "Setuju" },
        ],
      },
      isCheckKtp: false,
      isKtpValid: "",
      no_ktp: "",
      listData: [],
      alasan: "",
    };
  },
  computed: {
    ...mapGetters("axi", ["detailRegAxi"]),
    profileId() {
      return this.$route.params.id;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapActions("sap", ["fetchCheckKtp", "verifikasiDataAXI"]),
    ...mapActions("axi", ["getAxiDetailList"]),
    async getData() {
      await this.getAxiDetailList(this.profileId);
      this.listData = this.detailRegAxi;
      this.no_ktp = this.listData.no_ktp;
      console.log(this.listData);
    },
    async checkKTP() {
      this.isCheckKtp = true;
      if (this.no_ktp == "") {
        Swal.fire({
          title: "Oops...",
          text: "Silahkan Masukkan Nomor KTP",
          icon: "warning",
        });
      } else {
        this.busy = true;
        const payload = {
          no_ktp: this.no_ktp,
          profile_id: this.profileId,
        };
        const result = await this.fetchCheckKtp(payload);
        // const { data } = result.data;
        // console.log(result);
        if (result.status == "OK") {
          this.isKtpValid = result.message;
          Swal.fire({
            // title: "Oops...",
            text: result.message,
            // icon: "success",
            type: "success",
          });
        } else {
          this.isCheckKtp = false;
          this.isKtpValid = result.data.message;
          Swal.fire({
            title: "Oops...",
            text: result.data.message,
            // icon: "error",
            type: "error",
          });
        }
        this.busy = false;
        // console.log(this.isKtpValid);
        // console.log(data);
      }
    },
    async submit() {
      console.log(this.selects.status);
      console.log("submit");
      if (!this.isCheckKtp) {
        Swal.fire({
          title: "Oops...",
          text: "Mohon Lakukan Pengecekan Nomor KTP",
          type: "warning",
        });
      } else if (!this.selects.status) {
        Swal.fire({
          title: "Oops...",
          text: "Mohon untuk mengisi field Status",
          type: "warning",
        });
      } else {
        const payload = {
          foto_selfie: "",
          foto_ktp: "",
          no_ktp: this.no_ktp,
          status_verifikasi_data: this.selects.status,
          alasan: this.alasan,
        };
        const profileId = this.profileId;
        const result = await this.verifikasiDataAXI({ payload, profileId });
        console.log(result);
        if (result.status == "OK") {
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil di update",
            type: "success",
          });
          this.$router.push("/administrator/axi/pendaftaran-epks");
        } else {
          Swal.fire({
            title: "Oops...!",
            text:
              "Sepertinya terjadi kendala teknis, mohon menghubungi Developer",
            type: "error",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.btn-check {
  padding: 0rem 1.25rem !important;
}
</style>
