<template>
  <!-- Features list -->
  <div id="features-grid" class="grid md:grid-cols-3 gap-8 md:gap-12 bg-white p-5">
    <!-- Feature -->
    <div id="feature-1">
      <div id="feature-1-header" class="flex items-center space-x-2 mb-1">
        <svg id="feature-1-icon" class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path 
            d="M7.999 2.34a4.733 4.733 0 0 0-6.604 6.778l5.904 5.762a1 1 0 0 0 1.4 0l5.915-5.77a4.733 4.733 0 0 0-6.615-6.77Zm5.208 5.348-5.208 5.079-5.2-5.07a2.734 2.734 0 0 1 3.867-3.864c.182.19.335.404.455.638a1.04 1.04 0 0 0 1.756 0 2.724 2.724 0 0 1 5.122 1.294 2.7 2.7 0 0 1-.792 1.923Z" 
            :class="textFillStylePrimary" 
          />
        </svg>
        <div class="flex" id="feature-1-title-container">
          <h4 id="feature-1-title" class="flex-1 font-medium" :class="textSecondaryStyle">
            Extensive Racket Selection
          </h4>
        </div>
      </div>
      <div class="flex" id="feature-1-description-container">
        <p id="feature-1-description" class="flex-1 text-sm" :class="textPrimaryStyle">
          Browse through a wide range of tennis rackets from top brands, ensuring you find the perfect match for your playing style.
        </p>
      </div>
    </div>
    <!-- Additional features are written similarly... -->
  </div>
</template>

<script>
export default {
  name: "PurpleFeatureGridComponent",
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
