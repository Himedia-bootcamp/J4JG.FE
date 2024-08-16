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
import AOS from 'aos';
import 'aos/dist/aos.css';

const router = useRouter();

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
});

const loginWithKakao = () => {
  window.location.href = "https://kauth.kakao.com/oauth/authorize?...";
  router.push('/');
};

const loginWithNaver = () => {
  window.location.href = "https://nid.naver.com/oauth2.0/authorize?...";
  router.push('/');
};

const loginWithGoogle = () => {
  window.location.href = "https://accounts.google.com/o/oauth2/auth?...";
  router.push('/');
};
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
