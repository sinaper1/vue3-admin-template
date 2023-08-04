// 路由配置
import { createRouter, createWebHashHistory } from 'vue-router';
import { homeRoute } from '@/router/home';
import { loginRoute } from '@/router/login';

let router = createRouter({
  //    路由模式hash
  history: createWebHashHistory(),
  routes: [...homeRoute, ...loginRoute],
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
  //     [
  //     {
  //         path: '/login',
  //         component: ()=>import('@/views/login/index.vue'),
  //         name: 'login', //命名路由
  //     },
  //     {
  //         path: '/',
  //         component: ()=>import('@/views/home/index.vue'),
  //         name: 'layout',
  //     },
  //     {
  //         path: '/404',
  //         component: ()=>import('@/views/404/index.vue'),
  //         name: '404',
  //     },
  //     {
  //         path: '/:pathMatch(.*)*',
  //         redirect: '/404',
  //         name: 'Any',
  //     }
  // ]
});

export default router;
