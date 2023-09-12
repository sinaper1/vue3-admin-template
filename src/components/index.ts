import type { App, Component } from 'vue';
//引入component文件夹中的组件
import SvgIcon from './SvgIcon/index.vue';
import ThreeLevelSelect from './ThreeLevelSelect/index.vue';
import Pagination from './Pagination/index.vue';
//全局对接
const allGlobalComponent: { [name: string]: Component } = {
  SvgIcon,
  ThreeLevelSelect,
  Pagination,
};
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
//对外暴露插件对象
export default {
  install(app: App) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGlobalComponent[key]);
    });
    //将element-plus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
