<template>
  <div>
    <base-header class="pb-6" type>
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-9">
          <h6 class="h2 d-inline-block mb-0">Pendaftaran E-PKS</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard">
                  <i class="fas fa-home"></i>
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard">Administrator</router-link>
              </li>
              <li class="breadcrumb-item" aria-current="page">AXI</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div>
        <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
          <!-- <template slot="header">
            <h3 class="mb-0">Paginated tables</h3>
            <p class="text-sm mb-0">
              This is a client side example of paginated tables using element-ui tables.
            </p>
          </template>-->
          <div>
            <transition-group name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; justify-content: center;">
                <br />
                <!-- <center> -->
                  <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
                <!-- </center> -->
              </div>
              <div key="2" v-if="isError" class="text-center p-5" style="display: flex; justify-content: center;">
                <!-- <center> -->
                  <img
                    alt="Error Image"
                    src="/images/undraw_cancel_u1it.svg"
                    height="300px"
                    class="img-responsive"
                  />
                <!-- </center> -->
                <br />
                <!-- <center> -->
                  <h1>Error, silahkan coba lagi.</h1>
                <!-- </center> -->
              </div>
              <div key="2" v-if="isShow && !isLoading">
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
                    row-key="id"
                    header-row-class-name="thead-light"
                    class="table-responsive table-flush"
                    @sort-change="sortChange"
                  >
                    <el-table-column label="No." min-width="80px" prop="id">
                      <template v-slot="{row}">{{ item.indexOf(row) + meta.from }}</template>
                    </el-table-column>
                    <el-table-column label="Nama AXI" min-width="200px" prop="nama_axi">
                      <!-- </template> -->
                    </el-table-column>
                    <el-table-column label="Nomor AXI" min-width="150px" prop="nomor_axi_id">
                      <!-- <template
                        v-slot="{row}"
                      >{{ row.attributes.axi_id_reff ? row.attributes.axi_id_reff : '-' }}</template>-->
                    </el-table-column>
                    <el-table-column label="Nomor KTP" min-width="150px" prop="no_ktp">
                      <!-- <template
                        v-slot="{row}"
                      >{{ getIncluded('branches', row.relationships.registration_branch.data, 'nama') }}</template>-->
                    </el-table-column>
                    <el-table-column label="Status" min-width="150px" prop="status_verifikasi_data">
                      <template v-slot="{row}">
                        <badge
                          type="default"
                          v-if="row.status_verifikasi_data == 'VERIFIKASIDATA'"
                        >BARU</badge>
                        <badge type="warning" v-else>{{row.status_verifikasi_data}}</badge>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" min-width="150px" label="Aksi">
                      <template v-slot="{row}">
                        <router-link
                          :to="{
                        name: 'Detail E-PKS',
                        params: { id: row.profile_id }
                      }"
                        >
                          <base-button
                            class="like btn-link text-white"
                            type="primary"
                            size="sm"
                            icon
                          >Detail</base-button>
                        </router-link>
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
                      Showing {{ meta.from }} to {{ meta.to }} of {{ meta.total }} entries
                      <span
                        v-if="selectedRows.length"
                      >&nbsp; &nbsp; {{selectedRows.length}} rows selected</span>
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
  </div>
</template>

<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import { BasePagination } from "@/components";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css";
import swal from "sweetalert2";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import "moment/locale/id";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  components: {
    BasePagination,
    RouteBreadCrumb,
    DateRangePicker,
    HalfCircleSpinner,
  },
  data() {
    return {
      // propsToSearch: ['id', 'name', 'email', 'age'],
      // tableData: users,
      item: [],
      dataIncluded: [],
      columnSearched: [
        // { name: 'All', value: 'all' },
        { name: "Nama AXI", value: "nama" },
        // { name: "AXI Mentor", value: "axiIdReff" },
        // { name: 'Cabang Daftar', value: 'cabang_daftar' },
        { name: "Nomor AXI", value: "axiid" },
      ],
      currentColumnSearched: "nama",
      selectedRows: [],
      startDate: moment().format("LL"),
      endDate: moment().format("LL"),
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
        last_page: "",
      },
      isLoading: false,
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
      keterangan: "File excel belum tersedia di server",
      isDoneExport: true,
    };
  },
  async mounted() {
    await this.getData();
    this.debouncedGetData = _.debounce(this.getData, 1000);
    this.isLoading = false;
    this.isShow = true;
  },
  watch: {
    searchData() {
      this.debouncedGetData();
    },
    perPageCurrent() {
      this.getData();
    },
  },
  methods: {
    ...mapActions("sap", ["getListVerifikasiDataAXI"]),
    sortChange(sortProps) {
      this.headerClick(sortProps.column, event); //optional: trigger header-click event
    },
    async getData() {
      console.log("getData");
      this.isLoading = true;
      const payload = {
        pageNo: 1,
        pageSize: this.perPageCurrent,
        filter: this.currentColumnSearched,
        filterValue: this.searchData,
      };
      const data = await this.getListVerifikasiDataAXI(payload);
      console.log(data.data);
      if (data.data.length > 0) {
        this.item = data.data;
        this.assignMeta(data.meta);
        this.isLoading = false;
      } else {
        this.item = [];
        const meta = {
          current_page: 1,
          from: 1,
          last_page: 0,
          per_page: 10,
          to: 0,
          total: 0,
        };
        this.assignMeta(meta);
        this.isLoading = false;
      }
    },
    async assignMeta(metaPage) {
      console.log(metaPage);
      this.meta.current_page = metaPage.current_page;
      this.meta.per_page = metaPage.per_page;
      this.meta.from = metaPage.from;
      this.meta.to = metaPage.to;
      this.meta.total = metaPage.total;
      this.meta.last_page = metaPage.last_page;
    },
  },
};
</script>

<style>
</style>
