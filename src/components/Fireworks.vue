<template>
  <canvas ref="fireworksCanvas" :width="width" :height="height"></canvas>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';

const props = defineProps({
  trigger: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 300
  },
  height: {
    type: Number,
    default: 600
  },
  duration: {
    type: Number,
    default: 1500
  },
  particleCount: {
    type: Number,
    default: 100
  },
  colors: {
    type: Array,
    default: () => ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
  }
});

const fireworksCanvas = ref(null);
let ctx;
let particles = [];
let animationId = null;

onMounted(() => {
  ctx = fireworksCanvas.value.getContext('2d');
});

watch(() => props.trigger, (newValue) => {
  if (newValue) {
    createFireworks();
  }
});

function createFireworks() {
  const centerX = props.width / 2;
  const centerY = props.height / 2;

  particles = [];
  for (let i = 0; i < props.particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1;
    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 2 + 1,
      color: props.colors[Math.floor(Math.random() * props.colors.length)],
      alpha: 1
    });
  }

  animate();
  setTimeout(() => {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, props.width, props.height);
  }, props.duration);
}

function animate() {
  ctx.clearRect(0, 0, props.width, props.height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.05; // gravity
    particle.alpha -= 0.01;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
    ctx.fill();

    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    }
  });

  if (particles.length > 0) {
    animationId = requestAnimationFrame(animate);
  }
}

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});
</script>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>