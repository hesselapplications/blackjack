import { Suit, Rank } from "."

export class Card {

    suit: Suit;
    rank: Rank;

    constructor(suit: Suit, rank: Rank) {
        this.suit = suit;
        this.rank = rank;
    }

}