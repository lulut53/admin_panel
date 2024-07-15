<template>
  <div>
    <base-header type>
      <div class="row align-items-center py-4">
        <div class="col-lg-12">
          <h6 class="h2 d-inline-block mb-0">New Promo / Partnership</h6>
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
                Program
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                List Promo / Partnership
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="pt-2 pb-2">
        <router-link
          to="/administrator/program/partnership"
          class="btn btn-sm btn-primary"
        >
          <i class="ni ni-bold-left" aria-hidden="true"></i>
          <span class="hidden-sm-down">Kembali</span>
        </router-link>
      </div>
    </base-header>

    <div key="1" v-if="isBusy" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
      <br />
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
        <img
          alt="Error Image"
          src="/images/undraw_cancel_u1it.svg"
          height="300px"
          class="img-responsive"
        />
      <!-- </center> -->
      <br />
      <div style="display: flex; margin-top: 20px !important; justify-content: center;">
      <!-- <center> -->
        <h1 class="text-center">Error, silahkan coba lagi.</h1>
      <!-- </center> -->
      </div>
    </div>

    <div v-if="!isBusy && !isError" class="container-fluid mt--6">
      <b-card>
        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form @submit.stop.prevent="passes(onSubmit)">
            <h2 class="sub-title" v-if="!isEdit">
              Detail User Program / Partnership
            </h2>
            <hr class="divider" v-if="!isEdit" />

            <!-- Nama & Email -->
            <div class="row" v-if="!isEdit">
              <div class="col-md-6">
                <validation-provider
                  name="Nama"
                  :rules="{ required: true, min: 3 }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-nama"
                    label="Nama"
                    label-for="nama"
                  >
                    <b-form-input
                      id="nama"
                      name="nama"
                      v-model="user.nama"
                      placeholder="Masukkan Nama user"
                      :state="getValidationState(validationContext)"
                      aria-describedby="input-nama-feedback"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-nama-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
              <div class="col-md-6">
                <validation-provider
                  name="Email"
                  :rules="{ required: true, email: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-email"
                    label="Email"
                    label-for="email"
                  >
                    <b-form-input
                      id="email"
                      name="email"
                      v-model="user.email"
                      :state="
                        getValidationState(validationContext) && isEmailValid
                      "
                      placeholder="Masukkan email user"
                      aria-describedby="input-email-feedback"
                      @blur="checkEmail"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-email-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                    <b-form-feedback
                      id="check-email-feedback"
                      v-if="user.email"
                    >
                      {{ validation.email }}
                    </b-form-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
            </div>

            <!-- Nomor AXI & Channel ID -->
            <div class="row" v-if="!isEdit">
              <div class="col-md-6">
                <validation-provider
                  name="Flag user"
                  :rules="{ required: true, min: 3 }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-nomor-axi-id"
                    label="Flag user"
                    label-for="nomor-axi-id"
                  >
                    <b-form-input
                      id="nomor-axi-id"
                      name="nomor-axi-id"
                      v-model="user.nomor_axi_id"
                      placeholder="Masukkan nama flag program"
                      :state="
                        getValidationState(validationContext) && isProgramValid
                      "
                      aria-describedby="input-nomor-axi-id-feedback"
                      @blur="checkProgram"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-nomor-axi-id-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                    <b-form-feedback
                      id="check-nomor-axi-id-feedback"
                      v-if="user.nomor_axi_id"
                    >
                      {{ validation.program }}
                    </b-form-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
              <div class="col-md-6">
                <validation-provider
                  name="Channel Id"
                  :rules="{ required: true, numeric, max: 3, max_value: 100 }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-channel-id"
                    label="Channel ID"
                    label-for="channel-id"
                  >
                    <b-form-input
                      id="channel-id"
                      name="channel-id"
                      v-model="user.channel_id"
                      type="number"
                      min="1"
                      :state="getValidationState(validationContext)"
                      placeholder="Masukkan channel id user"
                      aria-describedby="input-channel-id-feedback"
                      @change="checkChannelId"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-channel-id-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
            </div>

            <!-- Channel Code -->
            <div class="row" v-if="!isEdit">
              <div class="col-md-6">
                <validation-provider
                  name="Channel Code"
                  :rules="{
                    required: true,
                    min: 3,
                    max: 4,
                    regex: /^[A-Za-z0-9]+$/,
                  }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-channel-code"
                    label="Channel Code"
                    label-for="channel-code"
                  >
                    <b-form-input
                      id="channel-code"
                      name="channel-code"
                      v-model="user.channel_code"
                      placeholder="Masukkan nomor axi id user"
                      :state="
                        getValidationState(validationContext) &&
                        isChannelCodeActive
                      "
                      aria-describedby="input-channel-code-feedback"
                      :disabled="isChannelIdActive"
                      @change="checkChannelCode"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-channel-code-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                    <b-form-feedback
                      id="check-channel-code-feedback"
                      v-if="user.channel_code && !isChannelIdActive"
                    >
                      {{ validation.channel_code }}
                    </b-form-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
            </div>

            <h2 class="sub-title">Detail Program / Partnership</h2>
            <hr class="divider" />
            <!-- Tipe -->
            <div class="row">
              <div class="col-md-6">
                <validation-provider
                  name="Tipe"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-tipe"
                    label="Tipe"
                    label-for="tipe"
                  >
                    <b-form-select
                      id="input-tipe"
                      name="input-tipe"
                      v-model="form.tipe"
                      :state="getValidationState(validationContext)"
                      :options="optionsTipe"
                    >
                    </b-form-select>

                    <b-form-invalid-feedback id="input-tipe-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
              <div class="col-md-3">
                <validation-provider
                  name="Layout Informasi"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-layout-informasi"
                    label="Layout Informasi"
                    label-for="layout-informasi"
                  >
                    <base-switch v-model="layout_informasi"></base-switch>

                    <b-form-invalid-feedback
                      id="input-layout-informasi-feedback"
                    >
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
              <div class="col-md-3">
                <validation-provider
                  name="Layout Simulasi"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-tipe"
                    label="Layout Simulasi"
                    label-for="layout-simulasi"
                  >
                    <base-switch v-model="layout_simulasi"></base-switch>

                    <b-form-invalid-feedback
                      id="input-layout-simulasi-feedback"
                    >
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <validation-provider
                  name="Tanggal Mulai"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                >
                  <b-form-group
                    id="input-group-tanggal-mulai"
                    label="Tanggal Mulai"
                    label-for="tanggal-mulai"
                  >
                    <flat-picker
                      id="tanggal-mulai"
                      name="tanggal-mulai"
                      :config="{ allowInput: true }"
                      v-model="form.start_date"
                      class="form-control datepicker"
                      placeholder="Pilih tanggal mulai"
                      aria-describedby="input-tanggal-mulai-feedback"
                    ></flat-picker>

                    <b-form-invalid-feedback id="input-tanggal-mulai-feedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
              <div class="col-md-6">
                <validation-provider
                  name="Tanggal Akhir"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-tipe"
                    label="Tanggal Akhir"
                    label-for="tanggal-akhir"
                  >
                    <flat-picker
                      :config="{ allowInput: true }"
                      v-model="form.end_date"
                      class="form-control datepicker"
                      placeholder="Pilih tanggal akhir"
                    ></flat-picker>

                    <b-form-invalid-feedback
                      id="input-layout-informasi-feedback"
                    >
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
            </div>

            <!-- WhatsApp -->
            <div class="row">
              <div class="col-md-6">
                <validation-provider
                  name="Nomor WhatsApp"
                  :rules="{}"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-number"
                    label="Nomor WhatsApp"
                    label-for="nomor_whatsapp"
                  >
                    <b-form-input
                      id="number"
                      name="number"
                      v-model="whatsapp.wa_number"
                      placeholder="Masukkan Nomor WhatsApp"
                      :state="getValidationState(validationContext)"
                      aria-describedby="input-number-feedback"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-number-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
              <div class="col-md-6">
                <validation-provider
                  name="Message WhatsApp"
                  :rules="{}"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-message"
                    label="Message"
                    label-for="message"
                  >
                    <b-form-input
                      id="message"
                      name="message"
                      v-model="whatsapp.wa_message"
                      :state="getValidationState(validationContext)"
                      placeholder="Masukkan Pesan WhatsApp"
                      aria-describedby="input-message-feedback"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-message-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                    <!-- <b-form-feedback
                      id="check-email-feedback"
                      v-if="user.email"
                    >
                      {{ validation.email }}
                    </b-form-feedback> -->
                  </b-form-group>
                </validation-provider>
              </div>
            </div>

            <!-- Button Submit -->
            <b-button
              type="submit"
              variant="primary"
              class="btn float-right semibold m-b-10"
              >Submit</b-button
            >
          </b-form>
        </validation-observer>
      </b-card>
    </div>
  </div>
