<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import pokemonsList from './pokemonsList.vue';
import logoPokemon from '../assets/logo-pokemon.png';

let urlPokemonPhotos = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/");
let pokemons = reactive({ list: [] });
let filterPokemons = ref("");
let router = useRouter();

onMounted(() => {
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

const selectPokemon = async (pokemon) => {
  router.push({ name: 'Pokemon', params: { id: pokemon.url.split('/')[6] } });
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

    <div class="mb-3">
      <label for="filterPokemons" hidden class="form-label"></label>
      <input 
        v-model="filterPokemons"
        type="text" 
        class="form-control m-auto bg-body-secondary shadow-none w-75 w-md-50 w-lg-25" 
        id="filterPokemons" 
        placeholder="Pesquisar"
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