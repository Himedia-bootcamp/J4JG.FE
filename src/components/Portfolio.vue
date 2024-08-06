
  <template>
    <section id="portfolio" class="portfolio section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur
          velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis
          commodi quidem hic quas.
        </p>
      </div>
  
      <div class="container">
        <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
          <ul class="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
            <li data-filter="*" class="filter-active">All</li>
            <li data-filter=".filter-app">App</li>
            <li data-filter=".filter-product">Card</li>
            <li data-filter=".filter-branding">Web</li>
          </ul>
  
          <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
            <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <img src="" class="img-fluid" alt="" />
              <div class="portfolio-info">
                <h4>App 1</h4>
                <p>Lorem ipsum, dolor sit</p>
                <a href="" title="App 1" data-gallery="portfolio-gallery-app" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                <a href="portfolio-details.html" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
              </div>
            </div>
            <!-- Repeat similar blocks for other portfolio items -->
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  @import "@/../assets/vendor/aos/aos.css";
  @import "@/../assets/vendor/glightbox/css/glightbox.min.css";
  @import "@/../assets/vendor/swiper/swiper-bundle.min.css";
  @import "@/../assets/css/main.css";
  </style>
  