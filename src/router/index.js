import Vue from 'vue'
import VueRouter from 'vue-router'
import ListView from '../components/List.vue'
import PostView from '../components/Post.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: ListView
  },
  {
    path: '/post/:hash',
    name: 'post',
    component: PostView
  }
]

const router = new VueRouter({
  routes
})

export default router
