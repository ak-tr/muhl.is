<template>
  <transition
    appear
    @before-appear="beforeEnter"
    @enter="enter"
    v-show="isLoaded"
  >
    <div class="container" ref="container" @mousemove="mouseMove">
      <AppHeader />
      <AppIcons />
      <AppContent />
      <AppFooter />
    </div>
  </transition>
</template>

<script>
// Library imports
import gsap from "gsap";

// Store imports
import {useMainStore} from "../stores/MainStore"

// Vue imports
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
      el.style.opacity = 0;
    },
    enter(el) {
      gsap.to(el, {
        opacity: 1,
        delay: 0.25,
        duration: 1,
        ease: "sine.out",
      })
    },
    mouseMove(event) {
      useMainStore().mouseX = event.clientX;
      useMainStore().mouseY = event.clientY;
    },
    animate() {
      this.loaded = true;
      this.beforeEnter(this.$refs.container);
      this.enter(this.$refs.container)
    },
  },
  data() {
    return {
      isLoaded: true,
    }
  }
}
</script>

<style>
.container {  
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 2.6fr 0.15fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "site-name site-name icons"
    "content content content"
    "footer footer footer";
  }

</style>