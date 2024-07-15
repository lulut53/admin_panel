<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">New Message</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard"
                  ><i class="fas fa-home"></i
                ></router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard"
                  >Administrator</router-link
                >
              </li>
              <li class="breadcrumb-item">
                <router-link to="/administrator/inbox/manual"
                  >Message</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Add New
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6 small">
      <div class="row">
        <div class="col-lg-8">
          <div class="card">
            <transition name="fade" mode="out-in">
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
              <div key="2" v-if="isError" class="text-center p-5" >
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
              <div key="2" v-if="isShow">
                <div class="card-body">
                  <div class="form-group">
                    <h3>1. Message</h3>
                  </div>
                  <div class="form-group">
                    <el-input
                      type="text"
                      v-model="tmpAddData.title"
                      placeholder="Message Title"
                    ></el-input>
                  </div>
                  <div class="form-group">
                    <el-input
                      type="textarea"
                      v-model="tmpAddData.message"
                      :rows="5"
                      placeholder="Message Body"
                    >
                    </el-input>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="card" v-if="isShow">
            <div class="card-body">
              <div class="form-group">
                <h3>2. Target User</h3>
                <el-tabs type="border-card" v-model="tabsId">
                  <el-tab-pane label="By Group" name="1"
                    ><div class="form-group">
                      <el-radio v-model="tmpAddData.target" label="4"
                        >All Role</el-radio
                      >
                      <el-radio v-model="tmpAddData.target" label="1"
                        >Nasabah</el-radio
                      >
                      <el-radio v-model="tmpAddData.target" label="2"
                        >AXI</el-radio
                      >
                      <el-radio v-model="tmpAddData.target" label="8"
                        >SO</el-radio
                      >
                      <el-radio v-model="tmpAddData.target" label="9"
                        >SH</el-radio
                      >
                      <el-radio v-model="tmpAddData.target" label="10"
                        >SM</el-radio
                      >
                    </div></el-tab-pane
                  >
                  <el-tab-pane label="By File" name="2"
                    ><el-form @submit.prevent="importFileUsers">
                      <div class="card-body">
                        <label>
                          <h4 class="mb-0">Upload User*</h4>
                        </label>
                        <div class="row-md-12">
                          <file-input
                            @change="changeFileUsers"
                            class="form-group"
                            required
                            id="fileUser"
                            accept=".xls, .xlsx, .csv"
                          />
                        </div>
                        <el-form-item>
                          <base-button
                            class="mt-2"
                            type="success"
                            @click="importFileUsers"
                          >
                            Upload
                          </base-button>
                          <a
                            href="https://prod.dicicilaja.com/composer/storage/uploads/documents/Template_Data_User.xlsx"
                            target="blank"
                            ><base-button class="mt-2" type="warning">
                              Download Template
                            </base-button></a
                          >
                        </el-form-item>
                      </div>
                    </el-form></el-tab-pane
                  >
                </el-tabs>
              </div>
            </div>
          </div>
          <div class="card" v-if="isShow">
            <div class="card-body">
              <div class="form-group">
                <h3>3. Destination</h3>
              </div>
              <!-- <div class="form-group">
                <el-radio v-model="radio" label="1">Message Page</el-radio>
              </div>
              <div class="form-group">
                <el-radio v-model="radio" label="2">Choose App Page</el-radio>
                <el-input type="text" v-if="radio == 2" placeholder="Insert/choose date"></el-input>
              </div> -->
              <div class="form-group">
                <el-checkbox v-model="tmpAddData.isLink"
                  >Insert External Link</el-checkbox
                >
                <br />
                <el-input
                  type="text"
                  v-model="tmpAddData.link"
                  placeholder="Masukan link"
                  v-if="tmpAddData.isLink"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card" v-if="isShow">
            <div class="card-body">
              <div class="form-group">
                <h3>Time to Send</h3>
              </div>
              <div class="form-group">
                <el-radio v-model="tmpAddData.isTime" label="1"
                  >Send Immediately</el-radio
                >
              </div>
              <div class="form-group">
                <el-radio v-model="tmpAddData.isTime" label="2"
                  >Schedule by date</el-radio
                >
              </div>
              <div class="form-group">
                <date-picker
                  v-model="tmpAddData.date"
                  placeholder="Isi Datetime"
                  v-if="tmpAddData.isTime == 2"
                  :config="options"
                ></date-picker>
              </div>
              <div class="form-group">
                <el-button type="primary" @click="sendNotif"
                  >Kirim Notifikasi</el-button
                >
                <!-- <el-button type="text">Save to draft</el-button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="showModalProcess" :clickToClose="false">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
      <!-- <center> -->
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
        />
      <!-- </center> -->
      </div>
    </modal>
  </div>
