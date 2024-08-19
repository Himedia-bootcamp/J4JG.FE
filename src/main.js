import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import axios from 'axios';
import VueAxios from 'vue-axios';
import '@fortawesome/fontawesome-free/css/all.css';

// AOS 임포트
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // 자격 증명(쿠키 등) 포함
});

// Vue 애플리케이션에 Axios 인스턴스를 플러그인으로 추가
app.use(VueAxios, axiosInstance);

// 라우터 추가
app.use(router); 

// AOS 초기화
AOS.init({
  duration: 1000, // 애니메이션 지속 시간
  once: true, // 스크롤 시 한 번만 애니메이션 실행
});

app.mount('#app');
