// axios的二次封装：使用请求与响应拦截器
import axios from 'axios';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';
import { startLoadingAddCount, endLoadingSubCount } from '@/utils/loading';

//创建axios实例
const request = axios.create({
  //    基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  //    超时设置
  timeout: 30000,
});

//请求拦截器
request.interceptors.request.use(
  (config) => {
    // 获取仓库token
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers.token = userStore.token;
    }
    // 开始loading
    startLoadingAddCount();
    //config配置对象，headers属性请求头，给服务器携带公共参数
    //返回配置对象
    return config;
  },
  (error) => {
    console.log(error);
    // 结束loading
    endLoadingSubCount();
    return Promise.reject(error);
  },
);

//响应拦截器
request.interceptors.response.use(
  (response) => {
    // 结束loading
    endLoadingSubCount();
    return response.data;
  },
  (error) => {
    //    失败回调，处理http网络错误
    let message: string = '';
    const status: number = error.response.status;
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
    // 结束loading
    endLoadingSubCount();
    //    提示错误信息
    ElMessage({
      type: 'error',
      message,
    });
    return Promise.reject(error);
  },
);

export default request;
