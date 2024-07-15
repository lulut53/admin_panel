<template>
    <div>
        <base-header class="pb-6" type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-8 col-7">
                    <h6 class="h2 d-inline-block mb-0">Setting Simulasi</h6>
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links">
                        <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i> Administrator</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">Simulation</li>
                        <li class="breadcrumb-item active" aria-current="page">Setting</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--6">
            <!-- <div class="card">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h5 class="h3 mb-0 text-uppercase">Jaminan Setting</h5>
                        </div>
                        <div class="col-4 text-right">
                            <a href="" class="" @click.prevent="modals.new_jaminan = true"><i class="ni ni ni-fat-add"></i> Add another jaminan</a>
                        </div>
                    </div>
                </div>

                <div class="card-body"> -->

                    <div class="card card-child">
                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h5 class="h3 mb-0">Mobil</h5>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <h3>Document Version</h3>
                            <br>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>{{ findInArray(1, jenis_dokumen) }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Document Version Activated</strong>
                                    <p>Choose which {{ findInArray(1, jenis_dokumen) }} version should be default simulation</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <select class="form-control"
                                            v-model="dokumen.mobil">
                                            <option
                                                v-for="(d, i) in versi_dokumen_mobil"
                                                :key="i"
                                                :value="d.id">
                                                {{ d.attributes.nama }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>{{ findInArray(2, jenis_dokumen) }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Document Version Activated</strong>
                                    <p>Choose which {{ findInArray(2, jenis_dokumen) }} version should be default simulation</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <select class="form-control"
                                            v-model="dokumen.lending">
                                            <option
                                                v-for="(d, i) in versi_dokumen_lending"
                                                :key="i"
                                                :value="d.id">
                                                {{ d.attributes.nama }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>{{ findInArray(3, jenis_dokumen) }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Document Version Activated</strong>
                                    <p>Choose which {{ findInArray(3, jenis_dokumen) }} version should be default simulation</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <select class="form-control"
                                            v-model="dokumen.premi">
                                            <option
                                                v-for="(d, i) in versi_dokumen_premi"
                                                :key="i"
                                                :value="d.id">
                                                {{ d.attributes.nama }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <hr>

                            <h3>Rate Setting</h3>
                            <br>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>LTV</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>LTV Rate</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.ltv" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>LTV Commercial Rate</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.ltv_commercial" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>Provisi Rate</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Rate Setting for Provisi</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.provisi_rate" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>Personal Accident</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Rate Personal Accident 12 Month</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.rate_personal_accident_1" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                                        <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Rate Personal Accident 18 Month</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.rate_personal_accident_1_5" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Rate Personal Accident 24 Month</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.rate_personal_accident_2" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                                        <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Rate Personal Accident 30 Month</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.rate_personal_accident_2_5" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Rate Personal Accident 36 Month</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.rate_personal_accident_3" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                                        <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Rate Personal Accident 42 Month</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.rate_personal_accident_3_5" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Rate Personal Accident 48 Month</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.rate_personal_accident_4" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>Upper Rate</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Upper Rate</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_car.upping_rate" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>Admin Rate</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Admin Rate Setting for 12 Month</strong>
                                    <p>Write in number without currency and symbols, example (1200000)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Rp </span>
                                            </div>
                                            <input type="number" v-model="config_car.biaya_admin_1" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Admin Rate Setting for 18 Month</strong>
                                    <p>Write in number without currency and symbols, example (1200000)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Rp </span>
                                            </div>
                                            <input type="number" v-model="config_car.biaya_admin_1_5" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Admin Rate Setting for 24 Month</strong>
                                    <p>Write in number without currency and symbols, example (1200000)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Rp </span>
                                            </div>
                                            <input type="number" v-model="config_car.biaya_admin_2" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Admin Rate Setting for 30 Month</strong>
                                    <p>Write in number without currency and symbols, example (1200000)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Rp </span>
                                            </div>
                                            <input type="number" v-model="config_car.biaya_admin_2_5" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Admin Rate Setting for 36 Month</strong>
                                    <p>Write in number without currency and symbols, example (1200000)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Rp </span>
                                            </div>
                                            <input type="number" v-model="config_car.biaya_admin_3" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Admin Rate Setting for 42 Month</strong>
                                    <p>Write in number without currency and symbols, example (1200000)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Rp </span>
                                            </div>
                                            <input type="number" v-model="config_car.biaya_admin_3_5" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4></h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Admin Rate Setting for 48 Month</strong>
                                    <p>Write in number without currency and symbols, example (1200000)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Rp </span>
                                            </div>
                                            <input type="number" v-model="config_car.biaya_admin_4" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <button class="btn btn-orange m-4" @click="saveConfig('car')">Simpan</button>
                    </div>

                    <br>

                    <div class="card card-child">
                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h5 class="h3 mb-0">Motor</h5>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <h3>Document Version</h3>
                            <br>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>{{ findInArray(1, jenis_dokumen) }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Document Version Activated</strong>
                                    <p>Choose which {{ findInArray(1, jenis_dokumen) }} version should be default simulation</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <select class="form-control"
                                            v-model="dokumen.mrp_motor">
                                            <option
                                                v-for="(d, i) in versi_dokumen_mobil"
                                                :key="i"
                                                :value="d.id">
                                                {{ d.attributes.nama }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>{{ findInArray(4, jenis_dokumen) }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Document Version Activated</strong>
                                    <p>Choose which {{ findInArray(4, jenis_dokumen) }} version should be default simulation</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <select class="form-control"
                                            v-model="dokumen.motor">
                                            <option
                                                v-for="(d, i) in versi_dokumen_motor"
                                                :key="i"
                                                :value="d.id">
                                                {{ d.attributes.nama }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <hr>

                            <h3>Rate Setting</h3>
                            <br>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>LTV</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>LTV Rate</strong>
                                    <p>Write in percent, example (40% = 0.4)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" v-model="config_motor.ltv" class="form-control">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>Admin Rate</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Admin Rate Setting</strong>
                                    <p>Write in number without currency and symbols, example (1200000)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Rp </span>
                                            </div>
                                            <input type="number" v-model="config_motor.biaya_admin_1" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <h4>Percairan Plus</h4>
                                </div>
                                <div class="col-md-4">
                                    <strong>Pencairan Plus</strong>
                                    <p>Write in number without currency and symbols, example (1200000)</p>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Rp </span>
                                            </div>
                                            <input type="number" v-model="config_motor.pencairan_plus" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <button class="btn btn-orange m-4" @click="saveConfig('motor')">Simpan</button>
                    </div>

                <!-- </div>
            </div> -->
        </div>

        <modal :show.sync="modals.new_jaminan" class="modal-jaminan">
            <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">Add New Jaminan</h5>
            </template>
            <div>
                <label for="">Nama Jaminan</label>
                <input type="text" class="form-control" placeholder="Jaminan Name">
            </div>
            <template slot="footer">
                <base-button type="primary" block>Add New</base-button>
            </template>
        </modal>

    </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import swal from 'sweetalert2';

export default {
    components: {
        Modal
    },
    data() {
        return {
            jaminan: [],
            config_car: {},
            config_motor: {},
            jenis_dokumen: [],
            versi_dokumen_motor: [],
            versi_dokumen_mobil: [],
            versi_dokumen_lending: [],
            versi_dokumen_premi: [],
            dokumen: {
                mobil: 1,
                motor: 1,
                lending: 1,
                //motor: 1,
                mrp_motor: 1,
            },
            modals: {
                new_jaminan: false
            }
        }
    },
    async mounted() {
        try {
            const token = window.localStorage.getItem('access_token')
            let jenis_dokumen = await this.$api.get(`${this.$store.state.simulation_base_url}/jenisdokumen`,
                {
                    'headers' : {
                        'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    }
                })
            this.jenis_dokumen = jenis_dokumen.data.data

            let config_car = await this.$api.get(`${this.$store.state.bff_base_url}/simulasi/config/1`,
                {
                    'headers' : {
                        // 'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    }
                })
            this.config_car = config_car.data.data.attributes

            let config_motor = await this.$api.get(`${this.$store.state.bff_base_url}/simulasi/config/2`,
                {
                    'headers' : {
                        // 'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    }
                })
            this.config_motor = config_motor.data.data.attributes

            this.versi_dokumen_motor = await this.getVersiDokumen(4)
            this.versi_dokumen_mobil = await this.getVersiDokumen(1)
            this.versi_dokumen_lending = await this.getVersiDokumen(2)
            this.versi_dokumen_premi = await this.getVersiDokumen(3)

            this.dokumen.motor = this.getActiveAttr(this.versi_dokumen_motor)
            this.dokumen.mrp_motor = this.getActiveAttr(this.versi_dokumen_mobil)
            this.dokumen.mobil = this.getActiveAttr(this.versi_dokumen_mobil)
            this.dokumen.lending = this.getActiveAttr(this.versi_dokumen_lending)
            this.dokumen.premi = this.getActiveAttr(this.versi_dokumen_premi)
        } catch (error) {
               throw new Error("Something went wrong " + error);
        }
    },
    methods: {
        async saveConfig(type) {
          const token = window.localStorage.getItem('access_token')
          if (type == 'car') {
              let data = {
                  data: {
                      type: 'konfigcar',
                      attributes: this.config_car
                  }
              }

                await this.makeDocumentActive(this.dokumen.mobil)
                await this.makeDocumentActive(this.dokumen.lending)
                await this.makeDocumentActive(this.dokumen.premi)

                let res = await this.$api.put(`${this.$store.state.bff_base_url}/simulasi/config/1`, data,
                    {
                        'headers' : {
                            // 'Accept': 'application/vnd.api+json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                if (res.status == 200 || res.status == 204) {
                    swal('Success!', 'Data berhasil diubah.', 'success')
                }
            } else {
                let data = {
                    data: {
                        type: 'konfigmcy',
                        attributes: this.config_motor
                    }
                }

                await this.makeDocumentActive(this.dokumen.motor)
                await this.makeDocumentActive(this.dokumen.mrp_motor)

                let res = await this.$api.put(`${this.$store.state.bff_base_url}/simulasi/config/2`, data,
                    {
                        'headers' : {
                            // 'Accept': 'application/vnd.api+json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                if (res.status == 200 || res.status == 204) {
                    swal('Success!', 'Data berhasil diubah.', 'success')
                }
            }
        },
        async getVersiDokumen(id) {
            try {
              const token = window.localStorage.getItem('access_token')
              let res;
              if(id=== 1){
                res = await this.$api.get(`${this.$store.state.simulation_base_url}/versidokumen/?jenis_dokumen=1&sort_by=id:desc&offset=10000`,
                    {
                        'headers' : {
                            'Accept': 'application/vnd.api+json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
              }else{
                res = await this.$api.get(`${this.$store.state.simulation_base_url}/versidokumen/?jenis_dokumen=${id}`,
                    {
                        'headers' : {
                            'Accept': 'application/vnd.api+json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
              }
                return res.data.data
          } catch (error) {
               throw new Error("Something went wrong " + error);
          }
        },
        makeDocumentActive(id) {
            const token = window.localStorage.getItem('access_token')
            return this.$api.put(`${this.$store.state.simulation_base_url}/versidokumen/active/${id}`, null,
                {
                    'headers' : {
                        'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    }
                })
        },
        getActiveAttr(arr) {
            let res = arr.find(v => v.attributes.is_active)
            return res.id
        },
        findInArray(key, array) {
            let result

            if (array) {
                result = array.find(item => item.id == key)
            }

            if (result) {
                return result.attributes.nama
            }
        },
    }
}
</script>
