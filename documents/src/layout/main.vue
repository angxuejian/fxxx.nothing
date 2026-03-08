<script lang="ts" setup>
import { useMenuStore } from '@/stores/use-menu';
import { computed } from 'vue';
interface Props {
  lang: string;
}

const props = defineProps<Props>();
const store = useMenuStore();
const navigation = computed(() => {
  return store.menu.filter((item) => item.lang === props.lang);
});
</script>

<template>
  <main>
    <header>
      <ul class="menu">
        <li v-for="(item, index) in navigation" :key="index">
          <RouterLink :to="item.path">{{ item.name }}</RouterLink>
        </li>
      </ul>
    </header>

    <RouterView></RouterView>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100%;
}
header {
  width: 100%;
}
ul {
  outline: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
