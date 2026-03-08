import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', () => {
  const menu = ref<any[]>([]);

  return { menu };
});
