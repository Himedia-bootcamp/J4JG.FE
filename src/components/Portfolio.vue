<template>
  <section id="mentoring" class="mentoring section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Mentoring</h2>
      <p>Join our mentoring program to learn from the experts.</p>
    </div>

    <div class="container text-center">
      <button class="btn-mentoring" @click="joinMentoring">멘토링 참여</button>
    </div>
  </section>
</template>

<script setup lang="ts">
function joinMentoring() {
  alert("멘토링에 참여하셨습니다!"); // 클릭 시 메시지를 표시합니다.
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