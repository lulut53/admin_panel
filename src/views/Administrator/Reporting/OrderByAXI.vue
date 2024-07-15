<template>
  <div class="container">
    <base-header type>
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Reporting</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard">
                  <i class="fas fa-home"></i>
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard"
                  >Administrator</router-link
                >
              </li>
              <li class="breadcrumb-item">Pengajuan</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
    <div class="row">
      <div class="col-md-6">
        <b-card header="Transaksi Order Dicicilaja" header-tag="header">
          <ValidationObserver ref="observer">
            <b-form @submit.stop.prevent="onSubmit()">
              <div class="row">
                <div class="col">
                  <ValidationProvider
                    name="From"
                    :rules="{ required: true }"
                    v-slot="validationContext"
                  >
                    <b-form-group
                      id="from-input-group-1"
                      label="From"
                      label-for="from-input-1"
                    >
                      <input
                        name="from"
                        id="from"
                        class="form-control"
                        v-model="form.date"
                        type="date"
                        :state="getValidationState(validationContext)"
                        aria-describedby="input-1-live-feedback"
                        required
                      />
                      <b-form-invalid-feedback id="input-1-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </div>
                <div class="col">
                  <ValidationProvider
                    name="Time"
                    :rules="{ required: true }"
                    v-slot="validationContext"
                  >
                    <b-form-group
                      id="time1-input-group-1"
                      label="Time"
                      label-for="time1-input-1"
                    >
                      <input
                        name="time1"
                        id="time1"
                        class="form-control"
                        v-model="form.time"
                        type="time"
                        :state="getValidationState(validationContext)"
                        aria-describedby="input-time1-live-feedback"
                        required
                      />
                      <b-form-invalid-feedback id="input-time1-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <ValidationProvider
                    name="To"
                    :rules="{ required: true }"
                    v-slot="validationContext"
                  >
                    <b-form-group
                      id="to-input-group-1"
                      label="To"
                      label-for="to-input-1"
                    >
                      <input
                        class="form-control"
                        v-model="form.date2"
                        type="date"
                        name="to"
                        id="to"
                        :state="getValidationState(validationContext)"
                        aria-describedby="input-2-live-feedback"
                        required
                      />
                      <b-form-invalid-feedback id="input-2-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </div>
                <div class="col">
                  <ValidationProvider
                    name="Time"
                    :rules="{ required: true }"
                    v-slot="validationContext"
                  >
                    <b-form-group
                      id="time1-input-group-1"
                      label="Time"
                      label-for="time1-input-1"
                    >
                      <input
                        name="time1"
                        id="time1"
                        class="form-control"
                        v-model="form.time2"
                        type="time"
                        :state="getValidationState(validationContext)"
                        aria-describedby="input-time1-live-feedback"
                        required
                      />
                      <b-form-invalid-feedback id="input-time1-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </div>

              <ValidationProvider
                name="Kategori"
                :rules="{ required: true }"
                v-slot="validationContext"
              >
                <b-form-group
                  id="subject-input-group-2"
                  label="Cari Berdasarkan"
                  label-for="subject-input-2"
                >
                  <b-form-select
                    id="subject-input-2"
                    name="subject-input-2"
                    v-model="form.subject"
                    :options="isRole == 'Reporting SPDM' ? subjects2 : subjects"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-3-live-feedback"
                    @change="changeSubject()"
                  ></b-form-select>

                  <b-form-invalid-feedback id="input-3-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider
                name="Keyword"
                :rules="{ required: true, min: 3 }"
                v-slot="validationContext"
                v-if="form.subject != 'semua' && form.subject != null"
              >
                <b-form-group
                  id="keyword-input-group-1"
                  label=""
                  label-for="keyword-input-1"
                  v-if="form.subject != 'semua' && form.subject != null"
                >
                  <b-form-input
                    id="keyword-input-1"
                    name="keyword-input-1"
                    v-model="form.keyword"
                    aria-describedby="input-4-live-feedback"
                    :state="getValidationState(validationContext)"
                    placeholder="keyword"
                    v-if="form.subject == 'id_sumber_order'"
                  ></b-form-input>
                  <b-form-select
                    id="subject-input-2"
                    name="subject-input-2"
                    v-model="form.keyword"
                    :options="listJenisJaminan"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-4-live-feedback"
                    v-else-if="
                      form.subject == 'jenis_jaminan' ||
                      form.subject == 'jenis_jaminan_channel'
                    "
                  ></b-form-select>
                  <b-form-select
                    id="subject-input-2"
                    name="subject-input-2"
                    v-model="form.keyword"
                    :options="listChannel"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-4-live-feedback"
                    v-else-if="form.subject == 'nama_channel'"
                  ></b-form-select>

                  <b-form-invalid-feedback id="input-4-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <b-button type="submit" variant="primary">Download</b-button>
              <b-button class="ml-2" @click="resetForm()">Reset</b-button>
            </b-form>
          </ValidationObserver>
        </b-card>
        <!-- <b-embed
      type="iframe"
      aspect="16by9"
      v-bind:src="link"
      allowfullscreen
    ></b-embed> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
