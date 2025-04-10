<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import cardSelectedPokemon from './cardSelectedPokemon.vue';

  const route = useRoute();
  const pokemon = ref(null);

  const urlPokemonPhotos = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

  onMounted(async () => {
    const pokemonId = route.params.id;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await res.json();

    pokemon.value = data;
    pokemon.value.gameVersions = data.game_indices.map(index => index.version.name);
    pokemon.value.moves = data.moves.map(move => move.move.name);

    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();

    const evolutionRes = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionRes.json();

    pokemon.value.evolutionChain = extractEvolutionChain(evolutionData.chain);
  });

  const extractEvolutionChain = (chain) => {
    const evolutions = [];
    let current = chain;

    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to[0];
    }

    return evolutions;
  };
</script>

<template>
  <div class="d-flex justify-content-center" style="width: 100vw; min-height: 100vh; flex-direction: column">
    <cardSelectedPokemon
      v-if="pokemon"
      :name="pokemon.name"
      :urlPhoto="urlPokemonPhotos + pokemon.id + '.svg'"
      :spriteBack="pokemon.sprites.back_default"
      :spriteBackS="pokemon.sprites.back_shiny"
      :spriteFront="pokemon.sprites.front_default"
      :spriteFrontS="pokemon.sprites.front_shiny"
      :moves="pokemon.moves"
      :games="pokemon.gameVersions"
      :evolutions="pokemon.evolutionChain"
    />
  </div>
</template>
