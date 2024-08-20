<template>
  <section id="about" class="about section">
    <div class="container section-title" data-aos="fade-up">
      <h2>My Page</h2>
      
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row gy-4 justify-content-center">
        <div class="col-lg-4 d-flex justify-content-center"> <!-- 가운데 정렬을 위해 d-flex와 justify-content-center 추가 -->
          <img :src="profileImage" class="img-fluid profile-img" alt="Profile Picture" />
        </div>
        <div class="col-lg-8 content">
          <h2>User Information</h2>
          <p class="fst-italic py-3">
            
          </p>
          <div class="row">
            <div class="col-lg-6">
              <ul>
                <li><i class="bi bi-chevron-right"></i> <strong>Nickname:</strong> <span>{{ userNickname || 'N/A' }}</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>Name:</strong> <span>{{ userName || 'N/A' }}</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>Email:</strong> <span>{{ userEmail || 'N/A' }}</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>Provider:</strong> <span>{{ provider || 'N/A' }}</span></li>
              </ul>
            </div>
            <div class="col-lg-6">
              <ul>
                <li><i class="bi bi-chevron-right"></i> <strong>Phone Number:</strong> <span>{{ userPhoneNumber || 'N/A' }}</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>Role:</strong> <span>{{ role || 'N/A' }}</span></li>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const router = useRouter();

// 사용자 정보 상태 변수
const userNickname = ref('');
const userName = ref('');
const userEmail = ref('');
const provider = ref('');
const userPhoneNumber = ref('');
const role = ref('');
const defaultImage = 'assets/img/user_profile_unknown.png'; // 기본 이미지 경로
const profileImage = ref(defaultImage); // 기본 이미지로 초기화

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
      router.push('/login'); // 로그인 페이지로 리디렉션
      return;
    }

    console.log('사용 중인 accessToken:', accessToken); // 토큰 로그 확인

    // Authorization 헤더에 토큰을 추가하여 요청을 보냅니다.
    const response = await axios.get('http://localhost:8000/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      withCredentials: true, // 쿠키를 포함해서 요청
    });

    console.log('response.headers: ', response.headers);

    console.log('사용자 정보:', response.data);
    const data = response.data;

    // 받아온 사용자 정보를 상태 변수에 저장합니다.
    userNickname.value = data.nickname || '';
    userName.value = data.name || '';
    userEmail.value = data.userEmail || '';
    provider.value = data.provider || '';
    userPhoneNumber.value = data.userPhoneNumber || '';
    role.value = data.role || '';

    // 프로필 이미지가 있으면 설정, 없으면 기본 이미지 사용
    profileImage.value = data.profileImage || defaultImage;

  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 인증 오류가 발생한 경우 (예: 토큰 만료 등)
      console.error('로그인이 필요합니다.');
      router.push('/login'); // 로그인 페이지로 리디렉션
    } else {
      console.error('사용자 정보를 가져오는 중 오류 발생:', error);
    }
  }
}

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

.profile-img {
  height: 50%;
  display: block;
  margin: 0 auto; /* 가운데 정렬 */
  margin-top: 20%;
}
</style>
