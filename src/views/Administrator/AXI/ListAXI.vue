<template>
  <div>
    <base-header class="pb-6" type>
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Semua Data AXI</h6>
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
              <li class="breadcrumb-item active" aria-current="page">AXI</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 pt-2 text-right" v-if="isShow && !isError">
          <date-range-picker
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
          <!--  button ini di disable dikarenakan sudah diakomodasi  oleh menu report -->
           <!-- <base-button class="btn btn-xl" type="success" @click.prevent="downloadRow" v-if="!isHideDownloadBtn">
            <i class="ni ni-cloud-download-95" aria-hidden="true"></i>
            <span class="hidden-sm-down">Download Excel</span>
          </base-button> -->
          <div @click.stop="downloadRow" type="submit" class="btn btn-xl btn-success" >Export Data</div> 
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
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
        <transition name="fade" mode="out-in">
          <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
            <br />
           <!-- <center>-->
              <half-circle-spinner
                :animation-duration="1000"
                :size="60"
                color="#ff1d5e"
              />
          <!--  </center>-->
          </div>
          <div key="2" v-if="isError" class="text-center p-5">
            <!--  <center> -->
              <img
                alt="Error Image"
                src="/images/undraw_cancel_u1it.svg"
                height="300px"
                class="img-responsive"
              />
            <!--  </center>-->
            <br />
           <!-- <center>
              <h1>Error, silahkan coba lagi.</h1>
            </center>-->

           <!-- <div style="text-align: center;">
             <h1>Error, silahkan coba lagi.</h1>
          </div> -->
          <div style="display: flex; margin-top: 20px !important; justify-content: center;">
            <h1 class="text-center">Error, silahkan coba lagi.</h1>
                </div>
          </div>
          <div key="2" v-if="isShow">
            <div>
              <div
                class="row-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
              >
                <div class="col-2">
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
                <div class="col-6">
                  <div class="row">
                    <div class="col-4 pr-0">
                      <el-select
                        class="select-primary pagination-select"
                        v-model="currentColumnSearched"
                        placeholder="Per page"
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
                    <div class="col-8 pl-1">
                      <base-input
                        v-model="searchData"
                        append-icon="fas fa-search"
                        placeholder="Search..."
                      ></base-input>
                    </div>
                  </div>
                </div>
              </div>
              <el-table
                :data="item"
                header-row-class-name="thead-light"
                class="table-responsive table-flush"
                @sort-change="sortChange"
              >
                <!-- <el-table-column
                  v-for="column in tableColumns"
                  :key="column.label"
                  v-bind="column"
                >
                </el-table-column>-->
                <el-table-column
                  label="No."
                  min-width="100px"
                  sortable="custom"
                  prop="no"
                >
                  <template v-slot="{ row }">{{
                    item.indexOf(row) + meta.from
                  }}</template>
                </el-table-column>
                <el-table-column
                  label="Nama AXI"
                  min-width="200px"
                  prop="profile.nama"
                  sortable="custom"
                >
                  <template
                    v-slot="{ row }"
                    v-if="this.role != 'Reporting Telecenter'"
                  >
                    <!-- <router-link :to="{ name: 'details axi', params: { id: row.id }}">{{row.name}}</router-link> -->
                    <!-- <a v-bind:href="'/administrator/requests/'+ row.id +'/detail'"> -->
                    <router-link
                      :to="{
                        name: 'details axi new',
                        params: {
                          id: row.attributes.profile_id,
                          axi_id: row.attributes.nomor_axi_id,
                        },
                      }"
                    >
                      <!-- {{row.attributes.nama}} -->
                      {{
                        getIncluded(
                          "profiles",
                          row.relationships.profile.data,
                          "nama"
                        )
                      }}
                    </router-link>
                    <!-- </a> -->
                  </template>
                  <template v-slot="{ row }" v-else>
                    <!-- <router-link :to="{ name: 'details axi', params: { id: row.id }}">{{row.name}}</router-link> -->
                    <!-- <a v-bind:href="'/administrator/requests/'+ row.id +'/detail'"> -->
                    <!-- {{row.attributes.nama}} -->
                    {{
                      getIncluded(
                        "profiles",
                        row.relationships.profile.data,
                        "nama"
                      )
                    }}
                    <!-- </a> -->
                  </template>
                </el-table-column>
                <el-table-column
                  label="AXI ID"
                  min-width="220px"
                  prop="nomor_axi_id"
                  sortable="custom"
                >
                  <template v-slot="{ row }">{{
                    row.attributes.nomor_axi_id
                  }}</template>
                </el-table-column>
                <el-table-column
                  label="Nomor Handphone"
                  min-width="220px"
                  prop="nomor_handphone"
                  sortable="custom"
                  v-if="this.role == 'Reporting Telecenter'"
                >
                  <template v-slot="{ row }">{{
                    getIncluded(
                      "profiles",
                      row.relationships.profile.data,
                      "no_hp"
                    ) | convertPhoneNumber
                  }}</template>
                </el-table-column>
                <el-table-column
                  label="AXI Mentor"
                  min-width="200px"
                  prop="axi_id_reff"
                  sortable="custom"
                >
                  <template v-slot="{ row }">
                    {{
                      row.attributes.axi_id_reff
                        ? row.attributes.axi_id_reff
                        : "-"
                    }}
                    <!-- {{ getIncluded('detailAxi', row.relationships.detailAxi.data[0], 'axi_id_reff') }} -->
                  </template>
                </el-table-column>
                <el-table-column
                  label="Email"
                  min-width="200px"
                  prop="profiles.email"
                  sortable="custom"
                >
                  <template v-slot="{ row }">{{
                    getIncluded(
                      "profiles",
                      row.relationships.profile.data,
                      "email"
                    )
                      ? getIncluded(
                          "profiles",
                          row.relationships.profile.data,
                          "email"
                        )
                      : "-"
                  }}</template>
                </el-table-column>
                <el-table-column
                  label="Tanggal Daftar"
                  min-width="180px"
                  prop="tanggal_daftar"
                  sortable="custom"
                >
                  <template v-slot="{ row }">{{
                    row.attributes.tanggal_daftar | convertDate
                  }}</template>
                </el-table-column>
                <el-table-column
                  label="Tanggal Approve"
                  min-width="180px"
                  prop="tanggal_approve"
                  sortable="custom"
                >
                  <template v-slot="{ row }">{{
                    row.attributes.tanggal_approve | convertDate
                  }}</template>
                </el-table-column>
                <el-table-column
                  label="Tanggal Masa Aktif"
                  min-width="180px"
                  prop="tanggal_masa_aktif"
                  sortable="custom"
                >
                  <template v-slot="{ row }">{{
                    row.attributes.tanggal_masa_aktif | convertMonthYear
                  }}</template>
                </el-table-column>
                <el-table-column
                  label="Dibuat Pada"
                  min-width="180px"
                  prop="created-at"
                  sortable="custom"
                >
                  <template v-slot="{ row }">{{
                    row.attributes["created-at"] | convertDate
                  }}</template>
                </el-table-column>
                <!-- <el-table-column prop="id" min-width="150px" label="Aksi">
                  <template v-slot="{row}" class="d-flex">
                    <base-button
                      @click.native="downloadRow(row)"
                      class="like btn-link text-white"
                      type="info"
                      size="sm"
                      icon>
                      Download
                    </base-button>
                  </template>
                </el-table-column>-->
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
                    >&nbsp; &nbsp; {{ selectedRows.length }} rows selected</span
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
        </transition>
      </card>
    </div>
    <form @submit.prevent="updateRow">
      <modal :show.sync="showModal">
        <template slot="header">
          <h5 class="modal-title">Edit Data</h5>
        </template>
        <!-- <transition name="fade" mode="out-in"> -->
        <div key="1" v-if="!isModalProcess">
          <div class="form-group" v-if="currentRow.attributes">
            <div class="row">
              <label
                for="nama_axi"
                class="col-md-4 col-form-label form-control-label"
                >Nama AXI</label
              >
              <div class="col-md-8">
                <base-input
                  alternative
                  id="axi_id"
                  v-model="currentRow.attributes.nama"
                  required
                ></base-input>
              </div>
            </div>
            <div class="row">
              <label
                for="axi_id"
                class="col-md-4 col-form-label form-control-label"
                >AXI ID</label
              >
              <div class="col-md-8">
                <base-input
                  alternative
                  id="axi_id"
                  v-model="currentRow.attributes.nomor_axi_id"
                  required
                ></base-input>
              </div>
            </div>
            <div class="row">
              <label
                for="area"
                class="col-md-4 col-form-label form-control-label"
                >AXI Mentor</label
              >
              <div class="col-md-8">
                <base-input
                  alternative
                  id="axi_id"
                  v-model="currentRow.attributes.axi_id_reff"
                  required
                ></base-input>
              </div>
            </div>
            <div class="row">
              <label
                for="cabang"
                class="col-md-4 col-form-label form-control-label"
                >E-mail</label
              >
              <div class="col-md-8">
                <base-input
                  alternative
                  id="axi_id"
                  v-model="currentRow.attributes.email"
                  required
                ></base-input>
              </div>
            </div>
          </div>
        </div>
        <div key="2" v-if="isModalProcess" class="text-center p-5" style="display: flex; justify-content: center;">
          <!-- <center><fulfilling-bouncing-circle-spinner
              :animation-duration="2000"
              :size="60"
              color="#ff1d5e"
          /></center>-->
          <!-- <center> -->
            <half-circle-spinner
              :animation-duration="1000"
              :size="60"
              color="#ff1d5e"
            />
          <!-- </center> -->
        </div>
        <!-- </transition> -->
       <!-- <template slot="footer" v-if="!isModalProcess">
          <base-button type="secondary" @click="showModal = false"
            >Tutup</base-button
          >
          <button type="submit" class="btn btn-primary">Simpan</button>
        </template>-->
      </modal>
    </form>
    <el-form>
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
                 :enabled="datePickerExport == ''"
                 @click="downloadExcel"
                >Download Excel</el-button
              >
            </div>
            <div class="col-md-6 text-center">
              <el-button type="success" :enabled="!wasExportDataBefore"
                >Download Excel</el-button
              >
            </div> 
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="secondary" @click="showModalExport = false"
            >Tutup</el-button
          >
          <el-button type="success" @click="simpanFoto">Simpan</el-button>
        </span>
      </el-dialog>
    </el-form>
    <modal :show.sync="showModalLoading" :clickToClose="false">
       <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template>
      <!-- <h3 class="text-center">Loading</h3> -->
      <h3 class="text-center" style="display: flex; justify-content: center;">Loading</h3>
      <br />
      <!-- <center> -->
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
        />
      <!-- </center> -->
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
  Dropdown,
} from "element-ui";
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import { BasePagination } from "@/components";
import swal from "sweetalert2";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import "moment/locale/id";
import {
  HalfCircleSpinner,
  FulfillingBouncingCircleSpinner,
} from "epic-spinners";
// import _ from "lodash";

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
    HalfCircleSpinner,
    FulfillingBouncingCircleSpinner,
  },
  data() {
    return {
      item: [],
      dataIncluded: [],
      columnSearched: [
        // { name: 'All', value: 'all' },
        { name: "Nama AXI", value: "nama" },
        { name: "AXI ID", value: "nomor_axi_id" },
        { name: "AXI Mentor", value: "axi_id_reff" },
        { name: "E-mail", value: "email" },
        // { name: 'Dibuat pada', value: 'created_at' }
      ],
      currentColumnSearched: "nama",
      selectedRows: [],
      startDate: moment().format("LL"),
      endDate: moment().format("LL"),
      from: moment().format("LL"),
      to: moment().format("LL"),
      opens: "left", //which way the picker opens, default "center", can be "left"/"right"
      opensExport: "center", //which way the picker opens, default "center", can be "left"/"right"
      locale: {
        direction: "ltr", //direction of text
        format: "MMM DD, YYYY", //fomart of the dates displayed
        separator: " - ", //separator between the two ranges
        applyLabel: "Apply",
        cancelLabel: "Cancel",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
        monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
        firstDay: 1, //ISO first day of week - see moment documenations for details
        showWeekNumbers: true, //show week numbers on each row of the calendar
      },
      ranges: {
        //default value for ranges object (if you set this to false ranges will no be rendered)
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "This month": [moment().startOf("month"), moment().endOf("month")],
        "This year": [moment().startOf("year"), moment().endOf("year")],
        "Last week": [
          moment().subtract(1, "week").startOf("week"),
          moment().subtract(1, "week").endOf("week"),
        ],
        "Last month": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
      showModal: false,
      showModalExport: false,
      isModalProcess: false,
      currentRow: "",
      searchData: "",
      perPageCurrent: 10,
      perPageOptions: [5, 10, 25],
      datePicked: "",
      datePickerExport: {
        startDate: "",
        endDate: "",
      },
      meta: {
        current_page: 1,
        per_page: "",
        from: "",
        to: "",
        total: "",
        last_page: "",
      },
      isLoading: true,
      showModalLoading: false,
      isError: false,
      isShow: false,
      isFirst: true,
      wasExportDataBefore: false,
      columnClicked: {
        order: "desc",
        property: "created-at",
      },
      isHideDownloadBtn: true,
      interval: null,
      countInterval: 0,
    };
  },
  computed: {
    ...mapGetters("axi", ["axis", "included"]),
    role() {
      return window.localStorage.getItem("role");
    },
  },
  methods: {
    ...mapActions("axi", [
      "getAxis",
      "getAxisQueried",
      "getAxisQueriedSingleService",
      "updateAxi",
      "exportAxi",
      "exportAxiDate",
    ]),
    ...mapActions("auth", ["checkAuth", "refreshToken"]),
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
        }
        // } else if (res.response.status == 408) {
        //   this.$router.push('/administrator/settings/help')
        // }
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
      data.status = 32;
      data.include = "profile";
      data.pageSize = this.perPageCurrent;
      data.searchAll = this.searchData;
      data.pageNumber = 1;
      data.property = this.columnClicked.property;
      data.order = this.columnClicked.order;

      let res = JSON.parse(
        JSON.stringify(await this.getAxisQueriedSingleService(data))
      );
      if (res.name != "Error") {
        this.item = JSON.parse(JSON.stringify(this.axis));
        this.dataIncluded = this.included
          ? JSON.parse(JSON.stringify(this.included))
          : this.included;

        this.assignMeta(res.meta.page);

        this.isShow = true;
        this.isLoading = false;
      } else {
        this.isError = true;
        this.isLoading = false;
      }
    },

    async assignData() {
      this.isShow = false;
      this.isError = false;
      this.isLoading = true;

      let data = {};
      data.status = 32;
      // data.include = "accounts,profiles,npwps,branch"
      data.include = "profile";
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

      let res = await this.getAxisQueriedSingleService(data);
      if (res.name != "Error") {
        this.item = JSON.parse(JSON.stringify(this.axis));
        this.dataIncluded = this.included
          ? JSON.parse(JSON.stringify(this.included))
          : this.included;

        this.assignMeta(res.meta.page);

        this.isShow = true;
        this.isLoading = false;
      } else {
        this.isError = true;
        this.isLoading = false;
        this.isShow = false;
      }
    },

    assignMeta(metaPage) {
      this.meta.current_page = metaPage["current-page"];
      this.meta.per_page = metaPage["per-page"];
      this.meta.from = metaPage["from"];
      this.meta.to = metaPage["to"];
      this.meta.total = metaPage["total"];
      this.meta.last_page = metaPage["last-page"];
    },

    // Get data from included
    getIncluded(type, detail, attr) {
      if (detail == null) {
        return "";
      } else {
        var result = this.dataIncluded.find((obj) => {
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

    async changePage() {
      await this.assignData();
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
        // this.datePickerExport = "";
        // this.datePickerExport.startDate = null;
        // this.datePickerExport.endDate = null;
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

    handleCommand(command) {
      if (command == "edit") {
      } else {
        alert("Download Button Clicked");
      }
    },

    editModal(row) {
      this.showModal = true;
      this.currentRow = JSON.parse(JSON.stringify(row));
      this.$set(
        this.currentRow.attributes,
        "nama",
        this.getIncluded("profiles", row.relationships.profile.data, "nama")
      );
      this.$set(
        this.currentRow.attributes,
        "email",
        this.getIncluded("profiles", row.relationships.profile.data, "email")
      );
    },

    async updateRow() {
      this.isModalProcess = true;
      this.currentRow.attributes.profile_id = this.currentRow.relationships.profile.data.id;
      this.currentRow.attributes.npwp_id = this.currentRow.relationships.npwp.data.id;
      const res = JSON.parse(
        JSON.stringify(await this.updateAxi(this.currentRow))
      );

      this.showModal = false;
      this.isModalProcess = false;
      const that = this;

      if (res.name != "Error") {
        swal("Sukses", "Berhasil memproses data", "success")
          .then(function () {
            that.changePage();
          })
          .catch(function (error) {});
      } else {
        swal("Error", "Edit data gagal, mohon coba lagi", "error")
          .then(function () {})
          .catch(function (error) {});
      }
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
      let data = {};
      if (this.searchData != "") {
        if (this.currentColumnSearched == "all") {
          data.searchAll = this.searchData;
        } else {
          data.searchAll = "";
          data.searchColumn = {
            column: this.currentColumnSearched,
            searchData: this.searchData,
          };
        }
      } else {
        data.searchAll = this.searchData;
      }
      data.status = 32;
      data.include = "profile";
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

      this.isShow = false;
      this.isLoading = true;

      let res = JSON.parse(
        JSON.stringify(await this.getAxisQueriedSingleService(data))
      );
      if (res.name != "Error") {
        this.item = JSON.parse(JSON.stringify(this.axis));
        this.dataIncluded = this.included
          ? JSON.parse(JSON.stringify(this.included))
          : this.included;

        this.assignMeta(res.meta.page);

        this.isShow = true;
        this.isLoading = false;
      } else {
        this.isError = true;
        this.isLoading = false;
      }
    },

    searchByColumn() {
      if (this.searchData != "") this.searchDatas();
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

    sortChange(sortProps) {
      this.headerClick(sortProps.column, event); //optional: trigger header-click event
    },

    async getDataColumnClicked() {
      this.assignData();
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

    // Download Excel method
    downloadExcel() {},
    async downloadRow() {
      this.showModalLoading = true;
      
      let payload = {}
      payload.from = this.datePicked.startDate
        ? moment(this.datePicked.startDate).format("YYYY-MM-DD")
        : "";
      payload.to = this.datePicked.endDate
        ? moment(this.datePicked.endDate).format("YYYY-MM-DD")
        : "";
      let res = await this.exportAxi(payload);
      if (res == "OK") {
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
    processExport() {
      this.countInterval = 0;
      this.interval = setInterval(
        function () {
          this.countInterval++;
        }.bind(this),
        1000
      );
    },
  },

  // Watch Method(s) called when value on data (above) changed.
  watch: {
    searchData: function () {
      this.debouncedGetData();
    },
    perPageCurrent: function () {
      this.searchDatas();
    },
    datePicked: function () {
      this.dateRangePicked();
    },
    "meta.current_page": function () {
      this.changePage();
    },
    currentColumnSearched: function () {
      this.searchByColumn();
    },
    countInterval: function () {
      if (this.countInterval == 5) {
        clearInterval(this.interval);
      }
    },
  },

  // Created called when Vue Instance created
  async created() {
    await this.permissionAuth();
    this.getData();
    this.debouncedGetData = _.debounce(this.searchDatas, 3000);
  },

  // Called when Vue Instance created
  filters: {
    convertDate(date) {
      return moment(date).format("LLLL");
    },
    convertPhoneNumber(val) {
      if (val != null && val.startsWith("62")) {
        return val.replace("62", "0");
      }
    },
    convertMonthYear(date){
      return moment(date).format("MMMM YYYY");
    }
  },
  mounted() {},
  beforeDestroy: function () {
    clearInterval(this.interval);
  },
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
