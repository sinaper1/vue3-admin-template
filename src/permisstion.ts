// 路由鉴权
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';
import router from '@/router';
// 获取用户相关仓库的内部token数据，去判断用户是否登录成功
import useUserStore from '@/store/modules/user';
import pinia from '@/store';
import setting from '@/setting';
// 引入大仓库
const userStore = useUserStore(pinia);
// 隐藏进度条的加载loading图
nprogress.configure({ showSpinner: false });
// 全局守卫：项目当中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  //   to:将要访问的路由
  //   from:从哪个路由而来
  //   next:路由放行函数
  document.title = `${setting.title}-${to.meta.title}`;
  nprogress.start();
  const token = userStore.token;
  // 用户的名字与头像，获取用户信息
  const username = userStore.userName;
  const avatar = userStore.avatar;
  if (token) {
    //   用户已登录
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (username && avatar) {
        // 放行
        next();
      } else {
        try {
          //   如果没有用户信息，则发起请求获取用户信息再放行
          await userStore.useInfo();
        } catch (error) {
          //   token过期或者token被修改
          // 退出登录
          userStore.userLogout();
          next({ path: '/login', query: { redirect: to.path } });
        }
      }
    }
  } else {
    //  用户未登录
    console.log(to, '--to---');
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.path } });
    }
  }
  next();
});

//全局后置守卫
router.afterEach((to: any, from: any) => {
  //   to:将要访问的路由
  //   from:从哪个路由而来
  nprogress.done();
});
