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
          <h2>欢迎来到硅谷甄选</h2>
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
import {getTime} from "@/utils/time";
//获取路由器
let $router = useRouter();
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' });
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
      title: `HI, ${getTime()}好`
    });
  } catch (error: string) {
    loading.value = false;
    ElNotification({
      type: 'error',
      message: error.message,
    });
  }
};
//表单校验的配置
const rules = {
  username: [
    // { required: true, message: '用户名不能为空！', trigger: 'blur' },
    { required: true, min: 4, max: 10, message: '账号长度至少四位，最多十位！', trigger: 'blur' },
  ],
  password: [
    { required: true, min: 6, max: 15, message: '密码长度至少六位，最多十五位！', trigger: 'blur' },
  ],
}
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
