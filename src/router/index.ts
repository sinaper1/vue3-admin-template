// 路由配置
import { createRouter, createWebHashHistory } from 'vue-router';
import {constantRoute} from "@/router/router";

let router = createRouter({
  //    路由模式hash
  history: createWebHashHistory(),
  routes: [...constantRoute],
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
