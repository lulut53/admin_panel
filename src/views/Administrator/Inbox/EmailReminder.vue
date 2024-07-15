<template>
  <div>
    <base-header type>
        <div class="row align-items-center py-4">
          <div class="col-lg-6 col-7">
            <h6 class="h2 d-inline-block mb-0">Notifikasi</h6>
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
                <li class="breadcrumb-item">Email Reminder</li>
              </ol>
            </nav>
          </div>
        </div>
      </base-header>
      <div class="row">
        <div class="col-md-6">
          <b-card>
            <ValidationObserver ref="observer">
              <div class="form-group">
              <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Jenis Email"
                      >
                        <label
                          for="templateId"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Jenis Email
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Jenis Email"
                          v-model="form.value1_param"
                          clearable
                        >
                          <el-option
                            v-for="option in listTemplateId"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.value"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
            </ValidationObserver>

            <ValidationObserver ref="observer">
              <el-form @submit.prevent="importFileEmail">
                <div class="row-md-12">
                  <file-input
                  @change="changeFileEmail"
                  class="form-group"
                  required
                  id="fileEmail"
                  accept=".xls, .xlsx, .csv"
                  :LabelingFile="LabelFlag"
                  />
                </div>
                <el-form-item>
                  <base-button
                  class="mt-2"
                  type="success"
                  @click="importfileEmail"
                  >
                  Kirim Email
                  </base-button>
                  <a
                  href="https://prod.dicicilaja.com/composer/storage/uploads/documents/Template_Email_Reminder.xlsx"
                  target="blank"
                  ><base-button class="mt-2" type="warning">
                  Download Template
                  </base-button></a>
                </el-form-item>
              </el-form>
            </ValidationObserver>
          </b-card>
        </div>
      </div>
      <modal :show.sync="showModalLoading">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <h3 class="text-center" style="display: flex; justify-content: center;">Loading</h3>
      <br />
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
        />
    </modal>
  </div>
</template>

<script>
  import { ValidationObserver, ValidationProvider } from "vee-validate";
  import FileInput from "@/components/Inputs/FileInput";
  import moment from "moment";
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import swal from "sweetalert2";
  import { Select, Option } from "element-ui";
  import { HalfCircleSpinner } from "epic-spinners";


  
  export default {
    components: {
      FileInput,
      HalfCircleSpinner,
      ValidationObserver,
      ValidationProvider,
      [Select.name]: Select,
      [Option.name]: Option,
    },
    data() {
      return {
        form: {
          subject: null,
          value1_param: "",
        },
        urlDownload: "",
        showModalLoading: false,
        LabelFlag: "",
        fileEmail: "",
        listTemplateId: [],
        value1_param: "",
      };
    },
    computed: {
      ...mapGetters("axi", ["templateId"]),
    },
    async created() {
        this.permissionAuth()
        this.getData()
      },
    methods: {
      ...mapActions("auth", ["checkAuth", "refreshToken"]),
      ...mapActions("axi", ["postImportFileEmail", "getListTemplateID"]),


      getValidationState({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null;
      },

      async permissionAuth() {

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

    },

      changeFileEmail(files) {
      this.fileEmail = files[0];
      this.LabelFlag = "";
      },

      async setJenisEmail() {
        await this.getListTemplateID(this.form.value1_param);
        this.getDataList();
       

      },

      async getDataList() {
        this.listTemplateId = this.templateId.map(item => {
          return {
            // value: item.attributes.value1_param,
            // label: item.attributes.value3_param
            value: item.attributes.value1_param,
            label: item.attributes.value3_param
          };
        });

      },

      async getData() {
        try {
          await Promise.all([
           await this.getListTemplateID(),
          ]);
          this.getDataList();

        }
        catch (error){
          swal.fire("Error");
        }
        

      },

    async importfileEmail() {
      if (this.fileEmail == "") {
        swal.fire("File Excel belum diinputkan", "", "error");
        return;
      } else if (this.form.value1_param == "") {
        swal.fire("Jenis Email Harus Diisi", "", "warning");
        return;
      }

      this.showModalLoading = true;
      const payload = {
        file: this.fileEmail,
        jenisEmail: this.form.value1_param,
      };

      let res = await this.postImportFileEmail(payload);
      
      if (res.status == 200) {
        this.showModalLoading = false;
        this.LabelFlag = "reset";
        this.form.value1_param = "";
        this.fileEmail = "";

        swal.fire("Success", "Email berhasil terkirim!", "success");
      } else {
        this.showModalLoading = false;
        swal.fire(
          "Gagal",
          res.response.status == 413
            ? "Email gagal terkirim!, ukuran file terlalu besar. (maks 5MB)"
            : "Email gagal terkirim!",
          "error"
        );
      }
    },
    },
  };
  </script>
