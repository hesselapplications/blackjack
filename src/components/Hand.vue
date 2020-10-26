<template>
  <v-slide-x-reverse-transition
    group
    tag="div"
    class="hand d-flex flex-grow-1 justify-center align-center"
    hide-on-leave
  >
    <template v-for="(card, index) in player.cards">
      <v-badge
        class="card-wrapper"
        bordered
        :value="showPoints(index)"
        color="primary"
        :content="player.points"
        overlap
        :key="index"
      >
        <playing-card
          :card="card"
          :faceDown="firstCardFaceDown(index)"
        ></playing-card>
      </v-badge>
    </template>
  </v-slide-x-reverse-transition>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import PlayingCard from "@/components/PlayingCard.vue";
import { Player } from "@/types";

export default Vue.extend({
  components: {
    PlayingCard,
  },
  props: {
    player: Object as PropType<Player>,
  },
  methods: {
    firstCardFaceDown(index: number): boolean {
      return index == 0 && this.player.isDealer && !this.player.isTurn;
    },
    showPoints(index: number) {
      const isLastCard = index == this.player.cards.length - 1;
      return !this.firstCardFaceDown(index) && isLastCard;
    }
  }
});
</script>
<style >
.hand .card-wrapper:not(:first-child) {
  margin-left: -148px;
}
</style>