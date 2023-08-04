import { createApp } from 'vue';
//引入element-plus插件与样式
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
//配置SVG插件
import 'virtual:svg-icons-register';
import App from '@/App.vue';
//引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components/index';
//引入路由
import router from '@/router';
//引入全局样式
import '@/styles/index.scss';
//获取应用实例对象
const app = createApp(App);
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
});
//安装自定义组件
app.use(globalComponent);
//注册模板路由
app.use(router);
//输出全局配置
// console.log(import.meta.env)
//将应用挂载到挂载点上
app.mount('#app');
