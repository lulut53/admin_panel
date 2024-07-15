<template>
  <div>
    <base-header type>
      <div class="row align-items-center py-4">
        <div class="col-lg-12">
          <h6 class="h2 d-inline-block mb-0">
            Pengajuan Cicilan - List Order Pengajuan
          </h6>
        </div>
      </div>
    </base-header>

    <base-header class="pb-6" type>
      <div class="row align-items-center pb-4">
        <div class="col-lg-6">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard">
                  <i class="fas fa-home" /> Administrator
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Pengajuan Cicilan
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                List Order Pengajuan
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="card">
        <div class="card-body">
          <div class="row table-filter" v-if="table.selected.length === 0">
            <div class="col-md-2">
              <base-input>
                <label>
                  <select
                    class="form-control text-primary border-0 h-unset"
                    v-model="meta.per_page"
                    @change="limitEntryChanges"
                  >
                    <option value="5">5 Entries</option>
                    <option value="15">15 Entries</option>
                    <option value="25">25 Entries</option>
                  </select>
                </label>
              </base-input>
            </div>
            <div
              class="col-md-10 d-flex align-items-center justify-content-end search-filter"
            >
              <base-input style="min-width: 75px">
                <select
                  class="form-control"
                  v-model="redeem.search_filter"
                  @change="setFilter($event)"
                >
                  <!-- <option value="all" selected>Semua</option> -->
                  <option value="orderId" selected>Order ID</option>
                  <option value="axiId" selected>AXI ID</option>
                  <option value="area" selected>Area</option>
                  <option value="namaNasabah" selected>Nama Nasabah</option>
                  <option value="orderdate" selected>Tanggal Order</option>
                </select>
              </base-input>
              <div v-if="redeem.search_filter === 'orderId'">
                <base-input
                  placeholder="Search..."
                  class="input-search"
                  v-model="redeem.search_query"
                >
                  <template slot="append">
                    <i class="fa fa-search" />
                  </template>
                </base-input>
              </div>
              <div v-else-if="redeem.search_filter === 'namaNasabah'">
                <base-input
                  placeholder="Search..."
                  class="input-search"
                  v-model="redeem.search_query"
                >
                  <template slot="append">
                    <i class="fa fa-search" />
                  </template>
                </base-input>
              </div>
              <div v-else-if="redeem.search_filter === 'axiId'">
                <base-input
                  placeholder="Search..."
                  class="input-search"
                  v-model="redeem.search_query"
                >
                  <template slot="append">
                    <i class="fa fa-search" />
                  </template>
                </base-input>
              </div>
              <div v-else-if="redeem.search_filter === 'area'" class="col-md-6">
                <b-select
                  v-model="redeem.search_query"
                  :options="area_lists"
                ></b-select>
              </div>
              <div
                class="col-lg-5"
                v-else-if="redeem.search_filter === 'orderdate'"
              >
                <el-date-picker
                  v-model="redeem.search_query"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                ></el-date-picker>
                <!-- <date-range-picker
                  v-model="datePicked"
                  ref="picker"
                  :locale-data="locale"
                  :opens="opens"
                  class="pr-2"
                >
                </date-range-picker>-->
                <!-- <base-button
                  class="btn btn-xl mr-4"
                  type="secondary"
                  @click="dateRangeClear"
                >
                  <span class="hidden-sm-down">Clear Date</span>
                </base-button>-->
              </div>
            </div>
          </div>
          <br />
          <transition name="fade" mode="out-in">
            <div key="1" v-if="table.isBusy" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
              <br />
              <!-- <center> -->
                <half-circle-spinner
                  :animation-duration="1000"
                  :size="60"
                  color="#ff1d5e"
                />
              <!-- </center> -->
            </div>
            <div key="2" v-if="table.isError" class="text-center p-5">
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
                <div style="display: flex; margin-top: 20px !important; justify-content: center;">
                <h1 class="text-center">Error, silahkan coba lagi.</h1>
              <!-- </center> -->
                </div>
            </div>

            <div key="2" v-if="!table.isBusy">
              <b-table
                responsive
                hover
                selectable
                class="thead-warning"
                select-mode="multi"
                selectedVariant="success"
                :busy="table.isBusy"
                :items="table.items"
                :fields="table.fields"
                @row-clicked="myRowClickHandler"
              >
                <template v-slot:cell(nomor)="data">{{
                  calculateByPage() + data.index
                }}</template>

                <div slot="table-busy" class="text-danger my-2">
                  <b-spinner class="align-middle" />
                  <strong>Loading...</strong>
                </div>
                <template v-slot:cell(area)="data">
                  <p>{{ data.item.area }} / {{ data.item.cabang }}</p>
                </template>
                <template v-slot:cell(Status)="data">
                  <!-- <b-badge variant="primary">permohonan</b-badge> -->
                  <b-badge
                    v-if="data.item.statusId === '15'"
                    variant="primary"
                    >{{ data.item.status }}</b-badge
                  >
                  <b-badge
                    v-else-if="data.item.statusId === '83'"
                    variant="success"
                    >{{ data.item.status }}</b-badge
                  >
                  <b-badge
                    v-else-if="data.item.statusId === '82'"
                    variant="danger"
                    >{{ data.item.status }}</b-badge
                  >
                  <b-badge v-else variant="warning">{{
                    data.item.status
                  }}</b-badge>
                </template>
                <template v-slot:cell(action)="data">
                  <!-- @click="openEdit(data.item)" -->
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    id="show-btn"
                    @click="openEdit(data.item)"
                  >
                    <router-link
                      :to="{
                        name: 'List Order Pengajuan Detail',
                        params: { id: data.item.orderId },
                      }"
                      >Detail</router-link
                    >
                  </b-button>
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    id="status-btn"
                    @click="openStatusModal(data.item)"
                  >
                    Edit Status
                  </b-button>
                </template>
              </b-table>

              <p class="text-center m-5" v-if="table.items.length === 0">
                Tidak ada data.
              </p>

              <div class="card-footer py-4 d-flex justify-content-between">
                <div class>
                  <p class="card-category">
                    Menampilkan {{ pagination.from }} hingga
                    {{ pagination.to }} dari {{ pagination.total }} data
                  </p>
                </div>

                <base-pagination
                  v-model="meta.current_page"
                  :total="pagination.total"
                  :perPage="parseInt(meta.per_page)"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <modal :show.sync="showStatusModal" :clickToClose="false">
      <h3>Edit Status</h3>
      <div class="row">
        <div class="col-sm-4">
          <h4>Order ID:</h4>
        </div>
        <div class="col-sm">
          <h4>{{ modal.orderId }}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <h4>Nama AXI:</h4>
        </div>
        <div class="col-sm">
          <h4>{{ modal.nama }}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <h4>Status:</h4>
        </div>
        <div class="col-sm">
          <base-input>
            <label>
              <b-select
                v-model="modal.status_selected"
                :options="statusList"
              ></b-select>
            </label>
          </base-input>
        </div>
      </div>
      <b-button
        size="md"
        variant="primary"
        id="submit-btn-status-modal"
        class="float-right"
        @click="submitModalStatus()"
        >Save</b-button
      >
      <b-button
        size="md"
        variant="outline-primary"
        id="close-btn-status-modal"
        class="float-right mr-3"
        @click="closeModal()"
        >Cancel</b-button
      >
    </modal>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
