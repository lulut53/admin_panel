<template>
  <div class="col-md-6">
    <div class="form-group">
      <div class="row pb-2">
        <div class="col-6">
          <label for="dicicilaja_usaha" class="form-control-label">{{ title }}</label>
        </div>
        <div class="col-6 text-right">
          <base-button size="sm" type="info" v-if="!displayShow" @click.native="updateBanner(val.id)">Upload</base-button>
          <base-button size="sm" type="warning" :class="{toggled: displayShow}" @click="displayShow = !displayShow">{{displayText}}</base-button>
        </div>
      </div>
      <img 
        v-if="displayShow"
        :src="val.attributes.gambar" 
        alt="" 
        class="img-fluid">
      <dropzone-file-upload 
        v-if="!displayShow"
        v-model="fileSingle" 
        id="dicicilaja_usaha"  
        accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG">
      </dropzone-file-upload>
    </div>
  </div>
</template>

<script>
import DropzoneFileUpload from '@/components/Inputs/DropzoneFileUpload'
import swal from 'sweetalert2';
import { mapActions } from 'vuex';

export default {
  name: 'NewBannerDouble',
  components: {
    DropzoneFileUpload
  },
  data() {
    return {
      displayShow: true
    }
  },
  computed: {
    displayText () {
      if (this.displayShow) {
        return 'Ubah'
      } else {
        return 'Lihat'
      }
    }
  },
  methods: {
    ...mapActions('banner', [
        'updateSlider',
        'deleteSlider',
        'updateDetailHalaman'
      ]),
    async updateBanner(id) {
      const that = this

      this.$emit('showModalProcess', true)

      let payload = {
        id: id,
        position: id,
        image: this.fileSingle[0],
        alt_image: this.val.attributes.gambar_alternatif,
        slug: this.val.attributes.slug,
        type: this.val.attributes.tipe,
        _method: 'PATCH',
        page_id: this.val.relationships.page.data.id
      }

      let res = await this.updateSlider(payload)
      if (res.name == "Error") {
        this.$emit('showModalProcess', false)

        swal("Gagal", "Gagal mengubah slider", "error")
        .then(function () {
          // that.getData()
        })
      } else {
        this.$emit('showModalProcess', false)

        swal("Sukses", "Berhasil mengubah slider", "success")
        this.$emit('getData');
      }
    },
  },
  props: [
    'title',
    'val',
    'fileSingle'
  ]
}
</script>

<style>

</style>