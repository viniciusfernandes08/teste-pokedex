import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import PokemonPage from './components/pagePokemonSelected.vue';

const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/pokemon/:id',
      name: 'Pokemon',
      component: PokemonPage
    }
];
  
const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');