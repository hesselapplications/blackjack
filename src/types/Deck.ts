import { Card, Rank, Suit } from "./"
import _ from "lodash";

export class Deck {

    cards: Array<Card> = []

    constructor() {
        for (const suit of this.enumKeys(Suit)) {
            for (const rank of this.enumKeys(Rank)) {
                const card = new Card(Suit[suit], Rank[rank]);
                this.cards.push(card)
            }
        }
    }

    private enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
        return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
    }

    shuffle() {
        this.cards = _.shuffle(this.cards);
    }

    draw() {
        return this.cards.shift();
    }

}