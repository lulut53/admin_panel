<template>
    <div>
        <base-header type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-12">
                    <h6 class="h2 d-inline-block mb-0">Premi Rate</h6>
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links">
                            <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i> Administrator</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">Simulation</li>
                            <li class="breadcrumb-item active" aria-current="page">Premi Rate</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </base-header>

        <base-header class="pb-6" type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-6">
                    <div class="d-flex">
                        <base-input label="WILAYAH ">
                            <select class="form-control border-0 box-shadow"
                                v-model="rate.area"
                                @change="getArea">
                                <option value="" selected disabled>Pilih Area</option>
                                <option
                                    v-for="(area, i) in area_lists"
                                    :key="i"
                                    :value="area.id">{{ area.attributes.nama }}</option>
                            </select>
                        </base-input>

                        <base-input label="GROUP ">
                            <select class="form-control border-0 box-shadow"
                                v-model="rate.group"
                                @change="getPremi">
                                <option value="1">Passanger</option>
                                <option value="2">Commercial</option>
                            </select>
                        </base-input>

                        <base-input label="Versi Dokumen ">
                            <select class="form-control border-0 box-shadow"
                                v-model="rate.versi_dokumen_id"
                                @change="getPremi">
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

                        <a :href="UrlHealer(`${$store.state.simulation_base_url}/rateasuransi/download`)"
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
                        {{ findInArray(rate.area, area_lists) }} - {{ rate.group == 1 ? 'Passanger' : 'Commercial' }} ({{ findInArray(rate.versi_dokumen_id, list_versi_dokumen) }})
                    </h3>
                </div>

                <div class="card-body">
                    <div class="row table-filter">
                        <div class="col-md-2">
                            <base-input label="Jumlah Tenor">
                                <select class="form-control text-primary border-0 h-unset"
                                    v-model="rate.tenor"
                                    @change="getPremi">
                                    <option
                                        v-for="(t, i) in tenor_lists"
                                        :key="i"
                                        :value="t.id">{{ t.attributes.nama }} tahun</option>
                                </select>
                            </base-input>
                        </div>
                        <div class="col-md-2 border-left">
                            <base-input label="Jenis Asuransi">
                                <select class="form-control text-primary border-0 h-unset"
                                    v-model="rate.asuransi"
                                    @change="getPremi">
                                    <option value="1">TLO</option>
                                    <option value="2">All Risk</option>
                                </select>
                            </base-input>
                        </div>
                    </div>
                    <br>

                <figure>
                    <figcaption>Premi</figcaption>
                    <table class="table">
                        <thead class="thead-warning">
                            <tr>
                                <th scope="col">Group</th>
                                <th scope="col">Nominal (Min)</th>
                                <th scope="col">Nominal (Max)</th>
                                <th scope="col">Atas</th>
                                <th scope="col">Bawah</th>
                                <th scope="col">Latest Change</th>
                            </tr>
                        </thead>
                        <tbody v-if="rates.length > 0">
                            <tr v-for="(p, i) in rates" :key="i">
                                <td class="text-capitalize">{{ p.attributes.group }}</td>
                                <td>Rp. {{ p.attributes ? thousandFormat(p.attributes.min_otr) : '0' }}</td>
                                <td>Rp. {{ p.attributes ? thousandFormat(p.attributes.max_otr) : '0' }}</td>
                                <td>{{ p.attributes ? p.attributes.atas : '-' }}</td>
                                <td>{{ p.attributes ? p.attributes.bawah : '-' }}</td>
                                <td>{{ p.attributes.updated_at }}</td>
                            </tr>
                        </tbody>
                    </table>
                </figure>
                    <p v-if="!rates.length > 0" class="text-center mt-3 font-italic">Data tidak ditemukan</p>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.upload" size="lg" class="modal-custom">
            <button class="modal-close no-border text-primary"
                @click.prevent="modals.upload = false"
                :disabled="modals.close_modal">
                <i class="fa fa-times"></i>
            </button>
            
            <div class="row">
                <div class="col-4 d-flex justify-content-center align-items-center flex-column">
                    <img :src="`/images/upload_${upload_step == 1 ? 'premi_rate' : 'step_2'}.png`" alt="Step 1" width="200">
                    <h4 class="mt-4">New Premi Rate Document</h4>
                    <p class="text-center mb-0">The document will be affect on the calculation, please be carefull.</p>
                    <br v-if="upload.file.length > 0">
                    <div class="file-upload" v-if="upload_step == 2 && upload.file.length > 0">
                        <label for="file" class="btn btn-warning">
                            <i class="fa fa-plus"></i> &nbsp; Add New Files
                        </label>
                        <input type="file" name="" id="file" class="form-control" multiple @change="filesChange"
                        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                    </div>
                </div>
                <div class="col-8 border-left">

                    <div v-if="upload_step == 1">
                        <h3 class="text-uppercase">Select Version</h3>
                        <br>
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
                            <base-checkbox class="form-control pl-5" v-model="upload.make_default">
                                Make new version as default setting
                            </base-checkbox>
                        </div>

                        <br>

                        <base-alert type="warning" class="d-flex">
                            <span class="alert-inner--icon mr-3">
                                <i class="fa fa-info-circle"></i>
                            </span>
                            <span class="alert-inner--text">
                                <strong>Perhatian!</strong> Pengaturan ini akan membuat dokumen yang anda upload sekarang menjadi acuan perhitungan simulasi.
                            </span>
                        </base-alert>
                    </div>

                    <div v-if="upload_step == 2">
                        <h3 class="text-uppercase">Upload Premi Rate File{{ upload.file.length > 1 ? 's' : '' }}</h3>
                        <br>

                        <div class="text-center py-3 h-290" v-if="upload.file.length == 0">
                            <img src="/images/upload_empty.png" alt="Step 1" width="200">
                            <p class="text-center mt-2">There is no document added yet.</p>
                            <div class="file-upload">
                                <label for="file" class="btn btn-warning">
                                    <i class="fa fa-plus"></i> &nbsp; Add New Files
                                </label>
                                <input type="file" name="" id="file" class="form-control" multiple @change="filesChange"
                                        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                            </div>
                        </div>

                        <div v-else class="h-290">
                            <div class="row py-1" v-for="(f, i) in upload.file" :key="i">
                                <div class="col-6 overflow-hidden d-flex align-items-center">
                                    <i class="fa fa-file mr-2"></i>
                                    <span>{{ f.name }}</span>
                                </div>

                                <div class="col-6 d-flex justify-content-around align-items-center">
                                    <div>
                                        <select class="form-control border-0 text-primary select-wilayah"
                                            v-model="upload.wilayah_id[i]"
                                            :disabled="upload.progress[i].state == 'progress' || upload.progress[i].state == 'finish' ? true : false">
                                            <option value="" selected disabled>Pilih Wilayah</option>
                                            <option
                                                v-for="(area, i) in area_lists"
                                                :key="i"
                                                :value="area.id">{{ area.attributes.nama }}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <!-- <div class="loader-1" v-if="upload.progress[i].state == 'progress'">
                                            <span></span>
                                        </div> -->
                                        <progress-circle :completed-steps="upload.progress[i].completed_steps"
                                                         :total-steps="upload_progress.total_steps"
                                                         :circle-color="upload_progress.circle_color"
                                                         :start-color="upload.progress[i].start_color"
                                                         :stop-color="upload.progress[i].stop_color"
                                                         :circle-width="upload_progress.circle_width"
                                                         :diameter="upload_progress.diameter">
                                            <button class="btn btn-upload is-upload rounded-circle loading"
                                                :class="{ 'is-upload': upload.progress[i].state == 'ready', 'is-success': upload.progress[i].state == 'finish' }"
                                                :disabled="upload.disabled[i] || upload.wilayah_id[i] == ''"
                                                @click="uploadPremi(i)">
                                                <i v-if="upload.progress[i].state == 'finish'" class="fa fa-check"></i>
                                                <div v-else-if="upload.progress[i].state == 'progress'" class="lds-facebook"><div></div><div></div><div></div><div></div></div>
                                                <i v-else class="fa fa-upload"></i>
                                            </button>
                                        </progress-circle>
                                    </div>
                                    <div>
                                        <button @click.prevent="upload.file.splice(i, 1);upload.wilayah_id.splice(i, 1);upload.progress.splice(i, 1)"
                                            class="text-light no-border"
                                            :disabled="upload.progress[i].state == 'progress' || upload.progress[i].state == 'finish' ? true : false">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between">
                        <p>{{ upload_step }} of 2 steps</p>
                        <base-button type="warning"
                                    @click="upload_step += 1"
                                    v-if="upload_step == 1">
                            Next Step
                        </base-button>

                        <button class="no-border text-primary"
                            @click.prevent="upload_step -= 1"
                            v-if="upload_step == 2"
                            :disabled="modals.close_modal">
                            <i class="fa fa-arrow-left"></i> &nbsp; Sebelumnya
                        </button>
                    </div>

                </div>
            </div>
        </modal>

    </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Multiselect from 'vue-multiselect';
