<template>
  <div>
    <base-button
      type="primary"
      class="act-btn btn-tooltip"
      v-b-tooltip.hover.top
      title="Download"
      @click="showModalDownload = true"
      ><i class="fas fa-download"></i
    ></base-button>
    <base-header class="pb-6 bg-gradient-orange">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Dashboard</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="fas fa-home"></i></router-link>
              </li>
              <li class="breadcrumb-item"><a href="#">Administrator</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <b-tabs
        content-class="mt-3 color-white font-weight-bold text-uppercase"
        nav-class="white font-weight-bold "
        align="center"
        v-model="tabIndex"
      >
        <b-tab
          title="Statistik Order"
          @click="setTab"
          :active="tabIndex != tabIndex ? true : false"
        >
          <div key="1" v-if="isBusy" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
            <br />
             <!-- <center>-->
              <half-circle-spinner
                :animation-duration="1000"
                :size="60"
                color="#ff1d5e"
              />
              <!--</center>-->
          </div>
          <div class="container" v-else>
            <div class="row">
              <div class="col-xl-8 col-md-6">
                <report-order />
              </div>
              <div class="col-xl-4 col-md-6">
                <sumber-order />
              </div>
            </div>
            <!--Charts-->
            <!-- Card stats -->
            <div class="row">
              <div class="col-xl-8 col-md-6">
                <report-order-per-area />
              </div>

              <div class="col-xl-4 col-md-6">
                <jenis-jaminan />
              </div>
            </div>

            <!--Charts-->
            <!-- Card stats -->
            <div class="row">
              <div class="col-xl-8 col-md-6">
                <demografi />
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab
          title="Statistik Registrasi AXI"
          class="color-white font-weight-bold text-uppercase"
          @click="setTab"
          :active="tabIndex != tabIndex ? true : false"
        >
          <div key="1" v-if="isBusy" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
            <br />
            <!-- <center>-->
              <half-circle-spinner
                :animation-duration="1000"
                :size="60"
                color="#ff1d5e"
              />
             <!-- </center>-->
          </div>
          <div class="container" v-else>
            <!-- Card stats -->
            <div class="row">
              <div class="col-xl-8 col-md-6">
                <report-register-per-area :tabindex="tabIndex" />
              </div>

              <div class="col-xl-4 col-md-6">
                <report-register-status />
              </div>
            </div>
            <div class="row">
              <div class="col-xl-8 col-md-6">
                <report-status-AXI />
              </div>

              <div class="col-xl-4 col-md-6">
                <jenis-AXI />
              </div>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </base-header>

    <modal :show.sync="showModal" :clickToClose="false">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
      <!--<center>-->
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
        />
     <!-- </center>-->
      </div>
    </modal>
    <modal :show.sync="showModalDownload">
      <div v-if="tabIndex == 0">
        Apakah anda ingin mendownload data Statistik Order ?
      </div>
      <div v-else>
        Apakah anda ingin mendownload data Statistik Registrasi AXI ?
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="showModalDownload = false"
          >Cancel</base-button
        >
        <base-button type="primary" @click="downloadExcel">Yes</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import ReportOrder from "@/views/Administrator/Dashboard/ReportOrder";
import ReportOrderPerArea from "@/views/Administrator/Dashboard/ReportOrderPerArea";
import ReportStatusAXI from "@/views/Administrator/Dashboard/ReportStatusAXI";
import ReportRegisterStatus from "@/views/Administrator/Dashboard/ReportRegisterStatus";
import ReportRegisterPerArea from "@/views/Administrator/Dashboard/ReportRegisterPerArea";
import JenisJaminan from "@/views/Administrator/Dashboard/JenisJaminan";
import JenisAXI from "@/views/Administrator/Dashboard/JenisAXI";
import SumberOrder from "@/views/Administrator/Dashboard/SumberOrder";
import Demografi from "@/views/Administrator/Dashboard/Demografi";

