<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Help</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Settings</li>
              <li class="breadcrumb-item" aria-current="page">Help</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 pt-2 text-right">
            <router-link to="" class="btn btn-info">
              <!-- <i class="fa fa-plus" aria-hidden="true"></i> -->
              <span class="hidden-sm-down">Kirim Tiket Support</span>
            </router-link>
        </div>
      </div>


    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">

      <div class="card">
        <div class="card-header">
          <h4>SERING DITANYAKAN</h4>
        </div>
        <collapse :multiple-active="false">
          <collapse-item name="1">
            <h5 slot="title" class="mb-0">Cara Mendaftar AXI</h5>
            <div>
              <p>
                1. Buka Dicicilaja.com/axi/register <br>
                2. Lengkapi Formulir lalu KIRIM <br>
                3. Cek email jika data sudah disetujui <br>
                4. Login menggunakan AXI ID yang dikirimkan ke email, gunakan password "adira" & segera ubah password <br>
              </p>
            </div>
          </collapse-item>
          <collapse-item name="2">
            <h5 slot="title" class="mb-0">Cara Mendaftar MAXI</h5>
            <div>

            </div>
          </collapse-item>
          <collapse-item name="3">
            <h5 slot="title" class="mb-0">Cara Mengganti Password AXI</h5>
            <div>

            </div>
          </collapse-item>
          <collapse-item name="4">
            <h5 slot="title" class="mb-0">AXI Tidak Bisa Login</h5>
            <div>

            </div>
          </collapse-item>
          <collapse-item name="5">
            <h5 slot="title" class="mb-0">Integrasi dengan dicicilaja lewat API</h5>
            <div>

            </div>
          </collapse-item>
        </collapse>
      </div>

      <div class="card">
        <div class="card-header">
          <h4>SERING DITANYAKAN</h4>
        </div>
        <collapse :multiple-active="false">
          <collapse-item name="1">
            <h5 slot="title" class="mb-0">Cara Mendaftar AXI</h5>
            <div>

            </div>
          </collapse-item>
          <collapse-item name="2">
            <h5 slot="title" class="mb-0">Cara Mendaftar MAXI</h5>
            <div>

            </div>
          </collapse-item>
          <collapse-item name="3">
            <h5 slot="title" class="mb-0">Cara Mengganti Password AXI</h5>
            <div>

            </div>
          </collapse-item>
          <collapse-item name="4">
            <h5 slot="title" class="mb-0">AXI Tidak Bisa Login</h5>
            <div>

            </div>
          </collapse-item>
          <collapse-item name="5">
            <h5 slot="title" class="mb-0">Integrasi dengan dicicilaja lewat API</h5>
            <div>

            </div>
          </collapse-item>
        </collapse>
      </div>



    </div>

  </div>
</template>
<script>
  // Components
  import BaseHeader from '@/components/BaseHeader';
  import BaseProgress from '@/components/BaseProgress';
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import Collapse from '@/components/Collapse/Collapse';
  import CollapseItem from '@/components/Collapse/CollapseItem';

  export default {
    components: {
      BaseHeader,
      BaseProgress,
      RouteBreadCrumb,
      Collapse,
      CollapseItem
    },
    data() {
      return {

      };
    }
  };
</script>
<style></style>
