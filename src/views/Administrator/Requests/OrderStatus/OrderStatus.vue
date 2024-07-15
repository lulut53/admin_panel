<template>
  <div>
    <base-header type>
      <div class="row align-items-center py-4">
        <div class="col-lg-12">
          <h6 class="h2 d-inline-block mb-0">
            Pengajuan Cicilan - Upload Status Order
          </h6>
        </div>
      </div>
    </base-header>

    <base-header class="pb-6" type>
      <div class="row align-items-center pb-4">
        <div class="col-lg-6">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard">
                  <i class="fas fa-home" /> Administrator
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Pengajuan Cicilan
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Status Order
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="card">
        <div class="card-body">
          <div class="row table-filter" v-if="table.selected.length === 0">
            <div class="col-md-2">
              <base-input>
                <label>
                  <select
                    class="form-control text-primary border-0 h-unset"
                    v-model="meta.per_page"
                  >
                    <option value="5">5 Entries</option>
                    <option value="15">15 Entries</option>
                    <option value="25">25 Entries</option>
                  </select>
                </label>
              </base-input>
            </div>
            <div class="col-md">
              <b-button
                size="md"
                variant="primary"
                id="upload-btn"
                class="float-right"
                @click="openUploadModal"
              >
                Upload File
              </b-button>
            </div>
          </div>
          <br />
          <transition name="fade" mode="out-in">
            <div key="1" v-if="table.isBusy" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
              <br />
              <!-- <center> -->
                <half-circle-spinner
                  :animation-duration="1000"
                  :size="60"
                  color="#ff1d5e"
                />
              <!-- </center> -->
            </div>
            <div key="2" v-if="table.isError" class="text-center p-5">
              <!-- <center> -->
                <img
                  alt="Error Image"
                  src="/images/undraw_cancel_u1it.svg"
                  height="300px"
                  class="img-responsive"
                />
              <!-- </center> -->
              <br />
              <!-- <center> -->
                <div style="display: flex; margin-top: 20px !important; justify-content: center;">
                <h1 class="text-center">Error, silahkan coba lagi.</h1>
              <!-- </center> -->
              </div>
            </div>

            <div key="2" v-if="!table.isBusy">
              <b-table
                responsive
                hover
                selectable
                class="thead-warning"
                select-mode="multi"
                selectedVariant="success"
                :busy="table.isBusy"
                :items="table.items"
                :fields="table.fields"
                @row-clicked="myRowClickHandler"
              >
                <template v-slot:cell(nomor)="data">{{
                  calculateByPage() + data.index
                }}</template>
                <template v-slot:cell(tanggal_upload)="data">
                  <p class="text-center">
                    {{ data.item.tanggal_upload | moment }}
                  </p>
                </template>
                <template v-slot:cell(jumlah_record)="data">
                  <p class="text-center">
                    {{ data.item.jumlah_record }}
                  </p>
                </template>
                <template v-slot:cell(jumlah_record_berhasil)="data">
                  <p class="text-center">
                    {{ data.item.jumlah_record_berhasil }}
                  </p>
                </template>
                <template v-slot:cell(jumlah_record_gagal)="data">
                  <p
                    class="text-center"
                    @click="viewDetailError(data.item)"
                    v-b-tooltip.hover
                    title="show detail"
                  >
                    {{ data.item.jumlah_record_gagal }}
                  </p>
                </template>

                <div slot="table-busy" class="text-danger my-2">
                  <b-spinner class="align-middle" />
                  <strong>Loading...</strong>
                </div>

                <!-- body here -->
              </b-table>

              <!-- <p class="text-center m-5" v-if="table.items.length === 0">Tidak ada data.</p> -->

              <div class="card-footer py-4 d-flex justify-content-between">
                <div class>
                  <p class="card-category">
                    Menampilkan {{ pagination.from }} hingga
                    {{ pagination.to }} dari {{ pagination.total }} data
                  </p>
                </div>

                <base-pagination
                  v-model="meta.current_page"
                  :total="pagination.total"
                  :perPage="parseInt(meta.per_page)"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <modal :show.sync="showModalLoading">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
      <br />
      <!-- <center> -->
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
        />
      </div>
      <!-- </center> -->
    </modal>

    <modal :show.sync="showModalErrorMessage">
      <b-card>
        <template #header>
          <h4 class="mb-0">List Record Gagal</h4>
        </template>

        <b-list-group flush>
          <b-list-group-item v-for="item in listErrors" :key="item">{{
            item
          }}</b-list-group-item>
        </b-list-group>
      </b-card>
      <b-button
        size="md"
        variant="outline-primary"
        id="close-btn-upload-modal"
        class="float-right"
        @click="showModalErrorMessage = false"
        >Close</b-button
      >
    </modal>

    <modal :show.sync="showUploadModal" :clickToClose="false">
      <div class="card">
        <el-form @submit.prevent="importDataStatusTransaksi">
          <div class="card-body">
            <label>
              <h4 class="mb-0">Import Status Transaksi*</h4>
            </label>
            <div class="row-md-12">
              <file-input
                @change="filesChangeTransaksi"
                class="form-group"
                accept=".xls, .xlsx, .csv"
              ></file-input>
            </div>
            <el-form-item>
              <base-button
                class="mt-2"
                type="success"
                @click="importDataStatusTransaksi"
              >
                Upload
              </base-button>
              <a
                href="https://prod.dicicilaja.com/composer/storage/uploads/documents/template/Template_Status_Transaksi_v2.xlsx"
                target="blank"
                ><base-button class="mt-2" type="warning">
                  Download Template
                </base-button></a
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
      <b-button
        size="md"
        variant="outline-primary"
        id="close-btn-upload-modal"
        class="float-right"
        @click="closeModal()"
        >Close</b-button
      >
    </modal>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import { mapActions, mapGetters } from "vuex";
