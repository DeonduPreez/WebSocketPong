import Game from "./game.js";
import {theme1, theme2} from "./theme.js";
import {createImageElement} from "./helpers/element-helper.js";

export const debug = false;
// export const debug = true;
export const zoneDebug = false;
// export const zoneDebug = true;

let canvas = document.getElementById("game-screen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = parseFloat(canvas.getAttribute("width"));
const GAME_HEIGHT = parseFloat(canvas.getAttribute("height"));

// const currentTheme = theme1;
const currentTheme = theme2;

const game = new Game(GAME_WIDTH, GAME_HEIGHT, currentTheme);

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
