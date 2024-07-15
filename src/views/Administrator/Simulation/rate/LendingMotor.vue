<template>
    <div>
        <base-header type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-12">
                    <h6 class="h2 d-inline-block mb-0">Tarif Asuransi & Lending Rate Motor</h6>
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links">
                            <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i> Administrator</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">Simulation</li>
                            <li class="breadcrumb-item active" aria-current="page">Lending Rate Motor</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </base-header>

        <base-header class="pb-6" type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-6">
                    <div class="d-flex">

                        <!-- <base-input label="SELECT REGION">
                            <select class="form-control border-0 box-shadow"
                                v-model="rate.area"
                                @change="getRate">
                                <option value="" selected disabled>Pilih Area</option>
                                <option
                                    v-for="(area, i) in area_lists"
                                    :key="i"
                                    :value="area.id">{{ area.attributes.nama }}</option>
                            </select>
                        </base-input> -->

                        <base-input label="DOCUMENT PERIOD">
                            <select class="form-control border-0 box-shadow"
                                v-model="rate.versi_dokumen_id"
                                @change="getRate">
                                <option
                                    v-for="(v, i) in list_versi_dokumen"
                                    :key="i"
                                    :value="v.id"
                                    :selected="v.attributes.is_active">
                                    {{ v.attributes.nama }} {{ v.attributes.is_active ? '(Current)' : '' }}
                                </option>
                            </select>
                        </base-input>
                    </div>
                </div>
                <div class="col-lg-6 pt-2">
                    <div class="d-flex justify-content-end">
                        <base-button class="text-primary btn-light" @click="modals.upload = true">
                            <i class="fa fa-upload"></i>
                            <span class="hidden-sm-down">Upload Excel</span>
                        </base-button>

                        <a :href="UrlHealer(`${$store.state.simulation_base_url}/ratesimulasimotor/download`)"
                            class="btn text-warning btn-light"
                            target="_blank" rel="noopener">
                            <i class="fa fa-download"></i>
                            <span class="hidden-sm-down">Download Sample</span>
                        </a>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--6">

            <div class="card">
                <div class="card-header">
                    <h3 class="text-uppercase">
                        {{ findInArray(rate.area, area_lists) }} ({{ findInArray(rate.versi_dokumen_id, list_versi_dokumen) }})
                    </h3>
                </div>

                <div class="card-body">
                    <div class="row table-filter">
                        <div class="col-md-2">
                            <base-input label="Show Entry">
                                <select class="form-control text-primary border-0 h-unset"
                                    v-model="rate.entry"
                                    @change="getRate">
                                    <option value="10">10 Entries</option>
                                    <option value="25">25 Entries</option>
                                    <option value="50">50 Entries</option>
                                    <option value="100">100 Entries</option>
                                </select>
                            </base-input>
                        </div>
                        <div class="col-md-2">
                            <base-input label="Jumlah Tenor">
                                <select class="form-control text-primary border-0 h-unset"
                                    v-model="rate.tenor"
                                    @change="getRate">
                                    <option
                                        v-for="(t, i) in tenor_lists"
                                        :key="i"
                                        :value="t.id">{{ t.attributes.nama }} tahun</option>
                                </select>
                            </base-input>
                        </div>
                    </div>
                    <br>

                <figure>
                    <figcaption>Lending Motor</figcaption>
                    <table class="table">
                        <thead class="thead-warning">
                            <tr>
                                <th scope="col">Area</th>
                                <th scope="col">Tarif Asuransi</th>
                                <th scope="col">Lending Rate</th>
                                <th scope="col">Tanggal Upload</th>
                            </tr>
                        </thead>
                        <tbody v-if="rates.length > 0">
                            <tr v-for="(p, i) in rates" :key="i">
                                <td>{{ findInArray(p.attributes.area_id, area_lists) }}</td>
                                <td>{{ p.attributes.tarif_asuransi }}</td>
                                <td>{{ p.attributes.eff_rate }}</td>
                                <td>{{ p.attributes.updated_at }}</td>
                            </tr>
                        </tbody>
                    </table>
                </figure>
                    <p v-if="!rates.length > 0" class="text-center mt-3 font-italic">Data tidak ditemukan</p>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.upload">
            <template slot="header">
                <h5 class="modal-title">Upload Lending Rate Motor</h5>
            </template>

            <div class="form-group custom-file-upload">
                <label for="file">
                    <div class="d-flex justify-content-center align-items-center flex-column"
                        v-if="upload.file.length == 0">
                        <div class="text-primary"><i class="fa fa-upload"></i></div>
                        <h3 class="text-primary">Browse File</h3>
                        <p class="text-primary">(.xlsx, .xlsm, .csv)</p>
                    </div>

                    <div class="d-flex justify-content-center align-items-center"
                        v-else>
                        <div class="text-primary"><i class="fa fa-file"></i></div>
                        <p class="text-primary ml-2">{{ upload.file.name }}</p>
                    </div>
                </label>
                <input type="file" name="" id="file" class="form-control" @change="filesChange"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            </div>

            <div class="form-group">
                <label for="version">Document Version</label>
                <multiselect
                    v-model="upload.versi_dokumen_id"
                    tag-placeholder="Tambah sebagai versi baru"
                    placeholder="Cari atau tambah versi baru"
                    selectLabel="Tekan enter untuk memilih"
                    deselectLabel="Tekan enter untuk deselect"
                    :customLabel="customLabel"
                    :options="list_versi_dokumen_upload"
                    :taggable="true"
                    @tag="addVersion">
                </multiselect>
            </div>

            <div>
                <label for="">Set as default</label>
                <base-checkbox class="form-control pl-5"
                    v-model="upload.make_default">
                    Make new version as default setting
                </base-checkbox>
            </div>
            
            <template slot="footer">
                <base-button type="warning" block :disabled="upload.file.length == 0"
                    @click="uploadRate">
                    <!-- <div class="spinner-border text-light" role="status" v-if="upload_loading">
                        <span class="sr-only">Loading...</span>
                    </div> -->
                    <span>Upload File</span>
                </base-button>
            </template>
        </modal>

    </div>
