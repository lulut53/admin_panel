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
        <b-card header="Registrasi AXI Dicicilaja" header-tag="header">
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
                        v-model="form.date1"
                        type="date"
                        :min="form.minDate1"
                        :max="form.maxDate1"
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
                        :min="form.minDate2"
                        :max="form.maxDate2"
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
              </div>

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
                    @change="changeSubject()"
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
        minDate1:'',
        maxDate1:moment().format('YYYY-MM-DD'),
        minDate2:'',
        maxDate2:moment().format('YYYY-MM-DD'),
        date1: moment().format('YYYY-MM-DD'),
        date2: moment().format('YYYY-MM-DD'),
        subject: 'new'
      },
      subjects: [
        { value: "new", text: "New" },
        { value: "aktif", text: "Aktif" },
        { value: "nonaktif", text: "Non Aktif" }
      ],
      listChannel: {},
      urlDownload: "",
    };
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    async onSubmit() {
      const valid = await this.$refs.observer.validate();
      this.urlDownload = `${process.env.VUE_APP_URL_ORDER_IN_API}downloadAxiReg?startDate=${moment(this.form.date1).format('YYYYMMDD')}&endDate=${moment(this.form.date2).format('YYYYMMDD')}&statusAxi=${this.form.subject}`
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
        minDate1:'',
        maxDate1:moment().format('YYYY-MM-DD'),
        minDate2:'',
        maxDate2:moment().format('YYYY-MM-DD'),
        date1: moment().format('YYYY-MM-DD'),
        date2: moment().format('YYYY-MM-DD'),
        subject: 'new'
      };
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
    },
  },
};
</script>

<style></style>
