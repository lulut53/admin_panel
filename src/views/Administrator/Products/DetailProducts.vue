<template>

  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Detail Pengajuan Produk</h6>
          <!-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Products</li>
              <li class="breadcrumb-item active" aria-current="page">{nama produk}</li>
            </ol>
          </nav> -->
        </div>
          <div class="col-lg-6 pt-2 text-right">
            <router-link to="" class="btn  btn-info">
              <i class="fa fa-edit" aria-hidden="true"></i>
              <span class="hidden-sm-down">Ubah Status</span>
            </router-link>
          </div>
      </div>


    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6 small">
      <card>

        <div class="row">
          <div class="col-6">
            <p class="font-weight-bold">Informasi Program</p>
          </div>
          <div class="col-6 pb-3 text-right">
            <router-link to="" class="btn  btn-success">
              <i class="fa fa-edit" aria-hidden="true"></i>
              <span class="hidden-sm-down">Edit Produk</span>
            </router-link></div>
        </div>


                            <card>
                            <div class="row">
                              <div class="col-2">
                                <p>Nama Program </p>
                              </div>
                              <div class="col-0">
                                <p>:</p>
                              </div>
                              <div class="col-9">
                                 <p>Darwis Triadi Paket Intermediate Photography</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-2">
                                <p>Kategori Produk</p>
                              </div>
                              <div class="col-0">
                                <p>:</p>
                              </div>
                              <div class="col-9">
                                <p>MAXI Edukasi</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-2">
                                <p>Harga</p>
                              </div>
                              <div class="col-0">
                                <p>:</p>
                              </div>
                              <div class="col-9">
                                <p>Rp. 5.000.000</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-2">
                                <p>Deskripsi Singkat</p>
                              </div>
                              <div class="col-0">
                                <p>:</p>
                              </div>
                              <div class="col-9">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unkn</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-2">
                                <p>Deskripsi</p>
                              </div>
                              <div class="col-0">
                                <p>:</p>
                              </div>
                              <div class="col-9">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-2">
                                <p>Brosur</p>

                              </div>
                              <div class="col-0">
                                <p>:</p>
                              </div>
                              <div class="col-9">
                                <p><button class="btn btn-sm btn-orange">Download</button></p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-2">
                                <p>Brosur</p>

                              </div>
                              <div class="col-0">
                                <p>:</p>
                              </div>
                              <div class="col-9">
                                <p><img src="https://dummyimage.com/vga" alt="" style="width:50%"></p>

                              </div>
                            </div>
                            <div class="row">
                              <div class="col-2">
                                <p>Dibuat Pada</p>
                              </div>
                              <div class="col-0">
                                <p>:</p>
                              </div>
                              <div class="col-9">
                              <p>22 Mei 2019</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-2">
                                <p>Status Pengajuan</p>
                              </div>
                              <div class="col-0">
                                <p>:</p>
                              </div>
                              <div class="col-9">
                              <p>Disetujui</p>
                              </div>
                            </div>
                            </card>
                    </card>
    </div>

  </div>

</template>

<script>
export default {
  name: "detail_products",
  data() {
    return {
      title: "details"
    };
  }
};
</script>
