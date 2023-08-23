import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
// import type { loginForm, loginResData } from '@/api/user/type';
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type';
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
      buttons: [],
      roles: [],
      routes: [],
    };
  },
  //异步|逻辑的地方
  actions: {
    async useLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code === 200) {
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data as string;
        // 本地存储token
        SET_LOCAL_STORAGE('TOKEN', result.data as string);
        return true;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async useInfo() {
      const result: userInfoResponseData = await reqUserInfo();
      // 若获取用户信息成功，存储用户信息
      if (result.code === 200 && result.data) {
        this.userName = result.data.name;
        this.avatar = result.data.avatar;
        this.buttons = result.data.buttons;
        this.roles = result.data.roles;
        this.routes = result.data.routes;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async userLogout() {
      const result: any = await reqLogout();
      if (result.code === 200) {
        //    没有mock接口：退出登录接口通知服务器token失效
        this.token = '';
        this.userName = '';
        this.avatar = '';
        this.buttons = [];
        this.roles = [];
        this.routes = [];
        REMOVE_LOCAL_STORAGE('TOKEN');
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  getters: {},
});
export default useUserStore;
