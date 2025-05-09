<script setup>
import { onMounted, reactive, ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import pokemonsList from './pokemonsList.vue';
import logoPokemon from '../assets/logo-pokemon.png';

let urlPokemonPhotos = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/");
let pokemons = reactive({ list: [] });
let filterPokemons = ref("");
let router = useRouter();
let { locale } = useI18n();
let selectedLanguage = ref(locale.value);

//watch observa o selectedLanguage e atualiza o valor de newLocale conforme o usuário seleciona o idioma
watch(selectedLanguage, (newLocale) => {
  locale.value = newLocale;
});

//Função para debouncing da busca, 500ms após o usuário terminar de digitar
const debouncedFilter = debounce((value) => {
  filterPokemons.value = value;
}, 500);

onMounted(() => {
  //Função para buscar os pokemons na API
  try {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(res => res.json())
      .then(res => {
        pokemons.list = res.results;
        pokemons.list.forEach(pokemon => {
          fetch(pokemon.url)
            .then(res => res.json())
            .then(data => {
              pokemon.types = data.types;
              pokemon.species = data.species;
            });
        });
      });
  } catch (error) {
    console.error(error);
  }
});

//Função para filtrar pokemons por nome, ID, tipo e espécie
const filteredPokemons = computed(() => {
  if (filterPokemons.value) {
    return pokemons.list.filter(pokemon => {
      const nameFiltered = pokemon.name.toLowerCase().includes(filterPokemons.value.toLowerCase());
      const idFiltered = pokemon.url.split('/')[6].includes(filterPokemons.value);
      const typeFiltered = pokemon.types && pokemon.types.some(type => {
        const typeName = type.type && type.type.name ? type.type.name.toLowerCase() : '';
        return typeName.includes(filterPokemons.value.toLowerCase());
      });
      const speciesFiltered = pokemon.species && pokemon.species.name &&
        pokemon.species.name.toLowerCase().includes(filterPokemons.value.toLowerCase());

      return nameFiltered || idFiltered || typeFiltered || speciesFiltered;
    });
  }
  return pokemons.list;
});

//Função para selecionar um pokemon e enviar para outra tela para ver os detalhes
const selectPokemon = async (pokemon) => {
  router.push({ name: 'Pokemon', params: { id: pokemon.url.split('/')[6] } });
};

// Função para lidar com o evento de digitação no filtro
const handleSearch = (event) => {
  debouncedFilter(event.target.value);
};

</script>

<template>
  <div class="d-flex flex-column">
    <div class="p-4 d-flex justify-content-center m-auto">
      <img 
      :src="logoPokemon" 
      alt="logo-pokemon" 
      class="img-md img-mobile"
      />
    </div>

    <select v-model="selectedLanguage" class="my-2 m-auto bg-body-secondary rounded-1 shadow-none">
      <option value="en">English</option>
      <option value="pt">Português</option>
      <option value="es">Español</option>
    </select>

    <div class="mb-3">
      <label for="filterPokemons" hidden class="form-label"></label>
      <input 
        v-on:input="handleSearch"
        type="text" 
        class="form-control m-auto bg-body-secondary shadow-none w-75 w-md-50 w-lg-25" 
        id="filterPokemons" 
        :placeholder="$t('search')"
      />
    </div>

    <div class="container mt-5 row g-3 justify-content-center" style="min-height: 100vh; width: 100%;">       
        <div 
          class="col-10 col-sm-6 col-md-4 col-lg-3 mx-auto" 
          v-for="pokemon in filteredPokemons"
          :key="pokemon.name"
          @click="selectPokemon(pokemon)"
        >
        <pokemonsList
          :name="pokemon.name"
          :urlPhoto="urlPokemonPhotos + pokemon.url.split('/')[6] + '.svg'"
        />
        </div>
    </div>
  </div>
</template>

<style scoped>
  @media (max-width: 768px) {
    .img-md {
      max-width: 300px;
    }
  }

  @media (max-width: 475px) {
    .img-mobile {
      max-width: 250px;
    }
  }
</style>