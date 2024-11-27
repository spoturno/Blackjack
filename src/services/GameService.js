export default class GameService {
    constructor(player, dealer, uiService) {
        this.player = player;
        this.dealer = dealer;
        this.ui = uiService;
        this.deck = this.createDeck();
        this.bet = 100;
        this.gameInProgress = false;
        
        // Initial UI state
        this.ui.toggleControls(false, false, true);
    }

    createDeck() {
        const suits = ['H', 'D', 'C', 'S'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const deck = [];
        
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value });
            }
        }
        return this.shuffle(deck);
    }

    shuffle(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    calculateScore(hand) {
        let score = 0;
        let aces = 0;

        for (let card of hand) {
            if (card.value === 'A') {
                aces += 1;
                score += 11;
            } else if (['K', 'Q', 'J'].includes(card.value)) {
                score += 10;
            } else {
                score += parseInt(card.value);
            }
        }

        while (score > 21 && aces > 0) {
            score -= 10;
            aces -= 1;
        }

        return score;
    }

    async dealCards() {
        if (this.gameInProgress) return;
        
        this.gameInProgress = true;
        this.resetGame();
        this.ui.toggleControls(false, false, false);

        // Deal initial cards
        await this.dealCard(this.player);
        await this.dealCard(this.dealer);
        await this.dealCard(this.player);

        this.ui.toggleControls(true, true, false);
        
        // Check for natural blackjack
        if (this.calculateScore(this.player.hand) === 21) {
            this.stand();
        }
    }

    async dealCard(player) {
        const card = this.deck.pop();
        player.addCard(card);
        
        const selector = player.isDealer ? '.dealer .cards' : '.player .cards';
        this.ui.showCard(card, selector);
        
        player.score = this.calculateScore(player.hand);
        this.ui.updateScore(player);

        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async hit() {
        if (!this.gameInProgress) return;
        
        await this.dealCard(this.player);
        
        if (this.player.score > 21) {
            this.endGame('dealer');
        }
    }

    async stand() {
        if (!this.gameInProgress) return;
        
        this.ui.toggleControls(false, false, false);
        
        // Dealer's turn
        while (this.dealer.score < 17) {
            await this.dealCard(this.dealer);
        }
        
        this.determineWinner();
    }

    determineWinner() {
        let winner;
        
        if (this.player.score > 21) {
            winner = 'dealer';
        } else if (this.dealer.score > 21) {
            winner = 'player';
        } else if (this.player.score > this.dealer.score) {
            winner = 'player';
        } else if (this.dealer.score > this.player.score) {
            winner = 'dealer';
        } else {
            winner = 'push';
        }
        
        this.endGame(winner);
    }

    endGame(result) {
        this.gameInProgress = false;
        this.ui.toggleControls(false, false, true);
        
        setTimeout(() => {
            alert(result === 'push' ? "It's a tie!" : `${result} wins!`);
        }, 500);
    }

    resetGame() {
        this.player.resetHand();
        this.dealer.resetHand();
        this.deck = this.createDeck();
        document.querySelector('.dealer .cards').innerHTML = '';
        document.querySelector('.player .cards').innerHTML = '';
        this.ui.updateScore(this.player);
        this.ui.updateScore(this.dealer);
    }
}