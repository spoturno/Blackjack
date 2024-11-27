export default class Player {
    constructor(name, isDealer = false) {
        this.name = name;
        this.isDealer = isDealer;
        this.score = 0;
        this.hand = [];
        this.standing = false;
        this.balance = isDealer ? 0 : 1000;
        this.streak = 0;
    }

    addCard(card) {
        this.hand.push(card);
    }

    resetHand() {
        this.hand = [];
        this.score = 0;
        this.standing = false;
    }
}
