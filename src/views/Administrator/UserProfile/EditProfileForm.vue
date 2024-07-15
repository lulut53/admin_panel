<template>
  <card>

    <form @submit.prevent="updateProfile">

      <div class="pl-lg-0">
        <div class="row">
          <div class="col-lg-6">
            <base-input
              type="text"
              label="Nama"
              placeholder="Nama"
              v-model="user.nama"
            >
            </base-input>
          </div>
          <div class="col-lg-6">
            <base-input
              type="email"
              label="Email address"
              placeholder="mike@email.com"
              v-model="user.email"
            >
            </base-input>
          </div>
        </div>
      </div>

      <div class="pl-lg-0">
        <div class="row">
          <div class="col-md-12">
            <base-input
              type="text"
              label="Alamat"
              placeholder="Home Address"
              v-model="user.address"
            >
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <base-input
              type="text"
              label="No. HP"
              placeholder="No HP"
              v-model="user.no_hp"
            >
            </base-input>
          </div>
          <div class="col-lg-6">
            <base-input
              type="text"
              label="Jabatan"
              placeholder="Jabatan"
              v-model="user.role"
              disabled
            >
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <base-input
              type="text"
              label="Area"
              placeholder="Area"
              v-model="user.area"
            >
            </base-input>
          </div>
          <div class="col-lg-6">
            <base-input
              type="text"
              label="Cabang"
              placeholder="Cabang"
              v-model="user.cabang"
            >
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <base-button class="btn btn-md btn-orange">
              <!-- <i class="ni ni-folder-17" aria-hidden="true"></i> -->
              <!-- <span class="hidden-sm-down">Semua Pengajuan</span> -->
              Simpan
            </base-button>
          </div>
        </div>
      </div>

    </form>
  </card>
</template>
<script>
export default {
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
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user));
    },
  },
  created() {
    let data = JSON.parse(window.localStorage.getItem('user'))

    this.user.nama = data.attributes.nama
    this.user.email = data.attributes.email
    this.user.address = data.attributes.alamat
    this.user.no_hp = data.attributes.no_hp
    this.user.role = window.localStorage.getItem('role')
  }
};
</script>
<style></style>
