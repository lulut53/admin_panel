<template>
  <div>
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
      <!-- <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div> -->
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card bg-secondary border-0">
            <div class="card-header bg-transparent pb-5">
              <div class="text-center mt-2 mb-4">Daftar</div>
            <!-- </div>
            <div class="card-body px-lg-5 py-lg-5"> -->
              <form role="form">
                <base-input alternative
                            class="mb-3"
                            prepend-icon="ni ni-hat-3"
                            placeholder="Nama Lengkap"
                            v-model="model.name">
                </base-input>

                <base-input alternative
                            class="mb-3"
                            prepend-icon="ni ni-email-83"
                            placeholder="Email"
                            v-model="model.email">
                </base-input>

                <base-input alternative
                            class="mb-3"
                            prepend-icon="ni ni-mobile-button"
                            placeholder="Nomor Telepon / Handphone"
                            type="phone"
                            v-model="model.phone">
                </base-input>

                <base-input alternative
                            class="mb-3"
                            prepend-icon="ni ni-lock-circle-open"
                            placeholder="Kata Sandi"
                            type="password"
                            v-model="model.password">
                </base-input>
                <!-- <div class="text-muted font-italic"><small>password strength: <span class="text-success font-weight-700">strong</span></small></div> -->
                <div class="row my-4">
                  <div class="col-12">
                    <base-checkbox v-model="model.agree">
                      <span class="text-muted">Saya setuju dengan <a href="#">Syarat dan Ketentuan</a> yang berlaku</span>
                    </base-checkbox>
                  </div>
                </div>
                <div class="text-center">
                  <button type="button" class="btn btn-warning mt-4">Daftar</button>
                </div>
                <div class="text-center mt-4">
                  <p>Atau kembali ke <router-link to="/login">Halaman Masuk</router-link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'register',
  data() {
    return {
      model: {
        name: '',
        email: '',
        password: '',
        agree: false
      },
      imgUrl: '/images/logo-color.png'
    }
  }
};
</script>
<style></style>
