<template>
  <div>
    <base-header type>
      <div class="row align-items-center py-4">
        <div class="col-lg-12">
          <h6 class="h2 d-inline-block mb-0">Business Reward - Katalog Produk</h6>
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
                  <i class="fas fa-home"/> Administrator
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Business Reward</li>
              <li class="breadcrumb-item active" aria-current="page">Katalog Produk</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 pt-2">
          <div class="d-flex justify-content-end">
            <base-button class="btn text-warning btn-light btn-custom border-0"
              :disabled="setting.data.attributes.status"
              @click="modals.import = true">
              <i class="fa fa-file-import"/>
              <span class="hidden-sm-down">Import Produk</span>
            </base-button>

            <base-button class="text-primary btn-light"
              @click="modals.setting = true">
              <i class="fa fa-cog"/>
              <span class="hidden-sm-down">Setting</span>
            </base-button>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="card">

        <div class="card-body">
          <div class="row table-filter">
            <div class="col-md-2">
              <base-input label="Show Entry">
                <select
                  class="form-control text-primary border-0 h-unset"
                  v-model="table.meta.per_page"
                  @change="limitEntryChanges">
                  <option value="5">5 Entries</option>
                  <option value="15">15 Entries</option>
                  <option value="25">25 Entries</option>
                </select>
              </base-input>
            </div>
            <div class="col-md-10 d-flex align-items-center justify-content-end search-filter">
              <base-input style="min-width: 75px">
                <select
                  class="form-control"
                  v-model="table.search_filter">
                  <!-- <option value="all" selected>Semua</option> -->
                  <option value="nama" selected>Nama</option>
                </select>
              </base-input>

              <base-input
                placeholder="Masukan pencarian..."
                class="input-search"
                v-model="table.search_query"
              >
                <template slot="append">
                  <i class="fa fa-search"/>
                </template>
              </base-input>
            </div>
          </div>
          <br />

          <transition name="fade" mode="out-in">
            <div key="1" v-if="table.isBusy" class="text-center pb-5" style="display: flex; justify-content:center;">
              <br />
               <!-- <center>-->
                <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
              <!-- </center>-->
            </div>
            <div key="2" v-if="table.isError" class="text-center p-5" style="display: flex; justify-content:center;">
             <!-- <center>-->
                <img
                  alt="Error Image"
                  src="/images/undraw_cancel_u1it.svg"
                  height="300px"
                  class="img-responsive"
                />
             <!-- </center>-->
              <br />
            <div style="text-align: center;">
              <h1>silahkan coba lagi</h1>
            </div>
            </div>
            <div key="2" v-if="!table.isBusy">
              <b-table
                responsive
                hover
                class="thead-warning"
                :items="product_lists"
                :fields="table.fields">
                <template v-slot:cell(index)="data">
                  {{ calculateByPage() + data.index }}
                </template>

                <template v-slot:cell(foto)="data">
                  <img :src="data.item.attributes.foto" alt="Thumbnail" height="64" v-if="data.item.attributes.foto" />
                  <img :src="'/images/image-empty-default.png'" height="64" v-else alt=""/>
                </template>

                <template v-slot:cell(kategori)="data">
                  {{ data.item.relationships.kategori.data.id ? findInArray(data.item.relationships.kategori.data.id, categories, '') : '' }}
                </template>

                <template v-slot:cell(deskripsi)="data">
                  <div class="text-truncate" v-b-popover.hover.topleft="data.item.attributes.deskripsi">
                     <span v-html=" convertNewLine(data.item.attributes.deskripsi)"/> 
                    <!-- <span v-html="UrlHealer(data.item.attributes.deskripsi)"/> -->
                  </div>
                </template>

                <template v-slot:cell(harga)="data">
                  Rp {{ thousandFormat(data.item.attributes.harga) }}
                </template>

                <template v-slot:cell(updated_at)="data">
                  {{ data.item.attributes.updated_at ? convertDate(data.item.attributes.updated_at) : "-" }}
                </template>

