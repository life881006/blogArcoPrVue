import { defineStore } from 'pinia';
import { getCheckCode, CheckCode } from '@/api/user';

const checkCode = defineStore('checkCode', {
  state: (): CheckCode => ({
    id: '',
    code: '',
  }),
  getters: {
    getCheckCode(state: CheckCode): CheckCode {
      return { ...state };
    },
  },
  actions: {
    async getCode() {
      const res = await getCheckCode();

      this.$patch({ id: res.data.id, code: res.data.code });
    },
  },
});

export default checkCode;
