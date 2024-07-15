<template>
    <div>
        <base-header type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-12">
                    <h6 class="h2 d-inline-block mb-0">Lending Rate</h6>
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links">
                            <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i> Administrator</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">Rate</li>
                            <li class="breadcrumb-item active" aria-current="page">Lending</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </base-header>

        <base-header class="pb-6" type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-6">
                    <div class="d-flex">
                        <base-input label="GRUP">
                            <select class="form-control border-0 box-shadow"
                                v-model="rate.selectedGroup"
                                @change="getRate">
                                <option
                                v-for="option in groups"
                                :value="option.value"
                                :label="option.label"
                                :key="option.value">
                                </option>
                            </select>
                        </base-input>
                        <base-input label="VERSI DOKUMEN">
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
                        <base-button class="text-primary btn-light" @click.prevent="modals.upload = true">
                            <i class="fa fa-upload"></i>
                            <span class="hidden-sm-down">Upload Excel</span>
                        </base-button>

                        <a :href="UrlHealer(`${$store.state.simulation_base_url}/lendingrate/download`)"
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
                    <h3>EFFECTIVE RATE ({{ findInArray(rate.versi_dokumen_id, list_versi_dokumen) }})</h3>
                </div>

                <div class="card-body" v-if="effective_rate[0].data.length != 0 ">

                    <div class="card" v-for="(e, i) in effective_rate" :key="i">
                        <div class="card-header">
                            <h3 class="text-capitalize">{{ e.data[i] ? e.data[i].attributes.group : '' }}</h3>
                        </div>

                        <div class="card-body">
                         <figure>
                            <figcaption>Lending</figcaption>
                            <table class="table table-responsive">
                                <thead class="thead-warning">
                                    <tr>
                                        <th scope="col">Nominal PH</th>
                                        <th scope="col">Umur Barang (Min)</th>
                                        <th scope="col">Umur Barang (Max)</th>
                                        <th scope="col">12 Bulan</th>
                                        <th scope="col">24 Bulan</th>
                                        <th scope="col">36 Bulan</th>
                                        <th scope="col">48 Bulan</th>
                                        <th scope="col">Tanggal Upload</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(d, id) in e.data" :key="id">                                     
                                        <td>{{ d.attributes.min_pokok_hutang }} - {{ d.attributes.max_pokok_hutang }}</td>
                                        <td>{{ d.attributes.min_umur_kendaraan }} Tahun</td>
                                        <td>{{ d.attributes.max_umur_kendaraan }} Tahun</td>
                                        <td>{{ d.attributes.rate_tenor12 }}</td>
                                        <td>{{ d.attributes.rate_tenor24 }}</td>
                                        <td>{{ d.attributes.rate_tenor36 }}</td>
                                        <td>{{ d.attributes.rate_tenor48 }}</td>
                                        <td>{{ d.attributes.updated_at }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </figure>
                        </div>
                    </div>

                </div>

                <div class="card-body" v-else>
                    <p class="text-center mt-3 font-italic">Data tidak ditemukan</p>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.upload">
            <template slot="header">
                <h5 class="modal-title">Upload Lending Rate</h5>
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
                    <div class="spinner-border text-light" role="status" v-if="upload_loading">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <span v-else>Upload File</span>
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
            list_versi_dokumen: [],
            list_versi_dokumen_upload: [],
            rate: {
                versi_dokumen_id: '',
                selectedGroup: '1',
            },
            groups:[
                { value: "1", label: "Passanger"},
                { value: "2", label: "Commercial"}
            ],
            effective_rate: [],
            modals: {
                upload: false,
                close_modal: false
            },
            upload: {
                file: [],
                versi_dokumen_id: '',
                make_default: false
            }
        };
    },
    async mounted() {
        await this.getVersiDokumen()
        this.getRate()
    },
    methods: {
        async getRate() {
            try {
                const token = window.localStorage.getItem('access_token')
                this.effective_rate = []
                let effective_rate_selectedGroup = await this.$api.get(`${this.$store.state.simulation_base_url}/lendingrate?group=${this.rate.selectedGroup}&versi_dokumen_id=${this.rate.versi_dokumen_id}`,
                        {
                            'headers' : { 
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                // let effective_rate_passanger = await this.$api.get(`${this.$store.state.simulation_base_url}/lendingrate?group=1&versi_dokumen_id=${this.rate.versi_dokumen_id}`,
                //         {
                //             'headers' : { 
                //                 'Accept': 'application/vnd.api+json',
                //                 'Authorization': `Bearer ${token}`
                //             }
                //         })
                // let effective_rate_commercial = await this.$api.get(`${this.$store.state.simulation_base_url}/lendingrate?group=2&versi_dokumen_id=${this.rate.versi_dokumen_id}`,
                //         {
                //             'headers' : { 
                //                 'Accept': 'application/vnd.api+json',
                //                 'Authorization': `Bearer ${token}`
                //             }
                //         })

                //this.effective_rate.push({ data: effective_rate_passanger.data.data })
                //this.effective_rate.push({ data: effective_rate_commercial.data.data })
                this.effective_rate.push({ data: effective_rate_selectedGroup.data.data })
            } catch (error) {
                throw new Error("Something went wrong " + error);
            }
        },
        UrlHealer(dirtyUrl) {
      return sanitizeUrl(dirtyUrl);
  },
        filesChange(ev) {
            this.upload.file = ev.target.files[0]
        },
        async uploadRate() {
            this.modals.close_modal = !this.modals.close_modal
            this.upload_loading = !this.upload_loading
            this.backdropModal('disable')
            
            let formData = new FormData();
            formData.append("file", this.upload.file);
            formData.append("versi_dokumen_id", this.upload.versi_dokumen_id.id);
            try {
                const token = window.localStorage.getItem('access_token')
                let response = await this.$api.post(`${this.$store.state.simulation_base_url}/lendingrate/import`, formData, { headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/vnd.api+json',
                    'Authorization': `Bearer ${token}`
                }})

                if(this.upload.make_default) {
                    let make_active = await this.$api.put(`${this.$store.state.simulation_base_url}/versidokumen/active/${this.upload.versi_dokumen_id.id}`, null,
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
                this.modals.upload = !this.modals.upload
                this.modals.close_modal = !this.modals.close_modal
                this.upload_loading = !this.upload_loading
                this.backdropModal('able')
                swal('Kesalahan ketika upload!', error.response.data.errors.detail, 'error')
            }
        },
        async getVersiDokumen() {
            try {
                const token = window.localStorage.getItem('access_token')
                let versi_dokumen = await this.$api.get(`${this.$store.state.simulation_base_url}/versidokumen?jenis_dokumen=2`,
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
                        jenis_dokumen_id: 2,
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
    }

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>