<!--                <template slot="action" slot-scope="data">-->
<!--                  <base-button class="bg-danger btn-custom border-0"-->
<!--                    :disabled="setting.data.attributes.status === 1"-->
<!--                    v-b-popover.hover.top="'Hapus'"-->
<!--                    @click="confirmDialog(data.item.id, data.item.attributes.nama)">-->
<!--                    <i class="fa fa-trash"/>-->
<!--                  </base-button>-->
<!--                </template>-->
              </b-table>

              <div class="card-footer py-4 d-flex justify-content-between">
                <div class="">
                  <p class="card-category">
                    Menampilkan {{ table.meta.from }} hingga {{ table.meta.to }} dari {{ table.meta.total }} data
                  </p>
                </div>

                <base-pagination
                  v-model="table.meta.current_page"
                  :total="table.meta.total"
                  :perPage="parseInt(table.meta.per_page)"
                />
              </div>
            </div>
          </transition>

        </div>
      </div>
    </div>

    <modal :show.sync="modals.import">
      <template slot="header">
        <h5 class="modal-title">Import Produk</h5>
      </template>

      <div class="form-group custom-file-upload mb-0">
        <label for="file">
          <div
            class="d-flex justify-content-center align-items-center flex-column"
            v-if="import_product.file.length === 0"
          >
            <div class="text-primary">
              <i class="fa fa-upload"/>
            </div>
            <h3 class="text-primary">Pilih Berkas</h3>
            <p class="text-primary">(.xlsx, .xlsm, .csv)</p>
          </div>

          <div class="d-flex justify-content-center align-items-center" v-else>
            <div class="text-primary">
              <i class="fa fa-file"/>
            </div>
            <p class="text-primary pl-2">{{ import_product.file.name }}</p>
          </div>
        </label>

        <input
          type="file"
          name
          id="file"
          class="form-control"
          @change="filesChange"
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />

        <base-button type="warning" class="mt-3" block :disabled="import_product.file.length === 0" @click="importExcel">
          <div class="spinner-border text-light" role="status" v-if="import_product.loading">
            <span>Mengimport...</span>
          </div>
          <span v-else>Unggah Berkas</span>
        </base-button>
      </div>
    </modal>

    <modal :show.sync="modals.setting" class="modal-jaminan">
      <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel">Setting</h5>
      </template>
      <div class="row">
        <div class="col">
          <label for>Program Business Reward</label>
        </div>
        <div class="col d-flex justify-content-end">

          <b-form-checkbox
            v-model="setting.data.attributes.status"
            switch
            style="width: 120px">
            {{ setting.data.attributes.status == 1 ? 'Aktif' : 'Tidak Aktif' }}
          </b-form-checkbox>

        </div>
      </div>

      <br>
      <p>Terakhir diupload pada <strong>{{ convertDate(setting.data.attributes["updated-at"]) }}</strong></p>

      <template slot="footer">
        <base-button type="primary" block @click="updateSetting()">
          <div class="spinner-border text-light" role="status" v-if="update_setting.loading">
            <span>Mengubah...</span>
          </div>
          <span v-else>Simpan</span>
        </base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import Modal from "@/components/Modal.vue";
import swal from "sweetalert2";

