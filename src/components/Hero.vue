<template>
  <section id="hero" class="hero section light-background">
    <img src="" alt="" />
    <div class="container" data-aos="zoom-out">
      <div class="row justify-content-center">
        <div class="col-lg-9">
          <h2>Main Test Text First</h2>
          <p>
            Why?? 왜 안바뀜?
            <span class="typed" data-typed-items="Designer, Developer, Freelancer, Photographer">Designer</span>
            <span class="typed-cursor typed-cursor--blink" aria-hidden="true"></span>
          </p>
          <div class="social-links">
            <a href="#"><i class="bi bi-twitter-x"></i></a>
            <a href="#"><i class="bi bi-facebook"></i></a>
            <a href="#"><i class="bi bi-instagram"></i></a>
            <a href="#"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

onMounted(() => {
  AOS.init({
    duration: 1000, // 애니메이션 지속 시간 (밀리초)
    once: true, // 애니메이션을 한 번만 실행
  });
});
</script>

<style scoped>
@import "@/../assets/vendor/aos/aos.css";
@import "@/../assets/css/main.css";
</style>
