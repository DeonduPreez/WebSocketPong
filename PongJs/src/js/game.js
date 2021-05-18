import Paddle from "./entity/paddle.js";
import Ball from "./entity/ball.js";
import InputHandler from "./input.js";

export const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    WIN: 3,
    LOSE: 4
}


export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.playerOne = new Paddle(this, 1);
        this.playerOnePoints = 0;
        this.playerTwo = new Paddle(this, 2);
        this.playerTwoPoints = 0;
        this.ball = new Ball(this);
        // this.gameState = GAMESTATE.MENU;

        this.gameObjects = [this.playerOne, this.playerTwo, this.ball];

        new InputHandler(this, this.playerTwo);
    }

    start() {
        if (this.gameState !== GAMESTATE.MENU && this.gameState !== GAMESTATE.WIN && this.gameState !== GAMESTATE.LOSE) {
            return;
        }
        this.playerOnePoints = 0;
        this.playerTwoPoints = 0;
    }

    update(deltaTime) {
        if (
            this.gameState === GAMESTATE.PAUSED ||
            this.gameState === GAMESTATE.MENU
        )
            return;

        this.gameObjects.forEach((obj) => obj.update(deltaTime));
    }

    draw(ctx) {
        this.gameObjects.forEach((obj) => obj.draw(ctx));

        if (this.gameState === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        } else if (this.gameState === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(
                "Press SPACE to start",
                this.gameWidth / 2,
                this.gameHeight / 2
            );
        } /*else if (this.gameState === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }*/
    }

    togglePause() {
        if (this.gameState === GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else {
            this.gameState = GAMESTATE.PAUSED;
        }
    }

    givePlayerPoint(playerNumber) {
        if (playerNumber === 1) {
            this.playerOnePoints++;
        } else {
            this.playerTwoPoints++;
        }
    }
}
