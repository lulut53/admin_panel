<template>
    <div>
        <base-header class="pb-6" type="">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Otomatis</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                  <ol class="breadcrumb breadcrumb-links">
                  <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
                  <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
                  <li class="breadcrumb-item active" aria-current="page">Inbox - Otomatis</li>
                  </ol>
              </nav>
            </div>
            <div class="col-lg-6 pt-2 text-right">
              <base-button size="xl" type="success" @click="showLinkOnesignal">Lihat Pesan Otomatis</base-button>
            </div>
              <!-- <div class="col-lg-6 pt-2 text-right" v-if="isShow && !isError">
              <date-range-picker
                  v-model="datePicked"
                  ref="picker"
                  :locale-data="locale"
                  :opens="opens" class="pr-2">
              </date-range-picker>
              <base-button class="btn btn-xl mr-4" type="secondary" @click="dateRangeClear">
                  <span class="hidden-sm-down">Clear Date</span>
              </base-button>
              <base-button class="btn btn-xl" type="success" @click="downloadExcel" v-if="!isHideDownloadBtn">
                  <i class="ni ni-cloud-download-95" aria-hidden="true"></i>
                  <span class="hidden-sm-down">Download Excel</span>
              </base-button>
            </div> -->
          </div>
        </base-header>

        <div class="container-fluid mt--6">
          <div>
            <div class="card">
              <div class="card-body">
                <tabs tabNavClasses="nav-fill flex-column flex-sm-row nav-wrapper" tabContentClasses="card shadow">
                  <tab-pane id="axi">
                      <span slot="title">
                          AXI
                      </span>
                      <el-table
                      :data="axi"
                      header-row-class-name="thead-light"
                      class="table-responsive table-flush">
                        <el-table-column label="No." min-width="100" prop="no" sortable>
                        </el-table-column>
                        <el-table-column label="Status" min-width="150" prop="status" sortable>
                        </el-table-column>
                        <el-table-column label="Notif Name" min-width="200px" prop="notif_name" sortable>
                        </el-table-column>
                        <el-table-column label="Objective" min-width="300px" prop="objective" sortable>
                        </el-table-column>
                        <el-table-column label="Trigger" min-width="300px" prop="trigger" sortable>
                        </el-table-column>
                        <el-table-column label="Konten" min-width="350px" prop="konten" sortable>
                        </el-table-column>
                      </el-table>
                  </tab-pane>
                  <tab-pane id="nasabah">
                      <span slot="title">
                          <!-- <i class="ni ni-cloud-upload-96"></i> -->
                          Nasabah
                      </span>
                      <el-table
                      :data="nasabah"
                      header-row-class-name="thead-light"
                      class="table-responsive table-flush">
                        <el-table-column label="No." min-width="100" prop="no" sortable>
                        </el-table-column>
                        <el-table-column label="Status" min-width="150" prop="status" sortable>
                        </el-table-column>
                        <el-table-column label="Notif Name" min-width="200px" prop="notif_name" sortable>
                        </el-table-column>
                        <el-table-column label="Objective" min-width="300px" prop="objective" sortable>
                        </el-table-column>
                        <el-table-column label="Trigger" min-width="300px" prop="trigger" sortable>
                        </el-table-column>
                        <el-table-column label="Konten" min-width="350px" prop="konten" sortable>
                        </el-table-column>
                      </el-table>
                  </tab-pane>
                  <tab-pane id="sh">
                      <span slot="title">
                          <!-- <i class="ni ni-cloud-upload-96"></i> -->
                          SH
                      </span>
                      <el-table
                      :data="sh"
                      header-row-class-name="thead-light"
                      class="table-responsive table-flush">
                        <el-table-column label="No." min-width="100" prop="no" sortable>
                        </el-table-column>
                        <el-table-column label="Status" min-width="150" prop="status" sortable>
                        </el-table-column>
                        <el-table-column label="Notif Name" min-width="200px" prop="notif_name" sortable>
                        </el-table-column>
                        <el-table-column label="Objective" min-width="300px" prop="objective" sortable>
                        </el-table-column>
                        <el-table-column label="Trigger" min-width="300px" prop="trigger" sortable>
                        </el-table-column>
                        <el-table-column label="Konten" min-width="350px" prop="konten" sortable>
                        </el-table-column>
                      </el-table>
                  </tab-pane>
                  <!-- <tab-pane id="sm">
                      <span slot="title">
                          SM
                      </span>
                      <el-table
                      :data="sm"
                      header-row-class-name="thead-light"
                      class="table-responsive table-flush">
                        <el-table-column label="No." min-width="100" prop="no" sortable>
                        </el-table-column>
                        <el-table-column label="Status" min-width="150" prop="status" sortable>
                        </el-table-column>
                        <el-table-column label="Notif Name" min-width="200px" prop="notif_name" sortable>
                        </el-table-column>
                        <el-table-column label="Objective" min-width="300px" prop="objective" sortable>
                        </el-table-column>
                        <el-table-column label="Trigger" min-width="300px" prop="trigger" sortable>
                        </el-table-column>
                        <el-table-column label="Konten" min-width="350px" prop="konten" sortable>
                        </el-table-column>
                      </el-table>
                  </tab-pane> -->
                </tabs>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import { Table, TableColumn, TabPane } from 'element-ui';
  import Tab from "@/components/Tabs/Tab";
  import Tabs from "@/components/Tabs/Tabs";
  import swal from 'sweetalert2';
  import { mapActions } from 'vuex'
  import { HalfCircleSpinner } from 'epic-spinners'

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    // [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Tab.name]: Tab,
    Tabs,
    HalfCircleSpinner,
  },
  data() {
    return {
      axi: [
        {
          no: "1",
          status: "Claim point reward",
          notif_name: "Claim your business Reward!",
          objective: "Untuk memberitahu AXI bahwa periode claim business reward sudah dibuka",
          trigger: "Admin ubah status di admin panel bahwa business reward sedang active",
          konten: "Penukaran business reward Semester 1/2 tahun 20xx sudah dibuka dengan Periode bulan s/d bulan 20xx. Pastikan poin reward Anda cukup dan tukarkan dengan barang-barang yang menarik di Katalog Reward 20xx."
        },
        {
          no: "2",
          status: "Claim point reward",
          notif_name: "Reward Claimed",
          objective: "Untuk memberitahu AXI bahwa poin rewardnya berhasil ditukarkan dan sedang diproses, serta memberitahu sisa poinnya, informasi klaim: barang, tanggal pengiriman, alamat.",
          trigger: "AXI menukarkan point reward dengan produk (barang) sesuai katalog yang tersedia",
          konten: "Selamat Anda berhasil menukarkan poin sebesar (jumlah poin) dengan (nama barang). Sisa poin Anda saat ini adalah (sisa poin)"
        },
        {
          no: "3",
          status: "Claim point reward",
          notif_name: "Reward Tracking",
          objective: "Untuk memberitahu AXI no resi barang yang diklaim dan bisa dicek di web",
          trigger: "Admin upload no resi barang yang sudah diproses",
          konten: "Reward yang Anda klaim sedang diproses. SIlahkan cek status pengiriman di (nama ekspedisi) dengan nomor resi (nomor resi barang)"
        },
        {
          no: "4",
          status: "Claim point reward",
          notif_name: "Reward Tracking",
          objective: "Untuk memberitahu AXI bahwa barang yang diklaim sudah tiba di cabang, dan meminta konfirmasi dari AXI",
          trigger: "Admin upload list barang yang sudah sampai di cabang, dan konfirmasi bahwa AXI sudah menerima barang",
          konten: "Selamat. Reward anda sudah tiba di cabang. Silahkan sesuaikan alamat klaim anda dan mohon dikonfirmasikan penerimaan reward anda. Terima kasih."
        },
        {
          no: "5",
          status: "Claim point reward",
          notif_name: "Claim rejected",
          objective: "Untuk memberitahu AXI bahwa poin yang ingin ditukarkan tidak cukup",
          trigger: "AXI menukarkan point reward dengan produk (barang) sesuai katalog yang tersedia",
          konten: "Mohon maaf, barang yang anda klaim sudah tidak tersedia. Silahkan tukarkan poin anda dengan barang lain. Terima kasih"
        },
        {
          no: "6",
          status: "Birthday Notification",
          notif_name: "Birthday",
          objective: "Memberitahu saat sedang ulang tahun",
          trigger: "Tanggal Lahir",
          konten: "Selamat Ulang Tahun (Nama AXI)."
        },
        {
          no: "7",
          status: "AXI Expired ID",
          notif_name: "Reminder 1 AXI ID",
          objective: "Menginformasikan tagihan pertama AXI ID",
          trigger: "Notifikasi dikirim -30 dari tanggal pendaftarannya",
          konten: "Anda sudah mendekati jatuh tempo masa aktif keanggotaan. Silahkan bayar keanggotaan AXI sebesar Rp 120.000 melalui Virtual Account (VA) anda. Abaikan jika sudah membayar."
        },
        {
          no: "8",
          status: "Update Poin AXI",
          notif_name: "Update Poin",
          objective: "Menginformasikan user saat poin sudah di import",
          trigger: "Import Poin & Incentive",
          konten: "Selamat [jenis poin] sudah menjadi [nilai poin]"
        },
      ],
      sh: [
        {
          no: "1",
          status: "Claim point reward",
          notif_name: "Reward Tracking",
          objective: "Untuk memberitahu CRH bahwa reward AXI sudah tiba di cabang dan menunggu konfirmasi dari CRH sudah/belum diterima AXI",
          trigger: "Admin upload list barang yang sudah sampai di cabang, dan konfirmasi dari CRH bahwa AXI sudah menerima barang",
          konten: "Reward AXI sudah tiba di cabang. Silahkan konfirmasi dengan AXI yang menerima reward tersebut dan PIC HO Reward (Siti Nuraeni)."
        },
        {
          no: "2",
          status: "Update Poin SH",
          notif_name: "Update Poin",
          objective: "Menginformasikan user saat poin sudah di import",
          trigger: "Poin SH",
          konten: "Poin [jenis poin] AXI anda sudah diperbaharui. Silahkan periksa poin dan pantau performa AXI anda."
        },
      ],
      nasabah: [
        {
          no: "1",
          status: "Birthday Notification",
          notif_name: "Birthday",
          objective: "Memberitahu saat sedang ulang tahun",
          trigger: "Tanggal Lahir",
          konten: "Selamat Ulang Tahun (Nama nasabah)."
        }
      ],
      sm: [
        {
          no: "1",
          status: "Claim point reward",
          notif_name: "Reward Tracking",
          objective: "Untuk memberitahu CRH bahwa reward AXI sudah tiba di cabang dan menunggu konfirmasi dari CRH sudah/belum diterima AXI",
          trigger: "Admin upload list barang yang sudah sampai di cabang, dan konfirmasi dari CRH bahwa AXI sudah menerima barang",
          konten: "Reward AXI sudah tiba di cabang. Silahkan konfirmasi dengan AXI yang menerima reward tersebut dan PIC HO Reward (Siti Nuraeni)."
        },
      ],
      isLoading: true,
      isError: false,
      isShow: false,
    }
  },
  methods: {
    ...mapActions('auth', [
      'checkAuth',
      'refreshToken',
    ]),
    async permissionAuth() {
      this.isLoading = true
      this.isShow = false

      if (!window.localStorage.getItem('access_token')) {
        swal.fire({
          type: 'error',
          title: 'Unauthenticated',
          text: 'Silahkan untuk login kembali',
          timer: 2500,
        })

        this.$router.push('/login')
      } else {
        let res = await this.checkAuth();
        if (res.name == 'Error' && res.response.status == 401) {
          window.localStorage.removeItem('access_token')
          window.localStorage.removeItem('refresh_token')
          window.localStorage.removeItem('role')
          window.localStorage.removeItem('user')

          swal.fire({
            type: 'error',
            title: 'Unauthenticated',
            text: 'Silahkan untuk login kembali',
            timer: 2500,
          })

          this.$router.push('/login')
        }
      }
      this.checkPermission()
    },
    checkPermission() {
      if (window.localStorage.getItem('role') != "Super Admin") {
        swal("Error", "Role anda tidak memiliki akses untuk melihat halaman ini", "error")
        this.$router.push('/administrator/dashboard')
      }
    },
    showLinkOnesignal() {
      swal({
        title: "Masuk ke OneSignal",
        html:
          'Untuk melihat pesan otomatis yang sudah terkirim atau data lain nya, silakan masuk ke akun onesignal yang bisa diakses dengan informasi sebagai berikut:<br><br>' +
          'Link: <a href="https://onesignal.com/login" target="blank">onesignal.com/login</a><br>Email: dicicilaja@gmail.com<br>Password: Adminadira2017 ',
        type: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: 'Tutup',
        reverseButtons: true
      })
    }
  },
  created() {
    this.permissionAuth()
  }
}
</script>
<style>
  .no-border-card .card-footer{
    border-top: 0;
  }
  .el-table .cell {
    word-break: break-word;
  }
</style>

