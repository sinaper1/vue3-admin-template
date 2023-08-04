//登陆接口需携带的参数
export interface loginForm {
  username: string;
  password: string;
}

interface dataType {
  token: string;
}

//登陆接口返回的数据类型
export interface loginResForm {
  code: number;
  data: dataType;
}

interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}

interface user {
  checkUser: userInfo;
}

//服务器返回用户相关的数据类型
export interface userResForm {
  code: number;
  data: user;
}
