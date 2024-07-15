<template>
  <div>
    <base-header type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-12">
          <h6 class="h2 d-inline-block mb-0">Business Reward</h6>
        </div>
      </div>
    </base-header>

    <base-header class="pb-6" type="">
      <div class="row align-items-center pb-4">
        <div class="col-lg-6">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard"><i class="fas fa-home" /> Administrator</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Claim Business Reward
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Status Redeem
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 pt-2">
          <div class="d-flex justify-content-end">
            <base-button class="text-primary btn-light" @click="modals.upload = true">
              <i class="fa fa-upload" />
              <span class="hidden-sm-down">Upload Excel</span>
            </base-button>

            <!-- <date-picker
              mode="range"
              v-model="date_picker.range"
              :input="['L', 'YYYY-MM-DD', 'YYYY-MM-DD']"
            >
              <button class="btn btn-light text-warning">
                <i class="fa fa-calendar" />
              </button>
            </date-picker> -->
            <v-date-picker
              :is-range="true"
              :model-config="{
                type: 'string',
                mask: 'YYYY-MM-DD',
              }"
              v-model="date_picker.range"
            >
              <template v-slot="{ showPopover }">
                <button class="btn btn-light text-warning" @click="showPopover">
                  <i class="fa fa-calendar" />
                </button>
              </template>
            </v-date-picker>

            <!--            <a-->
            <!--              :href="`${$store.state.br_base_url}/claim-reward/file/export`"-->
            <!--              class="btn text-warning btn-light"-->
            <!--              target="_blank"-->
            <!--            >-->
            <!--              <i class="fa fa-download" />-->
            <!--              <span class="hidden-sm-down">Download Excel</span>-->
            <!--            </a>-->

            <!-- <base-button class="text-warning btn-light" @click="exportClaim" > -->
            <base-button class="text-warning btn-light" v-b-modal.modal-download>
              <i class="fa fa-download" />
              <span class="hidden-sm-down">Download Excel</span>
            </base-button>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="card">
        <div class="card-body">
          <div class="row table-filter" v-if="table.selected.length === 0">
            <div class="col-md-2">
              <base-input label="Show Entry">
                <label>
                  <select class="form-control text-primary border-0 h-unset" v-model="redeem.entry"
                    @change="limitEntryChanges">
                    <option value="5">5 Entries</option>
                    <option value="15">15 Entries</option>
                    <option value="25">25 Entries</option>
                  </select>
                </label>
              </base-input>
            </div>
            <div class="col-md-10 d-flex align-items-center justify-content-end search-filter">
              <!--              <a-->
              <!--                class="btn text-primary btn-light"-->
              <!--                target="_blank"-->
              <!--                :href="$store.state.br_base_url + '/axi-foto/file/export'"-->
              <!--              >-->
              <!--                <i class="fa fa-download" />-->
              <!--                <span class="hidden-sm-down">Semua KTP & NPWP</span>-->
              <!--              </a>-->

              <base-input style="min-width: 75px">
                <select class="form-control" v-model="redeem.search_filter" @change="debounceSearch">
                  <!-- <option value="all" selected>Semua</option> -->
                  <option value="nama_produk">Nama Produk</option>
                  <option value="nama_axi">Nama AXI</option>
                  <option value="axi_id">ID AXI</option>
                  <option value="transaksi_id">No. Transaksi</option>
                </select>
              </base-input>

              <base-input :placeholder="redeem.search_placeholder" class="input-search" @input="debounceSearch"
                v-model="redeem.search_query">
                <template slot="append">
                  <i class="fa fa-search" />
                </template>
              </base-input>
            </div>
          </div>
          <div class="table-action d-flex" v-else>
            <button class="btn btn-sm btn-light" @click="modals.alamat = true">
              Alamat Cabang
            </button>

            <button class="btn btn-sm btn-light" @click="modals.no_po = true">
              No. PO
            </button>

            <button class="btn btn-sm btn-light" @click="modals.ekspedisi = true">
              Ekspedisi
            </button>

            <button class="btn btn-sm btn-light" @click="modals.no_resi = true">
              No. Resi
            </button>

            <button class="btn btn-sm btn-light" @click="modals.ongkir = true">
              Ongkos Kirim
            </button>

            <button class="btn btn-sm btn-light" @click="modals.ppn = true">
              PPN
            </button>

            <button class="btn btn-sm btn-light" @click="modals.total_harga = true">
              Total Harga
            </button>

            <button class="btn btn-sm btn-light" @click="modals.penerima = true">
              Penerima
            </button>

            <button class="btn btn-sm btn-light" @click="modals.no_penerima = true">
              No. HP Penerima
            </button>

            <select class="form-control text-capitalize p-0" v-model="update.status_id" @change="updateClaim('status')">
              <option value="" disabled>Ubah Status</option>
              <option v-for="(s, i) in status_lists" :key="i" :value="s.id">
                {{ statusFormat(s.attributes.nama) }}
              </option>
            </select>
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
                <img alt="Error Image" src="/images/undraw_cancel_u1it.svg" height="300px" class="img-responsive" />
              <!-- </center> -->
              <br />
              <div style="display: flex; margin-top: 20px !important; justify-content: center;">
              <!-- <center> -->
                <h1 class="text-center">Error, silahkan coba lagi.</h1>
              <!-- </center> -->
              </div>
            </div>

            <div key="2" v-if="!table.isBusy">
              <b-table responsive hover selectable class="thead-warning" select-mode="multi" selectedVariant="success"
                :busy="table.isBusy" @row-selected="rowSelected" :items="table.items" :fields="table.fields">
                <template v-slot:cell(index)="data">
                  {{ calculateByPage() + data.index }}
                </template>

                <template v-slot:cell(nama_area)="data">
                  <span class="text-capitalize">{{
                      data.item.nama_area.toLowerCase()
                  }}</span>
                </template>

                <template v-slot:cell(nama_produk)="data">
                  {{ data.item.nama_produk ? data.item.nama_produk : "-" }}
                  <strong v-if="data.item.nama_produk">({{ data.item.point }} Poin)</strong>
                </template>

                <template v-slot:cell(revisi)="data">
                  <b-button variant="primary" size="sm" @click="revisi.form.row_id = data.item.id"
                    v-b-modal.modal-revisi>
                    Revisi
                  </b-button>
                </template>
                
                <template v-slot:cell(harga_barang_ongkir)="data">
                  {{
                      data.item.harga_barang_ongkir
                        ? `Rp. ${thousandFormat(data.item.harga_barang_ongkir)}`
                        : "-"
                  }}
                </template>
                
                <template v-slot:cell(total_harga)="data">
                  {{
                      data.item.total_harga
                        ? `Rp. ${thousandFormat(data.item.total_harga)}`
                        : "-"
                  }}
                </template>

                <template v-slot:cell(harga_ongkir)="data">
                  {{
                      calculateTotal(
                        data.item.product_catalog_id,
                        data.item.ongkos_kirim,
                        ""
                      )
                  }}
                </template>

                <template v-slot:cell(ppn)="data">
                  {{
                      data.item.ppn ? `Rp. ${thousandFormat(data.item.ppn)}` : "-"
                  }}
                </template>

                <template v-slot:cell(status_id)="data">
                  <span class="text-capitalize">
                    {{
                        statusFormat(
                          findInArray(data.item.status_id, status_lists, "")
                        )
                    }}
                  </span>
                </template>

                <template v-slot:cell(ongkos_kirim)="data">
                  {{
                      data.item.ongkos_kirim
                        ? `Rp. ${thousandFormat(data.item.ongkos_kirim, "")}`
                        : "-"
                  }}
                </template>

                <template v-slot:cell(nama_cabang)="data">
                  <span class="text-capitalize">{{
                      data.item.nama_cabang
                  }}</span>
                </template>

                <template v-slot:cell(nama_axi)="data">
                  <span class="text-capitalize">
                    {{ data.item.nama_axi }}
                  </span>
                </template>

                <template v-slot:cell(ktp_npwp)="data">
                  <a :href="
                    findInArray(data.item.profile_id, axi_docs, 'axi_ktp')
                  " target="_blank" rel="noopener">
                    {{ findInArray(data.item.profile_id, axi_docs, "no_ktp") }}
                  </a>
                  <br />
                  <a :href="
                    findInArray(data.item.profile_id, axi_docs, 'axi_npwp')
                  " target="_blank" rel="noopener">
                    {{ findInArray(data.item.profile_id, axi_docs, "no_npwp") }}
                  </a>
                </template>

                <template v-slot:cell(tanggal_update_ktp_npwp)="data">
                  {{ convertDate(data.item.tanggal_update_ktp_npwp) }}
                </template>

                <template v-slot:cell(created_at)="data">
                  {{ convertDate(data.item.created_at) }}
                </template>

                <template v-slot:cell(bukti_klaim)="data">
                  <div @click="() => {
                    buktiKlaim.bukti_foto = data.item.bukti_foto || '/images/image-empty-default.png'
                    buktiKlaim.ulasan = data.item.ulasan || 'Belum ada ulasan'
                  }" v-b-modal.modal-bukti-klaim>
                    <img v-if="!data.item.bukti_foto" src="/images/image-empty-default.png" height="50" alt=""/>
                    <img v-else :src="data.item.bukti_foto" height="50" alt=""/>
                  </div>
                </template>

                <template v-slot:cell(updated_at)="data">
                  {{ convertDate(data.item.updated_at) }}
                </template>

                <template v-slot:cell(alamat)="data">
                  <p :title="data.item.alamat" class="alamat-length">
                    {{ data.item.alamat }}
                  </p>
                </template>

                <div slot="table-busy" class="text-danger my-2">
                  <b-spinner class="align-middle" />
                  <strong>Loading...</strong>
                </div>
              </b-table>

              <p class="text-center m-5" v-if="table.items === 0">
                Tidak ada data claim reward.
              </p>

              <div class="card-footer py-4 d-flex justify-content-between">
                <div class="">
                  <p class="card-category">
                    Menampilkan {{ pagination.from }} hingga
                    {{ pagination.to }} dari {{ pagination.total }} data
                  </p>
                </div>

                <base-pagination v-model="redeem.current_page" :total="pagination.total" :perPage="parseInt(redeem.entry)" />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <b-modal id="modal-download" ref="modal-download" centered
       hide-footer body-class="pt-0 pl-0"
      :hide-header-close="true">
      <template #modal-title>
        Silahkan pilih file yang ingin anda <strong><i>Download</i></strong>
    </template>
      <ul>
        <li>
          <b-row>
            <b-col align-self="start" class="my-4"><strong>Excel Report</strong></b-col>
            <b-col align-self="end" class="text-right">
              <base-button class="text-warning btn-light my-3" @click="exportClaim">
                <i class="fa fa-download" />
                <span>Download</span>
              </base-button>
            </b-col>
          </b-row>
        </li>
        <li>
          <b-row>
            <b-col align-self="start" class="my-4"><strong>File KTP/NPWP AXI</strong></b-col>
            <b-col align-self="end" class="text-right">
              <base-button class="text-warning btn-light my-3" @click="exportKTPNPWP">
                <i class="fa fa-download" />
                <span>Download</span>
              </base-button>
            </b-col>
          </b-row>
        </li>
      </ul>
      <b-button variant="primary" @click="hideDownloadModal" style="position: absolute;
              top: -83px;
              right: -25px;
              border-radius: 50%;
              font-size: 32px;
              padding: 0px 0px 4px;
              width: 50px;
              height: 50px;">
        &times;
      </b-button>
    </b-modal>

    <b-modal id="modal-bukti-klaim" ref="modal-bukti-klaim" centered title="Bukti Klaim" hide-footer body-class="pt-0"
      :hide-header-close="true">
      <img :src="buktiKlaim.bukti_foto" style="width:100%;max-height:60vh;" alt=""/>
      <p style="margin-top:1rem;max-height:100px;overflow-y:auto">{{ buktiKlaim.ulasan }}</p>
      <b-row>
        <b-col>
          <b-button block variant="outline-primary" @click="hideBuktiKlaimModal">
            Tutup
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
    
    <b-modal id="modal-revisi" ref="modal-revisi" centered title="Apakah Anda yakin untuk melanjutkan Revisi Dokumen?"
      hide-footer body-class="pt-0" :hide-header-close="true">
      <p>Silahkan pilih yang ingin Anda revisi:</p>
      <b-form @submit="onSubmitRevisi" v-if="revisi.form.show">
        <b-form-group id="input-group-2" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group v-model="revisi.form.checked" id="checkboxes-2" :aria-describedby="ariaDescribedby">
            <b-row>
              <b-col>
                <b-form-checkbox value="Foto KTP tidak jelas">Foto KTP tidak jelas</b-form-checkbox>
                <b-form-checkbox value="Foto NPWP tidak jelas">Foto NPWP tidak jelas</b-form-checkbox>
                <b-form-checkbox value="Foto KTP tidak sesuai">Foto KTP tidak sesuai</b-form-checkbox>
              </b-col>
              <b-col>
                <b-form-checkbox value="Foto NPWP tidak sesuai">Foto NPWP tidak sesuai</b-form-checkbox>
                <b-form-checkbox value="Foto NPWP tidak valid">Foto NPWP tidak valid</b-form-checkbox>
              </b-col>
            </b-row>
            <!-- <b-form-invalid-feedback :state="state"
              >Mohon pilih minimal 1 alasan revisi</b-form-invalid-feedback
            > -->
          </b-form-checkbox-group>
        </b-form-group>
        <b-row>
          <b-col class="text-center">
            <b-button type="submit" variant="primary" :disabled="disableBtnRevisi">Yakin</b-button>
            <b-button variant="outline-primary" @click="hideRevisiModal">Batalkan</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>

    <modal :show.sync="modals.upload">
      <template slot="header">
        <h5 class="modal-title">Upload Claim Reward</h5>
      </template>

      <div class="form-group custom-file-upload mb-0">
        <label for="file">
          <div class="d-flex justify-content-center align-items-center flex-column" v-if="upload.file.length === 0">
            <div class="text-primary"><i class="fa fa-upload" /></div>
            <h3 class="text-primary">Browse File</h3>
            <p class="text-primary">(.xlsx, .xlsm, .csv)</p>
          </div>

          <div class="d-flex justify-content-center align-items-center" v-else>
            <div class="text-primary"><i class="fa fa-file" /></div>
            <p class="text-primary ml-2">{{ upload.file.name }}</p>
          </div>
        </label>
        <input type="file" name="" id="file" class="form-control" @change="filesChange"
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
      </div>

      <template slot="footer">
        <base-button type="warning" block :disabled="upload.file.length === 0" @click="uploadExcel">
          <div class="spinner-border text-light" role="status" v-if="upload.loading">
            <span class="sr-only">Loading...</span>
          </div>
          <span v-else>Upload File</span>
        </base-button>
      </template>
    </modal>

    <modal :show.sync="modals.penerima" class="modal-jaminan">
      <template slot="header">
        <h5 class="modal-title">Ubah Penerima</h5>
      </template>
      <div>
        <label for="penerima">Penerima CRH</label>
        <input id="penerima" type="text" class="form-control" v-model="update.penerima" />
      </div>
      <template slot="footer">
        <base-button type="primary" block @click="updateClaim('penerima')">Ubah</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.ongkir" class="modal-jaminan">
      <template slot="header">
        <h5 class="modal-title">Ubah Harga Ongkir</h5>
      </template>
      <div>
        <label for="ongkir">Harga Ongkir</label>
        <input id="ongkir" type="number" class="form-control" v-model="update.ongkir" />
      </div>
      <template slot="footer">
        <base-button type="primary" block @click="updateClaim('ongkir')">Ubah</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.no_po" class="modal-jaminan">
      <template slot="header">
        <h5 class="modal-title">Ubah Nomor PO</h5>
      </template>
      <div>
        <label for="po">No. PO</label>
        <input id="po" type="text" class="form-control" v-model="update.no_po" />
      </div>
      <template slot="footer">
        <base-button type="primary" block @click="updateClaim('no_po')">Ubah</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.alamat" class="modal-jaminan">
      <template slot="header">
        <h5 class="modal-title">Ubah Alamat Cabang</h5>
      </template>
      <div>
        <label for="alamat">Alamat Cabang</label>
        <input id="alamat" type="text" class="form-control" v-model="update.alamat" />
      </div>
      <template slot="footer">
        <base-button type="primary" block @click="updateClaim('alamat')">Ubah</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.no_resi" class="modal-jaminan">
      <template slot="header">
        <h5 class="modal-title">Ubah Nomor Resi</h5>
      </template>
      <div>
        <label for="resi">No. Resi</label>
        <input type="number" id="resi" class="form-control" v-model="update.no_resi" />
      </div>
      <template slot="footer">
        <base-button type="primary" block @click="updateClaim('no_resi')">Ubah</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.ekspedisi" class="modal-jaminan">
      <template slot="header">
        <h5 class="modal-title">Ubah Jasa Ekspedisi</h5>
      </template>
      <div>
        <label for="ekspedisi">Jasa Ekspedisi</label>
        <input id="ekspedisi" type="text" class="form-control" v-model="update.ekspedisi" />
      </div>
      <template slot="footer">
        <base-button type="primary" block @click="updateClaim('ekspedisi')">Ubah</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.no_penerima" class="modal-jaminan">
      <template slot="header">
        <h5 class="modal-title">Ubah No. HP Penerima</h5>
      </template>
      <div>
        <label for="no_penerima">No. HP CRH</label>
        <input id="no_penerima" type="text" class="form-control" v-model="update.no_penerima" />
      </div>
      <template slot="footer">
        <base-button type="primary" block @click="updateClaim('no_penerima')">Ubah</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.ppn" class="modal-jaminan">
      <template slot="header">
        <h5 class="modal-title">Ubah PPN</h5>
      </template>
      <div>
        <label for="ppn">PPN</label>
        <input id="ppn" type="number" class="form-control" v-model="update.ppn" />
      </div>
      <template slot="footer">
        <base-button type="primary" block @click="updateClaim('ppn')">Ubah</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.total_harga" class="modal-jaminan">
      <template slot="header">
        <h5 class="modal-title">Ubah Total Harga</h5>
      </template>
      <div>
        <label for="total_harga">Total Harga</label>
        <input id="total_harga" type="text" class="form-control" v-model="update.total_harga" />
      </div>
      <template slot="footer">
        <base-button type="primary" block @click="updateClaim('total_harga')">Ubah</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