export default {
  data() {
    return {
      table: {
        fields: [
          {
            label: "No",
            key: "index"
          },
          {
            label: "Foto",
            key: "attributes.foto"
          },
          {
            label: "Nama Produk",
            key: "attributes.nama"
          },
          {
            label: "Kategori",
            key: "kategori"
          },
          {
            label: "Deskripsi",
            key: "deskripsi"
          },
          {
            label: "Poin",
            key: "attributes.point"
          },
          {
            label: "Harga",
            key: "attributes.harga"
          },
          {
            label: "Terakhir Diubah",
            key: "attributes.updated_at"
          },
          {
            label: "",
            key: "action"
          }
        ],
        items: [],
        isError: false,
        isBusy: true,
        meta: {
          per_page: 5,
          page: 1,
          current_page: 1
        },
        search_query: "",
        search_filter: "nama",
      },
      product_lists: [],
      categories: [],
      pagination: {},
      modals: {
        import: false,
        setting: false,
        close_modal: false
      },
      import_product: {
        loading: false,
        file: [],
        disabled: []
      },
      token: "",
      update_setting: {
        loading: false
      },
      setting: {
        data: {
          attributes: {}
        }
      }
    };
  },
  async mounted() {
    this.token = window.localStorage.getItem('access_token');

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${this.token}`
    };

    try {
      let categories = await this.$api.get(
        `${this.$store.state.br_base_url}/kategori`
      );
      this.categories = categories.data.data;

      await this.getProducts();

      let setting = await this.$api({
        url: `${this.$store.state.br_setting_base_url}/reward-phase/1`,
        method: "get",
        headers,
        params: {}
      });
      this.setting = setting.data;
      this.setting.data.attributes.status = setting.data.data.attributes.status === 1;

    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    page() {
      return this.table.meta.current_page;
    },
    query() {
      return this.table.search_query;
    }
  },
  watch: {
    page() {
      this.getProducts();
    },
    query() {
      this.getProducts();
    }
  },
  methods: {
    async getProducts() {
      this.table.isBusy = true;
      try {
        let products = await this.$api.get(
          `${this.$store.state.br_base_url}/product-catalog?limit=${this.table.meta.per_page}${this.table.search_query ? `&${this.checkSearchFilter(this.table.search_filter)}=${this.table.search_query}` : ''}&page=${this.table.meta.current_page}&timestamp=true`
        );
        this.product_lists = products.data.data;
        this.table.meta = products.data.meta;

        this.table.isBusy = false;

      } catch (error) {
        console.error(error);
        this.table.isBusy = false;
      }
    },
    async importExcel() {
      this.modals.close_modal = !this.modals.close_modal;
      this.import_product.loading = !this.import_product.loading;
      this.backdropModal("disable");

      let formData = new FormData();
      formData.append("file_excel", this.import_product.file);
      try {
        let response = await this.$api.post(
          `${this.$store.state.br_base_url}/product-catalog/file/import`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        this.getProducts();

        this.modals.import = !this.modals.import;
        this.modals.close_modal = !this.modals.close_modal;
        this.import_product.loading = !this.import_product.loading;
        this.backdropModal("able");
        swal("Success!", response.data.detail, "success");
        this.upload = {
          file: []
        };
      } catch (error) {
        this.modals.import = !this.modals.import;
        this.modals.close_modal = !this.modals.close_modal;
        this.import_product.loading = !this.import_product.loading;
        this.backdropModal("able");
        swal("Kesalahan ketika import!", error.response.data.detail, "error");
      }
    },
    async updateSetting() {
      this.update_setting.loading = true;

      const headers = {
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${this.token}`
      };

      this.setting.data.attributes["updated-at"] = await this.convertDate(this.setting.data.attributes["updated-at"]);
      this.setting["_method"] = "PATCH";

      try {
        let response = await this.$api({
          url: `${this.$store.state.br_setting_base_url}/reward-phase/1`,
          method: "post",
          headers,
          data: this.setting
        });

        if (response) {
          this.update_setting.loading = false;
          this.modals.setting = false;

          swal(
            'Berhasil!',
            `Setting berhasil diubah!.`,
            'success'
          );
        }
      } catch (error) {
        this.update_setting.loading = false;
        this.modals.setting = false;
        console.error(error.response.data);
        swal(
          'Oops!',
          error.response ? error.response.data.detail : `Kesalahan saat mengubat setting`,
          'error'
        );
      }
    },
    async deleteProduct(product_id, product_name) {
      try {
        let response = await this.$api.delete(
          `${this.$store.state.br_base_url}/product-catalog/${product_id}`
        );
        if (response)
          swal(
            'Berhasil!',
            `Produk <strong>${product_name}</strong> telah dihapus.`,
            'success'
          );
      } catch (error) {
        console.error(error.response.data);
        swal(
          'Oops!',
          error.response ? error.response.data.detail : `Kesalahan saat menghapus produk <strong>${product_name}</strong>`,
          'error'
        );
      }
    },
    confirmDialog(product_id, product_name) {
      swal({
        title: 'Apakah kamu yakin?',
        html: `Produk <strong>${product_name}</strong> akan dihapus!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Ya,hapus!',
        cancelButtonText: 'Batalkan'
      }).then(result => {
        if (result.value) this.deleteProduct(product_id, product_name);
      });
    },
    limitEntryChanges() {
      this.table.meta.current_page = 1;
      this.getProducts();
    },
    filesChange(ev) {
      this.import_product.file = ev.target.files[0];
    },
    findInArray(key, array, output) {
      let result;

      if (!["axi_ktp", "axi_npwp"].includes(output)) {
        if (array) {
          result = array.find(item => item.id === key);
        }

        if (result) {
          if (output === "point") return result.attributes.point;
          else if (output === "harga") return result.attributes.harga;
          else return result.attributes.nama;
        } else return "-";
      } else {
        if (array) {
          result = array.find(item => item.attributes.axi_id === key);
        }

        if (result) {
          if (output === "axi_ktp") return result.attributes.foto_ktp;
          else return result.attributes.foto_npwp;
        }
      }
    },
    backdropModal(state) {
      if (state === "disable") {
        document.querySelector("*:not(.modal-close)").style.pointerEvents =
          "none";
      } else {
        document.querySelector("*").style.pointerEvents = "auto";
      }
    },
    thousandFormat(number) {
      return parseInt(number).toLocaleString();
    },
    convertNewLine(str) {
      return str.replace(/(\\n)/g, '<br>');
    },
    convertDate(date) {
      let sDate = new Date(date);

      let year = sDate.getFullYear();
      let month = sDate.getMonth() + 1;
      let dt = sDate.getDate();
      let minutes = sDate.getMinutes();
      let hours = sDate.getHours();

      if (dt < 10) dt = '0' + dt;
      if (month < 10) month = '0' + month;

      return `${year}-${month}-${dt} ${hours}:${minutes}`;
    },
    calculateByPage() {
      return (((this.table.meta.current_page) * this.table.meta.per_page) - this.table.meta.per_page) + 1;
    },
    checkSearchFilter(filter) {
      if (filter === "nama") return "nama";
      else return "search";
    }
  },
  components: {
    Modal,
    HalfCircleSpinner
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.truncate {
  width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

