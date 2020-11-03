import { Card, Rank, Suit } from "./"

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
        for (let index = this.cards.length - 1; index >= 0; index--) {
            const swapIndex = Math.floor(Math.random() * index);
            const temp = this.cards[swapIndex];
            this.cards[swapIndex] = this.cards[index];
            this.cards[index] = temp;
        }
    }

    sort() {
        this.cards.sort((a, b) => {
            const suitDifference = a.suit - b.suit;
            return suitDifference != 0 ? suitDifference : a.rank - b.rank;
        })
    }

    draw() {
        return this.cards.shift();
    }

}