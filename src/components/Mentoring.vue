<template>
  <section id="mentoring" class="mentoring section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Mentoring</h2>
      <p>Join our mentoring program to learn from the experts.</p>
    </div>

    <div class="container text-center">
      <button v-if="role === 'mentee'" class="btn-mentoring" @click="joinMentoring">멘토링 참여</button>
      <button v-else-if="role === 'mentor'" class="btn-mentoring" @click="openPopup">멘토링 방 생성</button>
      <button v-else-if="role === 'admin'" class="btn-mentoring" @click="openAdminPopup">멘토링 매칭</button>
    </div>

    <!-- Popup for creating mentoring room -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup">
        <h3>멘토링 방 생성</h3>
        <form @submit.prevent="createMentoringRoom">
          <div class="form-group">
            <label for="roomName">방 이름:</label>
            <input type="text" id="roomName" v-model="roomName" required>
          </div>
          <div class="form-group">
            <label for="description">설명:</label>
            <textarea id="description" v-model="description" required></textarea>
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
                  :disabled="selectedRoom && selectedRoom !== room"
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
import { ref } from 'vue';

const role = 'admin'; // 'mentee', 'mentor', 'admin'
const showPopup = ref(false);
const showAdminPopup = ref(false);
const roomName = ref('');
const description = ref('');
const mentorRooms = ref([{ name: "Room A" }, { name: "Room B" }, { name: "Room C" }]);
const mentees = ref([{ name: "Mentee 1" }, { name: "Mentee 2" }, { name: "Mentee 3" }]);
const selectedRoom = ref(null);
const selectedMentees = ref([]);

function openPopup() {
  showPopup.value = true;
}

function closePopup() {
  showPopup.value = false;
  roomName.value = '';
  description.value = '';
}

function openAdminPopup() {
  showAdminPopup.value = true;
}

function closeAdminPopup() {
  showAdminPopup.value = false;
  selectedRoom.value = null;
  selectedMentees.value = [];
}

function createMentoringRoom() {
  console.log('Mentoring room created with:', {
    roomName: roomName.value,
    description: description.value,
  });
  alert("멘토링 방이 생성되었습니다!");
  closePopup();
}

function matchMentees() {
  console.log('Matched', selectedMentees.value, 'to room', selectedRoom.value);
  alert(`${selectedMentees.value.length}명의 멘티를 ${selectedRoom.value.name} 방에 매칭하였습니다!`);
  closeAdminPopup();
}

function joinMentoring() {
  alert("멘토링에 참여하셨습니다!");
}

function manageMentoring() {
  alert("멘토링 매칭 관리 페이지로 이동");
}
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.popup h3 {
  margin-bottom: 20px;
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
