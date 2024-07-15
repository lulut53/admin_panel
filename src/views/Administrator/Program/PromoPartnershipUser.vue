<template>
  <div>
    <base-header type>
      <div class="row align-items-center py-4">
        <div class="col-lg-12">
          <h6 class="h2 d-inline-block mb-0">List Promo / Partnership API</h6>
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
              <li class="breadcrumb-item active" aria-current="page">Program</li>
              <li class="breadcrumb-item active" aria-current="page">List Promo / Partnership API</li>
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
            <div class="col-md-10 d-flex align-items-center justify-content-end search-filter">
              <b-button
                size="md"
                variant="outline-primary"
                id="create-user-btn"
              >
                <router-link
                  :to="{
                    name: 'Promo / Partnership User Detail',
                    params: { type: 'new', param: 'create' }
                  }"
                >New User</router-link>
              </b-button>
              <base-input style="min-width: 75px">
                <select
                  class="form-control"
                  v-model="redeem.search_filter"
                  @change="setFilter($event)"
                >
                  <option value="email" selected>Email</option>
                </select>
              </base-input>
              <div v-if="redeem.search_filter === 'email'">
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
            </div>
          </div>
          <br />
          <transition name="fade" mode="out-in">
            <div key="1" v-if="table.isBusy" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
              <br />
              <!-- <center> -->
                <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
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
              <div style="display: flex; margin-top: 20px !important; justify-content: center;">
              <!-- <center> -->
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
                <template v-slot:cell(nomor)="data">
                  {{ calculateByPage() + data.index }}
                </template>

                <div slot="table-busy" class="text-danger my-2">
                  <b-spinner class="align-middle" />
                  <strong>Loading...</strong>
                </div>
                <template v-slot:cell(action)="data">
                  <!-- @click="openEdit(data.item)" -->
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    id="show-btn-detail"
                    @click="openEdit(data.item)"
                  >
                    <router-link
                      :to="{
                        name: 'Promo / Partnership User Detail',
                        params: { type: 'edit', param: 'detail', id: data.item.pkid, email: data.item.email }
                      }"
                    >Edit</router-link>
                  </b-button>
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    id="show-btn-token"
                    @click="openToken(data.item)"
                  >
                    <!-- <router-link
                      :to="{
                        name: 'Promo / Partnership User Detail',
                        params: { type: 'edit', param: 'detail', id: data.item.pkid, email: data.item.email }
                      }"
                    >Token</router-link> -->
                    Token
                  </b-button>
                  <b-button
                    size="sm"
                    variant="outline-danger"
                    id="delete-btn-token"
                    @click="delToken(data.item)"
                  >
                    Delete
                  </b-button>
                </template>
              </b-table>

              <p class="text-center m-5" v-if="table.items.length === 0">Tidak ada data.</p>

              <div class="card-footer py-4 d-flex justify-content-between">
                <div class>
                  <p class="card-category">
                    Menampilkan {{ meta.from }} hingga
                    {{ meta.to }} dari {{ meta.total }} data
                  </p>
                </div>

                <base-pagination
                  v-model="meta.current_page"
                  :total="meta.total"
                  :perPage="parseInt(meta.per_page)"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <modal :show.sync="showModal" :clickToClose="false">
      <h3>Agen ID: {{ form.profileId }}</h3>
      <h3>Channel ID: {{ form.channelId }}</h3>
      <h3>Token</h3>
      <b-form-group
        id="input-group-token--readonly"
      >
        <b-input-group>
          <b-form-input
            id="token"
            name="token"
            ref="token"
            v-model="form.token"
            aria-describedby="input-token--readonly"
            disabled
          ></b-form-input>
          <b-input-group-append>
            <b-button
              size="md"
              variant="outline-primary"
              id="btn-copy-to-clipboard"
              @click="copyToClipboard(form.token)"
            ><i class="fa fa-clipboard" /> Copy</b-button>
          </b-input-group-append>
        </b-input-group>
        <p
          v-if="isTokenCopied"
          class="token-feedback">Token has been copied to clipboard</p>
      </b-form-group>
      <b-button
        size="md"
        variant="outline-primary"
        id="close-btn-modal"
        class="float-right"
        @click="closeModal()"
      >
        Close
      </b-button>
    </modal>
    <modal :show.sync="isBusy" :clickToClose="false">
      <div style="display: flex; margin-top: 20px !important; justify-content: center;">
      <!-- <center> -->
        <half-circle-spinner
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
      />
    <!-- </center> -->
    </div>
    </modal>
    <div id="copy" />
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
// import datePicker from "vue-bootstrap-datetimepicker";
// import DateRangePicker from "vue2-daterange-picker";
// import "vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css";
import dataUser from "./data";
import itemUser from "./item";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert2";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      table: {
        fields: [
          {
            label: "No",
            key: "nomor"
          },
          {
            label: "Nama User",
            key: "nama_channel"
          },
          {
            label: "Email User",
            key: "email"
          },
          {
            label: "Flag User",
            key: "channel"
          },
          {
            label: "Channel ID",
            key: "id"
          },
          {
            label: "Kode",
            key: "channel_code"
          },
          {
            label: "Action",
            key: "action"
          }
        ],
        items: null,
        selected: [],
        isError: false,
        isBusy: true,
      },
      redeem: {
        search_query: "",
        search_filter: "email"
      },
      pkid: "",
      form: {
        userName: "",
        userEmail: "",
        userFlag: "",
        status: "new",
        channelId: 0,
        kode: "",
        token: "",
        tokenFeedback: "",
        count: null,
        profileId: "",
      },
      meta: {
        current_page: 1,
        per_page: 5,
        from: "",
        to: "",
        total: "",
        last_page: ""
      },
      dataGet: [],
      showModal: false,
      isTokenCopied: false,
      isBusy: false,
    };
  },
  mounted() {
    this.getListUser();
  },
  computed: {
    ...mapGetters("program", ["channelList", "refreshToken", "deleteToken"]),
    page() {
      return this.meta.current_page;
    },
    query() {
      return this.redeem.search_query;
    },
    filteredList() {
      return this.table.items.filter(item => {
        return item.title.toLowerCase().includes(this.redeem.search_query.toLowerCase());
      })
    }
  },
  watch: {
    page() {
      this.getListUser();
    },
    query() {
      this.getListUser();
    }
  },
  methods: {
    ...mapActions("program", ["getChannels", "getRefreshToken", "removeToken"]),
    async getListUser() {
      this.table.isBusy = true;
      try {
        if (this.redeem.search_filter === "email") {
          // this.table.items = itemUser;
          let data = {};
          data.pageSize = this.meta.per_page;
          data.pageNumber = this.meta.current_page;
          data.searchFilter = this.redeem.search_filter;
          data.searchQuery = this.redeem.search_query;
          let res = JSON.parse(JSON.stringify(await this.getChannels(data)));

          if (res.data != "" || res.data.length == 0) {
            this.table.items = res.data;
            this.assignMeta(res.meta);
          }
          this.table.isBusy = false;
        } 
        // console.log(listOrder);
      } catch (error) {
        this.table.isBusy = false;
        throw new Error("Something went wrong " + error);
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
    limitEntryChanges() {
      this.meta.current_page = 1;
      this.getListUser();
    },
    calculateByPage() {
      return (
        this.meta.current_page * this.meta.per_page - this.meta.per_page + 1
      );
    },
    checkSearchFilter(filter) {
      if (filter === "email") {
        return "email";
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
      
    },
    async openToken(record, index) {
      // this.form.token = record.token;
      // console.log(record);
      this.isBusy = true;
      try {
        let data = {
          pkid: record.pkid
        }

        let res = JSON.parse(JSON.stringify(await this.getRefreshToken(data)));
        this.form.token = res.token;
        this.form.channelId = record.id;
        this.form.profileId = record.profile_id;
        this.showModal = true;
      } catch (err) {
               throw new Error("Something went wrong " + err);
      }
      // console.log(this.form.token);
      this.isBusy = false;
    },
    async delToken(record, index) {
      // console.log(record);
      swal.fire({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5e72e4',
        cancelButtonColor: '#f5365c',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.value) {
          this.isBusy = true;
          try {
            let data = {
              profile_id: record.profile_id
            }

            let res = JSON.parse(JSON.stringify(await this.removeToken(data)));

            if (res.status == "OK") {
              swal.fire(
                'Deleted!',
                `${res.message}`,
                'success'
              )
              this.getListUser();
            } else {
              swal.fire(
                'Error!',
                'Gagal menghapus user.',
                'error'
              )
            }
          } catch (err) {
               throw new Error("Something went wrong " + err);
          }

          this.isBusy = false;
        }
      })
    },
    checkFormValidity() {
    },
    resetModal() {
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
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
      // console.log(this.submittedNames);
    },
    async setFilter(event) {
      // console.log(event.target.value);
      return (this.redeem.search_query = "");
    },
    closeModal() {
      this.showModal = false;
      this.isTokenCopied = false;
    },
    copyToClipboard(val) {
      const el = document.createElement('textarea');
      el.value = val;
      document.getElementById('copy').appendChild(el);
      el.select();
      document.execCommand('Copy');
      document.getElementById('copy').removeChild(el);
      this.isTokenCopied = true;
    }
  },
};
</script>

<style scope>
.custom-control {
  padding-left: 2.75rem !important;
}

#show-btn-detail a:hover {
  color: #fff;
}

.token-feedback {
  color: green;
}
</style>
