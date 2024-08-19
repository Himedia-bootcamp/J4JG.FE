<template>
  <section id="services" class="services section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Job Listings</h2>
      <p>Here are some job opportunities you might be interested in.</p>
    </div>

    <div class="container">
      <div class="row gy-4">
        <div
          v-for="job in paginatedJobs"
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
            <a href="#" class="stretched-link" @click.prevent="openModal(job)">
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

      <div class="pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedJob" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="closeModal">&times;</span>
        <div class="modal-header">
          <h3>{{ selectedJob.companyName }}</h3>
          <img :src="selectedJob.companyImg" alt="Company Logo" />
        </div>
        <div class="modal-body">
          <p><strong>Position:</strong> {{ selectedJob.position }}</p>
          <p><strong>Location:</strong> {{ selectedJob.location }} {{ selectedJob.district }}</p>
          <p><strong>Category:</strong> {{ categoryCodes[selectedJob.categoryCode] }}</p>
          <p><strong>Skill Tags:</strong>
            <span v-for="(skillId, index) in selectedJob.skillTag" :key="index">
              {{ skillTags[skillId] || 'Unknown Skill' }}<span v-if="index < selectedJob.skillTag.length - 1">, </span>
            </span>
          </p>
          <p><strong>Experience:</strong> {{ selectedJob.annualFrom }} - {{ selectedJob.annualTo }} years</p>
          <!-- Company-related news placeholder -->
          <div class="company-news">
            <h4>Related News</h4>
            <!-- Add logic to fetch and display news related to the company -->
            <ul>
              <li v-for="(news, index) in relatedNews" :key="index">
                <a :href="news.url" target="_blank">{{ news.title }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="goToJob(selectedJob.id)">채용 정보로 이동</button>
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
          companyName: "YP Ideas Consulting",
          companyImg:
            "https://static.wanted.co.kr/images/company/48734/nmrx6ne3hrzyhz9l__400_400.jpg",
          companyAvgRate: "0.0",
          companyLvl: "very_low",
          location: "Seoul",
          district: null,
          position: "CTO or Technical Lead (Location: Malaysia)",
          categoryCode: 872,
          attractionTags: [10433, 10426, 10468, 10437],
          skillTag: [1554, 3078, 1698],
          annualFrom: 5,
          annualTo: 15,
          newbie: false,
          isScrapped: false,
        },
        {
          id: 223111,
          companyId: 5072,
          companyName: "Crocus",
          companyImg:
            "https://static.wanted.co.kr/images/company/5072/tdubbanprxbumqth__400_400.png",
          companyAvgRate: "0.0",
          companyLvl: "very_low",
          location: "Seoul",
          district: "Gangnam-gu",
          position: "Frontend Developer (React, Flutter)",
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
          companyName: "Krafton",
          companyImg:
            "https://static.wanted.co.kr/images/company/521/27csffd2ls7lkpeo__400_400.jpg",
          companyAvgRate: "0.0",
          companyLvl: "very_low",
          location: "Seoul",
          district: "Gangnam-gu",
          position: "[Infra Div.] Publishing DevOps (3+ years)",
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
        // Add more jobs here as needed
      ],
      currentPage: 1,
      itemsPerPage: 15,
      selectedJob: null, // 모달에 표시할 선택된 job
      relatedNews: [],   // 관련 뉴스 목록
    };
  },
  computed: {
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.jobs.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.jobs.length / this.itemsPerPage);
    },
  },
  methods: {
    scrapJob(jobId) {
      const job = this.jobs.find((j) => j.id === jobId);
      if (job) {
        job.isScrapped = !job.isScrapped;
        console.log(
          `Job ${jobId} has been ${job.isScrapped ? "scrapped" : "unscrapped"}!`
        );
      }
    },
    openModal(job) {
      this.selectedJob = job;
      this.fetchRelatedNews(job.companyId); // 회사와 관련된 뉴스를 가져오는 함수
    },
    closeModal() {
      this.selectedJob = null;
      this.relatedNews = []; // 모달 닫을 때 뉴스도 초기화
    },
    goToJob(jobId) {
      // 채용 정보로 이동하는 로직 (예: 외부 링크로 이동)
      const url = `/jobs/${jobId}`;
      window.open(url, "_blank");
    },
    fetchRelatedNews(companyId) {
      // 실제 API 호출을 통한 뉴스 데이터 가져오기 로직 추가 필요
      this.relatedNews = [
        // 여기에 실제 데이터가 추가되어야 함
        { title: "News 1", url: "https://news.example.com/1" },
        { title: "News 2", url: "https://news.example.com/2" },
      ];
    },
  },
};
</script>

<style scoped>
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.pagination button.active {
  background-color: #0056b3;
}

.pagination button:hover {
  background-color: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 충분히 높은 z-index 값을 설정 */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  position: relative;
  z-index: 1001; /* 오버레이보다 위에 오도록 설정 */
}

.modal-header img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5em;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  text-align: right;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  z-index: 1002; /* 모달 컨텐츠 위에 오도록 설정 */
}

.company-news ul {
  list-style-type: none;
  padding: 0;
}

.company-news ul li {
  margin-bottom: 5px;
}

.company-news ul li a {
  color: #007bff;
  text-decoration: none;
}

.company-news ul li a:hover {
  text-decoration: underline;
}
</style>