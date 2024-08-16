Vue.component("purple_header_component_1723700034", {
    template: `
  <!-- Features list -->
  <div id="features-grid" class="grid md:grid-cols-3 gap-8 md:gap-12 bg-white p-5">
    <!-- Feature 1 -->
    <div id="feature-1">
      <div id="feature-1-header" class="flex items-center space-x-2 mb-1">
        <svg id="feature-1-icon" class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path
            d="M7.999 2.34a4.733 4.733 0 0 0-6.604 6.778l5.904 5.762a1 1 0 0 0 1.4 0l5.915-5.77a4.733 4.733 0 0 0-6.615-6.77Zm5.208 5.348-5.208 5.079-5.2-5.07a2.734 2.734 0 0 1 3.867-3.864c.182.19.335.404.455.638a1.04 1.04 0 0 0 1.756 0 2.724 2.724 0 0 1 5.122 1.294 2.7 2.7 0 0 1-.792 1.923Z"
            :class="textFillStylePrimary"
          />
        </svg>
        <div class="flex" id="feature-1-title-container">
          <h4 id="feature-1-title" class="flex-1 font-medium" :class="textSecondaryStyle">Extensive Racket Selection</h4>
        </div>
      </div>
      <div class="flex" id="feature-1-description-container">
        <p id="feature-1-description" class="flex-1 text-sm" :class="textPrimaryStyle">
          Browse through a wide range of tennis rackets from top brands, ensuring you find the perfect match for your playing style.
        </p>
      </div>
    </div>

    <!-- Repeat the above block for feature 2 to 6, changing the id, title, description, and SVG as needed -->
    <!-- Feature 2 -->
    <div id="feature-2">
      <div id="feature-2-header" class="flex items-center space-x-2 mb-1">
        <svg id="feature-2-icon" class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path
            d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z"
            :class="textFillStylePrimary"
          />
        </svg>
        <div class="flex" id="feature-2-title-container">
          <h4 id="feature-2-title" class="flex-1 font-medium" :class="textSecondaryStyle">Expert Recommendations</h4>
        </div>
      </div>
      <div class="flex" id="feature-2-description-container">
        <p id="feature-2-description" class="flex-1 text-sm" :class="textPrimaryStyle">
          Receive personalized racket suggestions based on your skill level, playing frequency, and preferred court surface.
        </p>
      </div>
    </div>

    <!-- Continue for features 3 to 6 -->
  </div>
`,
data() {
    return {
      expanded: false,
      tab: null,
      textFillStylePrimary: "fill-slate-300",
      textPrimaryStyle: "text-slate-400",
      textSecondaryStyle: "text-slate-50",
    };
  },
});