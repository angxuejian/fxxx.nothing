import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home.vue';
import { useMenuStore } from '@/stores/use-menu';

const vueFiles = import.meta.glob('../views/docs/**/*.md');
const routerMap = new Map<string, any>();

const toPascalCase = (str: string): string => {
  return str
    .split(/[-_]/) // 按 `-` 或 `_` 分割
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // 每个单词首字母大写
    .join(''); // 重新拼接
};

const generateRouters = (key: string = 'zh') => {
  const data: Record<string, any[]> = {};

  Object.keys(vueFiles).forEach((path) => {
    let pathname = path.replace('../views/docs/', '').replace('.md', '');
    if (!/\//.test(pathname)) pathname = 'zh/' + pathname;
    const [lang, name] = pathname.split('/');

    const l = lang === 'zh' ? '' : `/${lang}`;
    const p = l + '/' + name;

    const key = `${lang}_${name}`;
    if (!routerMap.has(key)) {
      routerMap.set(key, {
        path: p,
        name,
        lang,
      });
    }

    if (!Array.isArray(data[lang])) {
      data[lang] = [];
    }

    data[lang].push({
      path: p,
      name: `${lang}.__${toPascalCase(name)}`,
      component: vueFiles[path],
    });
  });

  return data[key];
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,

      children: generateRouters(),
    },
    {
      path: '/en',
      name: 'home-en',
      component: () => import('@/views/home-en.vue'),
      // redirect: '/en/buttom',
      children: generateRouters('en'),
    },
  ],
});

let isStoreInitialized = false;
router.beforeEach(() => {
  if (!isStoreInitialized) {
    const menuStore = useMenuStore();
    menuStore.menu.push(...Array.from(routerMap.values()));
    isStoreInitialized = true;
  }
});

export default router;
