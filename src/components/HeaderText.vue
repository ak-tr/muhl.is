<template>
  <header>
    <h1>{{text}}</h1>
  </header>
</template>

<script>
export default {
  name: "HeaderText",
  props: {
    text: String,
  }
}
</script>

<style scoped>
  header h1 {
    text-align: left;
    font-weight: 500;
    margin-left: 25px;
  }
</style>