<template>
  <div class="col-md-12">
    <div class="form-group" v-if="val">
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
        :src="val.attributes.banner" 
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
  name: 'NewBanner',
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
        'updateDetailHalaman',
        'updateBannerHalaman'
      ]),
    async updateBanner(id) {
      const that = this

      this.$emit('showModalProcess', true)

      let payload = {
        id: id,
        banner: this.fileSingle[0],
        _method: 'PATCH'
      }

      let res = await this.updateBannerHalaman(payload)
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