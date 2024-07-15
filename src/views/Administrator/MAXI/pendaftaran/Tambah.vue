<template>
    <div>
        <base-header class="pb-6" type="">
            <div class="row align-items-center py-4">
                <div class="col-4">
                    <h6 class="h2 d-inline-block mb-0">Tambah Produk</h6>
                </div>
                <div class="col-8 pt-2 d-flex justify-content-end">
                    <router-link to="" class="btn btn-success">
                        <span class="hidden-sm-down">Kirim Produk</span>
                    </router-link>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--6">
            <div class="row">
                <div class="col-7">
                    <card>
                        <base-input label="Nama Produk"/>

                        <base-input label="Harga Produk"/>

                        <base-input label="Deskripsi Singkat">
                            <textarea class="form-control" id="exampleFormControlTextarea3" rows="3"></textarea>
                        </base-input>

                        <base-input label="Konten">
                            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                        </base-input>
                    </card>
                </div>

                <div class="col-5">
                    <card>
                        <base-input label="Kategori Produk">
                            <select class="form-control">
                                <option>MAXI Travel</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </base-input>

                        <base-input label="Gambar Sampul">
                            <dropzone-file-upload v-model="files.cover"
                            :options="{ dictDefaultMessage: 'Klik atau drag file kamu kesini' }"></dropzone-file-upload>
                        </base-input>

                        <base-input label="Kota Cakupan Produk"/>

                        <base-input label="Tag Produk">
                            <tags-input v-model="tags"></tags-input>
                        </base-input>

                        <base-input label="Brosur Produk">
                            <file-input @change="brochureChange"></file-input>
                        </base-input>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DropzoneFileUpload from '@/components/Inputs/DropzoneFileUpload';
import TagsInput from '@/components/Inputs/TagsInput';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    data() {
      return {
        files: {
            cover: [],
            brochure: []
        },
        tags: ['Seluruh Indonesia'],
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
            // The configuration of the editor.
        }
      }
    },
    methods: {
      brochureChange(files) {
        this.files.brochure = files
      },
    },
    components: {
        DropzoneFileUpload,
        TagsInput,
        ckeditor: CKEditor.component
    }
}
</script>