// import datePicker from "vue-bootstrap-datetimepicker";
// import DateRangePicker from "vue2-daterange-picker";
// import "vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css";
import dataOrder from "./data";
import itemOrder from "./item";
import axios from "axios";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import swal from "sweetalert2";

export default {
  data() {
    return {
      table: {
        fields: [
          {
            label: "No",
            key: "nomor",
          },
          {
            label: "Order Id",
            key: "orderId",
          },
          {
            label: "Nama AXI",
            key: "axiName",
          },
          {
            label: "AXI ID",
            key: "nomorAxiId",
          },
          {
            label: "Nama Nasabah",
            key: "namaNasabah",
          },
          {
            label: "Area / Cabang",
            key: "area",
          },
          {
            label: "Nama Program",
            key: "program",
          },
          {
            label: "Voucher Code",
            key: "voucherCode",
          },
          {
            label: "Count",
            key: "countView",
          },
          {
            label: "Status",
            key: "Status",
          },
          {
            label: "dibuat pada",
            key: "tanggalOrder",
          },
          {
            label: "Action",
            key: "action",
          },
        ],
        items: null,
        selected: [],
        isError: false,
        isBusy: true,
      },
      showStatusModal: false,
      value1: [],
      startDate: "",
      endDate: "",
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
      redeem: {
        search_query: "",
        search_filter: "orderId",
      },
      pagination: "",
      datePicked: "",
      datePickerExport: {
        startDate: "",
        endDate: "",
      },
      token: "",
      axi: [],
      date: new Date(),
      options: {
        format: "DD/MM/YYYY",
        useCurrent: false,
      },
      form: {
        orderid: "",
        axiid: "",
        nama: "",
        tanggal: "",
        status: "new",
        count: null,
      },
      meta: {
        per_page: 5,
        page: 1,
        current_page: 1,
        last_page: 5,
      },
      orderidState: null,
      axiidState: null,
      nameState: null,
      tanggalOrderState: null,
      countState: null,
      statusState: null,
      submittedNames: [],
      selected: "new",
      area_lists: [],
      radioOptions: [
        { text: "New", value: "NEW" },
        { text: "Survey", value: "SURVEY" },
        { text: "Batal", value: "BATAL" },
        { text: "Pending", value: "PENDING" },
      ],
      dataGet: [],
      modal: {
        orderId: "",
        nama: "",
        status_selected: "",
      },
      statusList: [],
    };
  },

  // watch: {
  //   datePicked: function() {
  //     this.dateRangePicked();
  //   }
  // },
  mounted() {
    this.getListOrder();
    this.getListStatus();
    // axios
    //   .get("https://dev.dicicilaja.com/v2/orderIn/axiOrderList")
    //   .then(response => {
    //     console.log(response);
    //     this.table.items = response.data.data;
    //     this.pagination = response.data.meta;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     // this.errored = true;
    //   })
    //   .finally(() => (this.table.isBusy = false));
  },
  computed: {
    ...mapGetters("transaksi", ["transactionStatusList"]),
    page() {
      return this.meta.current_page;
    },
    query() {
      return this.redeem.search_query;
    },
  },
  watch: {
    page() {
      this.getListOrder();
      this.getListStatus();
    },
    query() {
      this.getListOrder();
      this.getListStatus();
    },
  },
  methods: {
    ...mapActions("transaksi", [
      "getTransactionStatusList",
      "postTransactionStatus",
    ]),
    async getListOrder() {
      this.table.isBusy = true;
      try {
        if (this.redeem.search_filter !== "orderdate") {
          let listOrder = await this.$api.get(
            `${this.$store.state.order_list_base_url}?pageNo=${
              this.meta.current_page
            }&pageSize=${this.meta.per_page}${
              this.redeem.search_query
                ? `&filter=${this.checkSearchFilter(
                    this.redeem.search_filter
                  )}&filterValue=${this.redeem.search_query}`
                : ""
            }`
          );
          this.table.items = listOrder.data.data;
          this.pagination = listOrder.data.meta;

          this.table.isBusy = false;
        } else if (this.redeem.search_filter === "orderdate") {
          let startDate = moment(this.redeem.search_query[0]).format(
            "YYYY-MM-DD"
          );
          let endDate = moment(this.redeem.search_query[1]).format(
            "YYYY-MM-DD"
          );
          // console.log(startDate, endDate);
          // console.log(this.redeem.search_query);

          let listOrder = await this.$api.get(
            `${this.$store.state.order_list_base_url}?pageNo=${
              this.meta.current_page
            }&pageSize=${this.meta.per_page}${
              this.redeem.search_query
                ? `&filter=${this.checkSearchFilter(
                    this.redeem.search_filter
                  )}&startDate=${startDate}&endDate=${endDate}`
                : ""
            }`
          );
          this.table.items = listOrder.data.data;
          this.pagination = listOrder.data.meta;

          this.table.isBusy = false;
        } else if (this.redeem.search_filter !== "area") {
          let listOrder = await this.$api.get(
            `${this.$store.state.order_list_base_url}?pageNo=${
              this.meta.current_page
            }&pageSize=${this.meta.per_page}${
              this.redeem.search_query
                ? `&filter=${this.checkSearchFilter(
                    this.redeem.search_filter
                  )}&filterValue=${this.redeem.search_query}`
                : ""
            }`
          );
          this.table.items = listOrder.data.data;
          this.pagination = listOrder.data.meta;

          this.table.isBusy = false;
        }

        // console.log(listOrder);
      } catch (error) {
        this.table.isBusy = false;
        throw new Error("Something went wrong " + error);
      }
    },
    async getListStatus() {
      try {
        let res = JSON.parse(
          JSON.stringify(await this.getTransactionStatusList())
        );

        if (res) {
          // this.statusList = res;
          // console.log(res.map(item => iem.id));
          this.statusList = res.map((item) => ({
            value: item.id,
            text: item.nama,
          }));
        }
      } catch (error) {
        throw new Error("Something went wrong " + error);
      }
    },
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

    async openStatusModal(record, index) {
      this.modal.orderId = record.orderId;
      this.modal.nama = record.axiName;
      this.modal.status_selected = record.statusId;
      this.showStatusModal = true;
    },

    closeModal() {
      this.showStatusModal = false;
    },

    limitEntryChanges() {
      this.meta.current_page = 1;
      this.getListOrder();
      this.getListStatus();
    },

    calculateByPage() {
      return (
        this.meta.current_page * this.meta.per_page - this.meta.per_page + 1
      );
    },

    checkSearchFilter(filter) {
      // console.log(filter);

      if (filter === "orderId") {
        return "orderId";
      }
      if (filter === "axiId") {
        return "axiId";
      }
      if (filter === "area") {
        return "area";
      }
      if (filter === "namaNasabah") {
        return "namaNasabah";
      }
      if (filter === "orderdate") {
        return "orderdate";
      } else {
        return "";
      }
    },

    myRowClickHandler(record, index) {
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      // This will be the item data for the row
      // console.log(record);
    },
    async openEdit(record, index) {
      // this.$refs["my-modal"].show();

      (this.form.orderid = record.orderId),
        (this.form.axiid = record.nomorAxiId),
        (this.form.nama = record.axiName),
        (this.form.tanggal = record.tanggalOrder),
        (this.form.status = record.status),
        (this.form.count = record.count);
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      // This will be the item data for the row
      // console.log(record);

      let data = {
        orderId: record.orderId,
        program: record.program,
        voucherCode: record.voucherCode || 'N/A',
        colleteral: record.collateral,
        manufacturer: record.manufacturer,
        year: record.year,
        tenor: record.tenor,
        ammount: record.amount,
        finalAmmount: record.finalAmount,
        area: record.area,
        branch: record.cabang,
        zipCode: record.zipcode,
        clientName: record.namaNasabah,
        hp: record.noHp,
        email: record.email,
        address: record.address,
        district: record.kecamatan,
        city: record.kabupaten,
        province: record.provinsi,
        crhName: record.crhName,
        crhEmail: record.crhEmail,
        branchCode: record.branchCode,
        areaCode: record.areaCode,
        axiId: record.nomorAxiId,
        orderDate: record.tanggalOrder,
        janjiSurvey: record.janjiSurvey,
        requestJson: "",
      };

      // if (record.status === "NEW") {
      //   const url = `${this.$store.state.post_orderin_base_url}`;
      //   const token = `${this.$store.state.token}`;
      //   const method = "POST";
      //   const headers = {
      //     Accept: "application/json",
      //     // Accept: "application/vnd.api+json",
      //     // "Access-Control-Allow-Origin": "*",
      //     Authorization: `Bearer ${token}`
      //   };
      //   let formData = data;

      //   const config = {
      //     url,
      //     // body,
      //     method,
      //     data: formData,
      //     headers
      //   };
      //   try {
      //     const response = await axios(config);
      //     return response;
      //   } catch (e) {
      //     return e;
      //   }
      // } else
      // if (record.status !== "NEW") {
      //   const url = `${this.$store.state.update_orderin_base_url}/${record.orderId}`;
      //   const token = `${this.$store.state.token}`;
      //   const method = "GET";
      //   const headers = {
      //     Accept: "application/json",
      //     Authorization: `Bearer ${token}`
      //   };
      //   // let countView = record.countView + 1;
      //   // let formData = { ...data, countView };

      //   const config = {
      //     url,
      //     // body,
      //     method,
      //     // data: formData,
      //     headers
      //   };
      //   try {
      //     const response = await axios(config);
      //     // return response;
      //     this.dataGet = response.data;
      //     // console.log(this.dataGet);
      //   } catch (e) {
      //     return e;
      //   }
      // }
      // console.log(this.dataGet);
      // if (this.dataGet) {
      //   const url = `${this.$store.state.update_orderin_base_url}/surveyStatus/${record.orderId}`;
      //   const token = `${this.$store.state.token}`;
      //   const method = "PATCH";
      //   const headers = {
      //     Accept: "application/json",
      //     Authorization: `Bearer ${token}`
      //   };
      //   let countView = record.countView + 1;
      //   let formData = { ...this.dataGet, countView };

      //   const config = {
      //     url,
      //     // body,
      //     method,
      //     data: formData,
      //     headers
      //   };
      //   try {
      //     const response = await axios(config);
      //     return response;
      //   } catch (e) {
      //     return e;
      //   }
      // }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.orderidState = valid;
      this.axiidState = valid;
      this.nameState = valid;
      this.tanggalOrderState = valid;
      this.countState = valid;
      this.statusState = valid;
      return valid;
    },
    resetModal() {
      this.form.orderid = "";
      this.form.axiid = "";
      this.form.nama = "";
      this.form.tanggal = "";
      this.form.status = "";
      this.form.count = "";
      this.orderidState = null;
      this.axiidState = null;
      this.nameState = null;
      this.tanggalOrderState = null;
      this.countState = null;
      this.statusState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(
        this.form.orderid,
        this.form.axiid,
        this.form.nama,
        this.form.tanggal,
        this.form.status,
        this.form.count
      );
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
      // console.log(this.submittedNames);
    },
    async setFilter(event) {
      // console.log(event.target.value);
      if (event.target.value === "area") {
        let area = await this.$api.get(
          `${this.$store.state.area_base_url}/areas`
        );
        this.area_lists = area.data.data.map((item) => {
          return {
            value: item.id,
            text: item.attributes.nama,
          };
        });
      }

      return (this.redeem.search_query = "");
    },
    async saveTransactionStatus() {
      try {
      } catch (e) {
        throw new Error("Something went wrong " + e);
      }
    },

    async submitModalStatus() {
      if (!this.modal.status_selected) {
        swal.fire("Status Order belum dipilih", "", "error");
        return;
      }
      try {
        const payload = {
          order_id: this.modal.orderId,
          status_transaksi: this.modal.status_selected,
        };
        const res = await this.postTransactionStatus(payload);
        if (res.status === 200) {
          this.showStatusModal = false;
          swal.fire("Sukses", "Status Transaksi berhasil diubah!", "success");
          this.getListOrder();
          // this.getListStatus();
        }
      } catch (e) {
        swal.fire("Gagal Merubah Status Order", "", "error");
        throw new Error("Something went wrong " + e);
      }
    },
  },
  components: {
    HalfCircleSpinner,
    // DateRangePicker,
    // datePicker
  },
};
</script>

<style>
.custom-control {
  padding-left: 2.75rem !important;
}
</style>
