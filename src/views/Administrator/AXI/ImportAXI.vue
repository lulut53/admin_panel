<template>
  <div>
    <base-header class="pb-6 bg-secondary" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Import Data</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard"
                  ><i class="fas fa-home"></i
                ></router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard"
                  >Administrator</router-link
                >
              </li>
              <li class="breadcrumb-item" aria-current="page">
                AXI
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>

    <div key="1" v-if="isBusy" class="text-center pb-5" style="display: flex; justify-content: center;">
      <br />
     <!-- <center>-->
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
        />
      <!--</center>-->
    </div>

    <!--Charts-->
    <div class="container-fluid mt--6" v-else>
      <div>
        <!-- <div class="card">
          <el-form @submit.prevent="importDataAXI">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import AXI Baru *</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeAxi"
                  class="form-group"
                  accept=".xls, .xlsx, .csv"
                ></file-input>
              </div>
              <el-form-item>
                <base-button class="mt-2" type="success" @click="importDataAXI">
                  Upload
                </base-button>
                <a
                  href="https://drive.google.com/file/d/17TRkmHZUJOoXhfx9NUfbSSt5tzl7Z0qw/view"
                  target="blank"
                  ><base-button class="mt-2" type="warning">
                    Download Template
                  </base-button></a
                >
              </el-form-item>
            </div>
          </el-form>
        </div> -->

        <div class="card">
          <el-form @submit.prevent="importDataStatusAXI">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import Status AXI Aktif*</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeStatusAxi"
                  class="form-group"
                  accept=".xls, .xlsx, .csv"
                ></file-input>
              </div>
              <el-form-item>
                <base-button
                  class="mt-2"
                  type="success"
                  @click="importDataStatusAXI"
                >
                  Upload
                </base-button>
                <a
                  href="https://prod.dicicilaja.com/composer/storage/uploads/documents/template/Template_Ubah_Status_AXI.xlsx"
                  target="blank"
                  ><base-button class="mt-2" type="warning">
                    Download Template
                  </base-button></a
                >
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div class="card">
          <el-form @submit.prevent="importDataStatusAXINonActive">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import Status AXI Tidak Aktif *</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeStatusAxiNonActive"
                  class="form-group"
                  accept=".xls, .xlsx, .csv"
                ></file-input>
              </div>
              <el-form-item>
                <base-button
                  class="mt-2"
                  type="success"
                  @click="importDataStatusAXINonActive"
                >
                  Upload
                </base-button>
                <a
                  href="https://prod.dicicilaja.com/composer/storage/uploads/documents/template/Template_Ubah_Status_AXI.xlsx"
                  target="blank"
                  ><base-button class="mt-2" type="warning">
                    Download Template
                  </base-button></a
                >
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div class="card">
          <el-form @submit.prevent="importDataAXIExpired">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import AXI Expired *</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeAXIExpired"
                  class="form-group"
                  required
                  id="fileAXIExpired"
                  accept=".xls, .xlsx, .csv"
                />
              </div>
              <el-form-item>
                <base-button
                  class="mt-2"
                  type="success"
                  @click="importDataAXIExpired"
                >
                  Upload
                </base-button>
                <a
                  href="https://prod.dicicilaja.com/composer/storage/uploads/documents/template/Template_Ubah_Status_AXI.xlsx"
                  target="blank"
                  ><base-button class="mt-2" type="warning">
                    Download Template
                  </base-button></a
                >
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div class="card">
          <el-form @submit.prevent="importInsentifDailyAXI">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import Incentive Daily AXI*</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeInsentifDaily"
                  class="form-group"
                  required
                  id="fileInsentifDaily"
                  accept=".xls, .xlsx, .csv"
                  :LabelingFile="LabelFlag"
                />
              </div>
              <el-form-item>
                <base-button
                  class="mt-2"
                  type="success"
                  @click="importInsentifDailyAXI"
                >
                  Upload
                </base-button>
                <base-button class="mt-2" type="warning" @click="downloadImportInsentifDailyTemplate">
                    Download Template
                  </base-button> 
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div class="card">
          <el-form @submit.prevent="importInsentifMonthlyAXI">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import Incentive Monthly AXI *</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeInsentifMonthly"
                  class="form-group"
                  required
                  id="fileInsentifMonthly"
                  accept=".xls, .xlsx, .csv"
                  :LabelingFile="LabelFlag"
                />
              </div>
              <el-form-item>
                <base-button
                  class="mt-2"
                  type="success"
                  @click="importInsentifMonthlyAXI"
                >
                  Upload
                </base-button>
                <base-button class="mt-2" type="warning" @click="downloadimportInsentifMonthlyTemplate">
                    Download Template
                  </base-button>
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div class="card">
          <el-form @submit.prevent="importPointAXI">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import Point *</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangePoint"
                  class="form-group"
                  required
                  id="filePoint"
                  accept=".xls, .xlsx, .csv"
                />
              </div>
              <el-form-item>
                <base-button
                  class="mt-2"
                  type="success"
                  @click="importPointAXI"
                >
                  Upload
                </base-button>
                <a
                  href="https://prod.dicicilaja.com/composer/storage/uploads/documents/template/Template_Ubah_Point_Reward.xlsx"
                  target="blank"
                  ><base-button class="mt-2" type="warning">
                    Download Template
                  </base-button></a
                >
                <base-button class="mt-2 ml-2" type="warning" @click="showModalReset = true">
                  <span class="hidden-sm-down">Reset Point</span>
                </base-button>
              </el-form-item>
            </div>
          </el-form>
        </div>

        <!-- <div class="card">
          <el-form @submit.prevent="importAnggotaAXI">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import Keanggotaan AXI *</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeAnggota"
                  class="form-group"
                  required
                  id="fileAnggota"
                  accept=".xls, .xlsx, .csv"
                />
              </div>
              <el-form-item>
                <base-button
                  class="mt-2"
                  type="success"
                  @click="importAnggotaAXI"
                >
                  Upload
                </base-button>
                <a
                  href="https://drive.google.com/file/d/1HDO2O5i0IDX_V0puwDiab4oFE41fYOPS/view"
                  target="blank"
                  ><base-button class="mt-2" type="warning">
                    Download Template
                  </base-button></a
                >
              </el-form-item>
            </div>
          </el-form>
        </div> -->

        <div class="card">
          <el-form @submit.prevent="importMatrixAXI">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import Matrix Axi *</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeMatrixAxi"
                  class="form-group"
                  required
                  id="fileMatrixAxi"
                  accept=".xls, .xlsx, .csv"
                  :LabelingFile="LabelFlag"
                />
              </div>
              <el-form-item>
                <base-button
                  class="mt-2"
                  type="success"
                  @click="importMatrixAXI"
                >
                  Upload
                </base-button>
                <base-button class="mt-2" type="warning" @click="MatrixAxiTemplate">
                    Download Template
                  </base-button>
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div class="card">
          <el-form @submit.prevent="importFidAXI">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import FID AXI *</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeFID"
                  class="form-group"
                  required
                  id="fileFID"
                  accept=".xls, .xlsx, .csv"
                  :LabelingFile="LabelFlag"
                />
              </div>
              <el-form-item>
                <base-button class="mt-2" type="success" @click="importFidAXI">
                  Upload
                </base-button>
                <a
                href="https://prod.dicicilaja.com/composer/storage/uploads/documents/template/Template_Import_FID_AXI.xlsx"
                  target="blank"
                  ><base-button class="mt-2" type="warning">
                    Download Template
                  </base-button></a
                >
              </el-form-item>
            </div>
          </el-form>
        </div>

        <!-- <div class="card">
          <el-form @submit.prevent="importInsentifDetailAXI">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import Insentif Detail AXI *</h4>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeInsentifDetail"
                  class="form-group"
                  required
                  id="fileInsentifDetail"
                  accept=".xls, .xlsx, .csv"
                />
              </div>
              <el-form-item>
                <base-button
                  class="mt-2"
                  type="success"
                  @click="importInsentifDetailAXI"
                >
                  Upload
                </base-button>
                <a
                  href="https://drive.google.com/file/d/1ZPwobRxIzSZumf7xBERqxRdI_fD1g7Im/view"
                  target="blank"
                  ><base-button class="mt-2" type="warning">
                    Download Template
                  </base-button></a
                >
              </el-form-item>
            </div>
          </el-form>
        </div> -->

        <div class="card">
          <el-form @submit.prevent="importDataPPD">
            <div class="card-body">
              <label>
                <h4 class="mb-0">Import Data Report PPD *</h4>
                <small v-if="lastUpdateDate">Updated {{ lastUpdateDate }}</small>
              </label>
              <div class="row-md-12">
                <file-input
                  @change="filesChangeReportPPD"
                  class="form-group"
                  required
                  id="fileReportPPD"
                  accept=".xls, .xlsx, .csv"
                />
              </div>
              <el-form-item>
                <base-button class="mt-2" type="success" @click="importDataPPD">
                  Upload
                </base-button>
                <a
                href="https://prod.dicicilaja.com/composer/storage/uploads/documents/template/Template_Data_PPD_New.xlsx"
                  target="blank"
                  ><base-button class="mt-2" type="warning">
                    Download Template
                  </base-button></a
                >
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <modal :show.sync="showModalLoading">
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->

      <!--<center>-->
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
        />
      </div>
      <!--</center>-->
    </modal>
    <modal :show.sync="showModalReset">
      <!-- <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel">
          Apakah kamu yakin untuk melakukan Reset poin?
        </h5>
      </template> -->
      <div><h3>Apakah kamu yakin untuk melakukan Reset point?</h3></div>
      <template slot="footer">
        <base-button type="secondary" @click="showModalReset = false"
          >Close</base-button
        >
        <base-button type="primary" @click="resetPoint"
          >Reset Point</base-button
        >
      </template>
    </modal>

    <modal :show.sync="showModalResetInsentive">
      <!-- <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel">
          Apakah kamu yakin untuk melakukan Reset poin?
        </h5>
      </template> -->
      <div><h3>Apakah kamu yakin untuk melakukan Reset insentive?</h3></div>
      <template slot="footer">
        <base-button type="secondary" @click="showModalResetInsentive = false"
          >Close</base-button
        >
        <base-button type="primary" @click="resetInsentif"
          >Reset Insentive</base-button
        >
      </template>
    </modal>
  </div>
