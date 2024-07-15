<template>
  <div>
    <base-header class="pb-6" type>
      <div class="row align-items-center py-4">
        <div class="col-lg-8 col-7">
          <h6 class="h2 d-inline-block mb-0">List Promo / Partnership</h6>
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
              <li class="breadcrumb-item" aria-current="page">Program</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-4 col-5 text-right">
          <router-link to="/administrator/program/partnership/create">
            <b-button variant="primary">Add Program</b-button>
          </router-link>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div>
        <card
          class="no-border-card"
          body-classes="px-0 pb-1"
          footer-classes="pb-2"
        >
          <div>
            <transition-group name="fade" mode="out-in">
              <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
                <br />
                <!-- <center> -->
                  <half-circle-spinner
                    :animation-duration="1000"
                    :size="60"
                    color="#ff1d5e"
                  />
                <!-- </center> -->
              </div>
              <div key="2" v-if="isError" class="text-center p-5">
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
              <div key="3" v-if="isShow">
                <div class="container" style="max-width: 100%;">
                  <div class="row d-flex align-content-between flex-wrap">
                    <div class="col-4 col-md-2 col-lg-2">
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
                    <div class="col-8 col-md-4 col-lg-4">
                      <!-- <el-select
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
                      </el-select> -->
                    </div>
                    <div class="col-4 col-md-6 col-lg-2">
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
                    <div class="col-8 col-md-6 col-lg-4">
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
                      label="Nama Program"
                      min-width="200px"
                      prop="deskripsi"
                    >
                    </el-table-column>
                    <el-table-column
                      label="Channel ID"
                      min-width="130px"
                      prop="channel_id"
                    >
                    </el-table-column>
                    <el-table-column label="Tipe" min-width="150px" prop="tipe">
                      <template v-slot="{ row }">
                        <div>
                          {{ row.tipe.toUpperCase() }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Status"
                      min-width="100px"
                      prop="status"
                    >
                      <template v-slot="{ row }">
                        <b-badge variant="primary" v-if="row.status === 1"
                          >Aktif</b-badge
                        >
                        <b-badge variant="danger" v-else>Aktif</b-badge>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Start Date"
                      min-width="180px"
                      prop="start_date"
                    >
                    </el-table-column>
                    <el-table-column
                      label="End Date"
                      min-width="180px"
                      prop="end_date"
                    >
                    </el-table-column>
                    <el-table-column prop="id" min-width="100px" label="Action">
                      <template v-slot="{ row }">
                        <el-dropdown @command="handleCommand($event, row)">
                          <span class="el-dropdown-link">
                            <i class="el-icon-more el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="edit"
                              >Edit</el-dropdown-item
                            >
                            <el-dropdown-item command="go"
                              >Goto URL</el-dropdown-item
                            >
                            <router-link
                              :to="{
                                path: 'partnership/manage-content/',
                                query: {
                                  id: row.id,
                                  program: row.program
                                }
                              }"
                            >
                              <el-dropdown-item
                                v-if="row.layout_informasi === 1"
                                >Manage Content</el-dropdown-item
                              >
                            </router-link>
                            <el-dropdown-item command="refresh"
                              >Refresh Token</el-dropdown-item
                            >
                            <el-dropdown-item divided command="delete"
                              >Delete</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
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
        <b-modal v-model="modalShow" centered title="Token">
          <div key="1" v-if="isLoading" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
            <br />
            <!-- <center> -->
              <half-circle-spinner
                :animation-duration="1000"
                :size="60"
                color="#ff1d5e"
              />
            <!-- </center> -->
          </div>
          <div class="input-group mb-3" v-else>
            <input
              type="text"
              class="form-control"
              aria-describedby="button-addon2"
              id="myInput"
              v-model="tokenCopy"
              readonly
            />
            <div class="input-group-append">
              <button
                class="btn btn-primary"
                type="button"
                id="button-addon2"
                @click="copyFunction()"
              >
                Copy Token
              </button>
            </div>
          </div>
          <div class="color-orange" v-if="isTokenCopy">Token Copied !</div>
          <template #modal-footer>
            <div class="w-100">
              <b-button
                variant="primary"
                size="sm"
                class="float-right"
                @click="modalShow = false"
              >
                close
              </b-button>
            </div>
          </template>
        </b-modal>
      </div>
    </div>
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
import { HalfCircleSpinner } from "epic-spinners";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  components: {
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
    // DateRangePicker,
    HalfCircleSpinner
  },
  data() {
    return {
      item: [],
      selectedRows: [],
      searchData: "",
      perPageCurrent: 10,
      perPageOptions: [5, 10, 25],
      filterByService: "",
      tokenCopy: "",
      isTokenCopy: false,
      modalShow: false,
      columnSearched: [
        { name: "All", value: "all" },
        { name: "Nama", value: "nama" },
        { name: "Email", value: "email" },
        { name: "Program", value: "program" },
        { name: "Tipe", value: "tipe" }
      ],
      currentColumnSearched: "all",
      isLoading: false,
      isError: false,
      isShow: true,
      meta: {
        current_page: 1,
        per_page: "",
        from: "",
        to: "",
        total: 0,
        last_page: 0
      }
    };
  },
  computed: {
    ...mapGetters("program", ["programList"])
  },
  // Watch Method(s) called when value on data (above) changed.
  watch: {
    searchData: function(value) {
      if (value !== "") {
        this.debouncedGetData();
      }
    },
    perPageCurrent: function() {
      this.searchDatas();
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
    }
  },
  // Created called when Vue Instance created
  async created() {
    // await this.permissionAuth();
    this.getData();
    this.debouncedGetData = _.debounce(this.searchDatas, 2500);
  },
  methods: {
    ...mapActions("program", [
      "getListProgram",
      "postDeleteProgram",
      "getRefreshToken"
    ]),

    // Method when sort clicked
    sortChange(sortProps) {
      this.headerClick(sortProps.column, event); //optional: trigger header-click event
    },
    copyFunction() {
      const copyText = document.getElementById("myInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      this.isTokenCopy = true;
      alert("Copied the text: " + copyText.value);
    },
    handleCommand(command, row) {
      // 
      // 
      const Action =
        command === "edit"
          ? this.commandEdit(row)
          : command === "go"
          ? this.commandGo(row)
          : command === "refresh"
          ? this.commandRefresh(row)
          : command === "delete"
          ? this.commandDelete(row)
          : "";
    },
    commandEdit(row) {
      this.$router.push({
        name: "update-partnership",
        params: { data: row }
      });
    },
    commandGo(row) {
      window.open(row.url, "_blank");
    },
    async commandRefresh(row) {
      this.modalShow = !this.modalShow;
      this.isLoading = true;
      try {
        const res = await this.getRefreshToken({ pkid: row.profile_id });
        // 
        this.isLoading = false;
        if (res.token) {
          this.tokenCopy = res.token;
        }
      } catch (error) {
        this.isLoading = false;
        throw new Error("Something went wrong " + error);
        // 
      }
    },
    async commandDelete(row) {
      const payload = {
        profile_id: row.profile_id,
        token: row.token
      };
      try {
        const res = await this.postDeleteProgram(payload);
        // 

        if (res.status === 500) {
          Swal.fire({
            title: "Ooops...!",
            text: "Sepertinya terjadi masalah. silahkan hubungi developer.",
            type: "error"
          });
        } else {
          Swal.fire({
            title: "Progress selesai!",
            text: `${res.message}`,
            type: "success"
          });
          this.getData();
        }
      } catch (error) {
        Swal.fire({
          title: "Oops...!",
          text: "Sepertinya terjadi masalah. silahkan hubungi developer.",
          type: "error"
        });
                  throw new Error("Something went wrong " + error);

      }
    },
    async getData() {
      this.isLoading = true;
      this.isShow = false;

      let data = {};
      data.filter = this.currentColumnSearched;
      data.filterValue = this.searchData;
      data.pageSize = this.perPageCurrent;
      data.pageNo = this.meta.current_page;

      try {
        let res = JSON.parse(JSON.stringify(await this.getListProgram(data)));
        // 

        if (res.data != "" || res.data.length == 0) {
          this.item = JSON.parse(JSON.stringify(this.programList.data));

          this.assignMeta(res.meta);

          this.isShow = true;
          this.isLoading = false;
          this.isError = false;
        } else {
          this.isError = true;
          this.isLoading = false;
          this.isShow = false;
        }
      } catch (error) {
                  throw new Error("Something went wrong " + error);
      }
    },
    // AXIOS here to consume datas
    async searchDatas() {
      this.isShow = false;
      this.isLoading = true;

      let data = {};
      data.filter = this.currentColumnSearched;
      data.filterValue = this.searchData;
      data.pageSize = this.perPageCurrent;
      data.pageNo = 1;

      try {
        let res = await this.getListProgram(data);
        if (res.data != "" || res.data.length == 0) {
          this.item = JSON.parse(JSON.stringify(this.programList.data));
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
      } catch (error) {
        this.isError = true;
        this.isLoading = false;
        this.isShow = false;
                  throw new Error("Something went wrong " + error);
      }
    },

    async assignData() {
      this.isShow = false;
      this.isError = false;
      this.isLoading = true;

      let data = {};
      data.filter = this.currentColumnSearched;
      data.filterValue = this.searchData;
      data.pageSize = this.perPageCurrent;
      data.pageNo = this.meta.current_page;

      let res = await this.getListProgram(data);
      if (res.data != "" || res.data.length == 0) {
        this.item = JSON.parse(JSON.stringify(this.programList.data));

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
      // 

      this.meta.current_page = metaPage.current_page;
      this.meta.per_page = metaPage.per_page;
      this.meta.from = metaPage.from;
      this.meta.to = metaPage.to;
      this.meta.total = metaPage.total;
      this.meta.last_page = metaPage.last_page;
    },
    changeFilterSearch(e) {
      // 
      this.searchData = "";
      if (e == "all") {
        this.searchByColumn();
      }
    },
    searchByColumn() {
      if (this.searchData != "") this.searchDatas();
      else if (this.searchData == "" && this.currentColumnSearched == "all")
        this.searchDatas();
    },
    // Everytime user click page on pagination, this method will called
    async changePage() {
      this.assignData();
    }
  }
};
</script>

<style></style>
