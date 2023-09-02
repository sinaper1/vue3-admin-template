// //登陆接口需携带的参数
// export interface loginForm {
//   username: string;
//   password: string;
// }
//
// interface dataType {
//   token?: string;
//   message?: string;
// }
//
// //登陆接口返回的数据类型
// export interface loginResData {
//   code: number;
//   data: dataType;
// }
//
// interface userInfo {
//   userId: number;
//   avatar: string;
//   username: string;
//   password: string;
//   desc: string;
//   roles: string[];
//   buttons: string[];
//   routes: string[];
//   token: string;
// }
//
// interface user {
//   checkUser: userInfo;
// }
//
// //服务器返回用户相关的数据类型
// export interface userResData {
//   code: number;
//   data: user;
// }

//定义用户相关的ts类型
//用户登录接口写得参数的ts类型
export interface loginFormData {
  username: string;
  password: string;
}

// 定义全部接口返回数据都有的类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 登录接口返回的数据类型
export interface loginResponseData extends ResponseData {
  data: string;
}

// 获取用户信息返回的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}
