import { createRouter, createWebHistory } from 'vue-router'
import PurpleHeroComponent from '../components/purple_hero_component_1723700034.vue'
import PurpleFeatureGridComponent from '../components/purple_feature_grid_component_1723700034.vue'
import PurpleBackgroundCtaComponent from '../components/purple_background_cta_component_1723700034.vue'
import ParticleComponent from '../components/particle_component_1723700034.vue'
import TetrisView from '../views/TetrisView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PurpleHeroComponent
  },
  {
    path: '/features',
    name: 'Features',
    component: PurpleFeatureGridComponent
  },
  {
    path: '/cta',
    name: 'CTA',
    component: PurpleBackgroundCtaComponent
  },
  {
    path: '/particle',
    name: 'Particle',
    component: ParticleComponent
  },
  {
    path: '/tetris',
    name: 'Tetris',
    component: TetrisView
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router