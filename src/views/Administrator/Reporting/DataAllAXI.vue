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
                <li class="breadcrumb-item">Data All AXI</li>
              </ol>
            </nav>
          </div>
        </div>
      </base-header>
      <div class="row">
        <div class="col-md-6">
          <b-card header="Report Data All AXI Dicicilaja" header-tag="header">
            <ValidationObserver ref="observer">
              <b-form @submit.stop.prevent="onSubmit()">
                <ValidationProvider
                  name="StatusAXI"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="subject-input-group-2"
                    label="Status AXI"
                    label-for="subject-input-2"
                  >
                    <b-form-select
                      id="subject-input-2"
                      name="subject-input-2"
                      v-model="form.subject"
                      :options="subjects"
                      :state="getValidationState(validationContext)"
                      aria-describedby="input-3-live-feedback"
                    ></b-form-select>
  
                    <b-form-invalid-feedback id="input-3-live-feedback">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <b-button type="submit" variant="primary">Download</b-button>
                <b-button class="ml-2" @click="resetForm()">Reset</b-button>
              </b-form>
            </ValidationObserver>
          </b-card>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ValidationObserver, ValidationProvider } from "vee-validate";
  import moment from "moment"
  
  export default {
    components: {
      ValidationObserver,
      ValidationProvider,
    },
    data() {
      return {
        form: {
          subject: null,
        },
        subjects: [
          { value: null, text: "Choose..." },
          { value: "SEMUA_STATUS_REGISTRASI", text: "All Status"},
          { value: "AKTIF", text: "Aktif" },
          { value: "BARU", text: "Baru"},
          { value: "PENGECEKAN", text: "Pengecekan"},
          { value: "NON_AKTIF", text: "Non Aktif" }
        ],
        urlDownload: "",
      };
    },
    methods: {
      getValidationState({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null;
      },
      async onSubmit() {
        const valid = await this.$refs.observer.validate();
        this.urlDownload = `${process.env.VUE_APP_URL_COMPOSER_API}export/allaxi?statusaxi=${this.form.subject}`;
        //this.urlDownload = `${process.env.VUE_APP_URL_ORDER_IN_API}downloadAxiReg?startDate=${moment(this.form.date1).format('YYYYMMDD')}&endDate=${moment(this.form.date2).format('YYYYMMDD')}&statusAxi=${this.form.subject}`
        if (valid && this.urlDownload) {
          try {
            window.open(this.urlDownload);
          } catch (error) {
                 throw new Error("Something went wrong " + error);
          }
        }
      },
      resetForm() {
        this.form = {
          subject: null,
        };
        this.$nextTick(() => {
          this.$refs.observer.reset();
        });
      },
    },
  };
  </script>
  
  <style></style>
  