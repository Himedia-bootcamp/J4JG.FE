<template>
  <div>
    <Header />
    <main class="main">
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Resume />
      <Portfolio />
      <Services />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import About from './components/About.vue';
import Stats from './components/Stats.vue';
import Skills from './components/Skills.vue';
import Resume from './components/Resume.vue';
import Portfolio from './components/Portfolio.vue';
import Services from './components/Services.vue';
import Testimonials from './components/Testimonials.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';
</script>

<style>
/* 전역 스타일 또는 추가 스타일이 필요하다면 여기에 추가 */
@import "@/../assets/vendor/bootstrap/css/bootstrap.min.css";
@import "@/../assets/vendor/bootstrap-icons/bootstrap-icons.css";
@import "@/../assets/vendor/aos/aos.css";
@import "@/../assets/vendor/glightbox/css/glightbox.min.css";
@import "@/../assets/vendor/swiper/swiper-bundle.min.css";
@import "@/../assets/css/main.css";
</style>