</template>

<script>
import { Input, Checkbox, Radio, Button, Tabs, TabPane } from "element-ui";
import swal from "sweetalert2";
import { mapActions } from "vuex";
import moment from "moment";
import { HalfCircleSpinner } from "epic-spinners";
import datePicker from "vue-bootstrap-datetimepicker";
import jQuery from "jquery";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: "far fa-clock",
    date: "far fa-calendar",
    up: "fas fa-arrow-up",
    down: "fas fa-arrow-down",
    previous: "fas fa-chevron-left",
    next: "fas fa-chevron-right",
    today: "fas fa-calendar-check",
    clear: "far fa-trash-alt",
    close: "far fa-times-circle",
  },
});

export default {
  components: {
    [Input.name]: Input,
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    datePicker,
    HalfCircleSpinner,
  },
  data() {
    return {
      tabsId: "1",
      fileUser: "",
      tmpAddData: {
        title: "",
        isTime: "1",
        isLink: false,
        link: "",
        message: "",
        target: "4",
        category: "Message",
        date: "",
      },
      options: {
        locale: "id",
        // format: 'LLLL',
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
      isLoading: false,
      isError: false,
      isShow: true,
      isUpload: false,
      showModalProcess: false,
    };
  },
  methods: {
    ...mapActions("notifikasi", ["createNotification", "sendNotifbyFile"]),
    ...mapActions("auth", ["checkAuth", "refreshToken", "postImportFileUsers"]),
    ...mapActions("axi", ["postImportFileUsers"]),
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
      }
      this.checkPermission();
    },
    checkPermission() {
      if (window.localStorage.getItem("role") != "Super Admin") {
        swal(
          "Error",
          "Role anda tidak memiliki akses untuk melihat halaman ini",
          "error"
        );
        this.$router.push("/administrator/dashboard");
      }

      this.isLoading = false;
      this.isShow = true;
    },

    changeFileUsers(files) {
      this.fileUser = files[0];
    },
    async importFileUsers() {
      if (this.fileUser == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      } else if (this.tmpAddData.title == "") {
        swal.fire("Pastikan Message Title terisi", "", "warning");
        return;
      } else if (this.tmpAddData.message == "") {
        swal.fire("Pastikan Message Body terisi", "", "warning");
        return;
      }

      this.showModalProcess = true;
      const payload = {
        file: this.fileUser,
        messageTitle: this.tmpAddData.title,
        messageBody: this.tmpAddData.message,
      };

      let res = await this.postImportFileUsers(payload);
      
      if (res.status == 200) {
        this.showModalProcess = false;

        this.fileUser = "";

        swal.fire("Sukses", "File User telah diimport!", "success");
        this.isUpload = true;
      } else {
        this.showModalProcess = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "File User gagal diimport, ukuran file terlalu besar. (maks 5MB)"
            : "File User gagal diimport",
          "error"
        );
      }
    },
    async sendNotif() {
      this.showModalProcess = true;

      if (this.tmpAddData.isTime == "2") {
        let gmtLoc = this.tmpAddData.date.indexOf("+");
        let gmt = this.tmpAddData.date.slice(gmtLoc).split(":").join("");

        let dateTime = new Date(this.tmpAddData.date);
        this.tmpAddData.date = moment(dateTime)
          .format("YYYY-MM-DD HH:mm:ss")
          .concat(" GMT" + gmt);
      }

      let res = "";
      if (this.tabsId == "1" && this.tmpAddData.message != "") {
        res = await this.createNotification(this.tmpAddData);
        // return res;
      } else if (this.tabsId == "2" && this.isUpload) {
        res = await this.sendNotifbyFile(this.tmpAddData);
        // return res;
      } else if (this.tabsId == "2" && !this.isUpload) {
        swal.fire("Warning", "Pastikan data sudah terupload", "warning");
      } else if (
        this.tabsId == "1" &&
        this.tmpAddData.message == "" &&
        this.tmpAddData.title == ""
      ) {
        swal.fire("Warning", "Pastikan Message sudah terisi", "warning");
      }

      // 

      this.showModalProcess = false;

      if (res.status == 200) {
        const that = this;
        swal(
          "Berhasil",
          "Berhasil menambahkan notifikasi baru",
          "success"
        ).then((result) => {
          this.$router.push("/administrator/inbox/manual");
        });
      } else {
        swal("Gagal", "Gagal menambahkan artikel baru", "error").then(
          (result) => {
            // that.getData()
          }
        );
      }
    },
  },
  async created() {
    // await this.permissionAuth()
  },
};
</script>
