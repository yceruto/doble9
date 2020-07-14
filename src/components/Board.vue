<template>
  <div class="board">
    <Piece
      v-for="(move, i) in board()"
      :number="move.number"
      :style="move.style"
      :corner="move.corner"
      :angle="move.angle"
      :visible="move.visible"
      :ghost="move.ghost"
      :key="i"
      @click="$emit('click', move, i)"
    />
  </div>
</template>

<script>
import Piece from "./Piece.vue";
import { isDoubleSide } from "./../functions";

export default {
  components: {
    Piece
  },
  props: {
    start: Number,
    moves: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    board() {
      if (this.moves.length === 0) {
        return [];
      }

      const indexStart = this.moves.findIndex(
        move => move.number === this.start
      );
      const leftMoves = this.moves.slice(0, indexStart).reverse();
      const rightMoves = this.moves.slice(indexStart);
      const board = [];

      let maxSpaces = 15;
      let gridCol = 26;
      let gridRow = 11;
      let factor = -1;
      let span = 0;
      let angle = 0;
      let isCorner = false;
      let isDouble = false;
      let isPrevDouble = isDoubleSide(this.moves[indexStart].number);
      let isPrevDoubleHorz = false;
      let isPrevCorner = false;
      let colSpaces = 0;
      for (const move of leftMoves) {
        isDouble = isDoubleSide(move.number);
        isCorner =
          !isDouble && !isPrevDouble && !isPrevCorner && colSpaces > maxSpaces;

        if (factor === 1 && isPrevCorner) {
          // on-op
        } else if (
          (factor === 1 && isPrevDouble && !isPrevDoubleHorz) ||
          (factor === -1 && (isDouble || isCorner || isPrevCorner))
        ) {
          gridCol += 2 * factor;
        } else {
          gridCol += 4 * factor;
        }

        if (isDouble && isPrevCorner) {
          gridCol -= factor;
        }

        if (isCorner && !isDouble) {
          gridRow -= 1;
        }

        if (isCorner || (isDouble && !isPrevCorner)) {
          span = 2;
          angle = 0;
        } else {
          span = 4;
          angle = 90 * factor;

          isPrevDoubleHorz = isDouble;
        }

        board.unshift({
          angle,
          corner: isCorner,
          number: move.number,
          player: move.player,
          ghost: move.ghost,
          visible: true,
          style: `grid-row: ${gridRow}; grid-column: ${gridCol} / span ${span}`
        });

        if (isCorner) {
          factor *= -1;
          gridRow -= 3;
          colSpaces = 0;
          maxSpaces = 30;
        } else {
          colSpaces += span;
        }

        isPrevDouble = isDouble;
        isPrevCorner = isCorner;
      }

      maxSpaces = 15;
      gridCol = 22;
      gridRow = 11;
      factor = 1;
      span = 0;
      angle = 0;
      isCorner = false;
      isDouble = false;
      isPrevDouble = false;
      isPrevDoubleHorz = false;
      isPrevCorner = false;
      colSpaces = 0;
      for (const move of rightMoves) {
        isDouble = isDoubleSide(move.number);
        isCorner =
          !isDouble && !isPrevDouble && !isPrevCorner && colSpaces > maxSpaces;

        if (factor === 1 && isPrevCorner) {
          // on-op
        } else if (
          (factor === 1 && isPrevDouble && !isPrevDoubleHorz) ||
          (factor === -1 && (isDouble || isCorner || isPrevCorner))
        ) {
          gridCol += 2 * factor;
        } else {
          gridCol += 4 * factor;
        }

        if (isDouble && isPrevCorner) {
          gridCol -= factor;
        }

        if (isCorner && !isDouble) {
          gridRow += 1;
        }

        if (isCorner || (isDouble && !isPrevCorner)) {
          span = 2;
          angle = 0;
        } else {
          span = 4;
          angle = -90 * factor;

          isPrevDoubleHorz = isDouble;
        }

        board.push({
          angle,
          corner: isCorner,
          number: move.number,
          player: move.player,
          ghost: move.ghost,
          visible: !(
            !isDouble &&
            indexStart > 0 &&
            indexStart < this.moves.length - 1 &&
            this.moves[indexStart].number === move.number &&
            this.moves.length > 2
          ),
          style: `grid-row: ${gridRow}; grid-column: ${gridCol} / span ${span}`
        });

        if (isCorner) {
          factor *= -1;
          gridRow += 3;
          colSpaces = 0;
          maxSpaces = 30;
        } else {
          colSpaces += span;
        }

        isPrevDouble = isDouble;
        isPrevCorner = isCorner;
      }

      return board;
    }
  }
};
</script>

<style lang="scss" scoped>
.board {
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(52, 28px);
  grid-template-rows: repeat(21, 28px);
  grid-gap: 1px;
  align-self: center;
}
</style>