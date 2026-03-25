import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    count: 0,
    projectActive: null,
    headerSize: 0.08,
    content: null,
    isTransitioning: false,
    transitionClipOverride: 0,
  }),
  actions: {
    setContentRef(el) {
      this.content = el; // Note: if this is a DOM element, don't use .value inside the action
    }
  }
});