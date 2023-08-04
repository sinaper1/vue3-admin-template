// axios的二次封装：使用请求与响应拦截器
import axios from 'axios';
import { ElMessage } from 'element-plus';
//创建axios实例
let request = axios.create({
  //    基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  //    超时设置
  timeout: 30000,
});

//请求拦截器
request.interceptors.request.use((config) => {
  //config配置对象，headers属性请求头，给服务器携带公共参数
  //返回配置对象
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //    失败回调，处理http网络错误
    let message: string = '';
    let status: number = error.response.status;
    switch (status) {
      case 401:
        message = 'TOKEN过期';
        break;
      case 403:
        message = '无权访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器错误';
        break;
      default:
        message = '网络出现问题';
        break;
    }
    //    提示错误信息
    ElMessage({
      type: 'error',
      message,
    });
    return Promise.reject(error);
  },
);

export default request;
