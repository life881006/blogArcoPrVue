import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  loginName: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export interface CheckCode {
  id: string;
  code: string;
}

export interface RegistData {
  loginName: string;
  password: string;
  nickName: string;
  checkCode: string;
  checkCodeId?: string;
}

export interface RegistRes {
  id: string;
  nickName: string;
  loginName: string;
}

export function login(data: LoginData) {
  return axios.get<LoginRes>('/api/user/login', { params: data });
}
export function regist(data: RegistData) {
  return axios.post<RegistRes>('/api/user/regist', data);
}
export function getCheckCode() {
  return axios.get<CheckCode>('/api/user/getCheckCode');
}
export function logout(userId: string) {
  return axios.get<LoginRes>('/api/user/logout', { params: { userId } });
}
export function checkExistUserName(loginName: string) {
  return axios.get<string>('/api/user/checkExistUserName', {
    params: { loginName },
  });
}
export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
