<script setup>
   const pokemon = defineProps({
    name: String,
    urlPhoto: String
  })
</script>

<template>
   <div class="card cardpokemon" style="height: 200px; min-width: 200px;">
     <div class="card-body">
       <h4 class="card-title">{{ pokemon.name }} </h4>
       <img 
         :src="pokemon.urlPhoto" 
         class="card-img-top mb-5" 
         alt="imagem do pokemon"
         height="90"
       />
     </div>
   </div>
</template>

<style scoped>

.cardpokemon {
  background: rgb(80,206,243);
  background: radial-gradient(circle, rgba(80,206,243,1) 40%, rgba(144,144,240,1) 85%, rgba(183,80,242,1) 100%);
  cursor: pointer;
  box-shadow: 1px 1px 10px #111;
  transition: 0.3s ease;
}

.cardpokemon:hover {
  box-shadow: 0 0 0;
}

.cardpokemon img {
  transition: transform 0.3s ease;
}

.cardpokemon img:hover {
  transform: scale(1.1);
}

</style>