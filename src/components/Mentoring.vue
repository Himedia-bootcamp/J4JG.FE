<template>
  <section id="mentoring" class="mentoring section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Mentoring</h2>
      <p>Join our mentoring program to learn from the experts.</p>
    </div>

    <div class="container text-center">
      <button v-if="role === 'ROLE_MENTEE'" class="btn-mentoring" @click="applyForMentoring">멘토링 참여</button>
      <button v-else-if="role === 'ROLE_MENTOR'" class="btn-mentoring" @click="openPopup">멘토링 방 생성</button>
      <button v-else-if="role === 'ROLE_ADMIN'" class="btn-mentoring" @click="openAdminPopup">멘토링 매칭</button>
      <button v-else-if="role === 'ROLE_UNKNOWN'" class="btn-mentoring" @click="notifyUnknownRole">인증하기</button>
    </div>

    <!-- Popup for creating mentoring room -->
<div v-if="showPopup" class="popup-overlay">
  <div class="popup">
    <h3>멘토링 방 생성</h3>
    <form @submit.prevent="createMentoringRoom">
      <div class="form-group">
        <label for="title">방 제목:</label>
        <input type="text" id="title" v-model="title" required>
      </div>
      <div class="form-group">
        <label for="userName">멘토 이름:</label>
        <input type="text" id="userName" v-model="userName" required>
      </div>
      <div class="form-group">
        <label for="description">설명:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="startDate">시작 날짜:</label>
        <input type="date" id="startDate" v-model="startDate" required>
      </div>
      <div class="form-group">
        <label for="endDate">종료 날짜:</label>
        <input type="date" id="endDate" v-model="endDate" required>
      </div>
      <div class="form-group">
        <label for="level">수준:</label>
        <select id="level" v-model="level" required>
          <option value="초급">초급</option>
          <option value="중급">중급</option>
          <option value="상급">상급</option>
        </select>
      </div>
      <div class="form-group">
        <label for="point">포인트:</label>
        <input type="number" id="point" v-model="point" required>
      </div>
      <div class="form-group">
        <label for="skillStack">기술 스택:</label>
        <input type="text" id="skillStack" v-model="skillStack" placeholder="쉼표로 구분하여 입력하세요" required>
      </div>
      <div class="form-group">
        <label for="week">요일:</label>
        <input type="text" id="week" v-model="week" placeholder="쉼표로 구분하여 입력하세요" required>
      </div>
      <div class="form-group">
        <label for="type">형태:</label>
        <select id="type" v-model="type" required>
          <option value="one">개별</option>
          <option value="team">팀</option>
          <option value="any">모두</option>
        </select>
      </div>
      <div class="form-group">
        <label for="maxPerson">최대 인원수:</label>
        <input type="number" id="maxPerson" v-model="maxPerson" required>
      </div>
      <div class="popup-actions">
        <button type="submit" class="btn-mentoring">등록</button>
        <button type="button" class="btn-mentoring" @click="closePopup">취소</button>
      </div>
    </form>
  </div>
</div>
    <!-- Popup for admin matching -->
    <div v-if="showAdminPopup" class="popup-overlay">
      <div class="popup admin-popup">
        <h3>멘토링 매칭</h3>
        <div class="matching-container">
          <div class="mentor-rooms">
            <h4>멘토링 방 리스트</h4>
            <ul>
              <li v-for="(room, index) in mentorRooms" :key="index">
                <input 
                  type="radio" 
                  :id="'room-' + index" 
                  :value="room" 
                  v-model="selectedRoom" 
                  @change="onRoomChange"
                >
                <label :for="'room-' + index">{{ room.name }}</label>
              </li>
            </ul>
          </div>
          <div class="mentee-list">
            <h4>멘티 리스트</h4>
            <ul>
              <li v-for="(mentee, index) in mentees" :key="index">
                <input 
                  type="checkbox" 
                  :id="'mentee-' + index" 
                  :value="mentee" 
                  v-model="selectedMentees" 
                  :disabled="!selectedRoom"
                >
                <label :for="'mentee-' + index">{{ mentee.name }}</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="popup-actions">
          <button type="button" class="btn-mentoring" @click="matchMentees" :disabled="!selectedRoom || selectedMentees.length === 0">매칭</button>
          <button type="button" class="btn-mentoring" @click="closeAdminPopup">취소</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const role = ref('ROLE_MENTOR'); // 초기 역할은 'ROLE_UNKNOWN'
const showPopup = ref(false);
const showAdminPopup = ref(false);
const roomName = ref('');
const description = ref('');
const mentorRooms = ref([{ name: "Room A" }, { name: "Room B" }, { name: "Room C" }]);
const mentees = ref([{ name: "Mentee 1" }, { name: "Mentee 2" }, { name: "Mentee 3" }]);
const selectedRoom = ref(null);
const selectedMentees = ref([]);
const router = useRouter();
const token = ref('');

const title = ref('');
const userName = ref('');
const startDate = ref('');
const endDate = ref('');
const level = ref('초급');
const point = ref(0);
const skillStack = ref('');
const week = ref('');
const type = ref('one');
const maxPerson = ref(1);


