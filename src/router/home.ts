export const homeRoute = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'layout',
      hidden: false, //路由是否在菜单隐藏，true则隐藏，false则显示
      icon: 'Operation', //菜单左侧图标
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页', //路由标题
          hidden: false, //路由是否在菜单隐藏，true则隐藏，false则显示
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true, //路由是否在菜单隐藏，true则隐藏，false则显示
      icon: 'WarnTriangleFilled',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true, //路由是否在菜单隐藏，true则隐藏，false则显示
      icon: 'Share',
    },
  },
];
