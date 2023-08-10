export const loginRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
    meta:{
      title: '登录',
      hidden: true, //路由是否在菜单隐藏，true则隐藏，false则显示
      icon: 'Position',
    },
  },
];
