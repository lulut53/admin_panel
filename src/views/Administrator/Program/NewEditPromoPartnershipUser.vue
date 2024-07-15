<template>
  <div>
    <base-header type>
      <div class="row align-items-center py-4">
        <div class="col-lg-12">
          <h6 class="h2 d-inline-block mb-0">
            List Promo / Partnership API
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
                Program
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                List Promo / Partnership API
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="pt-2 pb-2">
        <router-link
          to="/administrator/program/partnership-user"
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
            <h2 class="sub-title">Detail User</h2>
            <hr class="divider" />
            <!-- Nama & Email User -->
            <div class="row">
              <div class="col-md-6">
                <validation-provider
                  name="Nama User"
                  :rules="{ required: true, min: 3 }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-nama-user"
                    label="Nama User"
                    label-for="nama-user"
                  >
                    <b-form-input
                      id="nama-user"
                      name="nama-user"
                      v-model="form.userName"
                      placeholder="Masukkan nama user"
                      :state="getValidationState(validationContext)"
                      aria-describedby="input-nama-user-feedback"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-nama-user-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
              <div class="col-md-6">
                <validation-provider
                  name="Email User"
                  :rules="{ required: true, email: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-email-user"
                    label="Email User"
                    label-for="email-user"
                  >
                    <b-form-input
                      id="email-user"
                      name="email-user"
                      v-model="form.userEmail"
                      :state="getValidationState(validationContext) && isEmailAvailable"
                      placeholder="Masukkan email user"
                      aria-describedby="input-email-user-feedback"
                      @blur="checkEmail"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-email-user-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                    <b-form-feedback
                      id="check-email-user-feedback"
                    >
                      {{ validation.email }}
                    </b-form-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
            </div>
            <!-- Flag User & Channel Id -->
            <div class="row">
              <div class="col-md-6">
                <validation-provider
                  name="Flag User"
                  :rules="{ required: true, regex: /^[a-zA-Z0-9]+$/ }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-flag-user"
                    label="Flag User"
                    label-for="flag-user"
                  >
                    <b-form-input
                      id="flag-user"
                      name="flag-user"
                      v-model="form.userFlag"
                      :state="getValidationState(validationContext) && isFlagAvailable"
                      placeholder="Masukkan flag nama program"
                      aria-describedby="input-flag-user-feedback"
                      @change="checkFlag"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-flag-user-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                    <b-form-feedback
                      id="check-flag-user-feedback"
                    >
                      {{ validation.flag }}
                    </b-form-feedback>
                  </b-form-group>
                </validation-provider>
              </div>
              <div class="col-md-6">
                <validation-provider
                  name="Channel ID"
                  :rules="{ required: true, regex: '^([1-9][0-9]{0,1}|100)$' }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-channel-id"
                    label="Channel ID"
                    label-for="channel-id"
                  >
                    <!-- <b-form-select
                      id="input-channel-id"
                      name="input-channel-id"
                      v-model="form.channelId"
                      :state="getValidationState(validationContext)"
                      @change="setChannelId($event)"
                    >
                      <option
                        v-for="n in getNumbers(1, 100)"
                        :key="n"
                        :value="n"
                      >
                        {{ n }}
                      </option>
                    </b-form-select> -->
                    <b-form-input
                      id="input-channel-id"
                      name="input-channel-id"
                      type="number"
                      placeholder="Masukkan Channel ID user"
                      v-model="form.channelId"
                      :state="getValidationState(validationContext)"
                      @change="setChannelId($event)"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-channel-id-feedback">
                      {{ validationContext.errors[0] === "Format Channel ID salah" ? 'Nilai Channel ID harus di antara 1 dan 100' : validationContext.errors[0] }}
                      <!-- {{ validationContext.errors[0] }} -->
                    </b-form-invalid-feedback>
                    <small
                      id="check-channelId-user-feedback"
                    >
                      {{ validation.channelId }}
                    </small>
                  </b-form-group>
                </validation-provider>
              </div>
            </div>
            <!-- Kode -->
            <div class="row">
              <div class="col-md-6">
                <validation-provider
                  name="Kode"
                  :rules="{ required: true, max: 4, regex: /^[A-Za-z0-9]+$/ }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-kode"
                    label="Kode"
                    label-for="kode"
                  >
                    <b-form-input
                      id="kode"
                      name="kode"
                      v-model="form.kode"
                      :state="getValidationState(validationContext) && isCodeAvailable"
                      aria-describedby="input-kode-feedback"
                      :disabled="isChannelIdRegistered"
                      @change="checkCode"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-kode-feedback">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                    <b-form-feedback
                      id="check-code-user-feedback"
                    >
                      {{ validation.code }}
                    </b-form-feedback>
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
    <modal :show.sync="isLoading" :clickToClose="false">
      <h3 class="text-center">Processing</h3>
      <br />
      <!-- <center> -->
        <half-circle-spinner
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
      />
    <!-- </center> -->
    </modal>
    <modal :show.sync="showModalToken" :clickToClose="false">
      <div class="swal2-icon swal2-success swal2-animate-success-icon" style="display: flex;">
        <div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"/>
        <span class="swal2-success-line-tip"></span>
        <span class="swal2-success-line-long"></span>
        <div class="swal2-success-ring" />
        <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);" />
        <div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);" />
      </div>
      <h1 class="text-center">Berhasil menyimpan data</h1>
      <h3>Agen ID: {{ form.profileId }}</h3>
      <h3>Channel ID: {{ form.channelId }}</h3>
      <h3>Token</h3>
      <b-form-group
        id="input-group-token--readonly"
      >
        <b-input-group>
          <b-form-input
            id="token"
            name="token"
            ref="token"
            v-model="form.token"
            aria-describedby="input-token--readonly"
            disabled
          ></b-form-input>
          <b-input-group-append>
            <b-button
              size="md"
              variant="outline-primary"
              id="btn-copy-to-clipboard"
              @click="copyToClipboard(form.token)"
            ><i class="fa fa-clipboard" /> Copy</b-button>
          </b-input-group-append>
        </b-input-group>
        <p
          v-if="isTokenCopied"
          class="token-feedback">Token has been copied to clipboard</p>
      </b-form-group>
      <div class="text-center">
        <b-button
          size="md"
          variant="outline-primary"
          id="close-btn-modal"
        >
          <router-link
            to="/administrator/program/partnership-user"
          >
            OK
          </router-link>
        </b-button>
      </div>
    </modal>
    <div id="copy" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";
