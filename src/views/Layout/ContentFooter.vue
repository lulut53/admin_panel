<template>
  <footer class="footer px-4 mx-2">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{year}} All rights reserved <a href="https://dicicilaja.com" class="font-weight-bold ml-1" target="_blank" rel="noopener">dicicilaja.com</a>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-right text-muted">
          <!-- Made With <i class="fa fa-heart"></i> -->
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