</template>

<script>
import swal from 'sweetalert2';
import Modal from "@/components/Modal.vue";
import Multiselect from 'vue-multiselect';
var sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl;

export default {
    data() {
        return {
            upload_loading: false,
            area_lists: [],
            tenor_lists: [],
            list_versi_dokumen: [],
            list_versi_dokumen_upload: [],
            rate: {
                versi_dokumen_id: '',
                area: 9,
                tenor: 1,
                entry: 10
            },
            rates: [],
            modals: {
                upload: false,
                close_modal: false
            },
            upload: {
                versi_dokumen_id: '',
                make_default: false,
                file: []
            }
        };
    },
    async mounted() {
        try {
            const token = window.localStorage.getItem('access_token')
            await this.getVersiDokumen()
            let area = await this.$api.get(`${this.$store.state.area_base_url}/areas?filter[simulasi]=true`,
                        {
                            'headers' : { 
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
            this.area_lists = area.data.data

            let tenor = await this.$api.get(`${this.$store.state.simulation_base_url}/tenor`,
                        {
                            'headers' : { 
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
            this.tenor_lists = tenor.data.data

            await this.getRate()
        } catch (error) {
               throw new Error("Something went wrong " + error);
        }
    },
    methods: {
        async getRate() {
            try {
                const token = window.localStorage.getItem('access_token')
                let premi = await this.$api.get(
                    `${this.$store.state.simulation_base_url}/ratesimulasimotor?versi_dokumen_id=${this.rate.versi_dokumen_id}&tenor_id=${this.rate.tenor}&offset=10`,
                        {
                            'headers' : { 
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })

                this.rates = premi.data.data
            } catch (error) {
               throw new Error("Something went wrong " + error);
            }
        },
        UrlHealer(dirtyUrl) {
      return sanitizeUrl(dirtyUrl);
  },
        async uploadRate(index) {
            this.modals.close_modal = !this.modals.close_modal
            this.upload_loading = !this.upload_loading
            this.backdropModal('disable')
            let formData = new FormData();
            formData.append("file", this.upload.file);
            formData.append("versi_dokumen_id", this.upload.versi_dokumen_id.id);

            try {
                const token = window.localStorage.getItem('access_token')
                let response = await this.$api.post(`${this.$store.state.simulation_base_url}/ratesimulasimotor/import`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                if(this.upload.make_default) {
                    await this.$api.put(`${this.$store.state.simulation_base_url}/versidokumen/active/${this.upload.versi_dokumen_id.id}`, null,
                        {
                            'headers' : { 
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                }
                this.getRate()

                this.modals.upload = !this.modals.upload
                this.modals.close_modal = !this.modals.close_modal
                this.upload_loading = !this.upload_loading
                this.backdropModal('able')
                swal('Success!', response.data.success.detail, 'success')
                this.upload = {
                    file: [],
                    versi_dokumen_id: '',
                    make_default: false
                }
            } catch (error) {
                this.modals.close_modal = !this.modals.close_modal
                this.upload_loading = !this.upload_loading
                this.backdropModal('able')
                swal('Kesalahan ketika upload!', error.response.data.errors.detail, 'error')
            }
        },
        async getVersiDokumen() {
            try {
                const token = window.localStorage.getItem('access_token')
                let versi_dokumen = await this.$api.get(`${this.$store.state.simulation_base_url}/versidokumen?jenis_dokumen=4`,
                        {
                            'headers' : { 
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                if (versi_dokumen.data.data) {
                    let active = versi_dokumen.data.data.find(v => v.attributes.is_active)
                    this.rate.versi_dokumen_id = active.id
                    this.list_versi_dokumen = versi_dokumen.data.data
                    this.list_versi_dokumen_upload = []
                    versi_dokumen.data.data.forEach(el => {
                        this.list_versi_dokumen_upload.push({
                            nama: el.attributes.nama,
                            id: el.id
                        })
                    })
                }
            } catch (error) {
               throw new Error("Something went wrong " + error);
            }
        },
        async addVersion (newVersion) {
            let data = {
                data: {
                    type: 'string',
                    attributes: {
                        nama: newVersion,
                        jenis_dokumen_id: 4,
                        sub_jenis_dokumen_id: "",
                    }
                }
            }
            try {
                const token = window.localStorage.getItem('access_token')
                let res = await this.$api.post(`${this.$store.state.simulation_base_url}/versidokumen`, data,
                        {
                            'headers' : { 
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                let newData = {
                    nama: newVersion,
                    id: res.data.data.id
                }
                this.list_versi_dokumen_upload.push(newData)
                this.upload.versi_dokumen_id = newData
            } catch (error) {
               throw new Error("Something went wrong " + error);
            }
        },
        customLabel ({ nama }) {
            return nama
        },
        thousandFormat(number) {
            return parseInt(number).toLocaleString()
        },
        filesChange(ev) {
            this.upload.file = ev.target.files[0]
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
        backdropModal(state) {
            if (state == 'disable') {
                document.querySelector('*:not(.modal-close)').style.pointerEvents = "none";
            } else {
                document.querySelector('*').style.pointerEvents = "auto";
            }
        }
    },
    components: {
        Modal,
        Multiselect
    },

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.select-wilayah {
    width: 162px;
}
</style>
