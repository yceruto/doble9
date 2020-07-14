<template>
  <div class="game">
    <Board class="board-area" :moves="board" :start="start" @click="remove" />
    <Player
      v-for="(player, i) in stack"
      :class="player.class"
      :pieces="player.pieces"
      :position="player.position"
      :name="player.name"
      :id="player.id"
      :key="i"
      @play="play"
    />
  </div>
</template>

<script>
import Board from "./Board.vue";
import Player from "./Player.vue";
import { sideA, sideB } from "./../functions";

export default {
  components: {
    Board,
    Player
  },
  data: function() {
    return {
      turn: 0,
      stack: [],
      board: [],
      start: null,
      winner: null
    };
  },
  props: {
    players: {
      type: Number,
      default: 2,
      validator(value) {
        if (value < 2 || value > 4) {
          return false;
        }
        return true;
      }
    },
    quantity: {
      type: Number,
      default: 10
    }
  },
  methods: {
    remove({ player, number }) {
      const index = this.board.findIndex(move => move.number === number);
      if (index === 0 || index === this.board.length - 1) {
        this.board.splice(index, 1);
        this.stack[player].pieces.push(number);
      }
    },
    play({ player, number }) {
      if (this.winner !== null) {
        alert("Gano Jugador " + this.winner);
        return;
      }

      const index = this.stack[player].pieces.indexOf(number);

      if (index === -1) {
        return;
      }

      // verificar forro
      if (this.add(number, player)) {
        this.stack[player].pieces.splice(index, 1);
        this.checkWinner();
      } else {
        alert("Forro :)");
      }
    },
    add(number, player) {
      if (this.board.indexOf(number) !== -1) {
        return false;
      }

      if (this.board.length === 0) {
        this.start = number;
        this.board.push({ number, player });
        return true;
      }

      const head1 = this.board[0];
      const head2 = this.board[this.board.length - 1];
      const numberA = sideA(number);
      const numberB = sideB(number);

      if (sideA(head1.number) === numberB) {
        this.board.unshift({ number, player });
      } else if (sideA(head1.number) === numberA) {
        this.board.unshift({ number: numberB + numberA / 10, player });
      } else if (sideB(head2.number) === numberB) {
        this.board.push({ number: numberB + numberA / 10, player });
      } else if (sideB(head2.number) === numberA) {
        this.board.push({ number, player });
      } else {
        return false;
      }

      return true;
    },
    reset() {
      // crear fichas
      const stack = [];
      for (let i = 0; i <= 9; ++i) {
        for (let j = i; j <= 9; ++j) {
          stack.push(i + j / 10);
        }
      }

      // dar agua
      stack.sort(() => Math.random() - 0.5);

      // determinar posiciones segun cantidad de jugadores
      const positions = ["top"];
      if (this.players === 2) {
        positions.push("bottom");
      } else if (this.players === 3) {
        positions.push("left");
        positions.push("bottom");
      } else if (this.players === 4) {
        positions.push("left");
        positions.push("right");
        positions.push("bottom");
      }

      // repartir fichas a cada jugador
      this.stack = [];
      for (let player = 0; player < this.players; ++player) {
        const newPlayer = {
          id: player,
          class: `player-${positions[player]}-area`,
          position: positions[player],
          name: "Player" + (player + 1),
          pieces: []
        };
        for (let i = 1; i <= this.quantity; ++i) {
          newPlayer.pieces.push(stack.pop());
        }
        this.stack.push(newPlayer);
      }
    },
    checkWinner() {
      for (const player in this.stack) {
        if (this.stack[player].pieces.length === 0) {
          this.winner = player;
          setTimeout(() => {
            alert("Gano Jugador " + player);
          }, 100);

          return true;
        }
      }

      return false;
    },
    sideA(number) {
      return parseInt(number);
    },
    sideB(number) {
      return Math.round((number - parseInt(number)) * 10);
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style lang="scss" scoped>
.game {
  padding: 20px;
  width: auto;
  height: calc(100vh - 40px);
  display: grid;
  grid-template-columns: 140px auto 140px;
  grid-template-rows: 140px auto 140px;
  grid-template-areas:
    "left top right"
    "left board right"
    "left bottom right";

  .board-area {
    grid-area: board;
  }

  .player-top-area {
    grid-area: top;
  }

  .player-left-area {
    grid-area: left;
  }

  .player-right-area {
    grid-area: right;
  }

  .player-bottom-area {
    grid-area: bottom;
  }
}
</style>