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
      <div class="pt-2">
        <router-link
          to="/administrator/requests/listorder"
          class="btn btn-sm btn-primary"
        >
          <i class="ni ni-bold-left" aria-hidden="true"></i>
          <span class="hidden-sm-down">Kembali</span>
        </router-link>
      </div>
    </base-header>

    <div key="1" v-if="isBusy" class="text-center pb-5" style="display: flex; margin-top: 20px !important; justify-content: center;">
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

    <div v-if="!isBusy && !isError" class="container-fluid mt--6">
      <b-card>
        <h2 class="mt-3 sub-title">Jenis Program Cicilan</h2>
        <hr class="divider" />
          <b-form @submit.stop.prevent="passes(onSubmit)">
              <b-form-group>
                <div class="row ml-2">
                  <div class="col-md-4">
                    <b-form-radio
                      v-model="form.program"
                      name="program"
                      value="Dana Multiguna"
                    >Dana Multiguna</b-form-radio>
                    <b-form-radio
                      v-model="form.program"
                      name="program"
                      value="Maxi Edukasi"
                    >MAXI Edukasi</b-form-radio>
                    <b-form-radio
                      v-model="form.program"
                      name="program"
                      value="Maxi Sehat"
                    >MAXI Sehat</b-form-radio>
                    <b-form-radio
                      v-model="form.program"
                      name="program"
                      value="Maxi Extraguna"
                    >MAXI Extraguna</b-form-radio>
                  </div>
                  <div class="col-md-6">
                    <b-form-radio
                      v-model="form.program"
                      name="program"
                      value="Maxi Travel"
                    >MAXI Travel</b-form-radio>
                    <b-form-radio
                      v-model="form.program"
                      name="program"
                      value="Maxi Usaha"
                    >MAXI Usaha</b-form-radio>
                    <b-form-radio
                      v-model="form.program"
                      name="program"
                      value="Maxi Griya"
                    >MAXI Griya</b-form-radio>
                  </div>
                </div>
              </b-form-group>
            <div class="row">
              <div class="col-sm-6">
                <b-form-group
                  id="input-group-order-id"
                  label="Order ID"
                  label-for="order-id"
                >
                  <b-form-input
                    id="order-id"
                    name="order-id"
                    v-model="form.orderid"
                    readonly
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-axi-id"
                  label="AXI ID"
                  label-for="axi-id"
                >
                  <b-input-group>
                    <template v-slot:append>
                      <b-input-group-text>
                        <strong>Nama : {{ form.namaaxi }}</strong>
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      id="axi-id"
                      name="axi-id"
                      v-model="form.axiid"
                      readonly
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
              <div class="col-sm-6">
                  <b-form-group
                    id="input-group-jumlah-pinjaman"
                    label="Jumlah Pinjaman"
                    label-for="jumlah-pinjaman"
                  >
                    <b-form-input
                      placeholder="Rp."
                      type="text"
                      id="jumlah-pinjaman"
                      name="jumlah-pinjaman"
                      v-model="form.jumlah_pinjaman"
                      readonly
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    id="input-group-jumlah-pinjaman-terverifikasi"
                    label="Jumlah Pinjaman Terverifikasi"
                    label-for="jumlah-pinjaman-terverifikasi"
                  >
                    <b-form-input
                      placeholder="Rp."
                      type="number"
                      id="jumlah-pinjaman-terverifikasi"
                      name="jumlah-pinjaman-terverifikasi"
                      v-model="form.jumlah_pinjaman_terverifikasi"
                      readonly
                    ></b-form-input>
                  </b-form-group>
              </div>
            </div>
            <h2 class="mt-3 sub-title">Informasi Jaminan</h2>
            <hr class="divider" />

            <div class="row">
              <div class="col-sm-6">
                <b-form-group
                  id="input-group-jaminan"
                  label="Jaminan"
                  label-for="jaminan"
                >
                  <b-form-input
                    id="jaminan"
                    name="jaminan"
                    v-model="form.jaminan"
                    readonly
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-merk-kendaraan"
                  label="Merk Kendaraan"
                  label-for="merk-kendaraan"
                >
                  <b-form-input
                    id="merk-kendaraan"
                    name="merk-kendaraan"
                    v-model="form.merk_kendaraan"
                    readonly
                  ></b-form-input>
                </b-form-group>
                  <b-form-group
                    id="input-group-tipe-kendaraan"
                    label="Tipe Kendaraan"
                    label-for="input-tipe-kendaraan"
                  >
                    <b-form-input
                      id="input-tipe-kendaraan"
                      name="input-tipe-kendaraan"
                      v-model="form.tipe_kendaraan"
                      readonly
                    ></b-form-input>
                  </b-form-group>
              </div>
              <div class="col-sm-6">
                <b-form-group
                  id="input-group-area"
                  label="Area"
                  label-for="area"
                >
                  <b-form-input
                    id="area"
                    name="area"
                    v-model="form.area"
                    readonly
                  ></b-form-input>
                </b-form-group>
                  <b-form-group
                    id="input-group-tahun-kendaraan"
                    label="Tahun Kendaraan"
                    label-for="input-tahun-kendaraan"
                  >
                    <b-form-input
                      id="input-tahun-kendaraan"
                      name="input-tahun-kendaraan"
                      v-model="form.tahun_kendaraan"
                      readonly
                    ></b-form-input>
                  </b-form-group>
              </div>
            </div>
            <h2 class="mt-3 sub-title">Informasi Pinjaman</h2>
            <hr class="divider" />
              <b-form-group
                id="input-group-tenor"
                label="Tenor"
                label-for="input-tenor"
              >
                <b-form-input
                  id="input-tenor"
                  name="input-tenor"
                  v-model="form.tenor"
                  readonly
                ></b-form-input>
              </b-form-group>
            <h2 class="mt-3 sub-title">Data Calon Peminjam</h2>
            <hr class="divider" />
            <div class="row">
              <div class="col-md-6">
                  <b-form-group
                    id="input-group-nama-lengkap"
                    label="Nama Lengkap"
                    label-for="nama-lengkap"
                  >
                    <b-form-input
                      id="nama-lengkap"
                      name="nama-lengkap"
                      v-model="form.nama_lengkap"
                      readonly
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    id="input-group-no-ktp"
                    label="No. KTP"
                    label-for="no-ktp"
                  >
                    <b-form-input
                      type="text"
                      id="no-ktp"
                      name="no-ktp"
                      v-model="form.no_ktp"
                      readonly
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    id="input-group-email"
                    label="Email"
                    label-for="email"
                  >
                    <b-form-input
                      id="email"
                      name="email"
                      v-model="form.email"
                      readonly
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    id="input-group-no-handphone"
                    label="No. Handphone"
                    label-for="no-handphone"
                  >
                    <b-form-input
                      type="text"
                      id="no-handphone"
                      name="no-handphone"
                      v-model="form.no_handphone"
                      readonly
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    id="input-group-alamat-domisili"
                    label="Alamat Domisili"
                    label-for="alamat-domisili"
                  >
                    <b-form-textarea
                      id="textarea"
                      v-model="form.alamat_domisili"
                      placeholder="Masukan Alamat..."
                      rows="3"
                      max-rows="6"
                      readonly
                    ></b-form-textarea>
                  </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  id="input-group-provinsi-domisili"
                  label="Provinsi Domisili"
                  label-for="provinsi-domisili"
                >
                  <b-form-input
                    id="provinsi-domisili"
                    name="provinsi-domisili"
                    v-model="form.provinsi_domisili"
                    readonly
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-kota-domisili"
                  label="Kota Domisili"
                  label-for="kota-domisili"
                >
                  <b-form-input
                    id="kota-domisili"
                    name="kota-domisili"
                    v-model="form.kota_domisili"
                    readonly
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-kecamatan"
                  label="Kecamatan"
                  label-for="kecamatan"
                >
                  <b-form-input
                    id="kecamatan"
                    name="kecamatan"
                    v-model="form.kecamatan"
                    readonly
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-kelurahan"
                  label="Kelurahan"
                  label-for="kelurahan"
                >
                  <b-form-input
                    id="kelurahan"
                    name="kelurahan"
                    v-model="form.kelurahan"
                    readonly
                  ></b-form-input>
                </b-form-group>
                  <b-form-group
                    id="input-group-zip-code"
                    label="Zip Code"
                    label-for="zip-code"
                  >
                    <b-form-input
                      type="number"
                      id="zip-code"
                      name="zip-code"
                      v-model="form.zip_code"
                      readonly
                    ></b-form-input>
                  </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                  <b-form-group
                    id="input-group-tanggal-survey"
                    label="Tanggal Janji Survey"
                    label-for="tanggal-survey"
                  >
                    <b-form-input
                      :type="type"
                      name="tanggal-survey"
                      v-model="form.tanggal_survey"
                      readonly
                    ></b-form-input>
                  </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  id="input-group-cabang"
                  label="Cabang"
                  label-for="cabang"
                >
                  <b-form-input
                    id="cabang"
                    name="cabang"
                    v-model="form.cabang"
                    readonly
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                  <b-form-group
                    id="input-group-crh-name"
                    label="CRH Name"
                    label-for="input-crh-name"
                  >
                    <b-form-input
                      id="input-crh-name"
                      name="input-crh-name"
                      v-model="form.crh_name"
                      readonly
                    ></b-form-input>
                  </b-form-group>
              </div>
              <div class="col-md-6">
                  <b-form-group
                    id="input-group-crh-email"
                    label="CRH Email"
                    label-for="crh-email"
                  >
                    <b-form-input
                      id="input-crh-email"
                      name="input-crh-email"
                      v-model="form.crh_email"
                      readonly
                    ></b-form-input>
                  </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  id="input-group-progress"
                  label="Progress"
                  label-for="input-progress"
                >
                  <b-form-input
                    id="input-progress"
                    name="input-progress"
                    v-model="form.progress"
                    readonly
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  id="input-group-voucherCode"
                  label="Voucher Code"
                  label-for="input-voucherCode"
                >
                  <b-form-input
                    id="input-voucherCode"
                    name="input-voucherCode"
                    v-model="form.voucherCode"
                    readonly
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <card>
                  <img
                    v-if="fotoKTP"
                    slot="image"
                    class="card-img-top dataimg"
                    :src="fotoKTP"
                    alt="foto ktp"
                  />
                  <div v-else class="card-body text-center placeholder">
                    <p class="card-text">Tidak ada data foto KTP</p>
                  </div>

                  <h3 class="card-title">Foto KTP</h3>
                </card>
              </div>
              <div class="col-sm-6">
                <card>
                  <img
                    v-if="fotoSTNK"
                    slot="image"
                    class="card-img-top dataimg"
                    :src="fotoSTNK"
                    alt="foto stnk"
                  />
                  <div v-else class="card-body text-center placeholder">
                    <p class="card-text">Tidak ada data foto BPKB</p>
                  </div>

                  <h3 class="card-title">Foto BPKB</h3>
                </card>
              </div>
            </div>
            <!-- dikomen dulu kalau butuh tinggal aktifkan untuk button update -->
            <!-- <b-button type="submit" variant="primary" class="btn btn-block semibold m-b-10">Submit</b-button> -->
            <!-- <b-button class="ml-2" @click="resetForm()">Reset</b-button> -->
          </b-form>
      </b-card>
    </div>
  </div>
