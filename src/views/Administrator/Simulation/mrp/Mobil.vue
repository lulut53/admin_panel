<template>
    <div>
        <base-header type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-12">
                    <h6 class="h2 d-inline-block mb-0">Simulation - Mobil</h6>
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links">
                            <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i> Administrator</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">Simulation</li>
                            <li class="breadcrumb-item active" aria-current="page">Mobil</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </base-header>

        <base-header class="pb-6" type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-6">
                    <div class="d-flex">
                        <base-input label="Area">
                            <select class="form-control border-0 box-shadow"
                                v-model="mrp.area"
                                @change="getArea">
                                <option value="" selected disabled>Pilih Area</option>
                                <option
                                v-for="(area, i) in area_lists"
                                :key="i"
                                :value="area.id">{{ area.attributes.nama }}</option>
                            </select>
                        </base-input>

                        <base-input label="Grup">
                            <select class="form-control border-0 box-shadow"
                                v-model="mrp.selectedGroup"
                                @change="getSelectGroup">
                                <option value="1">Passanger</option>
                                <option value="2">Commercial</option>
                                
                            </select>
                        </base-input>

                        <base-input label="Versi Dokumen">
                            <select class="form-control border-0 box-shadow"
                                v-model="mrp.versi_dokumen_id"
                                @change="getMrp"> 
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

                        <a :href="`${$store.state.simulation_base_url}/mrp/car/download?area_id=${mrp.area}${mrp.selectedGroup ? `&sub_jenis_dokumen_id=${mrp.selectedGroup}` : ''}${mrp.versi_dokumen_id ? `&versi_dokumen_id=${mrp.versi_dokumen_id}` : ''}`"
                            class="btn text-warning btn-light"
                            target="_blank"
                            rel="noopener">
                            <i class="fa fa-download"></i>
                            <span class="hidden-sm-down">Unduh Sampel</span>
                        </a>
    
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--6">

            <div class="card">
                <div class="card-header">
                    <h3 class="text-uppercase">
                        {{ findInArray(mrp.area, area_lists) }} - {{ mrp.selectedGroup == 1 ? 'Passanger' : 'Commercial' }} ({{ findInArray(mrp.versi_dokumen_id, list_versi_dokumen) }})
                    </h3>
                </div>

                <div class="card-body">
                    <div class="row table-filter">
                        <!-- <div class="col-md-3">
                            <base-input label="Sort By">
                                <select class="form-control text-primary border-0 h-unset"
                                 v-model="mrp.sort_by"
                                 @change="sortBy">
                                    <option value="ASC">ASC</option>
                                    <option value="DESC">DESC</option>
                                </select>
                            </base-input>
                        </div> -->
                        <div class="col-md-2">
                            <base-input label="Show Entry">
                                <select class="form-control text-primary border-0 h-unset"
                                    v-model="mrp.entry"
                                    @change="getMrp">
                                    <option value="10">10 Entries</option>
                                    <option value="25">25 Entries</option>
                                    <option value="50">50 Entries</option>
                                    <option value="100">100 Entries</option>
                                </select>
                            </base-input>
                        </div>
                        <div class="col-md-10 d-flex align-items-center justify-content-end search-filter">
                            <base-input placeholder="Search keywords..." class="input-search"
                                v-model="mrp.search_query">
                                <template slot="prepend">
                                    <select class="form-control text-primary"
                                        v-model="mrp.search_type"
                                        @change="getMrp">
                                        <option value="" disabled selected>Select Type</option>
                                        <option value="brand">Brand</option>
                                        <option value="model">Brand Type</option>
                                    </select>
                                </template>
                                <template slot="append">
                                    <i class="fa fa-search"></i>
                                </template>
                            </base-input>
                        </div>
                    </div>
                    <br>

                <figure>
                    <figcaption>mobil</figcaption>
                    <table class="table">
                        <thead class="thead-warning">
                            <tr>
                                <th scope="col">Grup</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Brand Type</th>
                                <th scope="col">Object Type</th>
                                <!-- <th scope="col">Upload Date</th> -->
                                <th scope="col">Latest Change</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody v-if="mrp_lists.length > 0">
                            <tr v-for="(p, i) in mrp_lists" :key="i">
                                <td class="text-capitalize">{{ p.attributes.group }}</td>
                                <th scope="row">
                                        {{ p.attributes.objek_brand }}
                                </th>
                               
                                <td>
                                    <span class="text-primary cursor-pointer"
                                        @click.stop="showDetail(`detail${i}`)">
                                        <p class="mb-0">{{ p.attributes.objek_model }}</p>
                                        <span class="text-capitalize">{{ p.attributes.group }}</span>: {{ p.attributes.kode_model }}
                                    </span>
                                </td>
                                <td>{{ p.attributes.tipe_kendaraan }}</td>
                                <!-- <td>{{ p.upload_date }}</td> -->
                                <td>{{ p.attributes.updated_at }}</td>
                                
                                
                                <td>
                                    <base-dropdown :menuOnRight="true" class="del-dropdown">
                                        <base-button slot="title-container" type="secondary" class="text-warning">
                                            <i class="fas fa-ellipsis-h mt-2"></i>
                                        </base-button>
                                        <a class="dropdown-item" href="" @click.prevent="deleteMrp(p.id)">Delete</a>
                                    </base-dropdown>
                                    <div class="modal-detail" :id="`detail${i}`">
                                        <a href="" @click.stop.prevent="closeDetail(`detail${i}`)">
                                            <i class="fa fa-times"></i> &nbsp; Close
                                        </a>
                                        <br><br>

                                        <h3>{{ p.attributes.objek_brand }} - {{ p.attributes.objek_model }}</h3>
                                        <h3>{{ p.attributes.tipe_kendaraan }} ({{ p.attributes.kode_model }})</h3>

                                        <p>
                                            <span class="text-capitalize">{{ p.attributes.group }}</span> //
                                            <span class="text-capitalize">{{ p.attributes.tipe_kendaraan }}</span> //
                                            {{ p.attributes.updated_at }}
                                        </p>

                                        <hr>

                                        <h4>Market Price</h4>

                                        <p v-if="p.relationships.otr.data.length == 0">Belum ada harga</p>
                                        <div class="d-flex justify-content-between border-bottom py-3"
                                            v-for="(d, id) in p.relationships.otr.data"
                                            :key="id">
                                            <span class="fz-1">{{ d.attributes.tahun }}</span>
                                            <span class="fz-1">
                                                {{ d.attributes.otr ? d.attributes.otr : 'Belum ada harga' }}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </figure>
                    <p v-if="!mrp_lists.length > 0" class="text-center mt-3 font-italic">Data tidak ditemukan</p>
                </div>

                <div class="card-footer py-4 d-flex justify-content-end">
                    <base-pagination
                        v-model="mrp.current_page"
                        :total="pagination.total"
                        :perPage="mrp.entry"></base-pagination>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.upload" size="lg" class="modal-custom">
            <button class="modal-close text-primary no-border"
                @click.prevent="modals.upload = false"
                :disabled="modals.close_modal">
                <i class="fa fa-times"></i>
            </button>

            <div class="row">
                <div class="col-4 d-flex justify-content-center align-items-center flex-column">
                    <img :src="`/images/upload_step_${upload_step == 1 ? '1' : '2'}.png`" alt="Step 1" width="200">
                    <h4 class="mt-4">New Document MRP</h4>
                    <p class="text-center mb-0">The document will be affect on the calculation, please be carefull.</p>
                    <br v-if="upload.files.length > 0">
                    <div class="file-upload" v-if="upload_step == 2 && upload.files.length > 0">
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
                            <br />
                            <input type="radio" id="passenger" value="1" v-model="mrp_sub_jenis"  @change="changeDocumentVersion"/> <label for="passenger">passenger</label> &nbsp;&nbsp;
                            <input type="radio" id="commercial" value="2" v-model="mrp_sub_jenis" @change="changeDocumentVersion"/> <label for="commercial">commercial</label>
                            <multiselect
                                v-model="upload.versi_dokumen_id"
                                tag-placeholder="Tambah sebagai versi baru"
                                placeholder="Cari atau tambah versi baru"
                                selectLabel="Tekan enter untuk memilih"
                                deselectLabel="Tekan enter untuk deselect"
                                :customLabel="customLabel"
                                :options="list_versi_dokumen_upload_filtered"
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
                        <h3 class="text-uppercase">Upload MRP File{{ upload.files.length > 1 ? 's' : '' }}</h3>
                        <br>

                        <div class="text-center py-3 h-290" v-if="upload.files.length == 0">
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
                            <div class="row py-1" v-for="(f, i) in upload.files" :key="i">
                                <div class="col-6 overflow-hidden d-flex align-items-center">
                                    <i class="fa fa-file mr-2"></i>
                                    <span>{{ f.name }}</span>
                                </div>

                                <div class="col-6 d-flex justify-content-around align-items-center">
                                    <div>
                                        <select class="form-control border-0 text-primary"
                                            v-model="upload.area_id[i]"
                                            :disabled="upload.progress[i].state == 'progress' || upload.progress[i].state == 'finish' ? true : false">
                                            <option value="" selected disabled>Pilih Area</option>
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
                                                :disabled="upload.disabled[i] || upload.area_id[i] == ''"
                                                @click="uploadMrp(i)">
                                                <i v-if="upload.progress[i].state == 'finish'" class="fa fa-check"></i>
                                                <div v-else-if="upload.progress[i].state == 'progress'" class="lds-facebook"><div></div><div></div><div></div><div></div></div>
                                                <i v-else class="fa fa-upload"></i>
                                            </button>
                                        </progress-circle>
                                    </div>
                                    <div>
                                        <button @click.prevent="upload.files.splice(i, 1);upload.area_id.splice(i, 1);upload.progress.splice(i, 1)"
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
                                    v-if="upload_step == 1"
                                    :class="{ 'btn-disabled': isButtonDisabled }"
                                    :disabled="isButtonDisabled">
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
            <br/>
        </modal>

    </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { Radio } from "element-ui";
