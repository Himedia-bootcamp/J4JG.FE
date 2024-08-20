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
      proxy: {
        '/oauth2': {
          target: 'http://localhost:8000',  // 백엔드 서버 주소
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/oauth2/, ''), // '/oauth2'를 경로에서 제거
        },
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          // 경로 재작성 (필요할 경우만 사용)
          // 만약 백엔드에서 '/api' 경로를 처리하도록 설정되어 있다면, 아래 줄을 주석 처리합니다.
          // rewrite: (path) => path.replace(/^\/api/, ''), 
        }
      },
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
