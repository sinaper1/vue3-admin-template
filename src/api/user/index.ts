// 统一管理用户相关的接口
import request from '@/utils/request';
import type { loginForm, loginResData, userResData } from '@/api/user/type';

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

//登陆接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResData>(API.LOGIN_URL, data);
//获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, userResData>(API.USERINFO_URL);
