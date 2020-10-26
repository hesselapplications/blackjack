<template>
  <v-card class="playing-card pa-2" elevation="10">
    <v-responsive :aspect-ratio="2 / 3">
      <v-fade-transition hide-on-leave>
        <!-- FACE DOWN -->
        <div
          v-if="faceDown"
          :key="1"
          class="face-down fill-height d-flex justify-center align-center"
        >
          <v-icon color="white" x-large>mdi-cards-playing-outline</v-icon>
        </div>

        <!-- FACE UP -->
        <div v-else :key="2" class="d-flex flex-column fill-height">
          <!-- TOP LEFT -->
          <div class="d-flex">
            <div class="d-flex flex-column justify-center">
              <v-icon large :color="color">{{ rankIcon }}</v-icon>
              <v-icon small :color="color">{{ suitIcon }}</v-icon>
            </div>
            <v-spacer></v-spacer>
          </div>

          <!-- CENTER -->
          <div class="flex-grow-1 d-flex justify-center align-center">
            <v-icon size="4vw" :color="color">{{ suitIcon }}</v-icon>
          </div>

          <!-- BOTTOM RIGHT -->
          <div class="d-flex">
            <v-spacer></v-spacer>
            <div class="d-flex flex-column justify-center">
              <v-icon class="rotated" small :color="color">{{ suitIcon }}</v-icon>
              <v-icon class="rotated" large :color="color">{{ rankIcon }}</v-icon>
            </div>
          </div>
        </div>
      </v-fade-transition>
    </v-responsive>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Card, Rank, Suit } from "@/types";

export default Vue.extend({
  props: {
    card: Object as PropType<Card>,
    faceDown: Boolean,
  },
  computed: {
    suitIcon(): string | undefined {
      switch (this.card.suit) {
        case Suit.HEARTS:
          return "mdi-cards-heart";
        case Suit.DIAMONDS:
          return "mdi-cards-diamond";
        case Suit.CLUBS:
          return "mdi-cards-club";
        case Suit.SPADES:
          return "mdi-cards-spade";
        default:
          return undefined;
      }
    },
    color(): string | undefined {
      switch (this.card.suit) {
        case Suit.HEARTS:
        case Suit.DIAMONDS:
          return "red";

        case Suit.CLUBS:
        case Suit.SPADES:
          return "black";

        default:
          return undefined;
      }
    },
    rankIcon(): string {
      switch (this.card.rank) {
        case Rank.ACE:
          return "mdi-alpha-a-box";
        case Rank.JACK:
          return "mdi-alpha-j-box";
        case Rank.QUEEN:
          return "mdi-alpha-q-box";
        case Rank.KING:
          return "mdi-alpha-k-box";
        default:
          return `mdi-numeric-${this.card.rank}-box`;
      }
    },
  },
});
</script>
<style scoped>
.rotated {
  transform: rotate(180deg);
}

.face-down {
  border-radius: 4px;
  background-repeat: repeat;
  background-color: #b64d4d;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%237c3c3c' fill-opacity='0.31'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");
}

.playing-card {
  min-width: 200px;
}
</style>