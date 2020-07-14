<template>
  <div id="app">
    <Game :players="4" :quantity="10" />
  </div>
</template>

<script>
import Game from "./Game.vue";

export default {
  components: {
    Game
  }
};
</script>

<style lang="scss">
body {
  background-color: #00bdb1;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>
