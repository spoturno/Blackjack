import Player from './models/Player.js';
import GameService from './services/GameService.js';
import UIService from './services/UIService.js';

const ui = new UIService();
const player = new Player('Player');
const dealer = new Player('Dealer', true);
const game = new GameService(player, dealer, ui);

// Event Listeners
document.querySelector("#deal-button").addEventListener("click", () => game.dealCards());
//document.querySelector("#hit-button").addEventListener("click", () => game.hit());
//document.querySelector("#stand-button").addEventListener("click", () => game.stand());