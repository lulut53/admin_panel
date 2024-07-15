<template>
  <div>
    <base-header class="pb-6" type>
      <div class="row align-items-center py-4">
        <div class="col-lg-8 col-7">
          <h6 class="h2 d-inline-block mb-0">
            Manage Content Promo / Partnership {{ this.$route.query.program }}
          </h6>
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
              <li class="breadcrumb-item">
                <router-link to="/administrator/program/partnership"
                  >Program</router-link
                >
              </li>
              <li class="breadcrumb-item" aria-current="page">
                {{ this.$route.query.program }}
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-4 col-5 text-right">
          <b-button
            variant="primary"
            v-b-modal.modal-form
            @click="handleForm('add')"
            >Add Content</b-button
          >
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
                <div style="display: flex; margin-top: 20px !important; justify-content: center;">
                <!-- <center> -->
                  <h1 class="text-center">Error, silahkan coba lagi.</h1>
                <!-- </center> -->
                </div>
              </div>
              <div key="3" v-if="isShow">
                <div class="container" style="max-width:100%">
                  <div class="row d-flex align-content-between flex-wrap mb-3">
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
                    <div class="col-8 col-md-6 col-lg-4"></div>
                    <div class="col-4 col-md-6 col-lg-2">
                      <el-select
                        class="select-primary pagination-select"
                        v-model="currentColumnSearched"
                        :disabled="columnSearched.length === 0"
                        no-data-text="No type exist"
                        @input="changeFilterSearch($event)"
                        style="width:100%"
                      >
                        <el-option
                          class="select-primary"
                          v-for="item in columnSearched"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                  <el-table
                    :data="item"
                    row-key="id"
                    header-row-class-name="thead-light"
                    class="table-responsive table-flush"
                    @sort-change="sortChange"
                  >
                    <el-table-column label="No" min-width="80px" prop="id">
                      <template v-slot="{ row }">{{
                        item.indexOf(row) + meta.from
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      label="Name"
                      min-width="150px"
                      prop="nama_content"
                    >
                    <template v-slot="{ row }">
                        <span
                          @click="
                            showPreviewText(
                              row.nama_content,
                              `${currentColumnSearched === 'meta' ? 'Nama Konten (Meta - Keyword)' : 'Nama Konten'}`
                            )
                          "
                          class="d-inline-block text-truncate"
                          style="max-width: 150px; cursor: pointer;"
                          v-b-popover.hover.left="`${row.nama_content}`"
                        >
                          {{ row.nama_content }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Title"
                      min-width="150px"
                      prop="judul"
                    >
                    </el-table-column>
                    <el-table-column
                      label="URL Target"
                      min-width="150px"
                      prop="clicked_url"
                    >
                      <template v-slot="{ row }">
                        <span
                          @click="
                            showPreviewText(
                              row.clicked_url,
                              `URL Target ${
                                row.nama_content ? currentColumnSearched === 'meta' ? '(Meta - Url)' : '- ' + row.nama_content : ''
                              }`
                            )
                          "
                          class="d-inline-block text-truncate"
                          style="max-width: 150px; cursor: pointer;"
                          v-b-popover.hover.left="`${row.clicked_url}`"
                        >
                          {{ row.clicked_url }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="Image" min-width="100px" prop="url">
                      <template v-slot="{ row }">
                        <b-img
                          @click="
                            showPreviewImage(
                              row.url,
                              `Image ${
                                row.nama_content ? currentColumnSearched === 'meta' ? '(Meta - Image)' : '- ' + row.nama_content : ''
                              }`
                            )
                          "
                          style="max-height: 50px; cursor: pointer;"
                          :src="row.url"
                        ></b-img>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Description"
                      min-width="180px"
                      prop="deskripsi"
                    >
                      <template v-slot="{ row }">
                        <span
                          @click="
                            showPreviewText(
                              row.deskripsi,
                              `Description  ${
                                row.nama_content ? currentColumnSearched === 'meta' ? '(Meta - Description)' : '- ' + row.nama_content : ''
                              }`
                            )
                          "
                          class="d-inline-block text-truncate"
                          style="max-width: 180px; cursor: pointer;"
                          :id="`popover-deskripsi-${row.id}`"
                          v-html="row.deskripsi"
                        >
                        </span>
                        <b-popover
                          :target="`popover-deskripsi-${row.id}`"
                          triggers="hover focus"
                          placement="right"
                        >
                          <div v-html="row.deskripsi"></div>
                        </b-popover>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Position"
                      min-width="110px"
                      prop="content_position"
                    >
                      <template v-slot="{ row }">
                        <div class="text-center">
                          {{ row.content_position }}
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
                          >Active</b-badge
                        >
                        <b-badge variant="danger" v-else>Inactive</b-badge>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" min-width="100px" label="Action">
                      <template v-slot="{ row }">
                        <div class="text-center">
                          <el-dropdown @command="handleCommand($event, row)">
                            <span class="el-dropdown-link">
                              <i class="el-icon-more el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item command="edit"
                                >Edit</el-dropdown-item
                              >
                              <el-dropdown-item divided command="delete"
                                >Delete</el-dropdown-item
                              >
                            </el-dropdown-menu>
                          </el-dropdown>
                        </div>
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
      </div>
    </div>
    <b-modal
      id="modal-form"
      centered
      :title="title_form"
      size="lg"
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-form @submit="handleSubmit" v-if="form.show">
        <b-container fluid>
          <b-row>
            <b-col xs="12" md="6">
              <validation-provider
                name="Type"
                :rules="{ required: true }"
                v-slot="{ errors }"
              >
                <b-form-group
                  id="input-group-type"
                  label="Type : "
                  label-for="input-type"
                >
                  <b-form-select
                    id="input-type"
                    v-model="form.tipe_content"
                    :options="typeOptions"
                    :state="form.tipe_content === null ? false : null"
                    required
                  ></b-form-select>
                  <b-form-invalid-feedback id="input-type-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <div style="text-align: -webkit-center;">
                <b-img-lazy
                  class="mb-3"
                  :src="imageSrc"
                  fluid
                  block
                  rounded
                  style="height: 200px; border: dashed 1px #dee2e6"
                />
              </div>
              <validation-provider
                name="Image content"
                v-slot="{ errors }"
              >
                <b-form-group
                  id="input-group-image"
                  label="Image Content : "
                  label-for="input-image"
                >
                  <b-form-file
                    placeholder="Choose an image"
                    accept="image/*"
                    id="input-image"
                    v-model="image"
                    :state="errors.length > 0 ? false : null"
                  ></b-form-file>
                  <b-form-invalid-feedback id="input-image-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="Position"
                :rules="{ required: true, min: 1 }"
                v-slot="{ errors }"
              >
                <b-form-group
                  id="input-group-position"
                  label="Position : "
                  label-for="input-position"
                >
                  <b-form-input
                    id="input-position"
                    v-model="form.content_position"
                    placeholder="Input position"
                    type="number"
                    min="1"
                    required
                    :state="errors.length > 0 ? false : null"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-position-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col xs="12" md="6"
              ><b-form-group
                id="input-group-title"
                label="Title : "
                label-for="input-title"
              >
                <b-form-input
                  id="input-title"
                  v-model="form.judul"
                  placeholder="Input title"
                ></b-form-input>
              </b-form-group>
              <validation-provider
                name="Name"
                :rules="{ required: true }"
                v-slot="{ errors }"
              >
                <b-form-group
                  id="input-group-name"
                  label="Name : "
                  label-for="input-name"
                >
                  <b-form-input
                    id="input-name"
                    v-model="form.nama_content"
                    placeholder="Input name"
                    required
                    :state="errors.length > 0 ? false : null"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-name-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <b-form-group
                id="input-group-desc"
                label="Desc : "
                label-for="input-desc"
              >
                <html-editor
                  id="input-desc"
                  v-model="form.deskripsi"
                ></html-editor>
              </b-form-group>
              <b-form-group
                id="input-group-url"
                label="Clicked url : "
                label-for="input-url"
              >
                <b-form-input
                  id="input-url"
                  v-model="form.clicked_url"
                  placeholder="Input url"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-status"
                label="Status : "
                label-for="input-status"
              >
                <b-form-select
                  id="input-status"
                  v-model="form.status"
                  :options="statusOptions"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
        <div style="text-align:right">
          <b-button
            @click="event => handleCancel(event, 'modal-form')"
            variant="secondary"
            :disabled="disableFormBtn"
            >Cancel</b-button
          >
          <b-button type="submit" variant="primary" :disabled="disableFormBtn">
            <div
              style="padding:5px 0"
              v-if="disableFormBtn"
            >
              <hollow-dots-spinner
                :animation-duration="1000"
                :dot-size="10"
                :dots-num="3"
                color="#fff"
              />
            </div>
            <span v-else>Submit</span></b-button
          >
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { HalfCircleSpinner, HollowDotsSpinner } from "epic-spinners";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
import HtmlEditor from "@/components/Inputs/HtmlEditor";

const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export default {
  components: {
    HalfCircleSpinner,
    HollowDotsSpinner,
    HtmlEditor
  },
  data() {
    return {
      item: [],
      selectedRows: [],
      searchData: "",
      perPageCurrent: 10,
      perPageOptions: [5, 10, 25],
      filterByService: "",
      isLoading: false,
      isError: false,
      isShow: true,
      disableFormBtn: false,
      isCreateForm: null,
      title_form: "",
      form: {
        rowId: null,
        show: true,
        tipe_content: null,
        judul: "",
        nama_content: "",
        deskripsi: "",
        clicked_url: "",
        content_position: "",
        status: "1"
      },
      image: null,
      imageSrc: "",
      typeOptions: [{ text: "Choose type", value: null }],
      statusOptions: [
        { text: "Active", value: "1" },
        { text: "Inactive", value: "0" }
      ],
      columnSearched: [],
      currentColumnSearched: null,
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
    ...mapGetters("programContent", [
      "contentList",
      "typeListExist",
      "typeListAll"
    ])
  },
  // Watch Method(s) called when value on data (above) changed.
  watch: {
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
    },
    image(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then(value => {
              this.imageSrc = value;
            })
            .catch(() => {
              this.imageSrc = "";
            });
        } else {
          this.imageSrc = "";
        }
      }
    }
  },
  // Created called when Vue Instance created
  async created() {
    // await this.permissionAuth();
    this.getData();
    this.debouncedGetData = _.debounce(this.searchDatas, 2500);
    await this.getListContentTypes();
    if (this.typeListAll.length > 0) {
      this.typeOptions = [
        ...JSON.parse(JSON.stringify(this.typeOptions)),
        ...JSON.parse(JSON.stringify(this.typeListAll))
      ];
    }
  },
  methods: {
    UrlHealer(dirtyUrl) {
      return sanitizeUrl(dirtyUrl);
  },
    ...mapActions("programContent", [
      "getListContent",
      "getListContentTypes",
      "getListContentTypesByName",
      "postCreateContent",
      "putUpdateContent",
      "deleteDeleteContent"
    ]),
    showPreviewImage(image, title) {
      const h = this.$createElement;
      const messageVNode = h("b-img", {
        props: {
          src: image,
          center: true,
          fluid: true
        }
      });
      this.$bvModal.msgBoxOk([messageVNode], {
        title: title,
        size: "lg",
        centered: true
      });
    },
    showPreviewText(text, title) {
      const h = this.$createElement;
      const messageVNode = h("div", {
        domProps: {
          innerHTML: text,
          style: "word-break: break-word;max-height: 200px;overflow: auto;"
        }
      });
      this.$bvModal.msgBoxOk([messageVNode], {
        title: title,
        centered: true
      });
    },
    async handleSubmit(event) {
      event.preventDefault();
      this.disableFormBtn = true;
      const { show, ...rest } = this.form;
      let swalText = "";
      let resForm = null;
      try {
        const payload = new FormData();
        for (const [key, value] of Object.entries(rest)) {
            if (!this.isCreateForm || value !== "" && value !== null && value.length > 0) {
              payload.append(key, value);
            }
        }
        payload.append("page_setting_id", this.$route.query.id);
        if (this.image) {
          payload.append("file", this.image);
        }
        if (this.isCreateForm) {
          resForm = await this.postCreateContent(payload);
          swalText = "dibuat";
        } else {
          resForm = await this.putUpdateContent({ rowId: this.form.rowId, payload });
          swalText = "diubah";
        }
        this.$bvModal.hide("modal-form");
        this.handleReset(event);
        this.getData();
        if(!!resForm.id){
          Swal.fire({
            title: "Success",
            text: `Konten berhasil ${swalText}.`,
            type: "success"
          });
        }else{
          Swal.fire({
            title: "Oops...",
            text: "Sepertinya terjadi masalah, silahkan hubungi developer.",
            type: "error"
          });
        }
        this.disableFormBtn = false;
      } catch (error) {
        // console.log(error);
        Swal.fire({
          title: "Oops...",
          text: "Sepertinya terjadi masalah, silahkan hubungi developer.",
          type: "error"
        });
        this.getData();
      }
    },
    handleReset(event) {
      event.preventDefault();
      this.form.tipe_content = null;
      this.form.judul = "";
      this.form.nama_content = "";
      this.form.deskripsi = "";
      this.form.clicked_url = "";
      this.form.content_position = "";
      this.form.status = "1";
      this.image = null;
      this.imageSrc = "";
      this.form.show = false;
      this.$nextTick(() => {
        this.form.show = true;
      });
    },
    handleCancel(event, modalId) {
      this.handleReset(event);
      this.$bvModal.hide(modalId);
    },
    handleForm(method) {
      if (method === "add") {
        this.title_form = "New Content";
        this.isCreateForm = true;
      } else {
        this.title_form = "Edit Content";
        this.isCreateForm = false;
      }
    },
    // Method when sort clicked
    sortChange(sortProps) {
      this.headerClick(sortProps.column, event); //optional: trigger header-click event
    },
    handleCommand(command, row) {
      this.form.rowId = row.id;
      if (command === "edit") {
        this.commandEdit(row);
      } else if (command === "delete") {
        this.commandDelete(row);
      }
    },
    commandEdit(row) {
      this.handleForm("edit");
      this.form.tipe_content = row.tipe_content;
      this.form.judul = row.judul;
      this.form.nama_content = row.nama_content;
      this.form.deskripsi = row.deskripsi;
      this.form.clicked_url = row.clicked_url;
      this.form.content_position = row.content_position;
      this.form.status = row.status;
      this.image = null;
      this.imageSrc = row.url;
      this.$bvModal.show("modal-form");
    },
    async commandDelete(row) {
      const isConfirm = await this.$bvModal.msgBoxConfirm(
        `Anda yakin akan menghapus konten ${row.nama_content}?`,
        {
          title: "Konfirmasi",
          okTitle: "Yakin",
          cancelTitle: "Batalkan",
          centered: true
        }
      );
      if (isConfirm) {
        const payload = {
          rowId: row.id
        };
        try {
          const res = await this.deleteDeleteContent(payload);
          if (res.status === 500) {
            Swal.fire({
              title: "Ooops...!",
              text: "Sepertinya terjadi masalah. silahkan hubungi developer.",
              type: "error"
            });
          } else {
            Swal.fire({
              title: "Berhasil menghapus!",
              type: "success"
            });
          }
          this.getData();
        } catch (error) {
          Swal.fire({
            title: "Oops...!",
            text: "Sepertinya terjadi masalah. silahkan hubungi developer.",
            type: "error"
          });
        }
      }
    },
    async getData() {
      this.isLoading = true;
      this.isShow = false;

      let data = {};
      data.namaProgram = this.$route.query.program;
      data.pageSize = this.perPageCurrent;
      data.pageNo = this.meta.current_page;

      try {
        let resListType = JSON.parse(
          JSON.stringify(await this.getListContentTypesByName(data))
        );
        if (resListType !== "" && resListType.length !== 0) {
          this.columnSearched = JSON.parse(JSON.stringify(this.typeListExist));
          if (this.columnSearched) {
            data.filter = "tipe";
            this.currentColumnSearched = this.columnSearched[0].value;
            data.filterValue = this.currentColumnSearched;
          }

          let res = JSON.parse(JSON.stringify(await this.getListContent(data)));
          if (res.data !== "" && res.data.length !== 0) {
            this.item = JSON.parse(JSON.stringify(this.contentList.data));

            this.assignMeta(res.meta);

            this.isShow = true;
            this.isLoading = false;
            this.isError = false;
          } else {
            this.item = [];
            this.isError = false;
            this.isLoading = false;
            this.isShow = true;
          }
        } else {
          this.item = [];
          this.isError = false;
          this.isLoading = false;
          this.isShow = true;
        }
      } catch (error) {
        // console.log(error);
      }
    },
    // AXIOS here to consume datas
    async searchDatas() {
      this.isShow = false;
      this.isLoading = true;

      let data = {};
      data.namaProgram = this.$route.query.program;
      data.filter = "tipe";
      this.currentColumnSearched = this.searchData;
      data.filterValue = this.currentColumnSearched;
      data.pageSize = this.perPageCurrent;
      data.pageNo = 1;

      try {
        let res = await this.getListContent(data);
        if (res.data != "" || res.data.length == 0) {
          this.item = JSON.parse(JSON.stringify(this.contentList.data));
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
      }
    },
    async assignData() {
      this.isShow = false;
      this.isError = false;
      this.isLoading = true;

      let data = {};
      data.namaProgram = this.$route.query.program;
      data.filter = "tipe";
      data.filterValue = this.currentColumnSearched;
      data.pageSize = this.perPageCurrent;
      data.pageNo = this.meta.current_page;

      let res = await this.getListContent(data);
      if (res.data != "" || res.data.length == 0) {
        this.item = JSON.parse(JSON.stringify(this.contentList.data));

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
    changeFilterSearch(value) {
      this.searchData = value;
    },
    searchByColumn() {
      if (this.searchData != "") this.searchDatas();
    },
    // Everytime user click page on pagination, this method will called
    async changePage() {
      this.assignData();
    }
  }
};
</script>

<style>
input#input-image ~ label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right:90px;
}
</style>
