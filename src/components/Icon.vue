<template>
  <img :src="getImage(fileName)" :alt="altText" />
</template>

<script>
export default {
  name: "IconImage",
  props: {
    fileName: String,
    altText: String,
  },
  methods: {
    getImage(fileName) {
      return new URL(`../assets/${fileName}`, import.meta.url).href;
    }
  }
}
</script>

<style scoped>
  img {
    float: right;
    width: 35px;
    height: 35px;
    margin-top: 25px;
    margin-right: 25px; 
  }
</style>