// Components
import BaseProgress from "@/components/BaseProgress";
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import {
  Table,
  TableColumn,
  Select,
  Option,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "element-ui";
import swal from "sweetalert2";
import users from "@/views/Tables/users2";
import { BasePagination } from "@/components";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import moment from "moment";
import "moment/locale/id";
import {
  HalfCircleSpinner,
  FulfillingBouncingCircleSpinner,
} from "epic-spinners";

export default {
  components: {
    LineChart,
    BarChart,
    BaseProgress,
    RouteBreadCrumb,
    StatsCard,
    ReportOrder,
    ReportOrderPerArea,
    ReportRegisterPerArea,
    ReportRegisterStatus,
    ReportStatusAXI,
    SumberOrder,
    Demografi,
    JenisJaminan,
    JenisAXI,
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    HalfCircleSpinner,
    FulfillingBouncingCircleSpinner,
  },
  data() {
    return {
      item: [],
      tabActive: "",
      tabIndex: 0,
      dataIncluded: [],
      pengajuanMasuk: "-",
      pendaftaranAXI: "-",
      pendaftaranMAXI: "-",
      approvalProduk: "-",
      selectedRows: [],
      isClickTab: false,
      redBarChart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Masuk",
              backgroundColor: "rgba(159,170,174,0.8)",
              data: [
                // 10, 7, 20
              ],
            },
          ],
        },
      },
      searchData: "",
      meta: {},
      varChart: {
        data: [],
        month: [],
      },
      isLoading: true,
      isError: false,
      isShow: false,
      showModal: false,
      showModalDownload: false,
      isBusy: false,
    };
  },
  computed: {
    ...mapGetters("axi", ["count_pendaftaran_axi"]),
    ...mapGetters("maxi", ["count_pendaftaran_maxi"]),
    ...mapGetters("transaksi", [
      "count_transaksi",
      "count_3bulan",
      "transaksis",
      "included",
    ]),
    ...mapGetters("subproduk", ["count_approval_produk"]),
  },
  methods: {
    ...mapActions("auth", ["checkAuth", "refreshToken"]),
    ...mapActions("axi", ["getCountPendaftaranAXI"]),
    ...mapActions("maxi", ["getCountPendaftaranMAXI"]),
    ...mapActions("transaksi", [
      "getCountTransaksi",
      "getCount3Bulan",
      "getTransaksis",
      "getTransaksisQueried",
      "updateTransaksi",
    ]),
    ...mapActions("subproduk", ["getCountApprovalProduk"]),

    async permissionAuth() {
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
        if (res.name == "Error" && res.response.status == 401) {
          window.localStorage.removeItem("access_token");
          window.localStorage.removeItem("role");
          window.localStorage.removeItem("user");

          swal.fire({
            type: "error",
            title: "Unauthenticated",
            text: "Silahkan untuk login kembali",
            timer: 2500,
          });

          this.$router.push("/login");
        }
      }
      this.checkPermission();
    },

    checkPermission() {
      if (window.localStorage.getItem("role") == "Mitra MAXI") {
        this.$router.push("/administrator/maxi/produk-saya");
      } else if (window.localStorage.getItem("role") == "Tasya Area") {
        this.$router.push("/administrator/maxi/pengajuan");
      }
      if (
        window.localStorage.getItem("role") != "Super Admin" &&
        window.localStorage.getItem("role") != "Reporting SPDM" &&
        window.localStorage.getItem("role") != "Reporting Telecenter"
      ) {
        swal(
          "Error",
          "Role anda tidak memiliki akses untuk melihat halaman ini",
          "error"
        );
        this.$router.push("/administrator/dashboard");
      }
    },

    downloadExcel() {
      if (this.tabIndex == 0) {
        window.open(
          `${process.env.VUE_APP_URL_ORDER_IN_API}download/order/dashboardReport`
        );
      } else {
        window.open(
          `${process.env.VUE_APP_URL_SAP_API}download/register/dashboardReport`
        );
      }

      this.showModalDownload = false;
    },

    setTab() {
      // this.tabActive = "2";
      console.log(this.tabIndex);
      this.isBusy = true;
      setInterval(() => {
        this.isBusy = false;
      }, 1000);
    },
    // async assignCountTransaksi() {
    //   await this.getCountTransaksi();
    //   this.pengajuanMasuk = this.count_transaksi;
    // },
    // async assignCountPendaftaranAXI() {
    //   await this.getCountPendaftaranAXI();
    //   this.pendaftaranAXI = this.count_pendaftaran_axi;
    // },
    // async assignCountPendaftaranMAXI() {
    //   await this.getCountPendaftaranMAXI();
    //   this.pendaftaranMAXI = this.count_pendaftaran_maxi;
    // },
    // async assignCountApprovalProduk() {
    //   await this.getCountApprovalProduk();
    //   this.approvalProduk = this.count_approval_produk;
    // },
    // async assignCount3Bulan() {
    //   await this.getCount3Bulan();

    //   for (const val of this.count_3bulan) {
    //     this.varChart.month.push(moment.months(val.month - 1));
    //     this.varChart.data.push(val.data);
    //   }

    //   this.redBarChart.chartData = {
    //     datasets: [
    //       {
    //         label: "Masuk",
    //         data: this.varChart.data,
    //       },
    //     ],
    //     labels: this.varChart.month,
    //   };
    // },

    // async getData() {
    //   this.isLoading = true;
    //   this.isShow = false;

    //   this.assignCountTransaksi();
    //   this.assignCountPendaftaranAXI();
    //   this.assignCountPendaftaranMAXI();
    //   this.assignCountApprovalProduk();
    //   this.assignCount3Bulan();

    //   let data = {};
    //   data.property = "created-at";
    //   data.order = "desc";
    //   data.pageSize = 5;
    //   data.pageNumber = 1;
    //   data.searchAll = "";
    //   data.include =
    //     "branch,area,current_pic,prospective_customer,agent,sub_product";

    //   let res = await this.getTransaksisQueried(data);
    //   if (res.name != "Error") {
    //     this.item = JSON.parse(JSON.stringify(this.transaksis));
    //     this.dataIncluded = this.included
    //       ? JSON.parse(JSON.stringify(this.included))
    //       : this.included;

    //     this.isShow = true;
    //     this.isLoading = false;
    //   } else {
    //     this.isError = true;
    //     this.isLoading = false;
    //   }
    // },

    // Get data from included
    // getIncluded(type, detail, attr) {
    //   if (detail == null) {
    //     return "";
    //   } else {
    //     var result = this.dataIncluded.find((obj) => {
    //       return obj.type == type && obj.id == detail.id;
    //     });
    //     return result.attributes[attr];
    //   }
    // },

    // To handle the modal
    // handleCommand(command, row) {
    //   row = JSON.parse(JSON.stringify(row));

    //   const that = this;
    //   swal({
    //     title:
    //       "Apakah anda yakin untuk mengubah status pengajuan menjadi " +
    //       command +
    //       "?",
    //     text: "",
    //     type: "question",
    //     showCancelButton: true,
    //     cancelButtonColor: "#d33",
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonText: "Batal",
    //     reverseButtons: true,
    //   }).then(async (result) => {
    //     if (result.value) {
    //       if (command == "permohonan") row.attributes.status = 15;
    //       else if (command == "proses") row.attributes.status = 16;
    //       else if (command == "survei") row.attributes.status = 17;
    //       else if (command == "disetujui") row.attributes.status = 18;
    //       else if (command == "tolak") row.attributes.status = 19;

    //       row.attributes.current_pic_id = JSON.parse(
    //         window.localStorage.getItem("user")
    //       ).id;

    //       that.showModal = true;

    //       const res = await that.updateTransaksi(row);

    //       that.showModal = false;

    //       if (res.name != "Error") {
    //         swal.fire("Status telah terubah!", "", "success");

    //         let data = {};
    //         data.property = "created-at";
    //         data.order = "desc";
    //         data.pageSize = 5;
    //         data.pageNumber = 1;
    //         data.searchAll = "";
    //         data.include =
    //           "branch,area,current_pic,prospective_customer,agent,sub_product";

    //         this.isShow = false;
    //         this.isLoading = true;

    //         let res = await this.getTransaksisQueried(data);
    //         if (res.name != "Error") {
    //           this.item = JSON.parse(JSON.stringify(this.transaksis));
    //           this.dataIncluded = this.included
    //             ? JSON.parse(JSON.stringify(this.included))
    //             : this.included;

    //           this.isShow = true;
    //           this.isLoading = false;
    //         } else {
    //           this.isError = true;
    //           this.isLoading = false;
    //         }
    //       } else {
    //         that.showModal = false;
    //         swal.fire("Status gagal diubah", "", "error");
    //       }
    //     }
    //   });
    // },

    // This method receive data from created below
    // searchDatas() {},
  },
  watch: {
    // searchData: function () {
    //   this.debouncedGetData();
    // },
  },
  created: async function () {
    await this.permissionAuth();
    // this.getData();
    // this.debouncedGetData = _.debounce(this.searchDatas, 3000);
  },
  // filters: {
  //   convertDate(date) {
  //     return moment(date).format("LLLL");
  //   },
  // },
};
</script>
<style>
.el-table .cell {
  word-break: break-word;
}
.act-btn {
  display: block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  text-decoration: none;
  transition: ease all 0.3s;
  position: fixed;
  right: 8px;
  bottom: 30px;
  z-index: 9;
}
</style>
