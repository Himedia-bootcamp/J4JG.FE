<template>
  <section id="services" class="services section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Job Listings</h2>
      <p>Here are some job opportunities you might be interested in.</p>
    </div>

    <div class="container">
      <div class="row gy-4">
        <div
          v-for="job in jobs"
          :key="job.id"
          class="col-lg-4 col-md-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="service-item item-cyan position-relative">
            <!-- 스크랩 버튼 -->
            <button
              class="scrap-button"
              @click.stop="scrapJob(job.id)"
            >
              <i
                :class="[
                  'bi',
                  job.isScrapped ? 'bi-bookmark-fill' : 'bi-bookmark'
                ]"
                :style="{ color: job.isScrapped ? '#000' : '#333' }"
              ></i>
            </button>

            <div class="icon">
              <img
                :src="job.companyImg"
                alt="Company Logo"
                style="width: 100px; height: 100px"
              />
            </div>
            <a href="#" class="stretched-link">
              <h3>{{ job.companyName }}</h3>
            </a>
            <p><strong class="job-title">{{ job.position }}</strong></p>
            <p>
              <strong>위치:</strong> {{ job.location }}  {{ job.district ? ' ' + job.district : '' }}
            </p>
            <p><strong>Category:</strong> {{ categoryCodes[job.categoryCode] }}</p>
            <p><strong>기술스택: </strong>
              <span v-for="(skillId, index) in job.skillTag" :key="index">
                {{ skillTags[skillId] || 'Unknown Skill' }}<span v-if="index < job.skillTag.length - 1">, </span>
              </span>
            </p>
            <p><strong>경력:</strong> {{ job.annualFrom }} - {{ job.annualTo }} years</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { categoryCodes } from "@/data/categoryCodes.js";
import { skillTags } from "@/data/skillTags.js";

export default {
  name: "Services",
  data() {
    return {
      categoryCodes,
      skillTags,
      jobs: [
        {
          id: 228347,
          companyId: 48734,
          companyName: "와이피아이디어스컨설팅",
          companyImg:
            "https://static.wanted.co.kr/images/company/48734/nmrx6ne3hrzyhz9l__400_400.jpg",
          companyAvgRate: "0.0",
          companyLvl: "very_low",
          location: "서울",
          district: null,
          position: "개발자 CTO 혹은 기술 총괄 팀장 (근무지: 말레이시아)",
          categoryCode: 872,
          attractionTags: [10433, 10426, 10468, 10437],
          skillTag: [1554, 3078, 1698], // 예시 데이터
          annualFrom: 5,
          annualTo: 15,
          newbie: false,
          isScrapped: false,
        },
        {
          id: 223111,
          companyId: 5072,
          companyName: "크로커스",
          companyImg:
            "https://static.wanted.co.kr/images/company/5072/tdubbanprxbumqth__400_400.png",
          companyAvgRate: "0.0",
          companyLvl: "very_low",
          location: "서울",
          district: "강남구",
          position: "프론트엔드 개발 엔지니어 (React, Flutter)",
          categoryCode: 873,
          attractionTags: [10402, 10468, 10408, 10440, 10413, 10426],
          skillTag: [1469, 1539, 1541],
          annualFrom: 2,
          annualTo: 5,
          newbie: false,
          isScrapped: false,
        },
        {
          id: 174977,
          companyId: 521,
          companyName: "크래프톤(Krafton)",
          companyImg:
            "https://static.wanted.co.kr/images/company/521/27csffd2ls7lkpeo__400_400.jpg",
          companyAvgRate: "0.0",
          companyLvl: "very_low",
          location: "서울",
          district: "강남구",
          position: "[Infra Div.] Publishing DevOps (3년 이상)",
          categoryCode: 674,
          attractionTags: [
            10433, 10468, 10437, 10405, 10409, 10443, 10447, 10417, 10420,
            10422, 10423, 10424, 10425, 10486, 10396, 10462, 10430,
          ],
          skillTag: [1698, 1459, 2217],
          annualFrom: 3,
          annualTo: 10,
          newbie: false,
          isScrapped: false,
        },
      ],
    };
  },
  methods: {
    scrapJob(jobId) {
      const job = this.jobs.find((j) => j.id === jobId);
      if (job) {
        job.isScrapped = !job.isScrapped; // 스크랩 상태를 토글합니다.
        console.log(
          `Job ${jobId} has been ${job.isScrapped ? "scrapped" : "unscrapped"}!`
        );
      }
    },
  },
};
</script>

<style scoped>

.job-title {
  font-size: 1.3em; /* 글자 크기를 키웁니다 */
  font-weight: bold; /* 텍스트를 굵게 표시합니다 */
  margin-bottom: 10px; /* 아래 여백을 추가합니다 */
}

.job-title {
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 10px;
}

.scrap-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  transition: color 0.3s;
  z-index: 10;
}

.scrap-button:hover {
  color: #007BFF;
}

.service-item {
  position: relative;
  padding: 20px;
  border-radius: 8px;
  background: #f5f5f5;
}

</style>
