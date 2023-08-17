import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo } from '@/api/user';
import type { loginForm, loginResData } from '@/api/user/type';
import { UserState } from '@/store/modules/types/type';
import {
  SET_LOCAL_STORAGE,
  GET_LOCAL_STORAGE,
  REMOVE_LOCAL_STORAGE,
} from '@/utils/localStorage';
import { constantRoute } from '@/router/router';

const useUserStore = defineStore('User', {
  //存储数据
  state: (): UserState => {
    return {
      token: GET_LOCAL_STORAGE('TOKEN'),
      menuRoutes: constantRoute, // 存储路由数组
      userName: '',
      avatar: '',
    };
  },
  //异步|逻辑的地方
  actions: {
    async useLogin(data: loginForm) {
      const result: loginResData = await reqLogin(data);
      if (result.code === 200) {
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data.token as string;
        // 本地存储token
        SET_LOCAL_STORAGE('TOKEN', result.data.token as string);
        return true;
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    async useInfo() {
      const result = await reqUserInfo();
      // 若获取用户信息成功，存储用户信息
      if (result.code === 200 && result.data && result.data.checkUser) {
        this.userName = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
      }
    },
    async userLogout() {
      //    没有mock接口：退出登录接口通知服务器token失效
      this.token = '';
      this.userName = '';
      this.avatar = '';
      REMOVE_LOCAL_STORAGE('TOKEN');
    },
  },
  getters: {},
});
export default useUserStore;
