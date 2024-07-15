<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Setting Banner</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Settings</li>
              <li class="breadcrumb-item" aria-current="page">Banner</li>
            </ol>
          </nav>
        </div>
      </div>


    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">

      <div class="row-md-12">
          <div class="card border-0">
            <div class="card-header">
              <h2 class="h2 card-title text-default mb-0">Ubah Detail Halaman</h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="list-group list-group-flush">

                    <router-link to="/administrator/settings/banner/beranda" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">1. Halaman Beranda</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <router-link to="/administrator/settings/banner/profil" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">2. Halaman Profil</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <router-link to="/administrator/settings/banner/produk-pembiayaan" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">3. Halaman Produk Pembiayaan</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <router-link to="/administrator/settings/banner/simulasi-cicilan" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">4. Halaman Simulasi Cicilan</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>

                  </div>
                </div>
                <div class="col-md-6">
                  <div class="list-group list-group-flush">

                    <router-link to="/administrator/settings/banner/mitra-bisnis" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">5. Halaman Mitra Bisnis</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <router-link to="/administrator/settings/banner/axi" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">6. Halaman AXI</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <router-link to="/administrator/settings/banner/gudang-info" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">7. Halaman Gudang Info</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>

                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>


      <div class="row-md-12">
          <div class="card border-0">
            <div class="card-header">
              <h2 class="h2 card-title text-default mb-0">Ubah Banner Halaman</h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="list-group list-group-flush">

                    <router-link to="/administrator/settings/banner/1" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">1. Banner Dana Tunai (Landscape)</h4>
                                    </div>
                                </div>
                                <p class="text-xs mb-0">Banner ini tampil di halaman Beranda</p>
                            </div>
                        </div>
                    </router-link>

                     <router-link to="/administrator/settings/banner/2" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">2. Banner Menjadi Mitra Bisnis (Landscape)</h4>
                                    </div>
                                </div>
                                <p class="text-xs mb-0">Banner ini tampil di halaman Beranda dan Profil</p>
                            </div>
                        </div>
                    </router-link>



                  </div>
                </div>
                <div class="col-md-6">
                  <div class="list-group list-group-flush">

                     <router-link to="/administrator/settings/banner/3" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">3. Banner Dana Tunai (Potrait)</h4>
                                    </div>
                                </div>
                                <p class="text-xs mb-0">Banner ini tampil di halaman Gudang Info dan Detail Gudang Info</p>
                            </div>
                        </div>
                    </router-link>

                     <router-link to="/administrator/settings/banner/4" class="list-group-item list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col ml--2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 class="mb-0 text-sm">4. Banner Menjadi Mitra Bisnis (Potrait)</h4>
                                    </div>
                                </div>
                                <p class="text-xs mb-0">Banner ini tampil di halaman Gudang Info dan Detail Gudang Info</p>
                            </div>
                        </div>
                    </router-link>

                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>


    </div>



  </div>
</template>
<script>
  // Components
  import BaseHeader from '@/components/BaseHeader';
  import BaseProgress from '@/components/BaseProgress';
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';

  export default {
    components: {
      BaseHeader,
      BaseProgress,
      RouteBreadCrumb,
    },
    data() {
      return {

      };
    }
  };
</script>
<style></style>