</template>

<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { mapGetters, mapActions } from "vuex";
import { HalfCircleSpinner } from "epic-spinners";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  components: {
    flatPicker,
    HalfCircleSpinner,
  },
  data() {
    return {
      isBusy: false,
      isError: false,
      isEdit: false,
      isEmailValid: false,
      isProgramValid: false,
      isChannelIdActive: false,
      isChannelCodeActive: false,
      validation: {
        email: "",
        program: "",
        channel_code: "",
      },
      optionsTipe: [
        { value: null, text: "Please select an option" },
        { value: "promo", text: "Promo" },
        { value: "partnership", text: "Partnership" },
      ],
      user: {
        nama: "",
        email: "",
        nomor_axi_id: "",
        channel_id: "",
        channel_code: "",
      },
      daterange: [],
      layout_informasi: false,
      layout_simulasi: false,
      form: {
        tipe: "",
        start_date: "",
        end_date: "",
      },
      whatsapp: {
        wa_number: null,
        wa_message: null,
      },
      dataEdit: [],
    };
  },
  // on first render components
  async created() {
    this.dataEdit = this.$route.params.data;
    const isPage = this.$route.name;
    if (isPage === "update-partnership") {
      if (this.dataEdit !== undefined) {
        this.isEdit = true;
        const { data } = await this.$route.params;
        this.form = {
          tipe: data.tipe,
          start_date: data.start_date,
          end_date: data.end_date,
        };
        this.whatsapp = {
          wa_number: data.wa_number,
          wa_message: data.wa_message,
        };
        this.layout_informasi = data.layout_informasi == 1 ? true : false;
        this.layout_simulasi = data.layout_simulasi == 1 ? true : false;
      } else {
        this.$router.push({
          name: "list-partnership",
        });
      }
    }
  },
  computed: {
    ...mapGetters("program", ["resCreateUserProgram"]),
  },
  methods: {
    ...mapActions("program", [
      "getCheckChannelCode",
      "getCheckChannelId",
      "postCreateUserProgram",
      "postCreateProgram",
      "postCheckProgram",
      "postCheckEmail",
      "putUpdateProgram",
    ]),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    // validate email
    async checkEmail() {
      const res = await this.postCheckEmail({
        email: this.user.email,
      });

     // if (res.status !== 1) {
        //this.isEmailValid = false;
        //this.validation.email = res.message;
     // } else {
        //this.isEmailValid = true;
       // this.validation.email = res.message;
      //}
    },
    // validate program is available
    async checkProgram() {
      const res = await this.postCheckProgram({
        program: this.user.program,
      });
      this.isProgramValid = true;
        this.validation.program = res.message;
      //if (res.status !== 1) {
        
        // Swal.fire({
        //   title: "Perhatian...!",
        //   text: `Nama ${res.message}`,
        //   type: "error",
        // });
      //} else {
       // this.isProgramValid = true;
        //this.validation.program = res.message;
        // Swal.fire({
        //   title: "Perhatian...!",
        //   text: `${res.message}`,
        //   type: "success",
        // });
      //}
    },
    // validate channel id
    async checkChannelId() {
      const res = await this.getCheckChannelId({
        channelId: this.user.channel_id,
      });
      if (res.status === 1) {
        this.isChannelIdActive = true;
        this.user.channel_code = res.channel_code;
      } else {
        this.isChannelIdActive = false;
        this.user.channel_code = "";
      }
    },
    async checkChannelCode() {
      if (this.user.channel_code && !this.isChannelIdActive) {
        const res = await this.getCheckChannelCode({
          channel_code: this.user.channel_code,
        });

        
        if (res.status === 1) {
          this.isChannelCodeActive = false;
          this.validation.channel_code = res.message;
        } else {
          this.isChannelCodeActive = true;
          this.validation.channel_code = res.message;
        }
      }
    },
    // on button submit click methods
    async onSubmit() {
      const startDate = new Date(this.form.start_date);
      const endDate = new Date(this.form.end_date);
      if(typeof(this.whatsapp.wa_number) == 'string'){
        if(this.whatsapp.wa_number.length == 0){
          this.whatsapp.wa_number = null
        }
      }
      if(typeof(this.whatsapp.wa_message) == 'string'){
        if(this.whatsapp.wa_message.length == 0){
          this.whatsapp.wa_message = null
        }
      }
      const regexPhone = /^(\+62|62|0)8[1-9][0-9]{6,11}$/g;
      if (this.whatsapp.wa_number != null) {
        if (!regexPhone.test(this.whatsapp.wa_number)) {
          Swal.fire({
            title: "Perhatian...!",
            text: "Format nomor telepon tidak dikenali!.",
            type: "warning",
          });
          return;
        } else {
          const waNumber = this.whatsapp.wa_number.split("");
          if (waNumber[0] == "0") {
            waNumber[0] = "62";
            this.whatsapp.wa_number = waNumber.join("");
          }
        } //if else regex
      }

      if (startDate >= endDate) {
        Swal.fire({
          title: "Perhatian...!",
          text: "Tanggal mulai tidak boleh melebihi dari tanggal akhir.",
          type: "warning",
        });
      } else {
        // condition update data
        if (this.isEdit) {
          this.isBusy = true;
          try {
            const data = {
              ...this.form,
              profile_id: this.dataEdit.profile_id,
              layout_informasi: this.layout_informasi === true ? 1 : 0,
              layout_simulasi: this.layout_simulasi === true ? 1 : 0,
              ...this.whatsapp,
            };
            const id = this.dataEdit.id;
            const res = await this.putUpdateProgram({ data, id });
            this.isBusy = false;
            Swal.fire({
              title: "Success",
              text: "Promo berhasil diperbaharui.",
              type: "success",
            });
            this.$router.push("/administrator/program/partnership");
          } catch (error) {
            this.isBusy = false;
                  throw new Error("Something went wrong " + error);
          }
        } else {
          // condition create new data
          if (this.validation.channel_code.includes("sudah terdaftar")) {
            Swal.fire({
              title: "Gagal",
              text: "Channel Code sudah digunakan.",
              type: "error",
            });
          } else {
            try {
              this.isBusy = true;
              const payload = {
                ...this.user,
              };
              await this.postCreateUserProgram(payload);
              if (this.resCreateUserProgram) {
                try {
                  const payload = {
                    ...this.form,
                    profile_id: this.resCreateUserProgram.profile_id,
                    channel_id: this.user.channel_id,
                    deskripsi: this.user.nama,
                    program: this.user.nomor_axi_id,
                    status: 1,
                    layout_informasi: this.layout_informasi === true ? 1 : 0,
                    layout_simulasi: this.layout_simulasi === true ? 1 : 0,
                    token: this.resCreateUserProgram.token,
                    wa_number: this.whatsapp.wa_number,
                    wa_message: this.whatsapp.wa_message,
                  };
                  const res = await this.postCreateProgram(payload);
                  this.isBusy = false;
                  Swal.fire({
                    title: "Success",
                    text: "Promo berhasil dibuat.",
                    type: "success",
                  });
                  this.$router.push("/administrator/program/partnership");
                } catch (error) {
                  this.isBusy = false;
                  Swal.fire({
                    title: "Oops...",
                    text:
                      "Sepertinya terjadi masalah, silahkan hubungi developer.",
                    type: "error",
                  });
                  throw new Error("Something went wrong " + error);
                }
              }
            } catch (error) {
              this.isBusy = false;
              Swal.fire({
                title: "Oops...",
                text: "Sepertinya terjadi masalah, silahkan hubungi developer.",
                type: "error",
              });
              throw new Error("Something went wrong " + error);
            }
          }
        }
      }
    },
  },
};
</script>

<style></style>
