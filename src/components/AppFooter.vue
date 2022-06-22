<template>
  <div class="footer">
    <FooterText text="created by akif!" />
  </div>
</template>

<script>
import FooterText from "./FooterText.vue";

export default {
  name: "AppFooter",
  components: {
    FooterText,
  }
}
</script>

<style>
.footer { 
  display: flex;
  grid-area: footer; 
  justify-content: center;
  align-items: center;
}
</style>