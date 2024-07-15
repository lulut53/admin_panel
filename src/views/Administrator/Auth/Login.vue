<template>
  <div>
    <transition name="fade" mode="out-in">
      <div key="2" v-if="isShow">
        <!-- Header -->
        <div class="header py-5">
          <div class="container">
            <div class="header-body text-center mb-8">
              <div class="row justify-content-center">
                <div class="">
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
                  <div class="text-center mt-2 mb-4">Masuk</div>
                  <ValidationObserver>
                    <form @submit.prevent="doLogin">
                      <ValidationProvider
                        name="E-mail"
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <base-input
                          alternative
                          class="mb-3"
                          prepend-icon="ni ni-email-83"
                          placeholder="Username"
                          v-model="model.email"
                          required
                        >
                        </base-input>
                        <div class="mt-2 text-center">
                          <span class="error">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <br />
                      <ValidationProvider
                        name="Password"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <base-input
                          alternative
                          class="mb-3"
                          prepend-icon="ni ni-lock-circle-open"
                          type="password"
                          placeholder="Kata Sandi"
                          v-model="model.password"
                          required
                        >
                        </base-input>
                        <div class="mb-4 text-center">
                          <span class="error">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>

                      <!-- <base-checkbox v-model="model.remember_me">Ingat Saya</base-checkbox> -->
                      <div class="text-center">
                        <button type="submit" class="btn btn-warning">
                          Masuk
                        </button>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-6">
                  <p class="mb-0">Lupa Kata Sandi?</p>
                  <router-link to="/forgot-password" class=""
                    ><small>Buat Kata Sandi Baru</small></router-link
                  >
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
      </template> -->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
      <!-- <center> -->
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
        />
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
  localize,
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
    ValidationProvider,
  },
  data() {
    return {
      model: {
        email: "",
        password: "",
        remember_me: true,
      },
      imgUrl: "/images/logo-color.png",
      isLoading: false,
      isShow: true,
    };
  },
  computed: {
    ...mapGetters("auth", ["profile"]),
  },
  methods: {
    ...mapActions("auth", ["login", "getProfile"]),
    async doLogin() {
      this.isLoading = true;

      let res = await this.login(this.model);
      if (res.name != "Error") {
        if (
          res.data.attributes.role == "Super Admin" ||
          res.data.attributes.role == "Mitra MAXI" ||
          res.data.attributes.role == "Tasya Area" ||
          res.data.attributes.role == "Reporting SPDM" ||
          res.data.attributes.role == "Reporting Telecenter"
        ) {
          window.localStorage.setItem(
            "access_token",
            res.data.attributes.access_token
          );
          window.localStorage.setItem(
            "refresh_token",
            res.data.attributes.refresh_token
          );
          window.localStorage.setItem("role", res.data.attributes.role);

          let resProf = await this.getProfile(res.data.id);

          window.localStorage.setItem(
            "user",
            resProf.name != "Error" ? JSON.stringify(this.profile[0]) : "-"
          );

          swal.fire({
            type: "success",
            title: "Login berhasil!",
            timer: 1500,
          });

          if (
            res.data.attributes.role == "Super Admin" ||
            res.data.attributes.role == "Reporting SPDM" ||
            res.data.attributes.role == "Reporting Telecenter"
          ) {
            this.$router.push("/administrator/dashboard");
          } else if (res.data.attributes.role == "Mitra MAXI") {
            this.$router.push("/administrator/maxi/produk-saya");
          } else {
            this.$router.push("/administrator/products/maxi-travel");
          }
        } else {
          this.isLoading = false;
          swal(
            "Error",
            "Role anda tidak memiliki akses untuk melihat Admin Panel",
            "error"
          );
        }
      } else {
        this.isLoading = false;
        if (res.response.data.message != null)
          swal("Error", res.response.data.message, "error");
        else
          swal("Error", "Terjadi kesalahan. Mohon coba sesaat lagi.", "error");
      }
    },
  },
  created() {
    this.isLoading = true;
    this.isShow = false;

    if (window.localStorage.getItem("access_token")) {
      this.$router.push("/administrator/dashboard");
    } else {
      this.isLoading = false;
      this.isShow = true;
    }
  },
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
