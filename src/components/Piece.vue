<template>
  <div class="tile" :style="style" @click="click" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div v-if="visible" :class="className(sideA)">
      <span class="tile-dot" v-for="n in sideA" :key="n" />
    </div>
    <span v-if="visible" class="tile-divider"></span>
    <div v-if="visible" :class="className(sideB)">
      <span class="tile-dot" v-for="n in sideB" :key="n" />
    </div>
  </div>
</template>

<script>
import { sideA, sideB } from "./../functions";

export default {
  data: function() {
    return {
      hover: false
    };
  },
  props: {
    number: {
      type: Number,
      default: 9.9
    },
    angle: {
      type: Number,
      default: null
    },
    visible: {
      type: Boolean,
      default: true
    },
    ghost: {
      type: Boolean,
      default: false
    },
    animate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sideA() {
      return sideA(this.number);
    },
    sideB() {
      return sideB(this.number);
    },
    style() {
      const angle = null !== this.angle ? this.angle : -90;

      const shadowOffset = 4;
      const shadowX = Math.round(
        Math.sin(angle * (Math.PI / 180)) * shadowOffset,
        2
      );
      const shadowY = Math.round(
        Math.cos(angle * (Math.PI / 180)) * shadowOffset,
        2
      );

      let translate = "";
      if (this.animate && this.visible && this.hover && !this.ghost) {
        translate = "translateY(-10px)";
      }

      return {
        transform: `rotate(${angle}deg) scale(0.8) ${translate}`,
        boxShadow: `${shadowX}px ${shadowY}px 4px 1px rgba(65, 49, 43, 0.5), ${shadowX}px ${shadowY}px 0px 0px rgba(65, 49, 43, 0.5)`,
        opacity: this.ghost && !this.hover ? 0.35 : 1,
        transition: this.animate ? "all 0.3s" : "none"
      };
    }
  },
  methods: {
    click() {
      this.$emit("click", this.number);
    },
    className(n) {
      return "tile-number tile-number--" + n;
    },
    mouseEnter() {
      this.hover = true;
    },
    mouseLeave() {
      this.hover = false;
    }
  }
};
</script>

<style lang="scss">
$tile-dot-size: 15px;

// TILES

.tile {
  display: inline-grid;
  grid-template-rows: 1fr 2px 1fr;
  background-color: #f2eee7;
  width: 70px;
  height: 140px;
  border-radius: 6px;
  cursor: pointer;
}

.tile-number {
  display: grid;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
  padding: 10px;
  margin: -2px;
}

/* 1 */

.tile-number--1 {
  justify-content: center;
}

/* 2 */

.tile-number--2 {
  grid-template-columns: repeat(3, $tile-dot-size);

  .tile-dot:nth-child(2) {
    grid-row-start: 3;
    grid-column-start: 3;
  }
}

/* 3 */

.tile-number--3 {
  grid-template-columns: repeat(3, $tile-dot-size);
  grid-template-rows: repeat(3, 1fr);

  .tile-dot:nth-child(2) {
    grid-row-start: 2;
    grid-column-start: 2;
  }

  .tile-dot:nth-child(3) {
    grid-row-start: 3;
    grid-column-start: 3;
  }
}

/* 4 */

.tile-number--4 {
  grid-template-columns: repeat(3, $tile-dot-size);
  grid-template-rows: repeat(3, 1fr);

  .tile-dot:nth-child(2) {
    grid-row-start: 1;
    grid-column-start: 3;
  }

  .tile-dot:nth-child(3) {
    grid-row-start: 3;
    grid-column-start: 1;
  }

  .tile-dot:nth-child(4) {
    grid-row-start: 3;
    grid-column-start: 3;
  }
}

/* 5 */

.tile-number--5 {
  grid-template-columns: repeat(3, $tile-dot-size);
  grid-template-rows: repeat(3, 1fr);

  .tile-dot:nth-child(2) {
    grid-column-start: 3;
  }

  .tile-dot:nth-child(3) {
    grid-column-start: 2;
  }

  .tile-dot:nth-child(4) {
    grid-row-start: 3;
  }

  .tile-dot:nth-child(5) {
    grid-column-start: 3;
    grid-row-start: 3;
  }
}

/* 6 */

.tile-number--6 {
  grid-template-columns: repeat(2, $tile-dot-size);
}

/* 7 */

.tile-number--7 {
  grid-template-columns: repeat(3, $tile-dot-size);
  grid-template-rows: repeat(3, 1fr);

  .tile-dot:nth-child(2) {
    grid-column-start: 3;
  }

  .tile-dot:nth-child(7) {
    grid-column-start: 3;
    grid-row-start: 3;
  }
}

/* 8 */

.tile-number--8 {
  grid-template-columns: repeat(3, $tile-dot-size);
  grid-template-rows: repeat(3, 1fr);

  .tile-dot:nth-child(5) {
    grid-column-start: 3;
  }
}

/* 9 */

.tile-number--9 {
  grid-template-columns: repeat(3, $tile-dot-size);
  grid-template-rows: repeat(3, 1fr);
}

// dot

.tile-dot {
  display: block;
  flex-shrink: 0;
  width: $tile-dot-size;
  height: $tile-dot-size;
  background-color: #41312b;
  border-radius: 50%;
}

.tile-divider {
  display: block;
  flex-shrink: 0;
  width: 50px;
  height: 2px;
  background-color: #ccc7ba;
  margin: 0 auto;
}
</style>