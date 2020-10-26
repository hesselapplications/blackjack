<template>
  <v-app>
    <v-main>
      <v-container class="fill-height justify-center">
        <div>
          <hand :player="dealer"></hand>

          <div class="d-flex justify-center my-10">
            <v-btn color="primary" class="mr-4" depressed @click="hit"
              >Hit</v-btn
            >
            <v-btn color="primary" depressed @click="stay">Stay</v-btn>
          </div>

          <hand :player="player"></hand>

          <v-overlay :value="message">
            <v-snackbar
              :value="message"
              :timeout="-1"
              color="primary"
              centered
              min-width="1000px"
            >
              {{ message }}
              <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="newGame"> New Game </v-btn>
              </template>
            </v-snackbar>
          </v-overlay>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
import Hand from "@/components/Hand.vue";
import confetti from "canvas-confetti";
import { Deck, Player } from "@/types";

export default Vue.extend({
  components: {
    Hand,
  },
  data() {
    return {
      deck: new Deck(),
      dealer: new Player(true, false),
      player: new Player(false, true),
      message: "",
    };
  },
  created() {
    this.newGame();
  },
  methods: {
    sleep() {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    async newGame() {
      this.deck = new Deck();
      this.deck.shuffle();

      this.dealer = new Player(true, false);
      this.player = new Player(false, true);

      this.player.takeCard(this.deck.draw());
      this.dealer.takeCard(this.deck.draw());
      this.player.takeCard(this.deck.draw());
      this.dealer.takeCard(this.deck.draw());

      if (this.dealer.points == 21 || this.player.points == 21) {
        this.newGame();
      }

      this.setMessage("");
    },
    async stay() {
      this.player.isTurn = false;
      this.dealer.isTurn = true;
      await this.sleep();

      while (
        this.dealer.points < 17 ||
        this.dealer.points < this.player.points
      ) {
        this.dealer.takeCard(this.deck.draw());
        await this.sleep();
      }

      if (this.dealer.points > 21) {
        this.setMessage("Dealer busts. You win :)");
      } else if (this.dealer.points > this.player.points) {
        this.setMessage("You lose :(");
      } else if (this.dealer.points == this.player.points) {
        this.setMessage("Push :/");
      } else {
        this.setMessage("You win :)");
      }
    },
    hit() {
      this.player.takeCard(this.deck.draw());
      if (this.player.points == 21) {
        this.setMessage("Blackjack! You win :D");
      } else if (this.player.points > 21) {
        this.setMessage("Bust :(");
      }
    },
    setMessage(message: string) {
      this.message = message;
      if (message.includes("win")) {
        confetti({
          particleCount: 150,
          gravity: 3,
        });
      }
    },
  },
});
</script>
<style>
.v-main {
  background-repeat: repeat;
  background-color: #438567;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2300ff8b' fill-opacity='0.22' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}

.v-snack__wrapper {
  min-width: 200px;
}
</style>