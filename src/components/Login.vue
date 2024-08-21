<template>
  <section id="login" class="login section light-background">
    <div class="container" data-aos="zoom-out">
      <div class="row justify-content-center">
        <div class="col-lg-9 d-flex flex-column align-items-center text-center">
          <h2>로그인</h2>
          <p>로그인을 통해 다양한 서비스를 이용해보세요!</p>
          <div class="social-login-buttons">
            <button @click="loginWithKakao" class="btn btn-kakao">
              카카오 로그인
            </button>
            <button @click="loginWithNaver" class="btn btn-naver">
              네이버 로그인
            </button>
            <button @click="loginWithGoogle" class="btn btn-google">
              구글 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const router = useRouter();

// 사용자 정보 가져오는 함수
async function fetchUserInfo() {
  try {
    // 쿠키에서 accessToken을 가져옵니다.
    const accessToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('accessToken='))
      ?.split('=')[1];

    if (!accessToken) {
      console.error('accessToken이 없습니다. 로그인해주세요.');
      return;
    }

    console.log('사용 중인 accessToken:', accessToken); // 토큰 로그 확인



    // Authorization 헤더에 토큰을 추가하여 요청을 보냅니다.
    const response = await axios.get('http://api.gateway.j4jg.shop/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      withCredentials: true, // 쿠키를 포함해서 요청

    });


    console.log('response.headers: ', response.headers)

    console.log('사용자 정보:', response.data);
    sessionStorage.setItem('userInfo', JSON.stringify(response.data)); // 필요 시 세션에 저장
    router.push('/');  // 메인 페이지로 이동
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 인증 오류가 발생한 경우 (예: 토큰 만료 등)
      console.error('로그인이 필요합니다.');
    } else {

      console.error('사용자 정보를 가져오는 중 오류 발생:', error);
    }
    // 인증 오류 처리: 로그인 페이지로 리디렉션 또는 경고 메시지 표시
    router.push('/login');
  }
}

// 로그인 처리 함수들
const loginWithKakao = () => {
  window.location.href = 'http://api.gateway.j4jg.shop/oauth2/authorization/kakao';
};

const loginWithNaver = () => {
  alert('네이버 로그인을 지원하지 않습니다.');
};

const loginWithGoogle = () => {
  window.location.href = 'http://api.gateway.j4jg.shop/oauth2/authorization/google';
};

// onMounted는 컴포넌트가 마운트될 때 사용자 정보를 가져옵니다.
onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });

  // 사용자 정보 요청 (쿠키는 자동으로 전송됨)
  fetchUserInfo();
});
</script>

<style scoped>
@import "@/../assets/vendor/aos/aos.css";
@import "@/../assets/css/main.css";

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.social-login-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 300px;
}

.btn {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  text-align: center;
}

.btn-kakao {
  background-color: #fee500;
  color: #3c1e1e;
}

.btn-naver {
  background-color: #1ec800;
  color: white;
}

.btn-google {
  background-color: white;
  color: #4285f4;
  border: 1px solid #4285f4;
}
</style>
