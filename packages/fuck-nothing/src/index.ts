import * as Components from './components/main';
import type { App, Plugin } from 'vue';

export * from './components/main';

const install = (app: App) => {
  Object.entries(Components).forEach(([name, comp]) => {
    app.component(name, comp as any);
  });
};

const plugin: Plugin = { install };

export default plugin;
