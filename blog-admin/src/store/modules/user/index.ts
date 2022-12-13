import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  regist,
  checkExistUserName,
  LoginData,
  RegistData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
    name: undefined,
    nickName: undefined,
    photo: undefined,
    gender: undefined,
    birthday: undefined,
    phoneNumber: undefined,
    hobbies: undefined,
    friends: [],
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      partial.role = 'admin';
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      // const res = await getUserInfo();
      const user = JSON.parse(window.sessionStorage.getItem('user') || '');

      this.setInfo(user);
    },
    // 登录
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        const data = res?.data;

        setToken(data.token);
        window.sessionStorage.setItem('user', JSON.stringify(data));
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    // 注册
    async regist(registData: RegistData) {
      const res = await regist(registData);

      return res?.data;
    },
    // 检查注册名
    async checkExistUserName(loginName: string) {
      const res = await checkExistUserName(loginName);

      return res.data;
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout(this.id);
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
