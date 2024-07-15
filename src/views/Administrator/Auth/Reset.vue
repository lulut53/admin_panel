<template>
  <div>
    <transition name="fade" mode="out-in">
      <div key="2" v-if="isShow">
        <!-- Header -->
        <div class="header py-5">
          <div class="container">
            <div class="header-body text-center mb-8">
              <div class="row justify-content-center">
                <div class>
                  <img v-bind:src="imgUrl" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Page content -->
        <div class="container-fluid mt--8 pb-1">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
              <div class="card bg-secondary border-0 mb-0">
                <div class="card-header bg-transparent pb-4">
                  <div class="text-center mt-2 mb-4">Reset Password Anda</div>
                  <ValidationObserver ref="formObserverReset" v-slot="{ invalid, passes }" >
                    <form @submit.prevent="submitReset">
                      <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
                        <base-input
                          id="email"
                          name="email"
                          alternative
                          class="mb-3"
                          prepend-icon="ni ni-email-83"
                          placeholder="Username"
                          v-model="model.email"
                          disabled
                          required
                        ></base-input>
                        <div class="mt-2 text-center">
                          <span class="error">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        :rules="{
                            required: true,
                            min:6
                        }"
                        name="Password" 
                        vid="password" 
                        v-slot="{ errors }"
                      >
                        <base-input
                          id="password"
                          name="password"
                          alternative
                          class="mb-4"
                          prepend-icon="ni ni-lock-circle-open"
                          type="password"
                          placeholder="Kata Sandi"
                          v-model="model.password"
                          required
                        ></base-input>
                        <div class="mb-3 mt--3 text-center">
                          <span class="error">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        :rules="'required|confirmed:password'"
                        name="Password Confirmation"
                        v-slot="{ errors , failedRules }"
                      >
                        <base-input
                          id="password_confirmation"
                          name="password_confirmation"
                          alternative
                          class="mb-4"
                          prepend-icon="ni ni-lock-circle-open"
                          type="password"
                          placeholder="Kata Sandi Konfirmasi"
                          v-model="model.password_confirmation"
                          data-vv-as="password"
                          required
                        ></base-input>
                        <div class="mb-4 mt--3 text-center">
                          <span class="error" v-if="failedRules.confirmed">Konfirmasi Kata Sandi tidak sesuai</span>
                          <span class="error" v-else>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>

                      <!-- <base-checkbox v-model="model.remember_me">Ingat Saya</base-checkbox> -->
                      <div class="text-center">
                        <button type="submit" class="btn btn-warning">Ubah Kata Sandi</button>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-6">
                  <p class="mb-0">
                    Kembali ke halaman
                    <router-link to="/login" class>
                      Login
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <modal :show.sync="isLoading" :clickToClose="false">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template>-->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
      <br />
      <!-- <center> -->
        <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
      </div>
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
import { mapActions, mapGetters } from "vuex";
import swal from "sweetalert2";
import { HalfCircleSpinner } from "epic-spinners";

for (var rule in Rules) {
  extend(rule, Rules[rule]);
}

localize("id", id);

export default {
  components: {
    HalfCircleSpinner,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      model: {
        token: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      imgUrl: "/images/logo-color.png",
      isLoading: false,
      isShow: true
    };
  },
  computed: {
    ...mapGetters("auth", ["profile"])
  },
  methods: {
    ...mapActions("auth", ["login", "getProfile", "postResetPassword"]),
    async submitReset() {
      let valid = await this.$refs.formObserverReset.validate();
      if (valid) {
        this.isLoading = true;

        try {
          const response = await this.postResetPassword(this.model);
          this.isLoading = false;
          if (response.status == 200) {
            swal({
              title: "Sukses",
              text: "Password Anda berhasil diubah",
              type: "success"
            }).then(() => {
              window.location.href = "/login";
            });
          }
          else {
            swal({
              title: "Gagal",
              text: "Password Anda gagal diubah, silakan coba lagi",
              type: "error"
            });
          }
        } catch (error) {
          this.isLoading = false;
          swal({
            title: "Gagal",
            text: "Password Anda gagal diubah, silakan coba lagi",
            type: "error"
          });
        }
      }
      this.submitted = false;
    },
    tokenCheck() {
      this.model.token = this.$route.params.token;
      this.model.email = this.$route.query.email;
    },
    dismissLoading() {
      this.isLoading = false;
      this.isShow = true;
    }
  },
  created() {
    this.isLoading = true;
    this.isShow = false;
    this.tokenCheck();
    this.dismissLoading();
  }
};
</script>
<style>
.main-wrapper {
  height: 100vh;
}
span .error {
  color: red;
  font-size: 12px;
}
</style>