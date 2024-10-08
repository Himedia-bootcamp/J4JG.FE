<template>
  <section id="services" class="services section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Job Listings</h2>
      <p>Here are some job opportunities you might be interested in.</p>
    </div>

    <div class="container">
      <div class="row gy-4">
        <div
          v-if="jobs.length > 0"
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
              @click.stop="scrapJob(job)"
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
              <strong>위치:</strong> {{ job.location }} <span v-if="job.district && job.district !== 'null'">{{ job.district }}</span>
            </p>
            <p><strong>Category:</strong> {{ categoryCodes[job.categoryCode] || 'Unknown Category' }}</p>
            <p><strong>기술 스택: </strong>
              <span v-for="(skillId, index) in job.skillTag" :key="index">
                {{ skillTags[skillId] || 'Unknown Skill' }}<span v-if="index < job.skillTag.length - 1">, </span>
              </span>
            </p>
            <p><strong>경력:</strong> {{ job.annualFrom }} - {{ job.annualTo }} years</p>
          </div>
        </div>
        <div v-else class="col-12">
          <p class="text-center">해당 페이지에 정보가 없습니다.</p>
        </div>
      </div>

      <div class="pagination">
        <button
          @click="prevPageGroup"
          :disabled="!currentPageGroup || currentPageGroup.start === 1"
        >
          &laquo;
        </button>
        <button
          v-for="page in currentPageGroupEnd"
          :key="page"
          @click="setPage(currentPageGroup.start + page - 1)"
          :class="{ active: currentPage === currentPageGroup.start + page - 1 }"
        >
          {{ currentPageGroup.start + page - 1 }}
        </button>
        <button
          @click="nextPageGroup"
          :disabled="!currentPageGroup || !hasMorePages"
        >
          &raquo;
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
          <p><strong>Location:</strong> {{ selectedJob.location }} <span v-if="selectedJob.district && selectedJob.district !== 'null'">{{ selectedJob.district }}</span></p>
          <p><strong>Category:</strong> {{ categoryCodes[selectedJob.categoryCode] || 'Unknown Category' }}</p>
          <p><strong>Skill Tags:</strong>
            <span v-for="(skillId, index) in selectedJob.skillTag" :key="index">
              {{ skillTags[skillId] || 'Unknown Skill' }}<span v-if="index < selectedJob.skillTag.length - 1">, </span>
            </span>
          </p>
          <p><strong>Attraction Tags:</strong>
            <span v-for="(tagId, index) in selectedJob.attractionTags" :key="index">
              {{ getTagNameById(tagId) }}<span v-if="index < selectedJob.attractionTags.length - 1">, </span>
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
          <button class="btn-go-to-job" @click="goToJob(selectedJob.id)">채용 정보로 이동</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { categoryCodes } from "@/data/categoryCodes.js";
import { skillTags } from "@/data/skillTags.js";
import { attractionTags } from "@/data/attractionTags.js"; // 여기에서 attractionTags를 import

