import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      host: 'localhost',
      port: '8081',
      fs: {
        strict: true,
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          ws: false, // 代理websockets
          changeOrigin: true, // 虚拟的站点需要更管origin
          rewrite: (path) => path.replace('/^api:/', ''),
        },
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);
