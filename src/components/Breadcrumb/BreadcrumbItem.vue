<template>
  <ul>
  <li class="breadcrumb-item" :class="{ active: active }"><slot></slot></li>
</ul>
</template>
<script>
export default {
  name: 'breadcrumb-item',
  props: {
    active: {
      type: Boolean,
      default: false,
      description: 'Whether breadcrumb item is active'
    }
  }
};
</script>
<style></style>
