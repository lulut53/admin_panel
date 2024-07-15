<template>
  <div>
    <base-header class="pb-6" type>
      <div class="row align-items-center py-4">
        <div class="col-lg-8 col-9">
          <h6 class="h2 d-inline-block mb-0">Manual Reprocecss SAP</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard">
                  <i class="fas fa-home"></i>
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard"
                  >Administrator</router-link
                >
              </li>
              <li class="breadcrumb-item" aria-current="page">
                AXI
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-4 pt-2 text-right" v-if="isShow && !isError">
          <!-- <date-range-picker
            v-model="datePicked"
            ref="picker"
            :locale-data="locale"
            :opens="opens"
            class="pr-2"
          ></date-range-picker>
          <base-button
            class="btn btn-xl mr-4"
            type="secondary"
            @click="dateRangeClear"
          >
            <span class="hidden-sm-down">Clear Date</span>
          </base-button>
          <base-button
            class="btn btn-xl"
            type="success"
            @click="downloadExcel"
            v-if="!isHideDownloadBtn"
          >
            <i class="ni ni-cloud-download-95" aria-hidden="true"></i>
            <span class="hidden-sm-down">Download Excel</span>
          </base-button> -->
          <base-button
            @click="showModalDownloadData = true"
            type="success"
            class="btn btn-xl"
            :disabled="filterByService == 'ECM' || filterByService == ''"
            >Download Data</base-button
          >
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <div>
        <card
          class="no-border-card"
          body-classes="px-0 pb-1"
          footer-classes="pb-2"
        >
          <!-- <template slot="header">
            <h3 class="mb-0">Paginated tables</h3>
            <p class="text-sm mb-0">
              This is a client side example of paginated tables using element-ui tables.
            </p>
          </template>-->
          <div>
            <transition-group name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                <br />
                  <half-circle-spinner
                    :animation-duration="1000"
                    :size="60"
                    color="#ff1d5e"
                  />
              </div>
              <div key="2" v-if="isError" class="text-center p-5">
                  <img
                    alt="Error Image"
                    src="/images/undraw_cancel_u1it.svg"
                    height="300px"
                    class="img-responsive"
                  />
                <br />
                <div style="display: flex; margin-top: 20px !important; justify-content: center;">
                  <h1 class="text-center">Error, silahkan coba lagi.</h1>
              </div>
              </div>
              <div key="3" v-if="isShow">
                <div class="container">
                  <div class="row d-flex align-content-between flex-wrap">
                    <div class="col-6 col-md-2 col-lg-2">
                      <el-select
                        class="select-primary pagination-select"
                        v-model="perPageCurrent"
                        placeholder="Per page"
                      >
                        <el-option
                          class="select-primary"
                          v-for="item in perPageOptions"
                          :key="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="col-6 col-md-4 col-lg-4">
                      <el-select
                        class="select-primary pagination-select"
                        v-model="filterByService"
                        placeholder="Filter"
                      >
                        <el-option
                          class="select-primary"
                          v-for="item in filterOptions"
                          :key="item.value"
                          :value="item.name"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="col-6 col-md-6 col-lg-2">
                      <el-select
                        class="select-primary pagination-select"
                        v-model="currentColumnSearched"
                        placeholder="Per page"
                        @input="changeFilterSearch($event)"
                      >
                        <el-option
                          class="select-primary"
                          v-for="item in columnSearched"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="col-6 col-md-6 col-lg-4">
                      <base-input
                        v-model="searchData"
                        append-icon="fas fa-search"
                        placeholder="Search..."
                      ></base-input>
                    </div>
                  </div>
                  <el-table
                    :data="item"
                    row-key="id"
                    header-row-class-name="thead-light"
                    class="table-responsive table-flush"
                    @sort-change="sortChange"
                  >
                    <el-table-column label="No." min-width="80px" prop="id">
                      <template v-slot="{ row }">{{
                        item.indexOf(row) + meta.from
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      label="Nama AXI"
                      min-width="200px"
                      prop="nama"
                    >
                      <template v-slot="{ row }">
                        <el-button
                          @click="showModalPostToSAP(row)"
                          type="text"
                          size="small"
                          v-if="row.integrasi === 'SAP'"
                          >{{ row.nama }}</el-button
                        >
                        <a v-else>{{ row.nama }}</a>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Nomor AXI"
                      min-width="150px"
                      prop="nomor_axi_id"
                    >
                      <!-- <template
                        v-slot="{row}"
                      >{{ row.attributes.axi_id_reff ? row.attributes.axi_id_reff : '-' }}</template>-->
                    </el-table-column>
                    <el-table-column
                      label="Jenis AXI"
                      min-width="150px"
                      prop="jenis_axi"
                    >
                      <!-- <template
                        v-slot="{row}"
                      >{{ getIncluded('branches', row.relationships.registration_branch.data, 'nama') }}</template>-->
                    </el-table-column>
                    <el-table-column label="Area" min-width="250px" prop="area">
                      <!-- <template
                        v-slot="{row}"
                      >{{ getIncluded('profiles', row.relationships.profile.data, 'email') }}</template>-->
                    </el-table-column>
                    <el-table-column
                      label="Cabang"
                      min-width="180px"
                      prop="cabang"
                    >
                      <!-- <template v-slot="{row}">{{ row.tanggalDaftar | convertDate }}</template> -->
                    </el-table-column>
                    <el-table-column
                      label="Service"
                      min-width="180px"
                      prop="integrasi"
                    >
                      <!-- <template v-slot="{row}">{{ row.tanggalDaftar | convertDate }}</template> -->
                    </el-table-column>
                    <el-table-column
                      label="Status"
                      min-width="100px"
                      prop="status_registrasi"
                    >
                      <template v-slot="{ row }">
                        <badge
                          type="default"
                          v-if="row.status_registrasi == 'AKTIF'"
                          >{{ row.status_registrasi }}</badge
                        >
                        <badge type="primary" v-else>{{
                          row.status_registrasi
                        }}</badge>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" min-width="150px" label="Aksi">
                      <template v-slot="{ row }">
                        <base-button
                          @click="reprocess(row)"
                          class="like btn-link text-white"
                          type="primary"
                          size="sm"
                          icon
                          >Process</base-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div
                  slot="footer"
                  class="pr-5 pl-5 pb-3 pt-3 col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
                >
                  <div class>
                    <p class="card-category">
                      Showing {{ meta.from }} to {{ meta.to }} of
                      {{ meta.total }} entries
                      <span v-if="selectedRows.length"
                        >&nbsp; &nbsp; {{ selectedRows.length }} rows
                        selected</span
                      >
                    </p>
                  </div>
                  <!-- <base-pagination
                    class="pagination-no-border"
                    v-model="pagination.currentPage"
                    :per-page="pagination.perPage"
                    :total="pagination.total"
                  >
                  </base-pagination>-->
                  <base-pagination
                    class="pagination-no-border"
                    :pageCount="meta.last_page"
                    :total="meta.total"
                    v-model="meta.current_page"
                  ></base-pagination>
                </div>
              </div>
            </transition-group>
          </div>
        </card>
      </div>
    </div>
    <!-- <el-form>
      <el-dialog
        :visible.sync="showModalExport"
        width="30%"
        title="Export Data"
      >
        <div class="form-group">
          <div class="row">
            <label for class="col-md-12">Choose Date</label>
          </div>
          <div class="row">
            <div class="col-md-8">
              <date-range-picker
                v-model="datePickerExport"
                ref="picker"
                :locale-data="locale"
                :opens="opensExport"
              ></date-range-picker>
            </div>
            <div class="col-md-2">
              <el-button @click="dateRangeExportClear" class="text-left"
                >Clear Date</el-button
              >
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <label for class="col-md-12">Export Action</label>
          </div>
          <div class="row">
            <div class="col-md-6 text-center">
              <el-button
                type="primary"
                :disabled="datePickerExport == ''"
                :loading="loadingExport"
                @click="processExport()"
                >Process Export</el-button
              >
            </div>
            <div class="col-md-6 text-center">
              <el-button
                type="success"
                :disabled="!wasExportDataBefore"
                @click="downloadExcel"
                >Download Excel</el-button
              >
            </div>
          </div>
          <div class="row pt-4 pb-0">
            <p class="col-md-12 text-center">{{ keterangan }}</p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="secondary" @click="showModalExport = false"
            >Tutup</el-button
          >
          <el-button type="success" @click="simpanFoto">Simpan</el-button>
        </span>
      </el-dialog>
    </el-form> -->
    <modal :show.sync="showModalDownloadData">
      <div>
        <h5 class="modal-title">
          Apakah anda ingin mendownload list data manual reprocess SAP?
        </h5>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="showModalDownloadData = false"
          >Cancel</base-button
        >
        <base-button type="primary" @click="downloadData()">Yes</base-button>
      </template>
    </modal>
    <modal :show.sync="showModalLoading">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template>-->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
        />
      </div>
    </modal>
    <modal :show.sync="isShowModalPostToSAP">
      <!-- <template slot="header">
        <div>
          <h5 class="modal-title">Masukkan nama CRH</h5>
        </div>
      </template> -->
      <div class="form-group">
        <el-form label-position="top" label-width="100px" :model="callbackData">
          <el-form-item label="Request Number">
            <el-input
              v-model="callbackData.request_number"
              placeholder="Mohon masukkan Request Number"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="BP Number">
            <el-input
              v-model="callbackData.bp_number"
              placeholder="Mohon masukkan BP Number"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="isShowModalPostToSAP = false"
          >Cancel</base-button
        >
        <base-button type="primary" @click="postToSAP()">Submit</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import {
  Dialog,
  Button,
  Form,
  FormItem,
  Table,
  TableColumn,
  Select,
  Option,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "element-ui";
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import { BasePagination } from "@/components";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css";
import swal from "sweetalert2";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import "moment/locale/id";
import { HalfCircleSpinner } from "epic-spinners";
// import { BSpinner } from 'bootstrap-vue'

export default {
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    DateRangePicker,
    HalfCircleSpinner
  },
  data() {
    return {
      // propsToSearch: ['id', 'name', 'email', 'age'],
      // tableData: users,
      item: [],
      dataIncluded: [],
      columnSearched: [
        { name: "All", value: "all" },
        { name: "Nama AXI", value: "nama" },
        // { name: "AXI Mentor", value: "axiIdReff" },
        // { name: 'Cabang Daftar', value: 'cabang_daftar' },
        { name: "Nomor AXI", value: "axi_id" }
      ],
      callbackData: {
        request_number: "",
        bp_number: "",
        axi_id: ""
      },
      currentColumnSearched: "all",
      selectedRows: [],
      startDate: moment().format("LL"),
      endDate: moment().format("LL"),
      opens: "left", //which way the picker opens, default "center", can be "left"/"right"
      opensExport: "center", //which way the picker opens, default "center", can be "left"/"right"
      // locale: {
      //   direction: "ltr", //direction of text
      //   format: "MMM DD, YYYY", //fomart of the dates displayed
      //   separator: " - ", //separator between the two ranges
      //   applyLabel: "Apply",
      //   cancelLabel: "Cancel",
      //   weekLabel: "W",
      //   customRangeLabel: "Custom Range",
      //   daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
      //   monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
      //   firstDay: 1, //ISO first day of week - see moment documenations for details
      //   showWeekNumbers: true, //show week numbers on each row of the calendar
      // },
      // ranges: {
      //   //default value for ranges object (if you set this to false ranges will no be rendered)
      //   Today: [moment(), moment()],
      //   Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      //   "This month": [moment().startOf("month"), moment().endOf("month")],
      //   "This year": [moment().startOf("year"), moment().endOf("year")],
      //   "Last week": [
      //     moment().subtract(1, "week").startOf("week"),
      //     moment().subtract(1, "week").endOf("week"),
      //   ],
      //   "Last month": [
      //     moment().subtract(1, "month").startOf("month"),
      //     moment().subtract(1, "month").endOf("month"),
      //   ],
      // },
      showModal: false,
      showModalExport: false,
      showModalDownloadData: false,
      loadingExport: false,
      processModal: false,
      currentRow: "",
      searchData: "",
      perPageCurrent: 10,
      perPageOptions: [5, 10, 25],
      datePicked: "",
      datePickerExport: "",
      meta: {
        current_page: 1,
        per_page: "",
        from: "",
        to: "",
        total: "",
        last_page: ""
      },
      isLoading: true,
      showModalLoading: false,
      isShowModalPostToSAP: false,
      isError: false,
      isShow: false,
      isFirst: true,
      wasExportDataBefore: false,
      columnClicked: {
        order: "desc",
        property: "created-at"
      },
      isHideDownloadBtn: true,
      interval: null,
      keterangan: "File excel belum tersedia di server",
      isDoneExport: true,
      filterByService: "",
      filterOptions: [
        { value: "ECM", name: "ECM" },
        { value: "SAP", name: "SAP" }
      ],
      profileId: "",
      crhOptions: []
    };
  },
  computed: {
    ...mapGetters("sap", ["approveList", "resUpdate", "cabangById", "crhName"]),
    ...mapGetters("axi", ["detailRegAxi"])
  },
  methods: {
    ...mapActions("axi", ["getAxiDetailList"]),
    ...mapActions("auth", ["checkAuth", "refreshToken"]),
    ...mapActions("sap", [
      "getApproveList",
      "getInboundSAP",
      "postCallbackSAP",
      "postUploadToECM",
      "updateDataDetail",
      "getCabangById",
      "getCrhName"
    ]),
    async permissionAuth() {
      this.isLoading = true;
      this.isShow = false;

      if (!window.localStorage.getItem("access_token")) {
        swal.fire({
          type: "error",
          title: "Unauthenticated",
          text: "Silahkan untuk login kembali",
          timer: 2500
        });

        this.$router.push("/login");
      } else {
        let res = await this.checkAuth();
        if (res.name == "Error" && res.response.status == 401) {
          window.localStorage.removeItem("access_token");
          window.localStorage.removeItem("refresh_token");
          window.localStorage.removeItem("role");
          window.localStorage.removeItem("user");

          swal.fire({
            type: "error",
            title: "Unauthenticated",
            text: "Silahkan untuk login kembali",
            timer: 2500
          });

          this.$router.push("/login");
        }
      }
      this.checkPermission();
    },
    checkPermission() {
      console.log(window.localStorage.getItem("role"));
      if (window.localStorage.getItem("role") != "Super Admin") {
        swal(
          "Error",
          "Role anda tidak memiliki akses untuk melihat halaman ini",
          "error"
        );
        this.$router.push("/administrator/dashboard");
      }
    },

    /**
     * --------------------------------------------------
     * Data Handling here
     *  -> getData for fetching data from endpoint
     *  -> assignData for handling sorting and filtering
     *  -> assignMeta for assigning from meta
     *  -> getIncluded for assigning from included
     * --------------------------------------------------
     */

    async getData() {
      this.isLoading = true;
      this.isShow = false;

      let data = {};
      if (this.searchData != "") {
        if (this.currentColumnSearched == "all") {
          data.searchAll = this.searchData;
        } else {
          data.searchAll = "";
          data.searchColumn = {
            column: this.currentColumnSearched,
            searchData: this.searchData
          };
        }
      } else {
        data.searchAll = this.searchData;
      }
      data.searchColumn = {
        column: this.currentColumnSearched,
        searchData: this.searchData
      };
      data.pageSize = this.perPageCurrent;
      data.searchAll = this.searchData;
      data.pageNumber = 1;

      let res = JSON.parse(JSON.stringify(await this.getApproveList(data)));
      // console.log(res.data);

      if (res.data != "" || res.data.length == 0) {
        this.item = JSON.parse(JSON.stringify(this.approveList));

        this.assignMeta(res.meta);

        this.isShow = true;
        this.isLoading = false;
        this.isError = false;
      } else {
        this.isError = true;
        this.isLoading = false;
        this.isShow = false;
      }

      // let data = {};
      // data.status = "4,5,6,7";
      // data.include = "profile,registration_branch";
      // data.pageSize = this.perPageCurrent;
      // data.searchAll = this.searchData;
      // data.pageNumber = 1;
      // data.property = this.columnClicked.property;
      // data.order = this.columnClicked.order;

      // let res = JSON.parse(JSON.stringify(await this.getAxisQueried(data)));
      // if (res.name != "Error") {
      //   this.item = JSON.parse(JSON.stringify(this.axis));
      //   this.dataIncluded = this.included
      //     ? JSON.parse(JSON.stringify(this.included))
      //     : this.included;

      //   this.assignMeta(res.meta.page);

      //   this.isShow = true;
      //   this.isLoading = false;
      // } else {
      //   this.isError = true;
      //   this.isLoading = false;
      // }
    },

    changeFilterSearch(e) {
      // console.log(e);
      if (e == "all") {
        this.searchByColumn();
        this.filterByService = "";
      }
    },

    async assignData() {
      this.isShow = false;
      this.isError = false;
      this.isLoading = true;

      let data = {};
      data.status = "4,5,6,7";
      data.include = "profile,registration_branch";
      data.start_date = this.datePicked.startDate
        ? moment(this.datePicked.startDate).format("YYYY-MM-DD")
        : "";
      data.end_date = this.datePicked.endDate
        ? moment(this.datePicked.endDate).format("YYYY-MM-DD")
        : "";
      data.pageSize = this.perPageCurrent;
      data.searchAll = this.searchData;
      data.pageNumber = this.meta.current_page;
      data.property = this.columnClicked.property;
      data.order = this.columnClicked.order;
      data.searchColumn = {
        column: this.currentColumnSearched,
        searchData: this.searchData
      };

      let res = await this.getApproveList(data);
      if (res.data != "" || res.data.length == 0) {
        this.item = JSON.parse(JSON.stringify(this.approveList));

        this.assignMeta(res.meta);

        this.isShow = true;
        this.isLoading = false;
        this.isError = false;
      } else {
        this.isError = true;
        this.isLoading = false;
        this.isShow = false;
      }
    },

    assignMeta(metaPage) {
      // console.log(metaPage);

      this.meta.current_page = metaPage.current_page;
      this.meta.per_page = metaPage.per_page;
      this.meta.from = metaPage.from;
      this.meta.to = metaPage.to;
      this.meta.total = metaPage.total;
      this.meta.last_page = metaPage.last_page;
    },

    getIncluded(type, detail, attr) {
      if (detail == null) {
        return "";
      } else {
        var result = this.dataIncluded.find(obj => {
          return obj.type == type && obj.id == detail.id;
        });
        return result.attributes[attr];
      }
    },

    /**
     * ----------------------------------------
     * End of data handling
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Page handling
     * ----------------------------------------
     */

    // Everytime user click page on pagination, this method will called
    async changePage() {
      this.assignData();
    },

    /**
     * ----------------------------------------
     * End of page handling
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Date Range Picker handling
     * ----------------------------------------
     */

    // Date Range Picker method goes here when user clicked apply
    async dateRangePicked() {
      if (this.datePicked != "") {
        this.assignData();
      }
    },

    async dateRangeClear() {
      if (this.datePicked != "") {
        this.datePicked.startDate = null;
        this.datePicked.endDate = null;
        // call endpoint getalldata here
        this.assignData();
      }
    },

    async dateRangeExportClear() {
      if (this.datePickerExport != "") {
        this.datePickerExport = "";
        this.datePickerExport.startDate = null;
        this.datePickerExport.endDate = null;
        // call endpoint getalldata here
        // this.assignData()
      }
    },

    /**
     * ----------------------------------------
     * End of Date Range Picker handling
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Modal Handling here
     * ----------------------------------------
     */

    // Modal method when user click "Proses"
    modalProcess(row) {
      this.showModal = true;
      this.currentRow = row;
    },

    process() {
      var that = this;
      swal("Sukses", "Berhasil memproses data", "success")
        .then(function() {
          that.showModal = false;
        })
        .catch(function(error) {});
    },

    /**
     * ----------------------------------------
     * End of modal handling
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Searching Data from here
     * ----------------------------------------
     */

    // AXIOS here to consume datas
    async searchDatas() {
      this.isShow = false;
      this.isLoading = true;

      let data = {};
      if (this.searchData != "") {
        if (this.currentColumnSearched == "all") {
          data.searchAll = this.searchData;
        } else {
          data.searchAll = "";
          data.searchColumn = {
            column: this.currentColumnSearched,
            searchData: this.searchData
          };
        }
      } else {
        data.searchAll = this.searchData;
      }
      data.status = "4,5,6,7";
      data.include = "profile,registration_branch";
      data.start_date = this.datePicked.startDate
        ? moment(this.datePicked.startDate).format("YYYY-MM-DD")
        : "";
      data.end_date = this.datePicked.endDate
        ? moment(this.datePicked.endDate).format("YYYY-MM-DD")
        : "";
      data.pageSize = this.perPageCurrent;
      data.pageNumber = 1;
      data.property = this.columnClicked.property;
      data.order = this.columnClicked.order;
      data.searchColumn = {
        column: this.currentColumnSearched,
        searchData: this.searchData
      };
      data.filterByService = this.filterByService;

      let res = await this.getApproveList(data);
      if (res.data != "" || res.data.length == 0) {
        this.item = JSON.parse(JSON.stringify(this.approveList));
        // this.dataIncluded = this.included
        //   ? JSON.parse(JSON.stringify(this.included))
        //   : this.included;

        this.assignMeta(res.meta);

        this.isShow = true;
        this.isLoading = false;
        this.isError = false;
      } else {
        this.isError = true;
        this.isLoading = false;
        this.isShow = false;
      }
    },

    async filterData() {
      this.isShow = false;
      this.isLoading = true;

      let data = {};
      data.pageSize = this.perPageCurrent;
      data.pageNumber = 1;
      data.searchColumn = {
        column: "integrasi",
        searchData: this.searchData
      };
      data.filterByService = this.filterByService;

      let res = await this.getApproveList(data);
      if (res.data != "" || res.data.length == 0) {
        this.item = JSON.parse(JSON.stringify(this.approveList));
        // this.dataIncluded = this.included
        //   ? JSON.parse(JSON.stringify(this.included))
        //   : this.included;

        this.assignMeta(res.meta);

        this.isShow = true;
        this.isLoading = false;
        this.isError = false;
      } else {
        this.isError = true;
        this.isLoading = false;
        this.isShow = false;
      }
    },

    searchByColumn() {
      if (this.searchData != "" || this.currentColumnSearched == "all")
        this.searchDatas();
    },

    /**
     * ----------------------------------------
     * End of searching data here
     * ----------------------------------------
     */

    /**
     * ----------------------------------------
     * Sorting data here
     * ----------------------------------------
     */

    async getDataColumnClicked() {
      this.assignData();
    },

    // Method when sort clicked
    sortChange(sortProps) {
      this.headerClick(sortProps.column, event); //optional: trigger header-click event
    },

    headerClick(column, event) {
      let col = JSON.parse(JSON.stringify(column));
      if (col != null) {
        col.property = col.property == "no" ? "id" : col.property;
        col.order = col.order == "descending" ? "desc" : "asc";

        this.columnClicked = col;

        this.getDataColumnClicked();
      } else {
        col = {};
        col.property = "id";
        col.order = "asc";

        this.columnClicked = col;
        this.getDataColumnClicked();
      }
    },

    /**
     * ----------------------------------------
     * End of sorting data here
     * ----------------------------------------
     */
    async reprocess(row) {
      // this.profileId = row.profile_id;
      await this.getAxiDetailList(row.profile_id);
      if (row.integrasi == "SAP") {
        this.isLoading = true;
        this.isShow = false;
        let res = await this.getInboundSAP(row.profile_id);
        this.getData();
        console.log(res);
        if (res.status !== 200) {
          swal.fire(
            "Reprocess SAP Gagal",
            `Error! ${res.data.data.response[0].message}`,
            "error"
          );
        } else {
          swal.fire(
            res.data.data.response[0].message.includes("gagal")
              ? "Reprocess SAP Gagal"
              : "Success",
            res.data.data.response[0].message.includes("gagal")
              ? `Error! ${res.data.data.response[0].message}`
              : "Reprocess SAP berhasil",
            res.data.data.response[0].message.includes("gagal")
              ? "error"
              : "success"
          );
        }
      } else {
        this.$router.push({
          name: "edit pendaftaran axi",
          params: { id: row.profile_id }
        });
      }
    },
    async showModalPostToSAP(row) {
      console.log(row);
      this.callbackData.axi_id = row.nomor_axi_id;
      this.isShowModalPostToSAP = true;
      await this.getAxiDetailList(row.profile_id);
    },
    async postToSAP() {
      console.log(this.detailRegAxi);
      if (!this.callbackData.request_number || !this.callbackData.bp_number) {
        swal.fire(
          "Oops!",
          "sepertinya data yang dimasukkan belum lengkap",
          "warning"
        );
      } else {
        this.isLoading = true;
        this.isShow = false;
        this.isShowModalPostToSAP = false;
        const payload = {
          header: {
            requestId: "SAP-20200908164852",
            // requestTimestamp: "2020-09-08 16:48:52",
            requestTimestamp: moment(Date()).format("YYYY-MM-DD HH:mm:ss"),
            costGrp: "Adira",
            channelId: "ERP",
            props: {
              respLang: "id",
              writeLogTo: "Erp Table"
            }
          },
          data: {
            generalData: [
              {
                requestNumber: this.callbackData.request_number,
                bpartner: this.callbackData.bp_number,
                grouping: "",
                category: "",
                name1: "",
                name2: ""
              }
            ],
            roleData: [
              {
                bpartner: this.callbackData.bp_number,
                partnerExternal: this.callbackData.axi_id,
                roleCategory: "ZP0107"
              }
            ],
            addressData: [
              {
                bpartner: this.callbackData.bp_number,
                requestNumber: this.callbackData.request_number,
                houseNo: "",
                postlCod1: "",
                street: "",
                strSuppl11: "",
                strSuppl12: "",
                strSuppl13: "",
                location: "",
                homeCity: "",
                city: "",
                district: "",
                region: "",
                country: "ID",
                uri: "",
                itemNumber: "1"
              }
            ]
          }
        };
        console.log(payload);
        let res = await this.postCallbackSAP(payload);
        this.getData();
        console.log(res);
        if (res.status !== 200) {
          swal.fire(
            "Reprocess SAP Gagal",
            `Error! ${res.response.data.details[0]}`,
            "error"
          );
        } else {
          this.isShowModalPostToSAP = false;
          swal.fire("Success", "Reprocess SAP berhasil", "success");
        }
        this.isShowModalPostToSAP = false;
        // const payload = {
        //   profileId: this.detailRegAxi.profile_id,
        //   crhEmail: this.detailRegAxi.email_crh
        // };
        // const isFetchToECM = await this.uploadFileToECM(payload);
        // if (isFetchToECM == "ok") {
        //   const payload = {
        //     ...this.detailRegAxi,
        //     legal_form: this.detailRegAxi.jenis_badan,
        //     npwp: this.detailRegAxi.no_npwp == "000000000000000" ? "2" : "1",
        //     status_registrasi: "SETUJU",
        //     alamat_ktp: this.detailRegAxi.jalan,
        //     kelurahan_id: this.detailRegAxi.desa_id
        //   };
        //   const profileId = this.detailRegAxi.profile_id;
        //   const result = await this.updateDataDetail({ payload, profileId });
        //   if (result.data == "Sukses") {
        //     // this.isBusy = false;
        //     this.isLoading = false;
        //     this.isShow = true;
        //     this.isShowModalPostToSAP = false;
        //     swal.fire("Success!", "Data Berhasil diProses!", "success");
        //   } else {
        //     // this.isBusy = false;
        //     this.isLoading = false;
        //     this.isShow = true;
        //     this.isShowModalPostToSAP = false;
        //     swal.fire(
        //       "Oops!",
        //       "Terjadi Kesalahan Teknis, hubungi developer",
        //       "error"
        //     );
        //   }
        // }
        // this.getData();
      }
    },
    async uploadFileToECM(payload) {
      try {
        // const payload = {
        //   profileId: profileId,
        //   crhEmail: "",
        // };
        const result = await this.postUploadToECM(payload);
        return result.status;
      } catch (error) {
        this.isLoading = false;
        this.isShow = true;
        swal.fire(
          "Reprocess ECM Gagal",
          `${error.response.data.details[0]}`,
          "error"
        );
        return error.response.status;
      }
    },

    downloadData() {
      window.open(`${process.env.VUE_APP_URL_BFF}download/manualReprocess/SAP`);
      this.showModalDownloadData = false;
    },
    async downloadRow(row) {
      this.showModalLoading = true;
      let res = await this.exportAxi(row.id);
      if (res.name != "Error") {
        this.showModalLoading = false;
        swal.fire(
          "Download excel berhasil",
          "Silahkan cek bagian download pada browser anda",
          "success"
        );
      } else {
        this.showModalLoading = false;
        swal.fire("Download excel gagal", "", "error");
      }
    },
    // Download Excel method
    async downloadExcel() {
      this.showModalExport = false;
      this.showModalLoading = true;

      let res = await this.getExportAxiFile();
      if (res.name != "Error") {
        this.showModalLoading = false;
        swal.fire(
          "Download excel berhasil",
          "Silahkan cek bagian download pada browser anda",
          "success"
        );
      } else {
        this.showModalLoading = false;
        swal.fire("Download excel gagal", "", "error");
      }
    },

    async processExport() {
      this.loadingExport = true;
      this.isDoneExport = false;
      this.wasExportDataBefore = false;

      this.keterangan = "Sedang memproses export excel";

      let payload = {};
      payload.from = moment(this.datePickerExport.startDate).format(
        "YYYY-MM-DD"
      );
      payload.to = moment(this.datePickerExport.endDate).format("YYYY-MM-DD");

      const resCode = this.exportAxiProcess(payload);
      resCode.then(function(result) {
        if (result.response.status == 500) {
          that.isDoneExport = true;
          that.isDoneExport = false;
          that.loadingExport = false;
          that.keterangan = "Export gagal, silahkan coba kembali";
        }
      });

      this.interval = setInterval(
        async function() {
          let res = await this.getExportAxiStatus();
          if (res.data.attributes.is_done == 1) {
            this.isDoneExport = true;
            this.loadingExport = false;
          }
        }.bind(this),
        5000
      );
    }
  },

  // Watch Method(s) called when value on data (above) changed.
  watch: {
    searchData: function() {
      this.debouncedGetData();
    },
    perPageCurrent: function() {
      this.searchDatas();
    },
    datePicked: function() {
      this.dateRangePicked();
    },
    "meta.current_page": function() {
      this.changePage();
    },
    currentColumnSearched: function() {
      this.searchByColumn();
    },
    filterByService: function() {
      if (this.filterByService) {
        this.filterData();
      }
    },
    isDoneExport: async function() {
      if (this.isDoneExport) {
        clearInterval(this.interval);
        this.wasExportDataBefore = true;

        let res = await this.getExportAxiStatus();
        this.keterangan = `File excel tersedia dengan format export dari ${moment(
          res.data.attributes.register_from
        ).format("Do MMMM YYYY")} - ${moment(
          res.data.attributes.register_to
        ).format("Do MMMM YYYY")}`;
      }
    }
  },
  // async mounted() {
  // let res = await this.getExportAxiStatus();
  // if (res.data.attributes.is_done == 1) {
  //   this.wasExportDataBefore = true;
  //   this.keterangan = `File excel tersedia dengan format export dari ${moment(
  //     res.data.attributes.register_from
  //   ).format("Do MMMM YYYY")} - ${moment(
  //     res.data.attributes.register_to
  //   ).format("Do MMMM YYYY")}`;
  // } else if (res.data.attributes.is_done == 2) {
  //   this.loadingExport = true;
  //   this.isDoneExport = false;
  //   this.wasExportDataBefore = false;
  //   this.keterangan = "Sedang memproses export excel";
  //   this.interval = setInterval(
  //     async function() {
  //       let res = await this.getExportAxiStatus();
  //       if (res.data.attributes.is_done == 1) {
  //         this.isDoneExport = true;
  //         this.loadingExport = false;
  //       }
  //     }.bind(this),
  //     5000
  //   );
  // }
  // },

  // Created called when Vue Instance created
  async created() {
    // await this.permissionAuth();
    this.getData();
    this.debouncedGetData = _.debounce(this.searchDatas, 3000);
  },

  // Called when Vue Instance created
  filters: {
    convertDate(date) {
      return moment(date).format("LLLL");
    }
  },
  beforeDestroy: function() {
    clearInterval(this.interval);
  }
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
.el-table .cell {
  word-break: break-word;
}
</style>
