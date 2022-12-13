import axios from 'axios';

export interface QueryBlogsData {
  userId: string;
  searchType?: string;
  keywords?: string;
  sortOrder?: number;
  publisher?: string;
  currentPage?: number;
  everyPage?: number;
}

export interface BlogAnnex {
  id: string;
  blogId?: string;
  name: string;
  url: string;
  type: string;
}

export interface Blog {
  id?: string;
  content?: string;
  title?: string;
  channelId?: string;
  channelName?: string;
  userId?: string;
  createTime?: string;
  readTimes?: number;
  commentNumber?: number;
  thumbUpNumber?: number;
  thumbDownNumber?: number;
  nickName?: string;
  annexes?: Array<BlogAnnex>;
  key?: string;
}

export interface QueryBlogsRes {
  total: number;
  results: Array<Blog>;
}

export interface Blogs {
  blogs?: Array<Blog>;
}

export function getBlogs(data: QueryBlogsData) {
  return axios.get<QueryBlogsRes>('/api/blog/getBlogs', { params: data });
}

export function addBlogs(data: Blog) {
  return axios.post<{ message: string }>('/api/blog/addBlog', data);
}

export function uploadImage(userId: string, file: File) {
  const form = new FormData();
  form.append('userId', userId);
  form.append('file', file);

  return axios.post('/api/upload', form);
}

export function getChannels(data: object) {
  return axios.get('/api/channel/getChannels', { params: data });
}