import swal from 'sweetalert2';
import Multiselect from 'vue-multiselect';
import { ProgressCircle } from 'vue-progress-circle';
var sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl;

export default {
    components: {
        [Radio.name]: Radio,
        Modal,
        Multiselect,
        ProgressCircle
    },
    data() {
        return {
            area_lists: [],
            list_versi_dokumen: [],
            list_versi_dokumen_upload: [],
            list_versi_dokumen_upload_filtered: [],
            mrp: {
                versi_dokumen_id: '',
                area: 9,
                sort_by: 'ASC',
                search_type: '',
                search_query: '',
                entry: 10,
                current_page: 1,
                selectedGroup: 1
            },
            pagination: {},
            mrp_lists: [],
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
                area_id: [],
                tipe_objek_id: 1,
                progress: [],
                files: [],
                disabled: [],
            },
            mrp_sub_jenis: "1"
        };
    },
    async mounted() {
        try {
            const token = window.localStorage.getItem('access_token')

            let area = await this.$api.get(
                `${this.$store.state.area_base_url}/areas`,
                {
                    headers: {
                        'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        'filter[simulasi]': true
                    }
                }
            ).then(res => res.data)
            this.area_lists = area.data

            await this.getVersiDokumen()

            this.getMrp()
        } catch (error) {
          throw new Error("Something went wrong " + error);
        }
    },
    computed: {
        page() { return this.mrp.current_page },
        query() { return this.mrp.search_query },
        isButtonDisabled(){
            return !this.upload.versi_dokumen_id;
        },
    },
    watch: {
        page() { this.getMrp() },
        query() { this.getMrp() },
        //() { this.getArea() }
    },
    methods: {
        async getMrp() {
            try {
                const token = window.localStorage.getItem('access_token')
                let mrp = await this.$api.get(
                    `${this.$store.state.simulation_base_url}/mrp?tipe_objek_id=1&area_id=${this.mrp.area}&group=${this.mrp.selectedGroup}&versi_dokumen_id=${this.mrp.versi_dokumen_id}&offset=${this.mrp.entry}&page=${this.mrp.current_page}${this.mrp.search_type && this.mrp.search_query ? `&search=${this.mrp.search_type}:${this.mrp.search_query}` : ''}&sort_by=nama:${this.mrp.sort_by}`,
                    {
                        'headers' : {
                            'Accept': 'application/vnd.api+json',
	                		'Authorization': `Bearer ${token}`
                        }
                    })
                this.mrp_lists = mrp.data.data
                this.pagination = mrp.data.meta
                getSelectGroup()
            } catch (error) {
            }
        },

        getArea() {
            this.mrp.selectedGroup  = 1
            this.getMrp()
            this.getVersiDokumen()
            //this.changeDocumentVersion ()
            //this.versi_dokumen_id   = 1
        },

        getSelectGroup() {
            this.getMrp()
            this.getVersiDokumen()
        },
        
        UrlHealer(dirtyUrl) {
      return sanitizeUrl(dirtyUrl);
  },
        deleteMrp(id) {
            swal({
                title: 'Apakah kamu yakin?',
                text: "File yang dapat dihapus tidak dapat dikembalikan!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        const token = window.localStorage.getItem('access_token')
                        let res = await this.$api.delete(`${this.$store.state.simulation_base_url}/mrp/${id}`,
                        {
                            'headers' : {
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        this.getMrp()
                        swal('Deleted!', 'Data berhasil dihapus.', 'success')
                    } catch (error) {
                        throw new Error("Something went wrong " + error);
                    }
                }
            })
        },
        async uploadMrp(index) {
            this.upload.progress[index].completed_steps = 5
            this.modals.close_modal = !this.modals.close_modal
            this.upload.progress[index].state = 'progress'
            this.backdropModal('disable')

            let formData = new FormData();
            formData.append("file", this.upload.files[index]);
            formData.append("area_id", this.upload.area_id[index]);
            formData.append("versi_dokumen_id", this.upload.versi_dokumen_id.id);
            formData.append("tipe_objek_id", 1);
            this.upload.progress[index].completed_steps = 10

            try {
                const token = window.localStorage.getItem('access_token')
                let response = await this.$api.post(`${this.$store.state.simulation_base_url}/mrp/import`, formData, {
                    headers: {
                        'Accept': 'application/vnd.api+json',
	                	'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                this.upload.progress[index].completed_steps = 50
                await this.getVersiDokumen()
                this.upload.progress[index].completed_steps = 80
                this.getMrp()

                if(this.upload.make_default) {
                    let make_active = await this.$api.put(`${this.$store.state.simulation_base_url}/versidokumen/active-subjenis/${this.upload.versi_dokumen_id.id}`, null,
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
                let versi_dokumen = await this.$api.get(`${this.$store.state.simulation_base_url}/versidokumen?jenis_dokumen=1&sub_jenis_dokumen=${this.mrp.selectedGroup}&sort_by=id:desc&offset=10000`,
                        {
                            'headers' : {
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                if (versi_dokumen.data.data) {
                    let active = versi_dokumen.data.data.find(v => v.attributes.is_active)
                    this.mrp.versi_dokumen_id = active.id
                    this.list_versi_dokumen = versi_dokumen.data.data
                    this.list_versi_dokumen_upload = []
                    this.list_versi_dokumen_upload_filtered = []
                    versi_dokumen.data.data.forEach(el => {
                        this.list_versi_dokumen_upload.push({
                            nama: el.attributes.nama,
                            id: el.id
                        })
                    })

                    this.list_versi_dokumen_upload_filtered = 
                        this.list_versi_dokumen_upload
                            .filter(x => x.nama.includes(  
                                this.mrp_sub_jenis == 1 ? 'Passenger' : 'Commercial'));
                              
                }
                this.getMrp()
            } catch (error) {
               throw new Error("Something went wrong " + error);
            }
        },
        async addVersion (newVersion) {
            let DocNewVersion = this.mrp_sub_jenis == 1 ? 'Passenger - ' + newVersion : 'Commercial - ' + newVersion;
            let data = {
                data: {
                    type: 'string',
                    attributes: {
                        nama:  DocNewVersion,
                        jenis_dokumen_id: 1,
                        sub_jenis_dokumen_id: this.mrp_sub_jenis,
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
                    nama: DocNewVersion,
                    id: res.data.data.id
                }
                this.list_versi_dokumen_upload.push(newData)
                this.list_versi_dokumen_upload_filtered.push(newData)
                this.upload.versi_dokumen_id = newData
            } catch (error) {
               throw new Error("Something went wrong " + error);
            }
        },
        changeDocumentVersion () {
            this.list_versi_dokumen_upload_filtered = 
                this.list_versi_dokumen_upload
                    .filter(x => x.nama.includes(  
                        this.mrp_sub_jenis == 1 ? 'Passenger' : 'Commercial'));

            this.upload.versi_dokumen_id = null;
        },
        customLabel ({ nama }) {
            return nama
        },
        showDetail(id_modal) {
            let mod = document.getElementById(id_modal);
            mod.classList.add('show')
        },
        closeDetail(id_modal) {
            let mod = document.getElementById(id_modal);
            mod.classList.remove('show')
        },
        sortBy() {
            if (this.mrp.sort_by == 'ASC') {
                this.mrp_lists.sort(this.numberAs)
            } else {
                this.mrp_lists.reverse()
            }
        },
        filesChange(ev) {
            if (this.upload.files.length == 0) {
                Array.from(ev.target.files).forEach((file, i) => {
                    if (i == 0) this.upload.disabled.push(false)
                    else this.upload.disabled.push(true)
                });
            }

            Array.from(ev.target.files).forEach((file, i) => {
                this.upload.files.push(file)
                this.upload.area_id.push('')
                this.upload.disabled.push(true)
                this.upload.progress.push({
                    completed_steps: 0,
                    state: 'ready',
                    start_color: 'rgb(94, 114, 228)',
                    stop_color: 'rgb(94, 114, 228)'
                })
            });

            this.upload.files = this.removeDuplicate(this.upload.files);
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
        numberAs(a,b) {
            if(a.attributes.objek_model < b.attributes.objek_model) { return -1; }
            if(a.attributes.objek_model > b.attributes.objek_model) { return 1; }
            return 0;
        },
        backdropModal(state) {
            if (state == 'disable') {
                document.querySelector('*:not(.modal-close)').style.pointerEvents = "none";
            } else {
                document.querySelector('*').style.pointerEvents = "auto";
            }
        }, 

       


    },
    

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