import swal from "sweetalert2";
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      table: {
        fields: [
          {
            label: "No",
            key: "nomor",
          },
          {
            label: "Tanggal",
            key: "tanggal_upload",
          },
          {
            label: "Deskripsi",
            key: "deskripsi",
          },
          {
            label: "Upload File",
            key: "nama_file",
          },
          {
            label: "Jumlah Record",
            key: "jumlah_record",
          },
          {
            label: "Jumlah Record Berhasil",
            key: "jumlah_record_berhasil",
          },
          {
            label: "Jumlah Record Gagal",
            key: "jumlah_record_gagal",
          },
        ],
        items: null,
        selected: [],
        isError: false,
        isBusy: false,
      },
      listErrors: [],
      fileTransaksi: "",
      showUploadModal: false,
      showModalLoading: false,
      showModalErrorMessage: false,
      pagination: "",
      date: new Date(),
      options: {
        format: "DD/MM/YYYY",
        useCurrent: false,
      },
      perPageCurrent: 5,
      meta: {
        per_page: 5,
        page: 1,
        current_page: 1,
        last_page: 5,
      },
    };
  },
  mounted() {
    this.getListOrder();
  },
  computed: {
    page() {
      return this.meta.current_page;
    },
    perPage() {
      return this.meta.per_page;
    },
  },
  watch: {
    page() {
      this.getListOrder();
    },
    perPage() {
      this.getListOrder();
    },
  },
  methods: {
    ...mapActions("transaksi", [
      "postImportDataStatusTransaksi",
      "getListUploadFileTransaction",
    ]),
    async getListOrder() {
      this.table.isBusy = true;
      try {
        let data = {};
        data.pageSize = this.meta.per_page;
        let reslistUploadTransaction = await this.getListUploadFileTransaction(
          data
        );
        this.table.items = reslistUploadTransaction.data;
        this.pagination = reslistUploadTransaction.meta;
      } catch (error) {
               throw new Error("Something went wrong " + error);
      }
      this.table.isBusy = false;
    },

    filesChangeTransaksi(files) {
      this.fileTransaksi = files[0];
    },

    async importDataStatusTransaksi() {
      if (this.fileTransaksi == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      }

      this.showModalLoading = true;
      this.closeModal();
      let res = await this.postImportDataStatusTransaksi(this.fileTransaksi);
      if (res.name != "Error") {
        this.showModalLoading = false;

        this.fileAxi = "";
        swal.fire("Sukses", "Data Status Transaksi telah diimport!", "success");
        this.getListOrder();
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Data Status Transaksi gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "Data Status Transaksi gagal diimport",
          "error"
        );
      }
    },

    viewDetailError(record) {
      this.showModalErrorMessage = true;
      this.listErrors = record.message_record_gagal;
    },

    myRowClickHandler(record, index) {
      // console.log(record);
    },

    openUploadModal() {
      this.showUploadModal = true;
    },

    closeModal() {
      this.showUploadModal = false;
    },

    calculateByPage() {
      return (
        this.meta.current_page * this.meta.per_page - this.meta.per_page + 1
      );
    },

    limitEntryChanges() {
      this.meta.current_page = 1;
      this.getListOrder();
    },
  },
  components: {
    HalfCircleSpinner,
  },
  filters: {
    moment: (date) => {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>
