<template>
  <div class="card card-profile">
    <div class="row justify-content-center">
      <div class="col-lg-3 order-lg-2">
        <br><br><br><br>
        <div class="card-profile-image">
          <a href="#">
            <img src="/images/default-avatar.jpg" class="rounded-circle" alt = "">
          </a>
        </div>
      </div>
    </div>

<br><br><br>

    <div class="card-body pt-0">
<br>
      <!-- <div class="text-center">
        <h5 class="h3">
          Jessica Jones<span class="font-weight-light">, 27</span>
        </h5>
        <div class="h5 font-weight-300">
          <i class="ni location_pin mr-2"></i>Bucharest, Romania
        </div>
        <div class="h5 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
        </div>
        <div>
          <i class="ni education_hat mr-2"></i>University of Computer Science
        </div>
      </div> -->

      <collapse>
        <collapse-item name="1">
          <h5 slot="title" class="mb-0">Ubah Password</h5>
             <form @submit.prevent="updateProfile">
              <div class="pl-lg-0">
                  <div class="row-lg-6">
                    <base-input
                      type="password"
                      label="Password Lama"
                      placeholder="Username"
                      v-model="user.username"
                    >
                    </base-input>
                  </div>
                  <div class="row-lg-6">
                    <base-input
                      type="password"
                      label="Password Baru"
                      placeholder="Username"
                      v-model="user.username"
                    >
                    </base-input>
                  </div>
                  <div class="row-lg-6">
                    <base-input
                      type="password"
                      label="Ulangi Password Baru"
                      placeholder="Username"
                      v-model="user.username"
                    >
                    </base-input>
                  </div>
                  <base-button class="btn btn-md btn-orange">
                    <!-- <i class="ni ni-folder-17" aria-hidden="true"></i> -->
                    <!-- <span class="hidden-sm-down">Semua Pengajuan</span> -->
                    Simpan
                  </base-button>
              </div>
            </form>

        </collapse-item>
      </collapse>
      <collapse>
        <collapse-item name="1">
          <h5 slot="title" class="mb-0">Ubah Foto</h5>
             <form @submit.prevent="updateProfile">
              <div class="pl-lg-0">
                  <div class="row-lg-6">
                    <file-input class="form-group"></file-input>
                  </div>
                  <br>
                  <base-button type="primary">
                    <!-- <i class="ni ni-folder-17" aria-hidden="true"></i> -->
                    <!-- <span class="hidden-sm-down">Semua Pengajuan</span> -->
                    Simpan
                  </base-button>
              </div>
            </form>

        </collapse-item>
      </collapse>
    </div>
  </div>
</template>
<script>
import Collapse from '@/components/Collapse/Collapse'
import CollapseItem from '@/components/Collapse/CollapseItem'


export default {
  components: {
    Collapse,
    CollapseItem,

  },
  data() {
    return {
      user: {
        nama: 'michael23',
        email: '',
        address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
        no_hp: 'New York',
        area: 'USA',
        cabang: 'USA',
        role: 'USA',
      }
    };
  },
};
</script>
<style></style>
