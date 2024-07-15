<template>
  <div class="wrapper">
    <transition name="fade" mode="out-in">
      <div key="2" v-if="isShow">
        <notifications></notifications>
        <side-bar>
          <template slot="links">
            <template v-if="this.role == 'Super Admin'">
              <sidebar-item
                :link="{
                  name: 'Dashboard',
                  icon: 'fas fa-tachometer-alt text-primary',
                  path: '/administrator/dashboard',
                }"
              ></sidebar-item>

              <!-- <hr class="my-2">
              <h6 class="navbar-heading p-0 pl-2 text-muted">Menu External</h6>-->

              <hr class="my-2" />
              <h6 class="navbar-heading p-0 pl-2 text-muted">Menu Internal</h6>

              <!-- Pengajuan Cicilan -->
              <sidebar-item
                :link="{
                  name: 'Pengajuan Cicilan',
                  icon: 'fa fa-cart-arrow-down text-primary',
                  path: '/administrator/requests',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'List Order Pengajuan',
                    path: '/administrator/requests/listorder',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Status Order',
                    path: '/administrator/requests/statusorder',
                  }"
                />
                <!-- <sidebar-item
                  :link="{
                  name: 'List Pengajuan Cicilan',
                  path: '/administrator/requests'
                  }"
                />-->
                <!-- <sidebar-item
                :link="{
                  name: 'Tugas Saya',
                  path: '/administrator/requests/task'
                }"/>-->
              </sidebar-item>

              <!-- AXI -->
              <sidebar-item
                :link="{
                  name: 'AXI',
                  icon: 'fa fa-running text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Semua Data AXI',
                    path: '/administrator/axi/list',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Pendaftaran AXI',
                    path: '/administrator/axi/pendaftaran',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Manual Reprocess SAP',
                    path: '/administrator/axi/listreprocess',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Import Data',
                    path: '/administrator/axi/import',
                  }"
                />
              </sidebar-item>
              <sidebar-item
                :link="{
                  name: 'EPKS',
                  icon: 'fa fa-file-signature text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Verifikasi Data E-PKS',
                    path: '/administrator/axi/pendaftaran-epks',
                  }"
                />
              </sidebar-item>
            </template>

            <!-- KHUSUS MAXI!!! -->
            <template v-if="this.role == 'Mitra MAXI'">
              <!-- MAXI -->
              <sidebar-item
                :link="{
                  name: 'Produk Saya',
                  icon: 'fas fa-th text-primary',
                  path: '/administrator/maxi/produk-saya',
                }"
              ></sidebar-item>
              <!-- MAXI -->
              <sidebar-item
                :link="{
                  name: 'Profile MAXI',
                  icon: 'fas fa-users text-primary',
                  path: '/administrator/maxi/profile',
                }"
              ></sidebar-item>
            </template>

            <template
              v-if="this.role == 'Super Admin' || this.role == 'Tasya Area'"
            >
              <!-- MAXI -->
              <sidebar-item
                :link="{
                  name: 'MAXI',
                  icon: 'far fa-handshake text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Semua Data MAXI',
                    path: '/administrator/maxi/list',
                  }"
                />
                <!-- <sidebar-item
                    :link="{
                      name: 'Profile',
                      path: '/administrator/maxi/profile'
                }"/>-->
                <sidebar-item
                  :link="{
                    name: 'Pendaftaran MAXI',
                    path: '/administrator/maxi/pendaftaran',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Pengajuan Produk',
                    path: '/administrator/maxi/pengajuan',
                  }"
                />
              </sidebar-item>
            </template>

            <template
              v-if="this.role == 'Super Admin' || this.role == 'Tasya Area'"
            >
              <!-- Produk -->
              <sidebar-item
                :link="{
                  name: 'Produk',
                  icon: 'fas fa-cubes text-primary',
                }"
              >
                <!-- <sidebar-item
                :link="{
                  name: 'Dana Multiguna',
                  icon: 'ni ni-ungroup text-primary',
                  path: '/administrator/products/1/dana-multiguna'
                }"/>-->
                <sidebar-item
                  :link="{
                    name: 'MAXI Travel',
                    icon: 'ni ni-ungroup text-primary',
                    path: '/administrator/products/maxi-travel',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'MAXI Edukasi',
                    icon: 'ni ni-ungroup text-primary',
                    path: '/administrator/products/maxi-edukasi',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'MAXI Usaha',
                    icon: 'ni ni-ungroup text-primary',
                    path: '/administrator/products/maxi-usaha',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'MAXI Sehat',
                    icon: 'ni ni-ungroup text-primary',
                    path: '/administrator/products/maxi-sehat',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'MAXI Griya',
                    icon: 'ni ni-ungroup text-primary',
                    path: '/administrator/products/maxi-griya',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'MAXI Extraguna',
                    icon: 'ni ni-ungroup text-primary',
                    path: '/administrator/products/maxi-extraguna',
                  }"
                />
              </sidebar-item>
            </template>

            <template v-if="this.role == 'Super Admin'">
              <!-- Konten -->
              <sidebar-item
                :link="{
                  name: 'Konten',
                  icon: 'fas fa-sticky-note text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Artikel dan Berita',
                    path: '/administrator/contents/news',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Materi AXI',
                    path: '/administrator/contents/axi',
                  }"
                />
                <!-- <sidebar-item
                  :link="{
                    name: 'Notifikasi',
                    path: '/administrator/contents/notification'
                }"/>-->
                <sidebar-item
                  :link="{
                    name: 'Kategori',
                    path: '/administrator/contents/categories',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Tag Produk',
                    path: '/administrator/contents/tag-products',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Testimoni',
                    path: '/administrator/contents/testimonial',
                  }"
                />
              </sidebar-item>

              <!-- Bussiness Reward -->
              <sidebar-item
                :link="{
                  name: 'Business Reward',
                  icon: 'fas fa-gift text-primary',
                }"
              >
                <!-- <sidebar-item
                  :link="{
                    name: 'Claim Produk',
                    path: '/administrator/business-reward/claim'
                }"/>-->
                <sidebar-item
                  :link="{
                    name: 'Claim Produk',
                    path: '/administrator/business-reward/redeem',
                  }"
                ></sidebar-item>

                <sidebar-item
                  :link="{
                    name: 'Katalog Produk',
                    path: '/administrator/business-reward/catalog',
                  }"
                />
              </sidebar-item>

              <!-- PPOB -->
              <!-- <sidebar-item
                :link="{
                  name: 'PPOB',
                  icon: 'far fa-money-bill-alt text-primary',
                }">
                <sidebar-item
                  :link="{
                    name: 'Pembayaran',
                    path: '/administrator/ppob/pembayaran'
                  }"/>
              </sidebar-item>-->

              <!-- Simulasi -->
              <sidebar-item
                :link="{
                  name: 'Simulasi',
                  icon: 'fas fa-calculator text-primary',
                }"
              >
                <sidebar-item :link="{ name: 'MRP' }">
                  <sidebar-item
                    :link="{
                      name: 'Mobil',
                      path: '/administrator/simulasi/mrp/mobil',
                    }"
                  />
                  <sidebar-item
                    :link="{
                      name: 'Sepeda Motor',
                      path: '/administrator/simulasi/mrp/motor',
                    }"
                  />
                </sidebar-item>

                <sidebar-item :link="{ name: 'RATE' }">
                  <sidebar-item
                    :link="{
                      name: 'Lending Rate Mobil',
                      path: '/administrator/simulasi/rate/lending',
                    }"
                  />
                  <sidebar-item
                    :link="{
                      name: 'Premi Rate Mobil',
                      path: '/administrator/simulasi/rate/premi',
                    }"
                  />
                  <sidebar-item
                    :link="{
                      name: 'Rate Motor',
                      path: '/administrator/simulasi/rate/lending_motor',
                    }"
                  />
                </sidebar-item>
                <sidebar-item :link="{ name: 'Setting Simulasi' }">
                  <sidebar-item
                    :link="{
                      name: 'Mobil Passenger',
                      path: '/administrator/simulasi/settings/mobil_passenger',
                    }"
                  />
                  <sidebar-item
                    :link="{
                      name: 'Mobil Commercial',
                      path: '/administrator/simulasi/settings/mobil_commercial',
                    }"
                  />
                  <sidebar-item
                    :link="{
                      name: 'Sepeda Motor',
                      path: '/administrator/simulasi/settings/motor',
                    }"
                  />
              </sidebar-item>
              <sidebar-item
                  :link="{
                    name: 'Konfigurasi Dokumen',
                    path: '/administrator/simulasi/konfigurasi_dokumen',
                  }"
                />
              </sidebar-item>

              <!-- Bussiness Reward -->
              <sidebar-item
                :link="{
                  name: 'Inform AXI',
                  icon: 'fas fa-suitcase text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Trip Info',
                    path: '/administrator/inform-axi/trip',
                  }"
                ></sidebar-item>

                <sidebar-item
                  :link="{
                    name: 'Gathering Info',
                    path: '/administrator/inform-axi/gathering',
                  }"
                />
              </sidebar-item>

              <sidebar-item
                :link="{
                  name: 'Notifikasi',
                  icon: 'fas fa-inbox text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Popup',
                    path: '/administrator/inbox/listpopup',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Email Reminder',
                    path: '/administrator/inbox/emailreminder',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Inbox',
                  }"
                >
                  <sidebar-item
                    :link="{
                      name: 'Manual',
                      path: '/administrator/inbox/manual',
                    }"
                  />
                  <!-- <sidebar-item
                    :link="{
                      name: 'Automatic',
                      path: '/administrator/inbox/automatic'
                    }"
                  />-->
                </sidebar-item>
              </sidebar-item>

              <!-- Notifikasi -->
              <!-- <sidebar-item
                :link="{
                  name: 'Notifikasi',
                  icon: 'fas fa-bell text-primary',
                  path: '/administrator/notification'
                }">
              </sidebar-item>-->

              <!-- Statistik -->
              <!-- <sidebar-item
                :link="{
                  name: 'Statistik',
                  icon: 'fas fa-chart-bar text-primary',
                  path: '/administrator/statistik'
                }">
              </sidebar-item>-->

              <!-- Users -->
              <sidebar-item
                :link="{
                  name: 'Users',
                  icon: 'fas fa-users text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Calon Nasabah',
                    path: '/administrator/users/calon-nasabah',
                  }"
                />
                <!-- <sidebar-item
                  :link="{
                    name: 'Vendor Business Reward',
                    path: '/administrator/users/vendor'
                }"/>-->
                <sidebar-item
                  :link="{
                    name: 'Internal User',
                    path: '/administrator/users/internal-user',
                  }"
                />
              </sidebar-item>

              <!-- Program -->
              <sidebar-item
                :link="{
                  name: 'Program',
                  icon: 'fa fa-tag text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'List Program API',
                    path: '/administrator/program/partnership-user',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'List Program Webview',
                    path: '/administrator/program/partnership',
                  }"
                />
              </sidebar-item>

              <!-- Reporting -->
              <sidebar-item
                :link="{
                  name: 'Reporting',
                  icon: 'ni ni-single-copy-04 text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Pengajuan',
                    path: '/administrator/reporting/orderbyaxi',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Registrasi AXI',
                    path: '/administrator/reporting/registrasi',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Data All AXI',
                    path: '/administrator/reporting/dataallaxi',
                  }"
                />
              </sidebar-item>
              

              <!-- Pengaturan -->
              <sidebar-item
                :link="{
                  name: 'Pengaturan',
                  icon: 'ni ni-settings-gear-65 text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Banner',
                    path: '/administrator/settings/banner',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Hak Akses',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'Hak Akses',
                    path: '/administrator/settings/user-privilege',
                  }"
                >
                  <!-- <sidebar-item
                  :link="{
                    name: 'Akses User',
                    path: '/administrator/settings/user-privilege'
                  }"/><sidebar-item
                  :link="{
                    name: 'Permission',
                    path: '/administrator/settings/privilege'
                  }"/>-->
                </sidebar-item>
                <!-- <sidebar-item
                  :link="{
                    name: 'Bantuan',
                    path: '/administrator/settings/help'
                }"/>-->
              </sidebar-item>

              <!-- Old Menu -->
              <sidebar-item
                :link="{
                  name: 'Old Menu',
                  icon: 'ni ni-align-left-2 text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'List Pengajuan Cicilan',
                    path: '/administrator/requests',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'List Registrasi AXI',
                    path: '/administrator/axi/pendaftaran/listaxi',
                  }"
                />
              </sidebar-item>
            </template>

            <!-- KHUSUS REPORTING -->
            <template v-if="this.role == 'Reporting SPDM'">
              <sidebar-item
                :link="{
                  name: 'Dashboard',
                  icon: 'fas fa-tachometer-alt text-primary',
                  path: '/administrator/dashboard',
                }"
              >
              </sidebar-item>

              <!-- Pengajuan Cicilan -->
              <sidebar-item
                :link="{
                  name: 'Pengajuan Cicilan',
                  icon: 'fa fa-cart-arrow-down text-primary',
                  path: '/administrator/requests',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Status Order',
                    path: '/administrator/requests/statusorder',
                  }"
                />
              </sidebar-item>

              <!-- Reporting -->
              <sidebar-item
                :link="{
                  name: 'Reporting',
                  icon: 'ni ni-single-copy-04 text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Pengajuan',
                    path: '/administrator/reporting/orderbyaxi',
                  }"
                />
              </sidebar-item>

              <!-- Program -->
              <sidebar-item
                :link="{
                  name: 'Program',
                  icon: 'fa fa-tag text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'List Program API',
                    path: '/administrator/program/partnership-user',
                  }"
                />
                <sidebar-item
                  :link="{
                    name: 'List Program Webview',
                    path: '/administrator/program/partnership',
                  }"
                />
              </sidebar-item>
            </template>

            <!-- Telecenter -->
            <template v-if="this.role == 'Reporting Telecenter'">
              <sidebar-item
                :link="{
                  name: 'Dashboard',
                  icon: 'fas fa-tachometer-alt text-primary',
                  path: '/administrator/dashboard',
                }"
              ></sidebar-item>
              <!-- Pengajuan Cicilan -->
              <sidebar-item
                :link="{
                  name: 'Pengajuan Cicilan',
                  icon: 'fa fa-cart-arrow-down text-primary',
                  path: '/administrator/requests',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'List Order Pengajuan',
                    path: '/administrator/requests/listorder',
                  }"
                />
              </sidebar-item>
              <!-- AXI -->
              <sidebar-item
                :link="{
                  name: 'AXI',
                  icon: 'fa fa-running text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Semua Data AXI',
                    path: '/administrator/axi/list',
                  }"
                />
              </sidebar-item>
              <sidebar-item
                :link="{
                  name: 'Reporting',
                  icon: 'ni ni-single-copy-04 text-primary',
                }"
              >
                <sidebar-item
                  :link="{
                    name: 'Pengajuan',
                    path: '/administrator/reporting/orderbyaxi',
                  }"
                />
              </sidebar-item>
            </template>
          </template>
        </side-bar>
        <div class="main-content">
          <dashboard-navbar></dashboard-navbar>

          <div @click="$sidebar.displaySidebar(false)">
            <fade-transition :duration="200" origin="center top" mode="out-in">
              <!-- your content here -->
              <router-view></router-view>
            </fade-transition>
          </div>
          <content-footer v-if="!$route.meta.hideFooter"></content-footer>
        </div>
      </div>
    </transition>
    <modal :show.sync="isLoading" :clickToClose="false">
      <template v-if="!netErr">
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
      </template>
      <template v-if="netErr">
        <div class="text-center p-5">
          <!-- <center> -->
            <img
              alt="Error Image"
              src="/images/undraw_cancel_u1it.svg"
              height="300px"
              class="img-fluid"
            />
          <!-- </center> -->
          <br />
          <br />
          <!-- <center> -->
            <div style="display: flex; margin-top: 20px !important; justify-content: center;">
            <h1 class="text-center">Koneksi error</h1>
          <!-- </center> -->
            </div>
          <!-- <center> -->
            <h3 class="text-center">Coba cek kembali koneksi anda.</h3>
            <div style="display: flex; margin-top: 30px !important; justify-content: center;">
          <!-- </center> -->
            </div>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
   // new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }

  try {
  new MyConstructor();
} catch (e) {
  /* ... */
}
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { FadeTransition } from "vue2-transitions";
import { mapActions, mapGetters } from "vuex";
import { HalfCircleSpinner } from "epic-spinners";
import swal from "sweetalert2";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition,
    HalfCircleSpinner,
  },
  data() {
    return {
      isLoading: false,
      isShow: false,
      netErr: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["profile"]),
    role() {
      return window.localStorage.getItem("role");
    },
  },
  methods: {
    ...mapActions("auth", ["checkAuth", "refreshToken", "logout"]),
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar("scrollbar-inner");

        docClasses.add("perfect-scrollbar-on");
      } else {
        docClasses.add("perfect-scrollbar-off");
      }
    },
  },
  async created() {
    this.isLoading = true;
    this.isShow = false;

    if (!window.localStorage.getItem("access_token")) {
      swal.fire({
        type: "error",
        title: "Unauthenticated",
        text: "Silahkan untuk login kembali",
        timer: 2500,
      });

      this.$router.push("/login");
    } else {
      let res = await this.checkAuth();
      if (res.message == "Network Error") {
        this.netErr = true;
      } else if (res.name == "Error" && res.response.status == 401) {
        await this.logout();
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        window.localStorage.removeItem("role");
        window.localStorage.removeItem("user");

        swal.fire({
          type: "error",
          title: "Unauthenticated",
          text: "Silahkan untuk login kembali",
          timer: 2500,
        });

        this.$router.push("/login");
      } else {
        this.isLoading = false;
        this.isShow = true;
      }
    }
  },
};
</script>
<style lang="scss"></style>
