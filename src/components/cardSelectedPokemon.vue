<script setup>
  import iconeFechar from '../assets/icons8-x-50.png';
  import { useRouter } from 'vue-router';

  let router = useRouter();

  const props = defineProps({
    name: String,
    urlPhoto: String,
    spriteBack: String,
    moves: Array,
    spriteBackS: String,
    spriteFront: String,
    spriteFrontS: String,
    games: Array,
    evolutions: Array
  })
  
  // Chama quando clica no ícone de fechar
  const backToHome = () => {
    router.push('/');
  }

</script>

<template>
  <div class="cardpokemon w-100 d-flex flex-column" style="min-height: 100vh">
    <div class="position-relative">
      <img 
      :src="iconeFechar" 
      class="position-absolute top-0 end-0 mt-3 me-5 cursor-pointer icone-md"
      @click="backToHome()"
      alt="Fechar"
      >
    </div>
    <div class="w-100 h-100">
      <h4 class="text-center pt-4 pb-4 fs-3">{{ name }} </h4>
      <hr>
      <img 
        :src="props.urlPhoto" 
        class="card-img-top mb-5" 
        alt="pokemon"
        height="100"
      />
      <div class="d-flex justify-content-center px-5 flex-md gap-2 justify-content-md-center gap-md flex-grow-1 flex-column-small">
         <section class="w-100 d-flex flex-column align-items-center border border-light">
           <strong class="fs-4">Sprites:</strong>
           <div class="d-flex flex-column align-items-center" style="max-width: 600px;">
              <div class="d-flex w-100 justify-content-center">
                <div class="d-flex flex-column">
                  <img 
                  v-if="props.spriteBack"
                  :src="props.spriteBack"
                  class="sprite-image">
                  <img 
                  v-if="props.spriteBackS"
                  :src="props.spriteBackS" 
                  class="sprite-image">
                </div>
                <div class="d-flex flex-column">
                  <img 
                  v-if="props.spriteFront"
                  :src="props.spriteFront" 
                  class="sprite-image">
                  <img 
                  v-if="props.spriteFrontS"
                  :src="props.spriteFrontS" 
                  class="sprite-image">
                </div>
              </div>
           </div>
         </section>
         <section class="w-100 d-flex flex-column align-items-center border border-light py-2">
           <strong class="fs-4">Movimentos de ataque:</strong>
           <div
           class="moves-container d-flex flex-column align-items-center px-4"
           style="max-height: 400px; overflow-y: auto; max-width: 600px"
           >
               <p v-for="(move, index) in moves" :key="index" class="fs-5">{{ move }}</p>
           </div>
         </section>
         <section class="w-100 d-flex flex-column align-items-center border border-light">
           <strong class="fs-4">Evoluções:</strong>
           <span v-if="evolutions && evolutions.length > 0">
               <p v-for="(evolution, index) in evolutions" :key="index" class="fs-5">{{ evolution }}</p>
           </span>
           <span v-else>Nenhuma evolução</span>
         </section>
         <section class="w-100 d-flex flex-column align-items-center border border-light py-2">
           <strong class="fs-4">Games:</strong>
           <div 
            v-if="games && games.length > 0" 
            class="games-container d-flex flex-column align-items-center px-4"
            style="max-height: 400px; overflow-y: auto; max-width: 600px"
            >
            <p v-for="(game) in games" 
               :key="game"
               class="fs-5">
               {{ game }}
             </p>
           </div>
         </section>
      </div>
      <div class="d-flex mt-5 w-100">
      </div>
    </div>
  </div>
</template>

<style scoped>

  .cardpokemon {
    background: rgb(80,206,243);
    background: radial-gradient(circle, rgba(80,206,243,1) 40%, rgba(144,144,240,1) 85%, rgba(183,80,242,1) 100%);
    min-height: 100vh;
    flex-grow: 1;
  }

  .sprite-image {
    height: 150px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .cursor-pointer:hover {
    opacity: 0.5;
  }

  .moves-container {
    gap: 5px;
    max-height: 300px;
    overflow-y: auto; 
  }

  .moves-container::-webkit-scrollbar {
    width: 10px;
  }
  
  .moves-container::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
  }

  .moves-container::-webkit-scrollbar-thumb {
    background: rgba(183,80,242,1);
    border-radius: 10px;
  }

  .moves-container::-webkit-scrollbar-thumb:hover {
    background-color: #4b4a91;
  }

  .games-container::-webkit-scrollbar {
    width: 10px;
  }
    
  .games-container::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
  }

  .games-container::-webkit-scrollbar-thumb {
    background: rgba(183,80,242,1);
    border-radius: 10px;
  }
  
  .games-container::-webkit-scrollbar-thumb:hover {
    background-color: #4b4a91;
  }

  @media (max-width: 768px) {
    .flex-md {
      flex-direction: column;
    }

    .gap-md {
      gap: 40px !important;
    }

    .icone-md {
      width: 40px;
    }
  }

  @media (max-width: 425px) {
    .flex-column-small {
      flex-direction: column !important;
    }

    .icone-md {
      width: 30px;
      margin-right: 10px !important;
    }
  }

</style>