import swal from 'sweetalert2';
import { ProgressCircle } from 'vue-progress-circle';
var sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl;

export default {
    data() {
        return {
            area_lists: [
                {
                    id: 1,
                    attributes: {
                        nama: 'Wilayah 1'
                    }
                },
                {
                    id: 2,
                    attributes: {
                        nama: 'Wilayah 2'
                    }
                },
                {
                    id: 3,
                    attributes: {
                        nama: 'Wilayah 3'
                    }
                },
            ],
            tenor_lists: [],
            list_versi_dokumen: [],
            list_versi_dokumen_upload: [],
            rate: {
                versi_dokumen_id: '',
                area: 1,
                group: 1,
                tenor: 1,
                asuransi: 1
            },
            rates: [],
            modals: {
                upload: false,
                close_modal: false
            },
            upload_step: 1,
            upload_progress: {
                total_steps: 100,
                circle_color: '#ddd',
                circle_width: 2,
                diameter: 50
            },
            upload: {
                versi_dokumen_id: '',
                make_default: false,
                wilayah_id: [],
                progress: [],
                file: [],
                disabled: []
            }
        };
    },
    async mounted() {
        try {
            const token = window.localStorage.getItem('access_token')
            await this.getVersiDokumen()

            // let area = await this.$api.get(`${this.$store.state.area_base_url}/area?filter[simulasi]=true`,
                        // {
                        //     'headers' : { 
                        //         'Accept': 'application/vnd.api+json',
                        //         'Authorization': `Bearer ${token}`
                        //     }
                        // })
            // this.area_lists = area.data.data

            let tenor = await this.$api.get(`${this.$store.state.simulation_base_url}/tenor`,
                        {
                            'headers' : { 
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
            this.tenor_lists = tenor.data.data

            await this.getPremi()
        } catch (error) {
               throw new Error("Something went wrong " + error);
        }
    },
    methods: {
        async getPremi() {
            try {
                const token = window.localStorage.getItem('access_token')
                let premi = await this.$api.get(
                    `${this.$store.state.simulation_base_url}/rateasuransi?group=${this.rate.group}&zona_area_id=${this.rate.area}&versi_dokumen_id=${this.rate.versi_dokumen_id}&tenor_id=${this.rate.tenor}&jenis_asuransi=${this.rate.asuransi}`,
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
        
        getArea() {
            this.rate.group  = 1
            this.getPremi()
            this.getVersiDokumen()
            //this.versi_dokumen_id   = 1
        },

        UrlHealer(dirtyUrl) {
      return sanitizeUrl(dirtyUrl);
  },
        async uploadPremi(index) {
            this.upload.progress[index].completed_steps = 5
            this.modals.close_modal = !this.modals.close_modal
            this.upload.progress[index].state = 'progress'
            this.backdropModal('disable')

            let formData = new FormData();
            formData.append("file", this.upload.file[index]);
            formData.append("wilayah_id", this.upload.wilayah_id[index]);
            formData.append("versi_dokumen_id", this.upload.versi_dokumen_id.id);
            this.upload.progress[index].completed_steps = 10

            try {
                const token = window.localStorage.getItem('access_token')
                let response = await this.$api.post(`${this.$store.state.simulation_base_url}/rateasuransi/import`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                this.upload.progress[index].completed_steps = 50
                await this.getVersiDokumen()
                this.getPremi()
                this.upload.progress[index].completed_steps = 80

                if(this.upload.make_default) {
                    let make_active = await this.$api.put(`${this.$store.state.simulation_base_url}/versidokumen/active/${this.upload.versi_dokumen_id.id}`, null,
                        {
                            'headers' : { 
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                }

                this.upload.disabled[index] = true
                this.upload.disabled[index + 1] = false

                this.modals.close_modal = !this.modals.close_modal
                this.upload.progress[index].state = 'finish'
                this.upload.progress[index].start_color = 'rgb(45, 206, 137)'
                this.upload.progress[index].stop_color = 'rgb(45, 206, 137)'
                this.backdropModal('able')
                this.upload.progress[index].completed_steps = 100
            } catch (error) {
                this.upload.progress[index].completed_steps = 0
                this.modals.close_modal = !this.modals.close_modal
                this.upload.progress[index].state = 'ready'
                this.backdropModal('able')
                swal('Kesalahan ketika upload!', error.response.data.errors.detail, 'error')
            }
        },
        async getVersiDokumen() {
            try {
                const token = window.localStorage.getItem('access_token')
                let versi_dokumen = await this.$api.get(`${this.$store.state.simulation_base_url}/versidokumen?jenis_dokumen=3`,
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
                        jenis_dokumen_id: 3,
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
            if (this.upload.file.length == 0) {
                Array.from(ev.target.files).forEach((file, i) => {
                    if (i == 0) this.upload.disabled.push(false)
                    else this.upload.disabled.push(true)
                });
            }

            Array.from(ev.target.files).forEach(file => {
                this.upload.file.push(file)
                this.upload.wilayah_id.push('')
                this.upload.disabled.push(true)
                this.upload.progress.push({
                    completed_steps: 0,
                    state: 'ready',
                    start_color: 'rgb(94, 114, 228)',
                    stop_color: 'rgb(94, 114, 228)'
                })
            });

            this.upload.file = this.removeDuplicate(this.upload.file);
        },
        removeDuplicate(arr) {

            const unique = arr
                .map(e => e['name'])

                // store the keys of the unique objects
                .map((e, i, final) => final.indexOf(e) === i && i)

                // eliminate the dead keys & store unique objects
                .filter(e => arr[e]).map(e => arr[e]);

            return unique;
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
        Multiselect,
        ProgressCircle
    }
 
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.select-wilayah {
    width: 162px;
}
</style>
