<template>
    <div class="content">
      <TheCanvas />
    </div>
</template>

<script>
import TheCanvas from "./Canvas.vue";

export default {
  name: "AppContent",
  components: {
    TheCanvas
  }
}
</script>

<style>
.content { grid-area: content; }
</style>