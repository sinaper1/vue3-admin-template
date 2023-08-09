<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到詹韦连线</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';
//获取路由器
let $router = useRouter();
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: 'James#1984' });
//获取el-form组件
let loginForms = ref();
let loading = ref(false);
let useStore = useUserStore();
const login = async () => {
  //校验表单
  await loginForms.value.validate();
  loading.value = true;
  try {
    await useStore.useLogin(loginForm);
    loading.value = false;
    //  编程式导航跳转到首页
    $router.push('/');
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI, ${getTime()}好`,
    });
  } catch (error: string) {
    loading.value = false;
    ElNotification({
      type: 'error',
      message: error.message,
    });
  }
};
//自定义校验用户名的规则
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:校验规则对象
  //value:文本内容
  //callback:回调函数
  //使用正则表达式判断用户名（五到十位的数字、中文、字母）
  if (/^[A-Za-z0-9\u4e00-\u9fa5]{5,10}$/.test(value)) {
    callback();
  } else {
    callback(new Error('请输入5到10位的数字、中文、大小写字母！'));
  }
};
//自定义校验密码的规则
const validatorPassword = (rule: any, value: any, callback: any) => {
  //rule:校验规则对象
  //value:文本内容
  //callback:回调函数
  //使用正则表达式判断密码是否为强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/.test(value)) {
    callback();
  } else {
    callback(
      new Error(
        '密码必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间！',
      ),
    );
  }
};
//表单校验的配置
const rules = {
  username: [
    {
      trigger: 'change',
      validator: validatorUserName,
    },
  ],
  password: [
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: red;
  background: url('@/assets/images/background2.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 35vh;
    //background: url("@/assets/images/login_form.png") no-repeat;
    //background-size: cover;
    background-color: rgba(62, 62, 70, 0.4);
    padding: 20px;
    border-radius: 20px;
  }
  h1 {
    color: #ffffff;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
