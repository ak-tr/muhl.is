<template>
  <div class="header">
    <HeaderText text="muhl.is"/>
  </div>
</template>

<script>
import HeaderText from "./HeaderText.vue";

export default {
  name: "AppHeader",
  components: {
    HeaderText,
  }
}
</script>

<style>
.header { grid-area: site-name; }
</style>