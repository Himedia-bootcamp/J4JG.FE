import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import '@fortawesome/fontawesome-free/css/all.css';

// AOS 임포트
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);

app.use(router); 

// AOS 초기화
AOS.init({
  duration: 1000, // 애니메이션 지속 시간
  once: true, // 스크롤 시 한 번만 애니메이션 실행
});

app.mount('#app');
