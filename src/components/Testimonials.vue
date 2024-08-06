<template>
    <section id="testimonials" class="testimonials section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>
  
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="swiper init-swiper" data-swiper-config='{"loop": true, "speed": 600, "autoplay": {"delay": 5000}, "slidesPerView": "auto", "pagination": {"el": ".swiper-pagination", "type": "bullets", "clickable": true}}'>
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="testimonial-item">
                <div class="row gy-4 justify-content-center">
                  <div class="col-lg-6">
                    <div class="testimonial-content">
                      <p>
                        <i class="bi bi-quote quote-icon-left"></i>
                        <span>Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.</span>
                        <i class="bi bi-quote quote-icon-right"></i>
                      </p>
                      <h3>Saul Goodman</h3>
                      <h4>Ceo &amp; Founder</h4>
                      <div class="stars">
                        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 text-center">
                    <img src="" class="img-fluid testimonial-img" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Repeat similar blocks for other testimonial items -->
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import Swiper from 'swiper';
  import { Navigation, Pagination, Autoplay } from 'swiper/modules';
  
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/autoplay';
  
  onMounted(() => {
    new Swiper('.swiper.init-swiper', {
      modules: [Navigation, Pagination, Autoplay],
      direction: 'horizontal',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  });
  </script>
  
  <style scoped>
  @import "@/../assets/vendor/aos/aos.css";
  @import "@/../assets/vendor/swiper/swiper-bundle.min.css";
  @import "@/../assets/css/main.css";
  </style>
  