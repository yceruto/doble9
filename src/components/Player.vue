<template>
  <div class="player">
    <div class="pieces" :style="style">
      <Piece
        v-for="(number, i) in pieces"
        :visible="visible"
        :number="number"
        :angle="isLateralPosition ? 90 : 0"
        :animate="position === 'bottom'"
        :ghost="!turn"
        :key="i"
        @click="$emit('click', id, number)"
      />
    </div>
  </div>
</template>

<script>
import Piece from "./Piece.vue";

export default {
  components: {
    Piece
  },
  props: {
    id: Number,
    name: String,
    visible: {
      type: Boolean,
      default: true
    },
    turn: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: null,
      validator(value) {
        return ["top", "left", "right", "bottom"].indexOf(value) !== -1;
      }
    },
    pieces: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    isLateralPosition() {
      return this.position === "left" || this.position === "right";
    },
    style() {
      if (this.isLateralPosition) {
        return {
          gridTemplateColumns: `112px`,
          gridTemplateRows: `repeat(${this.pieces.length}, 56px)`
        };
      }

      return {
        gridTemplateColumns: `repeat(${this.pieces.length}, 56px)`,
        gridTemplateRows: `112px`
      };
    }
  },
  methods: {
    pass() {
      alert("No llevo :(");
    }
  }
};
</script>

<style lang="scss" scoped>
.player {
  justify-self: center;
  align-self: center;

  .pieces {
    display: grid;
    grid-gap: 7px;

    .tile {
      align-self: center;
      justify-self: center;
    }
  }

  .controls {
    display: inline;
  }
}
</style>