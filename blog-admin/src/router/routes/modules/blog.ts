import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const BLOG: AppRouteRecordRaw = {
  path: '/blog',
  name: 'blog',
  component: DEFAULT_LAYOUT,
  redirect: '/blog/blog_workplace',
  meta: {
    locale: 'menu.blog',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 1,
  },
  children: [
    {
      path: 'blog_workplace',
      name: 'blogWorkplace',
      component: () => import('@/views/blog/index.vue'),
      meta: {
        locale: 'menu.blog',
        requiresAuth: true,
        requireShow: true,
        roles: ['*'],
      },
    },
    {
      path: 'blog_add',
      name: 'blogAdd',
      component: () => import('@/views/blog/components/addBlog.vue'),
      meta: {
        locale: 'menu.blog.add',
        requiresAuth: true,
        requireShow: false,
        roles: ['*'],
      },
    },
  ],
};

export default BLOG;
