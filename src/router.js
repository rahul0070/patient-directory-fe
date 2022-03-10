import {createWebHistory, createRouter} from 'vue-router'
import HomePage from './components/Home.vue'
// import CollectionPage from './components/Patient.vue'
// import Login from './components/Login.vue'
// import Settings from './components/Settings.vue'



const routes = [
      { path: '/', component: HomePage },
      // { path: '/login', component: Login},
      { path: '/home', component: HomePage},
      // { path: '/patient/:id', component: CollectionPage},
      // { path: '/settings', component: Settings}
    ]


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;