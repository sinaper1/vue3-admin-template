import type { App, Component } from 'vue';
//引入component文件夹中的组件
import SvgIcon from './SvgIcon/index.vue';
//全局对接
const allGlobalComponent: { [name: string]: Component } = { SvgIcon };

//对外暴露插件对象
export default {
  install(app: App) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGlobalComponent[key]);
    });
  },
};