function openPopup() {
  showPopup.value = true;
}

function closePopup() {
  showPopup.value = false;
  roomName.value = '';
  description.value = '';
}

function openAdminPopup() {
  fetchMenteeApplications(); // 관리자가 팝업을 열 때 멘티 신청 목록을 불러옴
  showAdminPopup.value = true;
}

function closeAdminPopup() {
  showAdminPopup.value = false;
  selectedRoom.value = null;
  selectedMentees.value = [];
}

function onRoomChange() {
  selectedMentees.value = [];
}

async function createMentoringRoom() {
  const mentoringRoomData = {
    userId: 1,  // 실제 사용자 ID로 교체해야 합니다
    userName: userName.value,
    description: description.value,
    title: title.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startDate: startDate.value,
    endDate: endDate.value,
    level: level.value,
    point: point.value,
    skillStack: skillStack.value.split(',').map(skill => skill.trim()), // 쉼표로 구분된 문자열을 배열로 변환
    week: week.value.split(',').map(day => day.trim()), // 쉼표로 구분된 문자열을 배열로 변환
    type: type.value,
    maxPerson: maxPerson.value,
    currentPerson: 0,
    status: true
  };

  try {
    const response = await axios.post('http://localhost:8000/backend/mentoring', mentoringRoomData, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
    });
    alert('멘토링 방이 생성되었습니다!');
    closePopup();
  } catch (error) {
    console.error('멘토링 방 생성 중 오류 발생:', error);
    alert('멘토링 방 생성에 실패했습니다.');
  }
}

function matchMentees() {
  console.log('Matched', selectedMentees.value, 'to room', selectedRoom.value);
  alert(`${selectedMentees.value.length}명의 멘티를 ${selectedRoom.value.name} 방에 매칭하였습니다!`);
  closeAdminPopup();
}

function notifyUnknownRole() {
  alert('휴대전화 인증을 통해 정식회원이 되어 멘토링 서비스를 이용해보세요');
}

// 멘티가 멘토링 신청
async function applyForMentoring() {
  console.log(getAccessToken)

  const token = await getAccessToken();
  try {
    const response = await axios.post('http://localhost:8000/backend/application', null, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    alert(response.data); // 서버에서 반환된 신청 결과 메시지를 표시
  } catch (error) {
    console.error('멘토링 신청 중 오류 발생:', error);
    alert('멘토링 신청에 실패했습니다.');
  }
}

// 관리자가 멘티 신청 목록 조회
async function fetchMenteeApplications() {
  try {
    const response = await axios.get('http://localhost:8000/backend/application', {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
      },
      params: {
        page: 0, // 기본 페이지를 사용
      },
    });

    // 응답 데이터를 기반으로 mentees 목록 업데이트
    const applications = response.data.content;
    mentees.value = applications.map(app => ({
      name: app.userName,
      applicationId: app.applicationId,
    }));
  } catch (error) {
    console.error('멘티 신청 목록 조회 중 오류 발생:', error);
  }
}

// 사용자 정보 가져오는 함수
async function fetchUserInfo() {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      console.error('accessToken이 없습니다. 로그인해주세요.');
      router.push('/');
      return;
    }

    const response = await axios.get('http://localhost:8000/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    const data = response.data;
    role.value = data.role || 'ROLE_UNKNOWN';

  } catch (error) {
    console.error('사용자 정보를 가져오는 중 오류 발생:', error);
    router.push('/');
  }
}

// 액세스 토큰을 가져오는 함수
// function getAccessToken() {
//   return document.cookie
//     .split('; ')
//     .find(row => row.startsWith('accessToken='))
//     ?.split('=')[1] || '';
// }

// async function getAccessToken() {
//   try {
//     const response = await axios.get('http://localhost:5001/sample/createJwt', {
//       params: {
//         userId: 1,
//         role: "ROLE_MENTEE",
//       },
//     });
//     token.value = response.data; // 반환된 JWT 토큰을 변수에 저장
//   } catch (error) {
//     console.error('JWT 토큰 생성 중 오류 발생:', error);
//   }
// }

onMounted(() => {
  fetchUserInfo();
});
</script>

<style scoped>
.mentoring {
  padding: 60px 0;
}

.section-title h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
}

.section-title p {
  font-size: 1.2em;
  color: #777;
}

.btn-mentoring {
  background-color: #007BFF;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-mentoring:hover {
  background-color: #0056b3;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 80%;
  max-height: 80vh; /* 최대 높이 설정 */
  overflow-y: auto; /* 내용이 길어지면 스크롤 표시 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.popup h3 {
  margin-bottom: 15px; 
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.popup-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.admin-popup {
  width: 600px;
  display: flex;
  flex-direction: column;
}

.matching-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.mentor-rooms, .mentee-list {
  width: 45%;
}

.mentor-rooms ul, .mentee-list ul {
  list-style-type: none;
  padding: 0;
}

.mentor-rooms li, .mentee-list li {
  margin-bottom: 10px;
}
</style>
