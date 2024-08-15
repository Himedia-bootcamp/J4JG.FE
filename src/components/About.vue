<template>
  <section id="about" class="about section">
    <div class="container section-title" data-aos="fade-up">
      <h2>My Page</h2>
      <p>
        유저 프로필 이미지는 혹시나 해서.. 일단 기본 이미지로 넣는것도 괜찮
      </p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row gy-4 justify-content-center">
        <div class="col-lg-4">
          <img src="" class="img-fluid" alt="Profile Picture" />
        </div>
        <div class="col-lg-8 content">
          <h2>User Information</h2>
          <p class="fst-italic py-3">
            유저 기본 정보가 들어갈 자리 아래
          </p>
          <div class="row">
            <div class="col-lg-6">
              <ul>
                <li><i class="bi bi-chevron-right"></i> <strong>Nickname:</strong> <span>{{ userNickname }}</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>Name:</strong> <span>{{ userName }}</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>Email:</strong> <span>{{ userEmail }}</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>Provider:</strong> <span>{{ provider }}</span></li>
              </ul>
            </div>
            <div class="col-lg-6">
              <ul>
                <li><i class="bi bi-chevron-right"></i> <strong>Phone Number:</strong> <span>{{ userPhoneNumber }}</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>Role:</strong> <span>{{ role }}</span></li>
              </ul>
            </div>
          </div>
          <p class="py-3">
            여기서 아래에 스크랩 리스트나 이런걸 추가하는게 좋겠죠?
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

const userNickname = '';  
const userName = '';      
const userEmail = '';     
const provider = '';      
const userPhoneNumber = ''; 
const role = '';          // 백엔드랑 연동ㄷ할 스크립트 생성 필요
</script>

<style scoped>
@import "@/../assets/vendor/aos/aos.css";
@import "@/../assets/css/main.css";
</style>
