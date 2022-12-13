<template>
  <div>
    <a-form ref="registForm" :model="registUserInfo" @submit="gotoRegist">
      <a-form-item
        field="loginName"
        label="用户名"
        placeholder="输入用户名"
        :rules="loginNameRules"
      >
        <a-input v-model="registUserInfo.loginName"></a-input>
      </a-form-item>
      <a-form-item
        placeholder="输入密码"
        field="password"
        label="密码"
        :rules="passwordRules"
      >
        <a-input-password
          v-model="registUserInfo.password"
          autocomplete
        ></a-input-password>
      </a-form-item>
      <a-form-item field="nickName" label="昵称">
        <a-input v-model="registUserInfo.nickName"></a-input>
      </a-form-item>
      <a-form-item field="checkCode" label="验证码" :rules="checkCodeRules">
        <a-input v-model="registUserInfo.checkCode"></a-input>
        <div class="checkCode">
          <canvas id="checkCode" width="120" height="40">111</canvas>
        </div>
        <template #extra>
          <a-button type="text" @click="getCheckCode">获取验证码</a-button>
        </template>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, onMounted, nextTick } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useCheckCode, useUserStore } from '@/store';
  import { RegistData, RegistRes } from '@/api/user';
  import drawCode from '@/utils/drawCode';

  const { loading, setLoading } = useLoading();
  const checkCode = useCheckCode();
  const userStore = useUserStore();
  const loginNameRules = [
    {
      required: true,
      max: 12,
      minLength: 6,
      message: '登录名长度需在6到12个字符间',
    },
    {
      match: /^[a-zA-Z]\w{5,12}$/,
      message: '请输入字母',
    },
    {
      validator: async (value: string, cb: any) => {
        if (!value) {
          cb('请输入登录名');
        }

        const res = await userStore.checkExistUserName(value);

        if (res !== '可注册') {
          cb(res);
        }
      },
    },
  ];
  const passwordRules = [
    {
      required: true,
      max: 15,
      minLength: 6,
      message: '密码长度需在6到12个字符间',
    },
    {
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
      message: '需包含字母、数字、特殊符号',
    },
  ];
  const checkCodeRules = [
    {
      required: true,
      max: 4,
      minLength: 4,
      message: '请输入验证码',
    },
  ];

  // const props = defineProps({
  //   pp: {
  //     type: String,
  //     default() {
  //       return '';
  //     },
  //   },
  // });
  const emits = defineEmits(['registed']);
  const registUserInfo: RegistData = reactive({
    loginName: '',
    password: '',
    nickName: '',
    checkCode: '',
  });

  async function getCheckCode() {
    const canvasEl = document.querySelector('#checkCode') as HTMLCanvasElement;

    await checkCode.getCode();
    nextTick(() => {
      drawCode(canvasEl, checkCode.code);
    });
  }

  onMounted(async () => {
    await checkCode.getCode();
    nextTick(() => {
      const canvasEl = document.querySelector(
        '#checkCode'
      ) as HTMLCanvasElement;

      drawCode(canvasEl, checkCode.code);
    });
  });

  const gotoRegist = ({
    values,
    errors,
  }: {
    values: Record<string, any>;
    errors: Record<string, ValidatedError> | undefined;
  }) => {
    if (!errors) {
      setLoading(true);
      const regdata: RegistData = {
        loginName: registUserInfo.loginName,
        password: registUserInfo.password,
        nickName: registUserInfo.nickName,
        checkCode: registUserInfo.checkCode,
        checkCodeId: checkCode.id,
      };

      userStore
        .regist(regdata)
        .then((data: RegistRes) => {
          Message.success('注册成功');
          emits('registed', data.loginName);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Message.error('注册失败');
    }
  };

  // 子暴露给父组件自己的方法， 父调用子方法
  // defineExpose({ getRegistInfo, gotoRegist });
</script>

<style lang="less" scoped>
  .checkCode {
    width: 120px;
    height: 40px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
  }
</style>
