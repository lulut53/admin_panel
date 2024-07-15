<template>
    <div>
        <base-header class="pb-6" type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-8 col-7">
                    <h6 class="h2 d-inline-block mb-0">Setting Simulasi - Motor </h6>
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links">
                            <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i
                                        class="fas fa-home"></i> Administrator</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">Simulation</li>
                            <li class="breadcrumb-item active" aria-current="page">Setting</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </base-header>
        <div class="container-fluid mt--6">
            <br>
            <div class="card card-child">
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
                                <select class="form-control" v-model="dokumen.mrp_motor">
                                    <option v-for="(d, i) in versi_dokumen_motor" :key="i" :value="d.id"> {{
                                        d.attributes.nama }} </option>
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
                                <select class="form-control" v-model="dokumen.motor">
                                    <option v-for="(d, i) in versi_dokumen_motor_asuransi" :key="i" :value="d.id"> {{
                                        d.attributes.nama }} </option>
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
            <modal :show.sync="showLoading" :clickToClose="false">
                <h3 class="text-center">Loading</h3>
                <div style="display: flex; margin-top: 30px !important; justify-content: center;">
                    <!--<center>-->
                    <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" />
                    <!-- </center>-->
                </div>
            </modal><br />
        </div>
    </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'
import Modal from "@/components/Modal.vue";
import swal from 'sweetalert2';

export default {
    components: {
        Modal,
        HalfCircleSpinner
    },
    data() {
        return {
            config_motor: {},
            jenis_dokumen: [],
            versi_dokumen_motor: [],
            versi_dokumen_motor_asuransi: [],
            dokumen: {
                motor: 1,
                mrp_motor: 1,
            },
            showLoading: false
        }
    },
    async mounted() {
        try {
            const token = window.localStorage.getItem('access_token')
            let jenis_dokumen = await this.$api.get(`${this.$store.state.simulation_base_url}/jenisdokumen`,
                {
                    'headers': {
                        'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    }
                })
            this.jenis_dokumen = jenis_dokumen.data.data
            let config_motor = await this.$api.get(`${this.$store.state.bff_base_url}/simulasi/config/2`,
                {
                    'headers': {
                        // 'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    }
                })
            this.config_motor = config_motor.data.data.attributes
            this.versi_dokumen_motor_asuransi = await this.getVersiDokumen(4)
            this.versi_dokumen_motor = await this.getVersiDokumen(1)
            
            this.dokumen.motor = this.getActiveAttr(this.versi_dokumen_motor_asuransi)
            this.dokumen.mrp_motor = this.getActiveAttr(this.versi_dokumen_motor)
        } catch (error) {
            throw new Error("Something went wrong " + error);
        }
    },
    methods: {
        async saveConfig(type) {
            this.showLoading = true;
            const token = window.localStorage.getItem('access_token')
            let data = {
                data: {
                    type: 'konfigmcy',
                    attributes: this.config_motor
                }
            }

            await this.makeDocumentActive(this.dokumen.motor)
            await this.makeDocumentActiveBySubJenisDoc(this.dokumen.mrp_motor)
            
            let res = await this.$api.put(`${this.$store.state.bff_base_url}/simulasi/config/2`, data,
                {
                    'headers': {
                        // 'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    }
                })
            
            this.showLoading = false;
            if (res.status == 200 || res.status == 204) {
                swal('Success!', 'Data berhasil diubah.', 'success')
            }else {
                swal('Gagal!', 'Data tidak berhasil diubah.', 'error')
            }

        },
        async getVersiDokumen(id) {
            try {
                this.showLoading = true;
                const token = window.localStorage.getItem('access_token')
                let res;
                if (id === 1) {
                    res = await this.$api.get(`${this.$store.state.simulation_base_url}/versidokumen/?jenis_dokumen=1&sub_jenis_dokumen=3&sort_by=id:desc&offset=10000`,
                        {
                            'headers': {
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                } else {
                    res = await this.$api.get(`${this.$store.state.simulation_base_url}/versidokumen/?jenis_dokumen=${id}`,
                        {
                            'headers': {
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                }
                this.showLoading = false;
                return res.data.data
            } catch (error) {
                this.showLoading = false;
                throw new Error("Something went wrong " + error);
            }
        },
        makeDocumentActive(id) {
            const token = window.localStorage.getItem('access_token')
            return this.$api.put(`${this.$store.state.simulation_base_url}/versidokumen/active/${id}`, null,
                {
                    'headers': {
                        'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    }
                })
        },
        makeDocumentActiveBySubJenisDoc(id) {
            const token = window.localStorage.getItem('access_token')
            return this.$api.put(`${this.$store.state.simulation_base_url}/versidokumen/active-subjenis/${id}`, null,
                {
                    'headers': {
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