export default {
  name: "Services",
  data() {
    return {
      categoryCodes,
      skillTags,
      attractionTags, // attractionTags 데이터를 data에 추가
      jobs: [],
      currentPage: 0, // 페이지는 0부터 시작
      itemsPerPage: 15,
      selectedJob: null,
      relatedNews: [],
      keyword: "",
      hasMorePages: true, // 더 많은 페이지가 있는지 여부
    };
  },
  computed: {
    totalPages() {
      return Math.ceil((this.currentPage + 1) * this.itemsPerPage / this.itemsPerPage);
    },
    currentPageGroup() {
      const start = Math.floor(this.currentPage / 10) * 10;
      const end = start + 9;
      return { start, end };
    },
    currentPageGroupEnd() {
      return this.currentPageGroup.end - this.currentPageGroup.start + 1;
    },
  },
  methods: {
    async fetchJobs() {
      try {
        console.log("Fetching jobs with keyword:", this.keyword, "at page:", this.currentPage);
        const response = await axios.get(`http://localhost:5001/jobInfo/search`);
        const fetchedJobs = response.data;

        if (fetchedJobs.length < this.itemsPerPage) {
          this.hasMorePages = false; // 마지막 페이지일 경우
        } else {
          this.hasMorePages = true;
        }

        if (fetchedJobs.length > 0) {
          this.jobs = fetchedJobs;
        } else {
          this.jobs = [];
        }

        console.log("Jobs fetched successfully:", fetchedJobs);
      } catch (error) {
        if (error.response) {
          console.error("Failed to fetch jobs - Response error:", error.response.data);
        } else if (error.request) {
          console.error("Failed to fetch jobs - No response received:", error.request);
        } else {
          console.error("Failed to fetch jobs - Error setting up request:", error.message);
        }
      }
    },
    async scrapJob(job) {
    const accessToken = this.getAccessToken();
    const userId = this.getUserIdFromToken(accessToken);

    try {
        if (job.isScrapped) {
            // 스크랩 취소 API 호출
            await axios.put('http://localhost:8000/backend/scrap', null, {
                params: { scrapId: job.scrapId },
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(`User ID: ${userId} has UNSCRAPPED job ID: ${job.id}`);
        } else {
            // 스크랩 API 호출
            await axios.post('http://localhost:8000/backend/scrap', null, {
                params: { jobInfoId: job.id },
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(`User ID: ${userId} has SCRAPPED job ID: ${job.id}`);
        }
        // 스크랩 상태 토글
        job.isScrapped = !job.isScrapped;
    } catch (error) {
        console.error('Scrap action failed:', error);
    }
},

    getAccessToken() {
        const accessToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('accessToken='))
          ?.split('=')[1];
        return accessToken || '';
    },

    getUserIdFromToken(token) {
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub; // 일반적으로 사용자 ID는 JWT의 "sub" 클레임에 포함됩니다.
    } catch (error) {
        console.error('Failed to extract user ID from token:', error);
        return null;
    }
},

    async fetchScrapList() {
        try {
            const response = await axios.get('http://localhost:5001/scrap', {
                headers: {
                    'Authorization': `Bearer ${this.getAccessToken()}`
                },
                params: {
                    page: 0 // 원하는 페이지를 전달할 수 있습니다.
                }
            });
            console.log('Scrap list:', response.data);
        } catch (error) {
            console.error('Failed to fetch scrap list:', error);
        }
    },

    async initializeScrapStatus() {
        try {
            const response = await axios.get('http://localhost:5001/scrap', {
                headers: {
                    'Authorization': `Bearer ${this.getAccessToken()}`
                },
                params: {
                    page: 0 // 기본 페이지를 사용
                }
            });
            const scrapList = response.data.content;
            this.jobs.forEach(job => {
                const scrapItem = scrapList.find(scrap => scrap.jobInfoId === job.id);
                if (scrapItem) {
                    job.isScrapped = true;
                    job.scrapId = scrapItem.scrapId; // 취소할 때 사용
                } else {
                    job.isScrapped = false;
                }
            });
        } catch (error) {
            console.error('Failed to initialize scrap status:', error);
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
      const url = `https://www.wanted.co.kr/wd/${jobId}`;
      window.open(url, "_blank");
    },
    fetchRelatedNews(companyId) {
      // 실제 API 호출을 통한 뉴스 데이터 가져오기 로직 추가 필요
      this.relatedNews = [
        { title: "News 1", url: "https://news.example.com/1" },
        { title: "News 2", url: "https://news.example.com/2" },
      ];
    },
    setPage(page) {
      this.currentPage = page;
      this.fetchJobs(); // 페이지를 변경할 때마다 데이터를 다시 가져옴
    },
    prevPageGroup() {
      if (this.currentPageGroup && this.currentPageGroup.start > 0) {
        this.setPage(this.currentPageGroup.start - 1);
      }
    },
    nextPageGroup() {
      if (this.hasMorePages) {
        this.setPage(this.currentPageGroup.end + 1);
      }
    },
    getTagNameById(tagId) {
        let tagName = 'Unknown Tag';
    
        // popular_tags에서 찾기
        console.log('Checking popular_tags:', this.attractionTags.popular_tags);
        const popularTag = this.attractionTags.popular_tags.find(tag => tag.id === tagId);
        if (popularTag) {
            tagName = popularTag.name;
            console.log(`Found in popular_tags: ${tagName}`);
        } else {
            // data 내의 tag_types에서 찾기
            console.log('Checking data:', this.attractionTags.data);
            this.attractionTags.data.forEach(category => {
                const foundTag = category.tag_types.find(tag => tag.id === tagId);
                if (foundTag) {
                    tagName = foundTag.name;
                    console.log(`Found in tag_types: ${tagName}`);
                }
            });
        }
    
        console.log(`Final tagName for id ${tagId}: ${tagName}`);
        return tagName;
    }
  },
  mounted() {
    this.fetchJobs(); // 컴포넌트가 마운트되면 채용 정보를 가져옴
    this.initializeScrapStatus(); // 스크랩 상태 초기화
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
  height: 100%; /* 아이템 높이를 통일 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.icon img {
  margin-bottom: 10px; /* 로고와 텍스트 사이의 간격 조정 */
  align-self: center; /* 이미지를 가운데 정렬 */
}

/* 5개씩 한 줄에 배치 */
@media (min-width: 992px) {
  .col-lg-4 {
    flex: 0 0 auto;
    width: 20%; /* 5개씩 한 줄에 배치 */
  }
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

.pagination button:disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
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

.btn-go-to-job {
  background-color: #007BFF; /* 버튼 배경색 */
  color: #fff; /* 텍스트 색상 */
  padding: 10px 20px; /* 내부 여백 */
  font-size: 1em; /* 글자 크기 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 모서리 둥글게 */
  cursor: pointer; /* 마우스 포인터 변경 */
  transition: background-color 0.3s ease; /* 배경색 변경 시 애니메이션 */
}

.btn-go-to-job:hover {
  background-color: #0056b3; /* 마우스 오버 시 배경색 */
}

/* 모달의 기존 스타일 */
.modal-footer {
  text-align: right;
  padding-top: 20px;
}

.modal-footer .btn-go-to-job {
  margin-left: auto;
}
</style>
