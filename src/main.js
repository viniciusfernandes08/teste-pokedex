import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
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

const i18n = createI18n({
  legacy: false,
  locale: 'pt', //Idioma padrão
  messages: {
    en: {
      search: 'Search',
      loading: 'Loading Pokémons...',
      sprites: 'Sprites',
      moves: 'Attack Moves',
      evolutions: 'Evolutions',
      noEvolutions: 'No evolutions',
      games: 'Games',
    },
    pt: {
      search: 'Pesquisar',
      loading: 'Carregando Pokémons...',
      sprites: 'Sprites',
      moves: 'Movimentos de ataque',
      evolutions: 'Evoluções',
      noEvolutions: 'Nenhuma evolução',
      games: 'Games',
    },  
    es: {
      search: 'Buscar',
      loading: 'Cargando Pokémons...',
      sprites: 'Sprites',
      moves: 'Movimientos de ataque',
      evolutions: 'Evoluciones',
      noEvolutions: 'Sin evoluciones',
      games: 'Juegos',
    },
  },
});

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount('#app');