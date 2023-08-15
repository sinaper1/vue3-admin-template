//layout组件相关的配置
import { defineStore } from 'pinia';

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //菜单折叠控制
      refresh: false, //页面刷新
    };
  },
});

export default useLayoutSettingStore;
