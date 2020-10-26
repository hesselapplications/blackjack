import { Rank, Card } from "."

export class Player {

    isDealer: boolean;
    isTurn: boolean;
    points = 0;
    cards = new Array<Card>();

    constructor(isDealer: boolean, isTurn: boolean) {
        this.isDealer = isDealer;
        this.isTurn = isTurn;
    }

    takeCard(card: Card | undefined) {
        if (card) {
            this.cards.push(card);
        }

        this.points = this.calculatePoints();
    }

    private calculatePoints() {
        const startIndex = this.isDealer && !this.isTurn ? 1 : 0;
        const cards = this.cards.slice(startIndex);

        let points = cards.reduce(
            (total, card) => total + this.getValue(card),
            0
        );

        let numAces = cards.filter((card) => card.rank == Rank.ACE).length;

        while (points > 21 && numAces > 0) {
            points -= 10;
            numAces--;
        }

        return points;
    }

    private getValue(card: Card) {
        switch (card.rank) {
            case Rank.ACE:
                return 11;

            case Rank.JACK:
            case Rank.QUEEN:
            case Rank.KING:
                return 10;

            default:
                return card.rank;
        }
    }

}