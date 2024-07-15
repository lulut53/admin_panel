<template>
    <div>
        <base-header class="pb-6" type="">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 d-inline-block mb-0">Notifikasi Status</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                  <ol class="breadcrumb breadcrumb-links">
                  <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
                  <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
                  <li class="breadcrumb-item active" aria-current="page">Notifikasi</li>
                  </ol>
              </nav>
              </div>
              <div class="col-lg-6 pt-2 text-right" v-if="isShow && !isError">
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
            </div>
          </div>
        </base-header>

        <div class="container-fluid mt--6">
          <div>
            <el-tabs type="border-card">
              <el-tab-pane label="AXI">AXI</el-tab-pane>
              <el-tab-pane label="MAXI">MAXI</el-tab-pane>
              <el-tab-pane label="NASABAH">
                <el-table 
                  :data="item"
                  header-row-class-name="thead-light"
                  class="table-responsive table-flush">
                  <el-table-column label="Status Order" min-width="70px" prop="status_order">
                  </el-table-column>
                  <el-table-column label="Notif Name" min-width="70px" prop="notif_name">
                  </el-table-column>
                  <el-table-column label="Objective" min-width="120px" prop="objective">
                  </el-table-column>
                  <el-table-column label="Trigger" min-width="120px" prop="trigger">
                  </el-table-column>
                  <el-table-column label="Status Notif" min-width="50px" prop="status_notif">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="TASYA">Tasya</el-tab-pane>
              <el-tab-pane label="SH">SH</el-tab-pane>
              <el-tab-pane label="SO">SO</el-tab-pane>
            </el-tabs>
          </div>
        </div>
    </div>
</template>

<script>
  import { Table, TableColumn, Tabs, TabPane } from 'element-ui';
export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane
  },
  data() {
    return {
      item: [
        {
          status_order: "Request Sent",
          notif_name: "Request Send",
          objective: "Untuk memberitahu NASABAH bahwa permohonan berhasil dikirim",
          trigger: "AXI atau NASABAH menekan tombol 'Ajukan Pinjaman' melalui Dicicilaja App",
          status_notif: "Active"
        },
        {
          status_order: "Request Process",
          notif_name: "Request Process",
          objective: "Untuk memberitahu NASABAH bahwa permohonan sedang diproses oleh staff dicicilaja",
          trigger: "TASYA memilih SH lalu menekan tombol 'Proses Pengajuan' melalui Admin Panel",
          status_notif: "Active"
        },
        {
          status_order: "Waiting Survey",
          notif_name: "Waiting Survey",
          objective: "Untuk memberitahu NASABAH bahwa akan dilakukan survey",
          trigger: "SH memilih SO untuk melakukan survey lalu menekan 'Trigger Button' melalui TBD App",
          status_notif: "Active"
        },
        {
          status_order: "Waiting Survey",
          notif_name: "Survey Postponed",
          objective: "Untuk memberitahu NASABAH bahwa penundaan survey dikarenakan beberapa alasan seperti NASABAH tidak pada tanggal yang ditentukan atau data tidak lengkap",
          trigger: "SO menunda tanggal survey yang sudah dilakukan telah diupload",
          status_notif: "Active"
        },
        {
          status_order: "Waiting Result",
          notif_name: "Survey Sent",
          objective: "Untuk memberitahu NASABAH bahwa data-data survey yang sudah dilakukan telah diupload",
          trigger: "SO sudah mengisi data survey lalu menekan 'Trigger Button' melalui TBD App",
          status_notif: "Active"
        },
        {
          status_order: "Request Accepted",
          notif_name: "Request Accepted",
          objective: "Untuk memberitahu NASABAH dan AXI bahwa permohonan pinjaman diterima",
          trigger: "SH sudah menghitung-hitung hasil survey dengan nilai pinjaman serta ulang NASABAH lalu menekan tombol 'Trigger Button' melalui Device POST",
          status_notif: "Active"
        }
      ]
    }
  }
}
</script>