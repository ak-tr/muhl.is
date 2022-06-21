<template>
  <small>{{text}}</small>
</template>

<script>
export default {
  name: "FooterText",
  props: {
    text: String
  }
}
</script>

<style scoped>
  small {
    text-align: center;
  }
</style>