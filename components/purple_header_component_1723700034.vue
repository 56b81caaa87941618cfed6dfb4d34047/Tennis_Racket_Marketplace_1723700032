<template>
  <!-- Features list -->
  <div id="features-grid" style="min-height: 350px" class="grid md:grid-cols-3 gap-8 md:gap-12 bg-white p-5">
    <!-- Feature 1 -->
    <div id="feature-1">
      <div id="feature-1-header" class="flex items-center space-x-2 mb-1">
        <svg id="feature-1-icon" class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path 
            d="M7.999 2.34a4.733 4.733 0 0 0-6.604 6.778...398a1.04 1.04 0 0 0 1.756 0 2.724 2.724 0 0 1 5.122 1.294 2.7 2.7 0 0 1-.792 1.923Z" 
            :class="textFillStylePrimary"
          />
        </svg>
        <div class="flex" id="feature-1-title-container">
          <h4 id="feature-1-title" class="flex-1 font-medium" :class="textSecondaryStyle">Extensive Racket Selection</h4>
        </div>
      </div>
      <div class="flex" id="feature-1-description-container">
        <p id="feature-1-description" class="flex-1 text-sm" :class="textPrimaryStyle">Browse through a wide range of tennis rackets from top brands, ensuring you find the perfect match for your playing style.</p>
      </div>
    </div>
    <!-- Feature 1 Image -->
    <img src="https://raw.githubusercontent.com/56b81caaa87941618cfed6dfb4d34047/Tennis_Racket_Marketplace_1723700032/main/images/7ea6e5399dc247b5be3777d4c1bfd5a9.jpeg" alt="Extensive Racket Selection Image" class="my-image-class" />
    <!-- Repeat the above for feature 2 to 6 -->
  </div>
</template>

<script>
export default {
  name: "PurpleHeaderComponent",
  data() {
    return {
      expanded: false,
      tab: null,
      textFillStylePrimary: "fill-slate-300",
      textPrimaryStyle: "text-slate-400",
      textSecondaryStyle: "text-slate-50",
    };
  },
};
</script>

<style scoped>
/* Styles can be added here if needed */
</style>
