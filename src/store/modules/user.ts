import { defineStore } from 'pinia';
import { reqLogin } from '@/api/user';
import type { loginForm, loginResData } from '@/api/user/type';
import { UserState } from '@/store/modules/types/type';
import { SET_LOCAL_STORAGE, GET_LOCAL_STORAGE } from '@/utils/localStorage';

let useUserStore = defineStore('User', {
  //存储数据
  state: (): UserState => {
    return {
      token: GET_LOCAL_STORAGE('TOKEN'),
    };
  },
  //异步|逻辑的地方
  actions: {
    async useLogin(data: loginForm) {
      let result: loginResData = await reqLogin(data);
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
  },
  getters: {},
});
export default useUserStore;
