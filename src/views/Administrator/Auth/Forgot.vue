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
                  <img v-bind:src="imgUrl" alt="">
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
                  <div class="text-center mt-2 mb-4">Forgot Password</div>
                  <ValidationObserver>
                    <form @submit.prevent="resetPass">
                      <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
                        <base-input alternative
                                    class="mb-3"
                                    prepend-icon="ni ni-email-83"
                                    placeholder="Masukkan Email Anda"
                                    v-model="emailReset" required>
                        </base-input>
                        <div class="mt-2 text-center">
                          <span class="error">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <br/>

                      <div class="text-center">
                        <button type="submit" class="btn btn-warning" @click="resetPass">Submit</button>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <router-link to="/login" class="text-center">Kembali ke halaman Login</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <modal :show.sync="isLoading" :clickToClose="false">
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
  import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
  import id from 'vee-validate/dist/locale/id.json'
  import * as Rules from 'vee-validate/dist/rules'
  import { mapActions, mapGetters } from 'vuex';
  import swal from 'sweetalert2';
  import { HalfCircleSpinner } from 'epic-spinners'

  for (var rule in Rules) {
    extend(rule, Rules[rule])
  }

  localize('id', id)

  export default {
    components: {
      HalfCircleSpinner,
      ValidationObserver,
      ValidationProvider
    },
    data() {
      return {
        imgUrl: '/images/logo-color.png',
        isLoading: false,
        isShow: true,
        emailReset: ""
      };
    },
    computed: {
      ...mapGetters('auth', ['profile']),
    },
    methods: {
      ...mapActions('auth', [
        'login',
        'getProfile',
        'resetPassword'
      ]),
      async resetPass() {
        const that = this
        swal({
          title: 'Apakah anda yakin untuk reset password ?',
          text: "Anda akan dikirimkan e-mail untuk mendapatkan link reset password",
          type: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
          cancelButtonText: 'Batal',
          reverseButtons: true
        })
        .then(async (result) => {
          if (result.value) {
            that.isLoading = true

            let res = await that.resetPassword(that.emailReset)
            if (res.name != 'Error') {
              that.isLoading = false
              that.emailReset = ""
              swal.fire('Email reset password telah terkirim!', '', 'success')
            } else {
              that.isLoading = false
              swal.fire('Email reset password gagal dikirim', res.response.data.errors.email[0], 'error')
            }
          }
        });
      },
    },
    created() {
      this.isLoading = true
      this.isShow = false

      if (window.localStorage.getItem('access_token')) {
        this.$router.push('/administrator/dashboard') 
      } else {
        this.isLoading = false
        this.isShow = true
      }
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