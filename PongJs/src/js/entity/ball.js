import {detectCollision} from "../helpers/collisionDetection.js";

const ballSpeed = 2;

export default class Ball {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById("ball");
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.size = 16;
        this.speedIncrease = 2;
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
        if (this.speed.y > this.maxSpeed) {
            this.speed.y = this.maxSpeed;
        }

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // TODO : Check where on paddle it hit then move accordingly

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

        const playerOneCollision = detectCollision(this, this.game.playerOne);
        if (playerOneCollision != null) {
            this.speed = playerOneCollision.speedModifier(this);
            // this.speed.x += this.speedIncrease;
            // this.speed.y += this.speedIncrease;
            this.speed.x = -this.speed.x;
            this.position.x = this.game.playerOne.position.x - this.size;
        }
        const playerTwoCollision = detectCollision(this, this.game.playerTwo);
        if (playerTwoCollision != null) {
            this.speed = playerTwoCollision.speedModifier(this);
            this.speed.x = -this.speed.x;
            this.position.x = this.game.playerTwo.position.x - this.size;
        }
        // else if (detectLeftRightCollision(this, this.game.paddle)) {
        //   // TODO : Left Right Collision movement
        //   this.speed.x = -this.speed.x;
        //   this.position.x = this.game.paddle.position.x - this.size;
        // }
    }

    reset() {
        this.position = {
            x: this.gameWidth / 2 - this.size / 2,
            y: this.gameHeight / 2 - this.size / 2
        };
        this.speed = {
            x: ballSpeed,
            y: -ballSpeed
        };
    }
}