</template>

<style scoped>
.dateInput {
  width: 100%;
}
.divider {
  margin-top: 0px;
}
.sub-title {
  color: #5e72e4;
}
div.custom-control.custom-control-inline.custom-radio {
  margin-right: 2rem !important;
}
.placeholder {
  height: 170px;
}
.dataimg {
  min-height: 170px;
}
</style>

<script>
import moment from "moment";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  data() {
    return {
      type: "text",
      dataDetail: null,
      isBusy: true,
      isError: false,
      area_lists: null,
      provinsi_lists: null,
      city_lists: [],
      district_lists: [],
      village_lists: [],
      branch_lists: [],
      manufacture_motor: [],
      tipeList: [],
      crh_name: [],
      fotoKTP: "",
      fotoSTNK: "",
      form: {
        program: "Dana Multiguna",
        orderid: null,
        axiid: null,
        jumlah_pinjaman: null,
        jumlah_pinjaman_terverifikasi: null,
        jaminan: null,
        merk_kendaraan: null,
        tipe_kendaraan: null,
        tahun_kendaraan: null,
        area: null,
        tenor: null,
        nama_lengkap: null,
        no_ktp: null,
        email: null,
        no_handphone: null,
        zip_code: null,
        provinsi_domisili: null,
        kota_domisili: null,
        kecamatan: null,
        kelurahan: null,
        alamat_domisili: null,
        tanggal_survey: null,
        cabang: null,
        crh_name: null,
        crh_email: null,
        progress: null,
        kode_cabang: "",
      },
      dataForm: [],
      dates: {
        simple: "",
      },
      selected: "dana_multiguna",
      dataGet: [],
    };
  },
  components: {
    HalfCircleSpinner,
  },
  computed: {
    orderId() {
      return this.$route.params.id;
    },
  },
  async mounted() {
    this.token = window.localStorage.getItem("access_token");
    await this.getDetailEditOrder();
    this.isBusy = false;
  },
  methods: {
    async getDetailEditOrder() {
      try {
        let detailEditOrder = await this.$api.get(
          `${this.$store.state.edit_order_list_base_url}?orderId=${this.orderId}`
        );
        // console.log(detailEditOrder);

        this.dataDetail = await detailEditOrder.data[0];
        // console.log(this.dataDetail);

        this.form.tanggal_survey = this.dataDetail.janjiSurvey;

        this.form = {
          program: this.dataDetail.namaProduk,
          orderid: this.dataDetail.orderId,
          axiid: this.dataDetail.axiId,
          namaaxi: this.dataDetail.namaAxi,
          jumlah_pinjaman: this.formatValue(this.dataDetail.ammount),
          jumlah_pinjaman_terverifikasi: this.formatValue(this.form.jumlah_pinjaman),
          jaminan: this.dataDetail.colleteral === "002" ? "BPKB Mobil" : this.dataDetail.colleteral === "001" ? "BPKB Motor": '-',
          merk_kendaraan: this.dataDetail.brandName,
          tipe_kendaraan: this.dataDetail.modelName,
          tahun_kendaraan: moment(this.dataDetail.year).format('DD/MM/YYYY'),
          area: this.dataDetail.area,
          tenor:
            this.dataDetail.tenor == "12"
              ? "12 Bulan"
              : this.dataDetail.tenor == "24"
              ? "24 Bulan"
              : this.dataDetail.tenor == "36"
              ? "36 Bulan"
              : this.dataDetail.tenor == "48"
              ? "48 Bulan"
              : '-',
          nama_lengkap: this.dataDetail.namaNasabah,
          no_ktp: this.dataDetail.noKtpNasabah,
          email: this.dataDetail.emailNasabah,
          no_handphone: this.dataDetail.noHpNasabah,
          zip_code: this.dataDetail.kodePos,
          provinsi_domisili: this.dataDetail.provinsi,
          kota_domisili: this.dataDetail.kabupaten,
          kecamatan: this.dataDetail.kecamatan,
          kelurahan: this.dataDetail.kelurahan,
          alamat_domisili: this.dataDetail.alamat,
          tanggal_survey: moment(
            this.dataDetail.janjiSurvey,
            "Asia/Jakarta"
          ).format("DD/MM/YYYY"),
          cabang: this.dataDetail.branch,
          kode_cabang: this.dataDetail.branchCode,
          crh_name: this.dataDetail.crhName,
          crh_email: this.dataDetail.crhEmail,
          progress: this.dataDetail.status,
          voucherCode: this.dataDetail.voucherCode,
        };
        this.fotoKTP = this.dataDetail.foto_ktp ? this.dataDetail.foto_ktp + '?API_KEY=wgPXIj8jb1onLf2flIyACZBmp1JlnW7wg5rW5wFi' : this.dataDetail.foto_ktp;
        this.fotoSTNK = this.dataDetail.foto_bpkb ? this.dataDetail.foto_bpkb+ '?API_KEY=wgPXIj8jb1onLf2flIyACZBmp1JlnW7wg5rW5wFi' : this.dataDetail.foto_bpkb;
        // this.table.meta = products.data.meta;
      } catch (error) {
        throw new Error("Something went wrong " + error);
      }
    },
    resetForm() {
      this.form = {
        orderid: null,
        axiid: null,
        jumlah_pinjaman: null,
        jumlah_pinjaman_terverifikasi: null,
        jaminan: null,
        merk_kendaraan: null,
        tipe_kendaraan: null,
        tahun_kendaraan: null,
        area: null,
        tenor: null,
        nama_lengkap: null,
        no_ktp: null,
        email: null,
        no_handphone: null,
        zip_code: null,
        provinsi_domisili: null,
        kota_domisili: null,
        kecamatan: null,
        kelurahan: null,
        alamat_domisili: null,
        tanggal_survey: null,
        cabang: null,
        crh_name: null,
        crh_email: null,
        progress: null,
        voucherCode: null,
      };
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
    },
    /* Fungsi formatRupiah */
    formatRupiah(angka, prefix) {
      let number_string = angka.replace(/[^,\d]/g, "").toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
      return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    },
    formatValue(value) {
      return (this.form.jumlah_pinjaman = this.formatRupiah(value, "Rp. "));
    },
  },
};
</script>
