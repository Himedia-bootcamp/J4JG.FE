<template>
  <section id="mentoring" class="mentoring section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Mentoring</h2>
      <p>Join our mentoring program to learn from the experts.</p>
    </div>

    <div class="container text-center">
      <button v-if="role === 'mentee'" class="btn-mentoring" @click="joinMentoring">멘토링 참여</button>
      <button v-else-if="role === 'mentor'" class="btn-mentoring" @click="createMentoringRoom">멘토링 방 생성</button>
      <button v-else-if="role === 'admin'" class="btn-mentoring" @click="manageMentoring">멘토링 매칭</button>
    </div>
  </section>
</template>

<script setup lang="ts">

const role = 'mentee'; // 'mentee', 'mentor', 'admin'

function joinMentoring() {
  alert("멘토링에 참여하셨습니다!");
}

function createMentoringRoom() {
  alert("멘토링 방 생성하는 버튼"); // 팝업으로 형식 띄울까..
}

function manageMentoring() {
  alert("멘토링 매칭 관리 페이지로 이동"); // 마이페이지 자체를 없애고 버튼도 없애고 그냥 멘토링 리스트만 뿌려줄까.. 채용정보X, 마이페이지X
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
</style>