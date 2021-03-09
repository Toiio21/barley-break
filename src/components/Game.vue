<template>
  <div>
    <label>Position: <input v-model="position" /></label>
    <div
      v-for="(row, x) in field"
      :key="x"
      class="row"
    >
      <div
        v-for="(column, y) in row"
        :key="y"
        @click="exchange(x, y)"
        class="col"
      >
        <img
          :src="images[column]"
          :class="['image', column === ' ' && 'image_empty']"
        />
        <div class="image__label">{{ column }}</div>
      </div>
    </div>
    <!-- <button @click="solve">Solve</button>
    <button @click="stop">Stop</button> -->
    <div>{{ deb }}</div>
    <!-- <div>queue length: {{ queue.length }}; variants: {{ positions.size }}</div> -->
  </div>
</template>

<script>
import { chunk } from "lodash";
import { makeMove, getDerivatives, sleep } from "../game.js";

export default {
  data() {
    return {
      images: {
        /* eslint-disable no-undef */
        1: require("../assets/1.png"),
        2: require("../assets/2.png"),
        3: require("../assets/3.png"),
        4: require("../assets/4.png"),
        5: require("../assets/5.png"),
        6: require("../assets/6.png"),
        " ": require("../assets/7.png"),
        8: require("../assets/8.png"),
        9: require("../assets/9.png")
        /* eslint-enable no-undef */
      },
      deb: null,
      running: false,
      queue: [],
      positions: new Set(),
      target: "123456 89",
      position: "143 26859" 
      // position: "68 129543" // Solved
      // position: "1234 5896" // Easy
    };
  },
  computed: {
    field() {
      return chunk(this.position, 3);
    }
  },
  methods: {
    exchange(x, y) {
      this.position = makeMove(this.position, x, y);
    },
    queueAdd(position, moves = []) {
      if (position === this.target) {
        this.deb = moves;
        this.running = false;
        return;
      }

      this.queue.push({ position, moves });
      this.positions.add(position);
    },
    async solve() {
      this.running = true;
      this.queue = [];
      this.queueAdd(this.position);

      while (this.queue.length > 0 && this.running) {
        await sleep(1);
        const derivatives = getDerivatives(this.queue.shift());

        derivatives
          .filter(derivative => !this.positions.has(derivative.position))
          .forEach(derivative =>
            this.queueAdd(derivative.position, derivative.moves)
          );
      }
    },
    stop() {
      this.running = false;
      this.deb = "Stop";
    }
  }
};
</script>

<style>
.row {
  display: flex;
}

.col {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  height: 19rem;
  user-select: none;
}

.col:hover {
  cursor: pointer;
}

.image {
  width: 95%;
  height: 95%;
}

.image_empty {
  opacity: 0.25;
}

.image__label {
  color: #fff;
  position: absolute;
}
</style>