import * as Components from './components/main';
import { type App, Plugin } from 'vue';

const FuckNothing: Plugin = {
  install(app: App) {
    Object.entries(Components).forEach(([key, component]) => {
      app.component(key, component as any);
    });
  },
};

export default FuckNothing;
