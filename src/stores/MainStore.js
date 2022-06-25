import {defineStore} from "pinia";

export const useMainStore = defineStore("MainStore", {
  state: () => {
    return {
      mouseX: 0,
      mouseY: 0,
    };
  },
})