import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const isProduction = mode === 'production';

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5173,
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProduction, // 프로덕션 환경에서는 소스맵 비활성화, 개발 환경에서는 활성화
    },
    define: {
      'process.env': {
        VITE_APP_BACKEND_URL: env.VITE_APP_BACKEND_URL
      }
    }
  }
});
