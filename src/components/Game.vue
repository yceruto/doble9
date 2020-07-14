<template>
  <div class="game" @dblclick="changeTurn">
    <Board class="board-area" :moves="board" :start="start" @click="play" />
    <Player
      v-for="(player, i) in stack"
      :class="player.class"
      :pieces="player.pieces"
      :position="player.position"
      :visible="player.position === 'bottom' || gameOver"
      :name="player.name"
      :id="player.id"
      :turn="turn === player.id || gameOver"
      :key="i"
      @click="prePlay"
    />
  </div>
</template>

<script>
import Board from "./Board.vue";
import Player from "./Player.vue";
import { sideA, sideB, isDoubleSide, isSame, think } from "./../functions";

export default {
  components: {
    Board,
    Player
  },
  data: function() {
    return {
      stack: [],
      board: [],
      turn: null,
      start: null,
      winner: null,
      move: null,
      ghost: null,
      gameOver: false
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
    changeTurn() {
      if (this.turn === this.stack.length - 1) {
        this.turn = 0;
      } else {
        ++this.turn;
      }

      if (this.stack[this.turn].position !== "bottom") {
        setTimeout(() => {
          const move = think(this.stack[this.turn].pieces, this.board, 1);
          if (move) {
            if (this.doPlay(this.turn, move.number, move.position)) {
              return;
            }
          } else if (this.checkDraw()) {
            alert("Se trancó el juego!");
            this.gameOver = true;
            this.showWinner();
            return;
          }
          setTimeout(() => {
            this.changeTurn();
          }, 1000);
        }, 1000);
      }
    },
    changeTurnBack() {
      if (this.turn === 0) {
        this.turn = this.stack.length - 1;
      } else {
        --this.turn;
      }
    },
    showWinner() {
      const players = [];
      for (const player of this.stack) {
        players.push({
          id: player.id,
          total: player.pieces.reduce(
            (total, number) => total + sideA(number) + sideB(number),
            0
          )
        });
      }
      players.sort((a, b) => (a.total > b.total ? -1 : 1));
      const first = players.pop();
      const second = players.pop();
      if (first.total === second.total) {
        alert("Empate a " + first.total + " puntos!");
      } else {
        alert(
          "Ganó Jugador " + (first.id + 1) + " con " + first.total + " puntos!"
        );
      }
    },
    checkDraw() {
      for (const player of this.stack) {
        if (think(player.pieces, this.board, 0)) {
          return false;
        }
      }
      return true;
    },
    play({ player, number, ghost }, index) {
      if (index === 0 || index === this.board.length - 1) {
        this.board.splice(index, 1);

        if (ghost) {
          this.removeGhost();
          if (this.doPlay(player, number, index === 0 ? "left" : "right")) {
            return;
          }
          this.changeTurn();
        } else {
          // undo
          //this.stack[player].pieces.push(number);
          //this.changeTurnBack();
        }
      }
    },
    removeGhost() {
      let index;
      while ((index = this.board.findIndex(move => move.ghost)) !== -1) {
        this.board.splice(index, 1);
      }
      this.ghost = null;
    },
    prePlay(player, number) {
      if (
        (this.ghost !== null && this.stack[player].position !== "bottom") ||
        this.turn !== player ||
        this.gameOver
      ) {
        return;
      }

      this.removeGhost();

      if (this.checkWinner()) {
        return;
      }

      if (this.board.indexOf(number) !== -1) {
        return;
      }

      const index = this.stack[player].pieces.indexOf(number);
      if (index === -1) {
        return;
      }

      if (this.board.length === 0) {
        this.start = number;
        this.board.push({ number, player });
        this.stack[player].pieces.splice(index, 1);
        this.changeTurn();

        return;
      }

      if (this.addGhost(player, number)) {
        this.ghost = player;
      }
    },
    doPlay(player, number, position) {
      if (position === "left") {
        this.board.unshift({ player, number, ghost: false });
      } else {
        this.board.push({ player, number, ghost: false });
      }

      const index = this.stack[player].pieces.findIndex(n => isSame(n, number));
      this.stack[player].pieces.splice(index, 1);

      return this.checkWinner();
    },
    addGhost(player, number) {
      const head1 = this.board[0];
      const head2 = this.board[this.board.length - 1];
      const numberA = sideA(number);
      const numberB = sideB(number);
      const isDouble = isDoubleSide(number);
      const ghost = true;
      let result = false;

      if (sideA(head1.number) === numberB) {
        this.board.unshift({ player, number, ghost });
        result = true;
        if (!ghost) {
          return result;
        }
      }

      if (sideA(head1.number) === numberA && !isDouble) {
        this.board.unshift({ player, number: numberB + numberA / 10, ghost });
        result = true;
        if (!ghost) {
          return result;
        }
      }

      if (sideB(head2.number) === numberB) {
        this.board.push({ player, number: numberB + numberA / 10, ghost });
        result = true;
        if (!ghost) {
          return result;
        }
      }

      if (sideB(head2.number) === numberA && !isDouble) {
        this.board.push({ player, number, ghost });
        result = true;
      }

      return result;
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
        positions.push("bottom");
        positions.push("right");
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

        // tmp
        if (newPlayer.position === "bottom") {
          this.turn = player;
        }
      }
    },
    checkWinner() {
      for (const player in this.stack) {
        if (this.stack[player].pieces.length === 0) {
          this.winner = player;
          this.gameOver = true;
          setTimeout(() => {
            alert("Ganó Jugador " + (parseInt(player) + 1));
          }, 100);

          return true;
        }
      }
      this.winner = null;

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