// import datePicker from "vue-bootstrap-datetimepicker";
import { mapGetters, mapActions } from "vuex";
import swal from "sweetalert2";

export default {
  components: {
    // datePicker,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      isRole: "",
      form: {
        date: "",
        date2: "",
        keyword: "",
        subject: null,
        time: "",
        time2: "",
      },
      options: {
        format: "YYYY-MM-DD HH:MM:SS",
        useCurrent: false,
      },
      subjects: [
        { value: null, text: "Choose..." },
        { value: "semua", text: "Semua" },
        { value: "id_sumber_order", text: "ID AXI/Channel" },
        { value: "nama_channel", text: "Channel" },
        { value: "jenis_jaminan", text: "Jenis Jaminan" },
      ],
      subjects2: [
        { value: "nama_channel", text: "Channel" },
        { value: "jenis_jaminan_channel", text: "Jenis Jaminan" },
      ],
      listJenisJaminan: [
        { value: "motor", text: "Motor" },
        { value: "mobil", text: "Mobil" },
      ],
      listChannel: {},
      urlDownload: "",
      link:
        "https://147.139.200.24/dicicilaja-rpt/frameset?__report=order_in/rpt_order_by_axi.rptdesign&format=xls_spudsoft&svg=true&_rtl=false&",
    };
  },

  mounted() {
    this.isRole = window.localStorage.getItem("role");
    // console.log(this.isRole);
  },
  methods: {
    ...mapActions("sap", ["downloadReportTransaksi", "getChannelList"]),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    async onSubmit() {
      const valid = await this.$refs.observer.validate();
      
      // MOVE LOGIC TO SERVICE
      // if (this.form.subject == "semua") {
      //   this.urlDownload = `${process.env.VUE_APP_URL_COMPOSER_API}export/transactionreport?startDate=${this.form.date} ${this.form.time}&endDate=${this.form.date2} ${this.form.time2}`;
      // } else if (this.form.subject == "nama_channel") {
      //   if (this.form.keyword == "semua") {
      //     this.urlDownload = `${process.env.VUE_APP_URL_COMPOSER_API}export/transactionreport?filter=${this.form.subject}&startDate=${this.form.date} ${this.form.time}&endDate=${this.form.date2} ${this.form.time2}`;
      //   } else {
      //     this.urlDownload = `${process.env.VUE_APP_URL_COMPOSER_API}export/transactionreport?filter=${this.form.subject}&filterValue=${this.form.keyword}&startDate=${this.form.date} ${this.form.time}&endDate=${this.form.date2} ${this.form.time2}`;
      //   }
      // } else {
      //   this.urlDownload =   `${process.env.VUE_APP_URL_COMPOSER_API}export/transactionreport?filter=${this.form.subject}&filterValue=${this.form.keyword}&startDate=${this.form.date} ${this.form.time}&endDate=${this.form.date2} ${this.form.time2}`;
      // }

      this.urlDownload = `${process.env.VUE_APP_URL_COMPOSER_API}export/transactionreport?filter=${this.form.subject}&filterValue=${this.form.keyword}&startDate=${this.form.date} ${this.form.time}&endDate=${this.form.date2} ${this.form.time2}`;
      if (valid && this.urlDownload) {
        const rangeDate = (new Date(this.form.date2) - new Date(this.form.date)) / (1000 * 3600 * 24);
        if(rangeDate > 60){
          swal.fire("Warning", "Maksimal penarikan data report transaksi adalah <b>60 hari</b>", "info");
          return null;
        }
        try {
          // console.log(this.urlDownload);
          window.open(this.urlDownload);
        } catch (error) {
          throw new Error("Something went wrong " + error);
        }
      }
    },
    resetForm() {
      this.form = {
        date: "",
        date2: "",
        time: "",
        time2: "",
        keyword: "",
        subject: "",
      };
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
    },
    async changeSubject() {
      this.form.keyword = "";
      const res = await this.getChannelList();
      // console.log(res.data);
      this.listChannel = res.data.map((item) => {
        return {
          value: item.nama_channel,
          text: item.nama_channel,
        };
      });
      if (this.isRole == "Reporting SPDM") {
        this.listChannel.unshift({
          value: "semua",
          text: "Semua",
        });
      }
    },
  },
};
</script>

<style></style>
