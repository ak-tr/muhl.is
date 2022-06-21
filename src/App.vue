
<template>
  <div class="container">
    <noscript>You need JavaScript to run this page...</noscript>
    <div class="header">
      <HeaderText text="muhl.is"/>
    </div>
    <div class="icons">
      <IconImage fileName="github-icon.png" altText="GitHub Icon" />
    </div>
    <div class="content"></div>
    <div class="footer">
      <FooterText text="Created by akif!" />
    </div>
  </div>
</template>

<script>
import HeaderText from "./components/Header.vue";
import IconImage from "./components/Icon.vue";
import FooterText from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    HeaderText,
    IconImage,
    FooterText,
},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

* {
  font-family: "JetBrains Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body , .container {
  height: 100vh;
  margin: 0;
}

.container {  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 2.6fr 0.2fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "site-name site-name icons"
    "content content content"
    "footer footer footer";
}

.header { grid-area: site-name; }

.icons { grid-area: icons; }

.content { grid-area: content; }

.footer { 
  display: flex;
  grid-area: footer; 
  justify-content: center;
  align-items: center;
}

</style>