import { HalfCircleSpinner } from "epic-spinners";
import swal from "sweetalert2";

export default {
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      type: this.$route.params.param,
      dataDetail: null,
      // isBusy: true,
      isBusy: false,
      isError: false,
      isUpdateSuccess: false,
      form: {
        userName: null,
        userEmail: null,
        userFlag: null,
        kode: null,
        channelId: null,
        token: null,
        profileId: null,
      },
      validation: {
        flag: '',
        email: '',
        channelId: '',
        code: '',
      },
      isLoading: false,
      showModalToken: false,
      isTokenCopied: false,
      isEmailAvailable: false,
      isFlagAvailable: false,
      isChannelIdRegistered: true,
      isCodeAvailable: false,
    }
  },
  mounted() {
    if (this.type === "detail") {
      this.getDetailUser();
      this.isFlagAvailable = true;
      this.isEmailAvailable = true;
      this.isCodeAvailable = true;
    }
  },
  computed: {
    ...mapGetters("program", [
      "details", 
      "update", 
      "newUser",
      "flagValidation",
      "emailValidation",
      "checkChannelId",
      "checkChannelCode",
      ]),
  },
  methods: {
    ...mapActions("program", [
      "getDetails", 
      "updateDetails", 
      "createNewUser", 
      "validateFlag",
      "validateEmail",
      "getCheckChannelId",
      "getCheckChannelCode",
    ]),
    async getDetailUser() {
      this.isBusy = true;
      try {
        // console.log(this.type);
        if (this.type === "detail") {
          let data = {
            id: this.$route.params.id
          };

          let res = JSON.parse(JSON.stringify(await this.getDetails(data)));

          if (res.data != "" || res.data.length == 0) {
            this.dataDetail = res.data[0];
            // console.log(this.dataDetail);
            this.form.userName = this.dataDetail.nama_channel;
            this.form.userEmail = this.dataDetail.email;
            this.form.userFlag = this.dataDetail.channel;
            this.form.kode = this.dataDetail.channel_code;
            this.form.channelId = this.dataDetail.id;
          }
        }
        this.isBusy = false;
      } catch (error) {
        this.isBusy = false;
                  throw new Error("Something went wrong " + error);
      }
    },
    async onSubmit() {
      this.isLoading = true;
      try {
        if (this.isFlagAvailable && this.isEmailAvailable && this.isCodeAvailable) {
          if (this.type === "detail") {
            let data = {
              pkid: this.$route.params.id,
              id: this.form.channelId,
              profile_id: this.dataDetail.profile_id,
              channel: this.form.userFlag,
              channel_code: this.form.kode,
              nama_channel: this.form.userName,
              email: this.form.userEmail
            }

            let res = JSON.parse(JSON.stringify(await this.updateDetails(data)));

            // console.log(res);

            if (res === 200) {
              this.isUpdateSuccess = true;
              swal.fire('Data berhasil diubah', '', 'success')
                .then((result) => {
                  if (result.value) {
                    this.$router.push({ name: 'Promo / Partnership User'});
                  }
                })
            } else {
              this.isUpdateSuccess = false;
              swal.fire('Gagal mengubah data', '', 'error');
            }
            
            // this.isBusy = false;
            this.isLoading = false;
          }
          if (this.type === "create") {
            let data = {
              nama: this.form.userName,
              email: this.form.userEmail,
              flag: this.form.userFlag,
              channel_id: this.form.channelId,
              channel_code: this.form.kode
            }
            // console.log("create new user", data);

            let res = JSON.parse(JSON.stringify(await this.createNewUser(data)));

            if (res != "" || res.length == 0) {
              this.form.token = res.token;
              this.form.profileId = res.profile_id;
              this.form.channelId = res.channel_id;
              this.showModalToken = true;
            } else {
              swal.fire('Gagal menyimpan data', '', 'error');
            }
            this.isLoading = false;
          }
        } else {
          swal.fire('Check kembali data yang anda input', '', 'error');
        }
      } catch (err) {
                  throw new Error("Something went wrong " + err);
        // this.isBusy = false;
      }
      this.isLoading = false;
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    getNumbers: function(start, stop) {
      return new Array(stop - start).fill(start).map((n, i) => n + i);
    },
    async setChannelId(value) {
      if (value) {
        // Hit API Check jika available atau tidak
        // console.log(value);
        this.isLoading = true;
        try {
          let data = {
            channelId: this.form.channelId
          }

          let res = JSON.parse(JSON.stringify(await this.getCheckChannelId(data)));

          if (res != "") {
            if (res.status == 1) {
              this.form.kode = res.channel_code;
              this.isChannelIdRegistered = true;
              this.isCodeAvailable = true;
              this.validation.channelId = '';
            } else {
              this.form.kode = null;
              this.isChannelIdRegistered = false;
              this.isCodeAvailable = false;
              this.validation.channelId = res.message;
            }
          }
        } catch (err) {
                  throw new Error("Something went wrong " + err);
        }
        this.isLoading = false;
      }
    },
    async checkCode() {
      this.isLoading = true;
      try {
        let data = {
          channel_code: this.form.kode
        }

        let res = JSON.parse(JSON.stringify(await this.getCheckChannelCode(data)));
        
        if (res != "") {
          if (res.status == 1) {
            this.isCodeAvailable = false;
          } else {
            this.isCodeAvailable = true;
          }
          this.validation.code = res.message;
        }
      } catch (err) {
                  throw new Error("Something went wrong " + err);
      }
      this.isLoading = false;
    },
    closeModal() {
      this.showModalToken = false;
      this.isTokenCopied = false;
      this.$route.push({ name: 'Promo / Partnership User' });
    },
    copyToClipboard(val) {
      const el = document.createElement('textarea');
      el.value = val;
      document.getElementById('copy').appendChild(el);
      el.select();
      document.execCommand('Copy');
      document.getElementById('copy').removeChild(el);
      this.isTokenCopied = true;
    },
    async checkFlag() {
      try {
        if (this.type === "create") {
          this.checkFlagValidation();
        } else if (this.type === "detail") {
          if (this.form.userFlag === this.dataDetail.channel) {
            this.isFlagAvailable = true;
          } else {
            this.isFlagAvailable = false;
            this.checkFlagValidation();
          }
        }
      } catch (err) {
                  throw new Error("Something went wrong " + err);
      }
    },
    async checkFlagValidation() {
      this.isLoading = true;
      try {
        let data = {
          flag: this.form.userFlag
        }

        let res = JSON.parse(JSON.stringify(await this.validateFlag(data)));

        // console.log(res);
        if (res.data != "" || res.data.length == 0) {
          if (res.data[0].status == 1) {
            this.isFlagAvailable = true;
            this.validation.flag = '';
          } else {
            this.isFlagAvailable = false;
            this.validation.flag = res.data[0].message;
            // console.log(res.data[0].message);
          }
        } else {
          this.isFlagAvailable = false;
          this.validation.flag = 'Flag tidak dapat digunakan'
        }
        this.isLoading = false;
      } catch (err) {
        // console.error(err);
        this.isFlagAvailable = false;
        this.validation.flag = 'Flag tidak dapat digunakan'
        this.isLoading = false;
      }
    },
    checkEmail() {
      try {
        if (this.type === "create") {
          this.checkEmailValidation();
        } else if (this.type === "detail") {
          if (this.form.userEmail === this.dataDetail.email) {
            this.isEmailAvailable = true;
          } else {
            this.checkEmailValidation();
          }
        }
      } catch (err) {
                  throw new Error("Something went wrong " + err);
      }
    },
    async checkEmailValidation() {
      this.isLoading = true;
      try {
        let data = {
          email: this.form.userEmail
        }

        let res = JSON.parse(JSON.stringify(await this.validateEmail(data)));

        // console.log(res);
        
        if (res.status == 1) {
          this.isEmailAvailable = true;
          this.validation.email = '';
        } else if (res.status == 0) {
          this.isEmailAvailable = false;
          this.validation.email = res.message;
        } else {
          this.isEmailAvailable = false;
          this.validation.email = 'Email tidak dapat digunakan';
        }
        this.isLoading = false;
      } catch (err) {
        // console.error(err);
        this.isEmailAvailable = false;
        this.validation.flag = 'Email tidak dapat digunakan'
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.dateInput {
  width: 100%;
}
.divider {
  margin-top: 0px;
}
.sub-title {
  color: #5e72e4;
}
div.custom-control.custom-control-inline.custom-radio {
  margin-right: 2rem !important;
}
.placeholder {
  height: 170px;
}
.dataimg {
  min-height: 170px;
}
.token-feedback {
  color: green;
}
#close-btn-modal a:hover {
  color: #FFF;
}
</style>
