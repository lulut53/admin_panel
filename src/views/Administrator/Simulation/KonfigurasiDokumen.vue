<template>
    <div>
        <base-header type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-12">
                    <h6 class="h2 d-inline-block mb-0">Konfigurasi Dokumen</h6>
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links">
                            <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i> Administrator</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">Simulation</li>
                            <li class="breadcrumb-item active" aria-current="page">Konfigurasi Dokumen</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </base-header>

        <base-header class="pb-6" type="">
            <div class="row align-items-center py-4">
                <div class="col-lg-6">
                    <div class="d-flex">
                        <base-input label="Jenis Dokumen">
                            <select class="form-control border-0 box-shadow"
                            v-model="selectedDok"
                            @change="getVersiDokumen">
                                <option
                                v-for="option in jenisDok"
                                :value="option.value"
                                :label="option.label"
                                :key="option.value">
                                </option>
                            </select>
                        </base-input>

                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--6">

        <div class="card" v-for="(e, i) in listDocs" :key="i">

            <div class="card-body">
             <figure>
                <figcaption></figcaption>
                <table class="table table-hover">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Versi Dokumen</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                      
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(d, id) in e.data" :key="id">                                     
                            <td >{{ id + 1 }}</td>
                            <td>{{ d.attributes.nama }}</td>
                            <td>{{ d.attributes.is_active }}</td>
                            <td>
                                <button class="btn text-danger btn-sm rounded-0" type="button" data-toggle="tooltip" 
                                data-placement="top" title="Delete"
                                @click.prevent="deleteDocs(d.id, d.attributes.nama)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                </svg> Delete </button>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </figure>
            </div>
        </div>
</div>
</div>
</template>

<script>
import swal from 'sweetalert2';

export default {
    data() {
        return {
            listDocs: [],
            selectedDok: "11",
            jenis_dokumen: "",
            sub_jenis_dokumen: "",
            jenisDok:[
                { value: "11", label: "MRP Mobil Passenger"},
                { value: "12", label: "MRP Mobil Commercial"},
                { value: "13", label: "MRP Motor"},
                { value: "14", label: "Lending Rate Mobil"},
                { value: "15", label: "Premi Rate Mobil"},
                { value: "16", label: "Rate Motor"},
            ],
        };
    },
    async mounted() {
        this.getVersiDokumen();
        

    },
    methods: {
        async getVersiDokumen() {
            try {
                const token = window.localStorage.getItem('access_token')
                this.listDocs = [];

                this.jenis_dokumen = this.selectedDok === "11" ? '1' : this.selectedDok === "12" ? '1' : this.selectedDok === "13" ? '1' : this.selectedDok === "14" ? '2' : this.selectedDok === "15" ? '3' : this.selectedDok === "16" ? '4' : '';
                this.sub_jenis_dokumen = this.selectedDok === "11" ? '1' : this.selectedDok === "12" ? '2' : this.selectedDok === "13" ? '3' : '';

                if(this.selectedDok === "11" || this.selectedDok === "12" || this.selectedDok === "13")
                {
                    let versi_dokumen = await this.$api.get(`${this.$store.state.simulation_base_url}/documentconfig?jenis_dokumen=${this.jenis_dokumen}&sub_jenis_dokumen=${this.sub_jenis_dokumen}&sort_by=id:asc&offset=10000`,
                        {
                            'headers' : {
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        
                this.listDocs.push({data: versi_dokumen.data.data})
                }
                else{
                    let versi_dokumen = await this.$api.get(`${this.$store.state.simulation_base_url}/documentconfig?jenis_dokumen=${this.jenis_dokumen}&sort_by=id:asc&offset=10000`,
                        {
                            'headers' : {
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        
                this.listDocs.push({data: versi_dokumen.data.data})
                }



            } catch (error) {
               throw new Error("Something went wrong " + error);
            }
        },

        deleteDocs(id, docsName){
            swal({
                title: `Apakah kamu yakin akan menghapus dokumen: ${docsName}`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        const token = window.localStorage.getItem('access_token')
                        let res = await this.$api.delete(`${this.$store.state.simulation_base_url}/documentconfig/delete/${id}`,
                        {
                            'headers' : {
                                'Accept': 'application/vnd.api+json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        if(res.data.status == "Failed" || res.data.message == "Document Masih Aktif")
                        {
                            this.getVersiDokumen()
                            //swal('Failed!',`Dokumen ${docsName} Masih Digunakan`, 'error');
                            swal.fire(`Dokumen ${docsName} Masih Digunakan`, '', 'error')
                        }
                        else{
                        

                            this.getVersiDokumen()
                            swal(`Dokumen ${docsName} Berhasil Dihapus`, '', 'success')
                        }

                    } catch (error) {
                        throw new Error("Something went wrong " + error);
                    }
                }
            })
        }

    },

}
</script>