export default class UIService {
    constructor() {
        this.hitSound = new Audio("audio/swish.mp3");
    }

    showCard(card, containerSelector) {
        const cardContainer = document.querySelector(containerSelector);
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        const img = document.createElement('img');
        img.src = `cards/${card.value}${card.suit}.svg`;
        img.alt = `${card.value} of ${card.suit}`;
        
        cardElement.appendChild(img);
        cardContainer.appendChild(cardElement);
        this.hitSound.play();
    }

    updateScore(player) {
        const selector = player.isDealer ? '.dealer .score' : '.player .score';
        const scoreElement = document.querySelector(selector);
        scoreElement.textContent = player.score;
    }

    updateBet(amount) {
        document.querySelector('.bet-space span').textContent = `$${amount}`;
    }

    toggleControls(canHit = true, canStand = true, canDeal = true) {
        document.querySelector('#hit-button').disabled = !canHit;
        document.querySelector('#stand-button').disabled = !canStand;
        document.querySelector('#deal-button').disabled = !canDeal;
    }
}