</template>


<script>
import FileInput from "@/components/Inputs/FileInput";
import { mapActions } from "vuex";
import { Form, FormItem } from "element-ui";
import swal from "sweetalert2";
import moment from "moment";
import {
  HalfCircleSpinner,
  FulfillingBouncingCircleSpinner,
} from "epic-spinners";
import { json } from "d3";

export default {
  name: "form-elements",
  components: {
    FileInput,
    HalfCircleSpinner,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
  },
  data() {
    return {
      fileAxi: "",
      fileStatusAxi: "",
      fileStatusAxiExpired: "",
      fileStatusAxiNonActive: "",
      //fileIntensif: "",
      filePoint: "",
      fileAnggota: "",
      fileMatrixAxi: "",
      fileFID: "",
      fileReportPPD: "",
      //fileInsentifDetail: "",
      fileInsentifMonthly: "",
      fileInsentifDaily: "",
      showModalLoading: false,
      showModalReset: false,
      showModalResetInsentive: false,
      lastUpdateDate: "",
      isBusy: false,
      LabelFlag: "",
    };
  },
  async mounted() {
    this.getDataLast();
  },
  methods: {
    ...mapActions("axi", [
      "importPoint",
      //"importIntensif",
      "importAxi",
      "importAnggota",
      "importMatrix",
      "importFID",
      //"importInsentifDetail",
      "importInsentifMonthly",
      "postResetPoint",
      "postResetInsentif",
      "downloadTemplateMatrixAxi",
      "downloadInsentifMonthlyDynamicTemplate",
      "importInsentifDaily",
      "downloadTemplateInsentifDaily",
    ]),
    ...mapActions("sap", [
      "importPointAxi",
      "importStatusAxi",
      "importStatusAxiNonActive",
      "importStatusAxiExpired",
      "importReportPPD",
      "getDataLastReportPPD",
    ]),

    filesChangeAxi(files) {
      this.fileAxi = files[0];
    },
    filesChangeStatusAxi(files) {
      this.fileStatusAxi = files[0];
    },
    filesChangeAXIExpired(files) {
      this.fileStatusAxiExpired = files[0];
    },
    filesChangeStatusAxiNonActive(files) {
      this.fileStatusAxiNonActive = files[0];
    },
    // filesChangeIntensif(files) {
    //   this.fileIntensif = files[0];
    // },
    filesChangeInsentifDaily(files) {
      this.fileInsentifDaily = files[0];
      this.LabelFlag = "";
    },
    filesChangePoint(files) {
      this.filePoint = files[0];
    },
    filesChangeAnggota(files) {
      this.fileAnggota = files[0];
    },
    
    filesChangeFID(files) {
      this.fileFID = files[0];
      this.LabelFlag = "";
    },
    // filesChangeInsentifDetail(files) {
    //   this.fileInsentifDetail = files[0];
    // },
    filesChangeInsentifMonthly(files) {
      this.LabelFlag = "";
      this.fileInsentifMonthly = files[0];
    },
    filesChangeReportPPD(files) {
      this.fileReportPPD = files[0];
    },

    filesChangeMatrixAxi(files) {
      this.fileMatrixAxi = files[0];
      this.LabelFlag = "";
    },

    async getDataLast() {
      this.isBusy = true;
      const data = await this.getDataLastReportPPD();
      this.lastUpdateDate = data
        ? moment(data[0].created_date).format("DD MMMM YYYY, HH:mm:ss")
        : "";
      this.isBusy = false;
    },

    async resetPoint() {
      try {
        const res = await this.postResetPoint();
        if (res.code == 200) {
          swal.fire("Sukses", "Point berhasil direset!", "success");
          this.showModalReset = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    
    async resetInsentif() {
      try {
        const res = await this.postResetInsentif();
        if (res.code == 200) {
          swal.fire("Sukses", "Insentive berhasil direset!", "success");
          this.showModalResetInsentive = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async importDataAXI() {
      if (this.fileAxi == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importAxi(this.fileAxi);
      if (res.name != "Error") {
        this.showModalLoading = false;

        this.fileAxi = "";
        swal.fire("Sukses", "Data AXI telah diimport!", "success");
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Data AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Data AXI gagal diimport",
          "error"
        );
      }
    },
    async importDataStatusAXI() {
      if (this.fileStatusAxi == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importStatusAxi(this.fileStatusAxi);
      // console.log(res);
      if (res.data.status == "OK") {
        this.showModalLoading = false;
        this.fileStatusAxi = "";
        swal.fire("Sukses", "Data AXI telah diimport!", "success");
        if (
          res.data.axi_duplikat.length > 0 ||
          res.data.axi_not_found.length > 0
        ) {
          const arrayDuplikat = res.data.axi_duplikat.join(", ");
          const arrayNotFound = res.data.axi_not_found.join(", ");
          // console.log(arrayDuplikat, arrayNotFound);
          if (arrayDuplikat && arrayNotFound) {
            swal.fire(
              "Sukses",
              `terdapat data yang tidak ditemukan ${arrayNotFound} & terdapat data Duplikat ${arrayDuplikat} `,
              "success"
            );
          } else if (arrayNotFound) {
            swal.fire(
              "Sukses",
              `terdapat data yang tidak ditemukan ${arrayNotFound}`,
              "success"
            );
          } else {
            swal.fire(
              "Sukses",
              `terdapat data Duplikat ${arrayDuplikat}`,
              "success"
            );
          }
        }
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Data AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Data AXI gagal diimport",
          "error"
        );
      }
    },
    async importDataAXIExpired() {
      if (this.fileStatusAxiExpired == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importStatusAxiExpired(this.fileStatusAxiExpired);
      // console.log(res);
      if (res.data.status == "OK") {
        this.showModalLoading = false;
        this.fileStatusAxiExpired = "";
        swal.fire("Sukses", "Data AXI telah diimport!", "success");
        if (
          res.data.axi_duplikat.length > 0 ||
          res.data.axi_not_found.length > 0
        ) {
          const arrayDuplikat = res.data.axi_duplikat.join(", ");
          const arrayNotFound = res.data.axi_not_found.join(", ");
          // console.log(arrayDuplikat, arrayNotFound);
          if (arrayDuplikat && arrayNotFound) {
            swal.fire(
              "Sukses",
              `terdapat data yang tidak ditemukan ${arrayNotFound} & terdapat data Duplikat ${arrayDuplikat} `,
              "success"
            );
          } else if (arrayNotFound) {
            swal.fire(
              "Sukses",
              `terdapat data yang tidak ditemukan ${arrayNotFound}`,
              "success"
            );
          } else {
            swal.fire(
              "Sukses",
              `terdapat data Duplikat ${arrayDuplikat}`,
              "success"
            );
          }
        }
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Data AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Data AXI gagal diimport",
          "error"
        );
      }
    },
    async importDataStatusAXINonActive() {
      if (this.fileStatusAxiNonActive == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importStatusAxiNonActive(
        this.fileStatusAxiNonActive
      );
      //console.log(res);
      if (res.data.status == "OK") {
        this.showModalLoading = false;
        this.fileStatusAxiNonActive = "";
        swal.fire("Sukses", "Data AXI telah diimport!", "success");
        if (
          res.data.axi_duplikat.length > 0 ||
          res.data.axi_not_found.length > 0
        ) {
          const arrayDuplikat = res.data.axi_duplikat.join(", ");
          const arrayNotFound = res.data.axi_not_found.join(", ");
          // console.log(arrayDuplikat, arrayNotFound);
          if (arrayDuplikat && arrayNotFound) {
            swal.fire(
              "Sukses",
              `Terdapat data yang tidak ditemukan ${arrayNotFound} & terdapat data Duplikat ${arrayDuplikat} `,
              "success"
            );
          } else if (arrayNotFound) {
            swal.fire(
              "Sukses",
              `Terdapat data yang tidak ditemukan ${arrayNotFound}`,
              "success"
            );
          } else {
            swal.fire(
              "Sukses",
              `Terdapat data Duplikat ${arrayDuplikat}`,
              "success"
            );
          }
        }
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Data AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Data AXI gagal diimport",
          "error"
        );
      }
    },
    // async importIntensifAXI() {
    //   if (this.fileIntensif == "") {
    //     swal.fire("File Excel belum diinputkan", "", "error");
    //     return;
    //   }

    //   this.showModalLoading = true;

    //   let res = await this.importIntensif(this.fileIntensif);
    //   if (res.name != "Error") {
    //     this.showModalLoading = false;

    //     this.fileIntensif = "";
    //     swal.fire("Sukses", "Poin intensif AXI telah diimport!", "success");
    //   } else {
    //     this.showModalLoading = false;
    //     swal.fire(
    //       "Gagal",
    //       res.response.status == 413
    //         ? "Poin intensif AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
    //         : "Poin intensif AXI gagal diimport",
    //       "error"
    //     );
    //   }
    // },
    async importPointAXI() {
      if (this.filePoint == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importPointAxi(this.filePoint);
      if (res.name != "AxiosError") {
        this.showModalLoading = false;

        this.filePoint = "";

        swal.fire("Sukses", "Poin AXI telah diimport!", "success");
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Poin AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Poin AXI gagal diimport",
          "error"
        );
      }
    },
    async importAnggotaAXI() {
      if (this.fileAnggota == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importAnggota(this.fileAnggota);
      if (res.name != "Error") {
        this.showModalLoading = false;

        this.fileAnggota = "";

        swal.fire("Sukses", "Keanggotaan AXI telah diimport!", "success");
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Keanggotaan AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Keanggotaan AXI gagal diimport",
          "error"
        );
      }
    },

    async MatrixAxiTemplate() {
      await this.downloadTemplateMatrixAxi();
    },

    async importMatrixAXI() {
      if (this.fileMatrixAxi== "") {

        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importMatrix(this.fileMatrixAxi);
      if (res.name != "Error") {
        this.showModalLoading = false;

        this.LabelFlag = "reset";
        this.fileMatrixAxi = "";

        swal.fire("Sukses", "Matrix AXI telah diimport!", "success");
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Matrix AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Matrix AXI gagal diimport",
          "error"
        );
      }
    },
    async importFidAXI() {
      if (this.fileFID == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importFID(this.fileFID);
      if (res.name != "Error") {
        this.showModalLoading = false;

        this.LabelFlag = "reset";
        this.fileFID = "";

        swal.fire("Sukses", "FID AXI telah diimport!", "success");
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "FID AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "FID AXI gagal diimport",
          "error"
        );
      }
    },
    // async importInsentifDetailAXI() {
    //   if (this.fileInsentifDetail == "") {
    //     swal.fire("File Excel belum diinputkan", "", "error");
    //     return;
    //   }

    //   this.showModalLoading = true;

    //   let res = await this.importInsentifDetail(this.fileInsentifDetail);
    //   if (res.name != "Error") {
    //     this.showModalLoading = false;

    //     this.fileInsentifDetail = "";

    //     swal.fire("Sukses", "Insentif Detail AXI telah diimport!", "success");
    //   } else {
    //     this.showModalLoading = false;
    //     swal.fire(
    //       "Gagal",
    //       res.response.status == 413
    //         ? "Insentif Detail AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
    //         : "Insentif Detail AXI gagal diimport",
    //       "error"
    //     );
    //   }
    // },

    async downloadimportInsentifMonthlyTemplate() {
      await this.downloadInsentifMonthlyDynamicTemplate();
    },
    async importInsentifMonthlyAXI() {
      if (this.fileInsentifMonthly == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importInsentifMonthly(this.fileInsentifMonthly);
      if (res.name != "Error") {
        this.showModalLoading = false;

        this.LabelFlag = "reset";
        this.fileInsentifMonthly = "";

        swal.fire("Sukses", "Insentif Bulanan AXI telah diimport!", "success");
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Insentif Bulanan AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Insentif Bulanan AXI gagal diimport",
          "error"
        );
      }
    },

    async downloadImportInsentifDailyTemplate() {
      await this.downloadTemplateInsentifDaily();
    },


    async importInsentifDailyAXI() {
      if (this.fileInsentifDaily == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importInsentifDaily(this.fileInsentifDaily);
      if (res.name != "Error") {
        this.showModalLoading = false;

        this.LabelFlag = "reset";
        this.fileInsentifDaily = "";

        swal.fire("Sukses", "Data Insentif Daily AXI telah diimport!", "success");
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Insentif Daily AXI gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Insentif Daily AXI gagal diimport",
          "error"
        );
      }
    },

    async importDataPPD() {
      if (this.fileReportPPD == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;

      let res = await this.importReportPPD(this.fileReportPPD);
      if (res.name != "Error") {
        this.showModalLoading = false;

        this.fileReportPPD = "";

        swal.fire("Sukses", "Data Report PPD telah diimport!", "success");
        this.getDataLast();
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Data Report PPD gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Data Report PPD gagal diimport",
          "error"
        );
      }
    },
  },
};
</script> 
