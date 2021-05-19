import {detectCollision} from "../helpers/collisionDetection.js";

export default class Ball {
    constructor(game) {
        this.minSpeed = 2;
        this.game = game;
        this.image = document.getElementById("ball");
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.size = 16;
        this.speedIncrease = 4;
        this.maxSpeed = 10;
        this.reset();
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size
        );
    }

    update(deltaTime) {
        if (this.speed.x > this.maxSpeed) {
            this.speed.x = this.maxSpeed;
        }
        if (this.speed.x < -this.maxSpeed) {
            this.speed.x = -this.maxSpeed;
        }
        if (this.speed.y > this.maxSpeed) {
            this.speed.y = this.maxSpeed;
        }
        if (this.speed.y < -this.maxSpeed) {
            this.speed.y = -this.maxSpeed;
        }

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Wall on left or right
        if (this.position.x < 0) {
            this.game.givePlayerPoint(1);
            this.reset();
        }
        if (this.position.x + this.size > this.gameWidth) {
            this.game.givePlayerPoint(2);
            this.reset();
        }

        // Wall on top
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        //Bottom of game
        if (this.position.y + this.size > this.gameHeight) {
            this.speed.y = -this.speed.y;
        }

        // Player One collision
        const playerOneCollision = detectCollision(this, this.game.playerOne);
        if (playerOneCollision != null) {
            this.speed = playerOneCollision.speedModifier(this);
            this.position.x = this.game.playerOne.position.x + this.game.playerOne.width - this.size;
            this.game.playerOne.playPaddleCollision();
        }

        // Player Two collision
        const playerTwoCollision = detectCollision(this, this.game.playerTwo);
        if (playerTwoCollision != null) {
            this.speed = playerTwoCollision.speedModifier(this);
            this.position.x = this.game.playerTwo.position.x - this.size;
            this.game.playerTwo.playPaddleCollision();
        }
    }

    reset() {
        this.position = {
            x: this.gameWidth / 2 - this.size / 2,
            y: this.gameHeight / 2 - this.size / 2
        };
        this.speed = {
            x: this.minSpeed,
            y: -this.minSpeed
        };
    }
}
