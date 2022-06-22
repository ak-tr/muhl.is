<template>
  <div class="icons">
    <LinkedIcon fileName="github-icon.png" altText="GitHub Icon" />
  </div>
</template>

<script>
import LinkedIcon from "./LinkedIcon.vue"

export default {
  name: "AppIcons",
  components: {
    LinkedIcon,
  }
}
</script>

<style>
.icons { grid-area: icons; }
</style>