// import DatePicker from "v-calendar/lib/components/date-picker.umd";
import Modal from "@/components/Modal.vue";
import swal from "sweetalert2";
import moment from "moment";

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
            label: "No. Transaksi",
            key: "transaksi_id",
            sortable: true
          },
          {
            label: "ID AXI",
            key: "profile_id",
            sortable: true
          },
          {
            label: "Nama AXI",
            key: "nama_axi",
            sortable: true
          },
          {
            label: "Nama Cabang",
            key: "nama_cabang",
            sortable: true
          },
          {
            label: "Area",
            key: "nama_area",
            sortable: true
          },
          {
            label: "Alamat Cabang",
            key: "alamat",
            sortable: true
          },
          {
            label: "KTP/NPWP",
            key: "ktp_npwp"
          },
          {
            label: "Tanggal",
            key: "tanggal_update_ktp_npwp",
            sortable: true
          },
          {
            label: "Pilihan Hadiah",
            key: "nama_produk",
            sortable: true
          },
          {
            label: "Harga + Ongkir",
            key: "harga_barang_ongkir",
            sortable: true
          },
          {
            label: "No. PO",
            key: "no_po",
            sortable: true
          },
          {
            label: "Ekspedisi",
            key: "ekspedisi",
            sortable: true
          },
          {
            label: "No. Resi",
            key: "no_resi",
            sortable: true
          },
          {
            label: "Ongkos Kirim",
            key: "ongkos_kirim",
            sortable: true
          },
          {
            label: "PPN",
            key: "ppn",
            sortable: true
          },
          {
            label: "Total Harga",
            key: "total_harga",
            sortable: true
          },
          {
            label: "Status Barang",
            key: "status_id",
            sortable: true
          },
          {
            label: "Penerima",
            key: "penerima",
            sortable: true
          },
          {
            label: "No. HP Penerima",
            key: "no_hp_crh",
            sortable: true
          },
          {
            label: "Tanggal Claim",
            key: "created_at",
            sortable: true
          },
          {
            label: "Bukti Claim",
            key: "bukti_klaim",
            class: "text-center"
          },
          {
            label: "Revisi Dokumen",
            key: "revisi",
            class: "text-center"
          },
          {
            label: "Terakhir Diubah",
            key: "updated_at",
            sortable: true
          }
        ],
        items: [],
        selected: [],
        isError: false,
        isBusy: true
      },
      buktiKlaim: {
        bukti_foto: null,
        ulasan: null,
        modal: {
          show: false
        }
      },
      revisi: {
        form: {
          checked: [],
          row_id: null,
          show: true
        },
        modal: {
          show: false
        }
      },
      axi_docs: [],
      product_lists: [],
      status_lists: [],
      redeem: {
        search_query: "",
        search_filter: "nama_produk",
        search_placeholder: "Cari nama produk...",
        entry: 5,
        current_page: 1
      },
      pagination: {},
      modals: {
        upload: false,
        penerima: false,
        no_penerima: false,
        ppn: false,
        total_harga: false,
        ongkir: false,
        no_resi: false,
        no_po: false,
        ekspedisi: false,
        close_modal: false,
        alamat: false
      },
      upload: {
        loading: false,
        file: [],
        disabled: []
      },
      update: {
        status_id: "",
        penerima: "",
        ongkir: "",
        no_resi: "",
        ekspedisi: "",
        alamat: "",
        no_po: "",
        no_penerima: "",
        ppn: "",
        total_harga: ""
      },
      token: "",
      axi: [],
      date_picker: {
        range: {
          start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          end: new Date()
        },
        highlight: [
          {
            highlight: {
              style: {
                background: '#ff8080'
              },
              contentStyle: {
                color: 'black'
              }
            },
          },
        ],
      }
    };
  },
  async mounted() {
    this.token = window.localStorage.getItem("access_token");

    try {
      let product = await this.$api.get(
        `${this.$store.state.br_base_url}/product-catalog`
      );
      this.product_lists = product.data.data;

      let status = await this.$api.get(
        `${this.$store.state.br_base_url}/status?search=claim_reward`
      );
      this.status_lists = status.data.data;

      let foto = await this.$api.get(
        `${this.$store.state.br_base_url}/axi-foto?limit=10000`
      );
      this.axi_docs = foto.data.data;

      await this.getClaim();

      this.table.isBusy = false;
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    disableBtnRevisi() {
      return this.revisi.form.checked.length === 0;
    },
    page() {
      return this.redeem.current_page;
    }
  },
  watch: {
    page() {
      this.getClaim();
    }
  },
  methods: {
    async onSubmitRevisi(event) {
      event.preventDefault();
      const reasons = this.revisi.form.checked
        .toString()
        .split(",")
        .join(", ");
      this.putRevision(this.revisi.form.row_id, reasons);
      this.hideRevisiModal(event);
    },
    UrlHealer(dirtyUrl) {
      return sanitizeUrl(dirtyUrl);
    },
    hideDownloadModal(event) {
      event.preventDefault();
      this.$refs["modal-download"].hide();
    },
    hideRevisiModal(event) {
      event.preventDefault();
      this.$refs["modal-revisi"].hide();
      // Reset our form values
      this.revisi.form.checked = [];
      this.revisi.form.row_id = null;
      // Trick to reset/clear native browser form validation state
      this.revisi.form.show = false;
      this.$nextTick(() => {
        this.revisi.form.show = true;
      });
    },
    hideBuktiKlaimModal(event) {
      event.preventDefault();
      this.$refs["modal-bukti-klaim"].hide();
      buktiKlaim.bukti_foto = null
      buktiKlaim.ulasan = null
    },
    debounceSearch: _.debounce(function () {
      this.getClaim();
    }, 1500),
    rowSelected(items) {
      this.table.selected = items;
    },
    async putRevision(row_id, reasons) {
      const refetchList = this.getClaim;
      try {
        let revisi = await this.$api.put(
          `${this.$store.state.bff_base_url
          }/business/claim-reward/revisi/${row_id}?alasan_revisi=${reasons}`,
          {},
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        swal("Success!", revisi.data.message, "success").then(function () {
          refetchList();
        });
      } catch (error) {
        swal(
          "Kesalahan ketika update!",
          error.response.data.message,
          "error"
        ).then(function () {
          refetchList();
        });
      }
    },
    async getClaim() {
      try {
        let claim = await this.$api.get(
          `${this.$store.state.bff_base_url
          }/business/claim-reward/list?pageSize=${parseInt(this.redeem.entry)}${this.redeem.search_query
            ? "&filter=" +
            this.redeem.search_filter +
            "&filterValue=" +
            this.redeem.search_query
            : ""
          }&pageNo=${this.redeem.current_page}`,
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        this.table.items = claim.data.data;
        this.pagination = claim.data.meta;
      } catch (error) { }
    },
    async uploadExcel() {
      this.modals.close_modal = !this.modals.close_modal;
      this.upload.loading = !this.upload.loading;
      this.backdropModal("disable");

      let formData = new FormData();
      formData.append("file_excel", this.upload.file);
      try {
        let response = await this.$api.post(
          `${this.$store.state.br_base_url}/claim-reward/file/import`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        this.getClaim();

        this.modals.upload = !this.modals.upload;
        this.modals.close_modal = !this.modals.close_modal;
        this.upload.loading = !this.upload.loading;
        this.backdropModal("able");
        swal("Success!", response.data.detail, "success").then(function () {
          location.reload();
        });
        this.upload = {
          file: []
        };
      } catch (error) {
        this.modals.upload = !this.modals.upload;
        this.modals.close_modal = !this.modals.close_modal;
        this.upload.loading = !this.upload.loading;
        this.backdropModal("able");
        swal(
          "Kesalahan ketika upload!",
          error.response.data.message,
          "error"
        ).then(function () {
          location.reload();
        });
      }
    },
    searchHandleChange(e) {
      const filterKey = e.target.value;
      const placeholder = "Cari ";
      const tripleDots = "...";
      switch (filterKey) {
        case "nm_axi":
          this.redeem.search_placeholder =
            placeholder + "nama AXI" + tripleDots;
          break;
        case "id_axi":
          this.redeem.search_placeholder = placeholder + "ID AXI" + tripleDots;
          break;
        case "no_trx":
          this.redeem.search_placeholder =
            placeholder + "nomor transaksi" + tripleDots;
          break;
        default:
          this.redeem.search_placeholder =
            placeholder + "nama produk" + tripleDots;
          break;
      }
    },
    updateClaim(method) {
      switch (method) {
        case "status":
          this.table.isBusy = true;
          this.table.selected.forEach(async (item, i) => {
            await this.$api.put(
              `${this.$store.state.br_base_url}/claim-reward/${item.id}`,
              {
                profile_id: item.profile_id,
                alamat: item.alamat,
                nama_axi: item.nama_axi,
                cabang_id: item.cabang_id,
                nama_cabang: item.nama_cabang,
                area_id: item.area_id,
                nama_area: item.nama_area,
                crh_id: item.crh_id,
                penerima: item.penerima,
                product_catalog_id: item.product_catalog_id,
                no_po: item.no_po,
                ekspedisi: item.ekspedisi,
                no_resi: item.no_resi,
                ongkos_kirim: item.ongkos_kirim,
                harga_barang_ongkir: item.harga_barang_ongkir,
                ppn: item.ppn,
                total_harga: item.total_harga,
                status_id: this.update.status_id
              },
              { headers: { Authorization: `Bearer ${this.token}` } }
            );

            if (this.table.selected.length === i + 1) {
              this.getClaim();
              swal("Success!", "Status berhasil diubah", "success");
            }
            this.table.isBusy = false;
          });           
          break;

        case "ongkir":
          this.table.selected.forEach(
            async (item, i) => {
              await this.$api.put(
                `${this.$store.state.br_base_url}/claim-reward/${item.id}`,
                {
                  profile_id: item.profile_id,
                  alamat: item.alamat,
                  nama_axi: item.nama_axi,
                  cabang_id: item.cabang_id,
                  nama_cabang: item.nama_cabang,
                  area_id: item.area_id,
                  nama_area: item.nama_area,
                  crh_id: item.crh_id,
                  penerima: item.penerima,
                  product_catalog_id: item.product_catalog_id,
                  no_po: item.no_po,
                  ekspedisi: item.ekspedisi,
                  no_resi: item.no_resi,
                  ongkos_kirim: this.update.ongkir,
                  harga_barang_ongkir: item.harga_barang_ongkir,
                  ppn: item.ppn,
                  total_harga: item.total_harga,
                  status_id: item.status_id
                }
              );

              if (this.table.selected.length === i + 1) {
                this.getClaim();
                this.modals.ongkir = false;
                swal("Success!", "Ongkos Kirim berhasil diubah", "success");
              }
            },
            { headers: { Authorization: `Bearer ${this.token}` } }
          );
          break;

        case "no_resi":
          this.table.selected.forEach(
            async (item, i) => {
              await this.$api.put(
                `${this.$store.state.br_base_url}/claim-reward/${item.id}`,
                {
                  profile_id: item.profile_id,
                  alamat: item.alamat,
                  nama_axi: item.nama_axi,
                  cabang_id: item.cabang_id,
                  nama_cabang: item.nama_cabang,
                  area_id: item.area_id,
                  nama_area: item.nama_area,
                  crh_id: item.crh_id,
                  penerima: item.penerima,
                  product_catalog_id: item.product_catalog_id,
                  no_po: item.no_po,
                  ekspedisi: item.ekspedisi,
                  no_resi: this.update.no_resi,
                  ongkos_kirim: item.ongkos_kirim,
                  harga_barang_ongkir: item.harga_barang_ongkir,
                  ppn: item.ppn,
                  total_harga: item.total_harga,
                  status_id: item.status_id
                }
              );

              if (this.table.selected.length === i + 1) {
                this.getClaim();
                this.modals.no_resi = false;
                swal("Success!", "Nomor resi berhasil diubah", "success");
              }
            },
            { headers: { Authorization: `Bearer ${this.token}` } }
          );
          break;

        case "no_po":
          this.table.selected.forEach(async (item, i) => {
            await this.$api.put(
              `${this.$store.state.br_base_url}/claim-reward/${item.id}`,
              {
                profile_id: item.profile_id,
                alamat: item.alamat,
                nama_axi: item.nama_axi,
                cabang_id: item.cabang_id,
                nama_cabang: item.nama_cabang,
                area_id: item.area_id,
                nama_area: item.nama_area,
                crh_id: item.crh_id,
                penerima: item.penerima,
                product_catalog_id: item.product_catalog_id,
                no_po: this.update.no_po,
                ekspedisi: item.ekspedisi,
                no_resi: item.no_resi,
                ongkos_kirim: item.ongkos_kirim,
                harga_barang_ongkir: item.harga_barang_ongkir,
                ppn: item.ppn,
                total_harga: item.total_harga,
                status_id: item.status_id
              },
              { headers: { Authorization: `Bearer ${this.token}` } }
            );

            if (this.table.selected.length === i + 1) {
              this.getClaim();
              this.modals.no_po = false;
              swal(
                "Success!",
                "Nomor Purchase Order berhasil diubah",
                "success"
              );
            }
          });
          break;

        case "alamat":
          this.table.selected.forEach(async (item, i) => {
            await this.$api.put(
              `${this.$store.state.br_base_url}/claim-reward/${item.id}`,
              {
                profile_id: item.profile_id,
                alamat: this.update.alamat,
                nama_axi: item.nama_axi,
                cabang_id: item.cabang_id,
                nama_cabang: item.nama_cabang,
                area_id: item.area_id,
                nama_area: item.nama_area,
                crh_id: item.crh_id,
                penerima: item.penerima,
                product_catalog_id: item.product_catalog_id,
                no_po: item.no_po,
                ekspedisi: item.ekspedisi,
                no_resi: item.no_resi,
                ongkos_kirim: item.ongkos_kirim,
                harga_barang_ongkir: item.harga_barang_ongkir,
                ppn: item.ppn,
                total_harga: item.total_harga,
                status_id: item.status_id
              },
              { headers: { Authorization: `Bearer ${this.token}` } }
            );

            if (this.table.selected.length === i + 1) {
              this.getClaim();
              this.modals.alamat = false;
              swal("Success!", "Alamat Cabang berhasil diubah", "success");
            }
          });
          break;

        case "penerima":
          this.table.selected.forEach(async (item, i) => {
            await this.$api.put(
              `${this.$store.state.br_base_url}/claim-reward/${item.id}`,
              {
                profile_id: item.profile_id,
                penerima: this.update.penerima,
                alamat: item.alamat,
                nama_axi: item.nama_axi,
                cabang_id: item.cabang_id,
                nama_cabang: item.nama_cabang,
                area_id: item.area_id,
                nama_area: item.nama_area,
                crh_id: item.crh_id,
                product_catalog_id: item.product_catalog_id,
                no_po: item.no_po,
                ekspedisi: item.ekspedisi,
                no_resi: item.no_resi,
                ongkos_kirim: item.ongkos_kirim,
                harga_barang_ongkir: item.harga_barang_ongkir,
                ppn: item.ppn,
                total_harga: item.total_harga,
                status_id: item.status_id
              },
              { headers: { Authorization: `Bearer ${this.token}` } }
            );

            if (this.table.selected.length === i + 1) {
              this.getClaim();
              this.modals.penerima = false;
              swal("Success!", "Penerima CRH berhasil diubah", "success");
            }
          });
          break;

        case "ekspedisi":
          this.table.selected.forEach(async (item, i) => {
            await this.$api.put(
              `${this.$store.state.br_base_url}/claim-reward/${item.id}`,
              {
                profile_id: item.profile_id,
                ekspedisi: this.update.ekspedisi,
                penerima: item.penerima,
                alamat: item.alamat,
                nama_axi: item.nama_axi,
                cabang_id: item.cabang_id,
                nama_cabang: item.nama_cabang,
                area_id: item.area_id,
                nama_area: item.nama_area,
                crh_id: item.crh_id,
                product_catalog_id: item.product_catalog_id,
                no_po: item.no_po,
                no_resi: item.no_resi,
                ongkos_kirim: item.ongkos_kirim,
                harga_barang_ongkir: item.harga_barang_ongkir,
                ppn: item.ppn,
                total_harga: item.total_harga,
                status_id: item.status_id
              },
              { headers: { Authorization: `Bearer ${this.token}` } }
            );

            if (this.table.selected.length === i + 1) {
              this.getClaim();
              this.modals.ekspedisi = false;
              swal("Success!", "Jasa Ekspedisi berhasil diubah", "success");
            }
          });
          break;

        case "no_penerima":
          this.table.selected.forEach(async (item, i) => {
            await this.$api.put(
              `${this.$store.state.br_base_url}/claim-reward/${item.id}`,
              {
                profile_id: item.profile_id,
                no_hp_crh: this.update.no_penerima,
                ekspedisi: item.ekspedisi,
                penerima: item.penerima,
                alamat: item.alamat,
                nama_axi: item.nama_axi,
                cabang_id: item.cabang_id,
                nama_cabang: item.nama_cabang,
                area_id: item.area_id,
                nama_area: item.nama_area,
                crh_id: item.crh_id,
                product_catalog_id: item.product_catalog_id,
                no_po: item.no_po,
                no_resi: item.no_resi,
                ongkos_kirim: item.ongkos_kirim,
                harga_barang_ongkir: item.harga_barang_ongkir,
                ppn: item.ppn,
                total_harga: item.total_harga,
                status_id: item.status_id
              },
              { headers: { Authorization: `Bearer ${this.token}` } }
            );

            if (this.table.selected.length === i + 1) {
              this.getClaim();
              this.modals.no_penerima = false;
              swal("Success!", "No. HP Penerima berhasil diubah", "success");
            }
          });
          break;

        case "ppn":
          this.table.selected.forEach(async (item, i) => {
            await this.$api.put(
              `${this.$store.state.br_base_url}/claim-reward/${item.id}`,
              {
                profile_id: item.profile_id,
                no_hp_crh: item.no_penerima,
                ekspedisi: item.ekspedisi,
                penerima: item.penerima,
                alamat: item.alamat,
                nama_axi: item.nama_axi,
                cabang_id: item.cabang_id,
                nama_cabang: item.nama_cabang,
                area_id: item.area_id,
                nama_area: item.nama_area,
                crh_id: item.crh_id,
                product_catalog_id: item.product_catalog_id,
                no_po: item.no_po,
                no_resi: item.no_resi,
                ongkos_kirim: item.ongkos_kirim,
                harga_barang_ongkir: item.harga_barang_ongkir,
                ppn: this.update.ppn,
                total_harga: item.total_harga,
                status_id: item.status_id
              },
              { headers: { Authorization: `Bearer ${this.token}` } }
            );

            if (this.table.selected.length === i + 1) {
              this.getClaim();
              this.modals.ppn = false;
              swal("Success!", "PPN berhasil diubah", "success");
            }
          });
          break;

        case "total_harga":
          this.table.selected.forEach(async (item, i) => {
            await this.$api.put(
              `${this.$store.state.br_base_url}/claim-reward/${item.id}`,
              {
                profile_id: item.profile_id,
                no_hp_crh: item.no_penerima,
                ekspedisi: item.ekspedisi,
                penerima: item.penerima,
                alamat: item.alamat,
                nama_axi: item.nama_axi,
                cabang_id: item.cabang_id,
                nama_cabang: item.nama_cabang,
                area_id: item.area_id,
                nama_area: item.nama_area,
                crh_id: item.crh_id,
                product_catalog_id: item.product_catalog_id,
                no_po: item.no_po,
                no_resi: item.no_resi,
                ongkos_kirim: item.ongkos_kirim,
                harga_barang_ongkir: item.harga_barang_ongkir,
                ppn: item.ppn,
                total_harga: this.update.total_harga,
                status_id: item.status_id
              },
              { headers: { Authorization: `Bearer ${this.token}` } }
            );

            if (this.table.selected.length === i + 1) {
              this.getClaim();
              this.modals.total_harga = false;
              swal("Success!", "Total Harga berhasil diubah", "success");
            }
          });
          break;

        default:
          break;
      }
    },
    exportKTPNPWP() {
      let url = `${this.$store.state.bff_base_url
        }/business/download-foto-ktp-npwp`;
      window.open(url, "_blank");
    },
    exportClaim() {
      let from = moment(this.date_picker.range.start).format("YYYY-MM-DD");
      let to = moment(this.date_picker.range.end).format("YYYY-MM-DD");
      // console.log('date range', [from, to]);
      let url = `${this.$store.state.br_base_url
        }/claim-reward/file/export/range?from=${from}&to=${to}`;
      window.open(url, "_blank");
    },
    limitEntryChanges() {
      this.redeem.current_page = 1;
      this.getClaim();
    },
    calculateTotal(product_id, ongkir, output) {
      let harga = this.findInArray(product_id, this.product_lists, "harga");
      let ongkos_kirim = ongkir ? ongkir : 0;
      let harga_ongkir = parseInt(harga) + parseInt(ongkos_kirim);
      let ppn = harga_ongkir / 10;

      let total = parseInt(harga) + parseInt(ongkos_kirim) + parseInt(ppn);
      if (output === "total") return this.thousandFormat(total);
      else if (output === "ppn") return this.thousandFormat(ppn);
      else return this.thousandFormat(harga_ongkir);
    },
    filesChange(ev) {
      this.upload.file = ev.target.files[0];
    },
    findInArray(key, array, output) {
      let result;

      if (!["axi_ktp", "axi_npwp", "no_ktp", "no_npwp"].includes(output)) {
        if (array) {
          result = array.find(item => item.id === key);
        }

        if (result) {
          if (output === "point") return result.attributes.point;
          else if (output === "harga") return result.attributes.harga;
          else return result.attributes.nama;
        }
      } else {
        if (array) {
          result = array.find(item => item.attributes.axi_id === key);
        }

        if (result) {
          if (output === "axi_ktp") return result.attributes.foto_ktp;
          else if (output === "axi_npwp") return result.attributes.foto_npwp;
          else if (output === "no_ktp") return result.attributes.no_ktp;
          else if (output === "no_npwp") return result.attributes.no_npwp;
        } else {
          return "-";
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
    statusFormat(text) {
      if (text) return text.replace("_", " ");
    },
    convertDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
    calculateByPage() {
      return (
        this.redeem.current_page * this.redeem.entry - this.redeem.entry + 1
      );
    }
  },
  components: {
    Modal,
    HalfCircleSpinner,
    // DatePicker
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>
