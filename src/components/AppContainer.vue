<template>
  <transition
    appear
    @before-enter="beforeEnter"
    @enter="enter"
  >
    <div class="container">
      <AppHeader />
      <AppIcons />
      <AppContent />
      <AppFooter />
    </div>
  </transition>
</template>

<script>
import gsap from "gsap";
import AppHeader from "./AppHeader.vue"
import AppIcons from "./AppIcons.vue"
import AppContent from "./AppContent.vue"
import AppFooter from "./AppFooter.vue"

export default {
  name: "AppContainer",
  components: {
    AppHeader,
    AppIcons,
    AppContent,
    AppFooter,
  },
  methods: {
     beforeEnter(el) {
      console.log(el);
      el.style.opacity = 0;
    },
    enter(el) {
      gsap.to(el, {
        opacity: 1,
        duration: 3,
        ease: "sine.out",
      })
    }
  }
}
</script>

<style>
.container {  
  height: 100vh;
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
</style>