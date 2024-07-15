<template>
  <div class="content" v-if="isShow">
    <FadeTransition :duration="200" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </FadeTransition>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';

export default {
  data () {
    return {
      isShow: false
    }
  },
  components: {
    FadeTransition
  },
  beforeCreate() {
    if (window.localStorage.getItem('access_token')) {
      this.$router.push('/administrator/dashboard') 
    } else {
      this.isShow = true
    }
  }
};
</script>
<style></style>
