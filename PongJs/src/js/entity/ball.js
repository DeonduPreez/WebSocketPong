import {debugZones, detectCollision, drawHitBox} from "../helpers/collisionDetection.js";
import {createImageElement} from "../helpers/element-helper.js";
import {zoneDebug} from "../index.js";

export default class Ball {
    constructor(game, theme) {
        this.imageElement = createImageElement(theme.ball.image);
        this.theme = theme;
        this.minSpeed = 2;
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.height = theme.ball.height;
        this.width = theme.ball.width;
        this.speedIncrease = 4;
        this.maxSpeed = 10;
        this.reset();
    }

    getHitBox() {
        let topOfBall = this.position.y + (this.theme.ball.overflow ? this.theme.ball.overflowY / 2 : 0);
        let xPos = this.position.x + (this.theme.ball.overflow ? this.theme.ball.overflowX / 2 : 0);
        let bottomOfBall = topOfBall + this.height;
        return {
            top: topOfBall,
            bottom: bottomOfBall,
            left: xPos,
            right: xPos + this.width,
            position: {
                x: xPos,
                y: topOfBall
            }
        };
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

        const ballHitBox = this.getHitBox();

        // Wall on left
        if (ballHitBox.right < 0) {
            this.game.givePlayerPoint(1);
            this.reset();
        }

        // Wall on right
        if (ballHitBox.left > this.gameWidth) {
            this.game.givePlayerPoint(2);
            this.reset();
        }

        // Wall on top
        if (ballHitBox.top < 0) {
            this.speed.y = -this.speed.y;
        }

        //Bottom of game
        if (ballHitBox.bottom > this.gameHeight) {
            this.speed.y = -this.speed.y;
        }

        // Player One collision
        const playerOneCollision = detectCollision(this, this.game.playerOne);
        if (playerOneCollision != null) {
            this.speed = playerOneCollision.speedModifier(this);
            const playerOneHitBox = this.game.playerOne.getHitBox();
            this.position.x = playerOneHitBox.right - this.width - (this.theme.ball.overflow ? this.theme.ball.overflowX / 2 : 0);
            this.game.playerOne.playPaddleCollision();
        }

        // Player Two collision
        const playerTwoCollision = detectCollision(this, this.game.playerTwo);
        if (playerTwoCollision != null) {
            const playerTwoHitBox = this.game.playerTwo.getHitBox();
            this.speed = playerTwoCollision.speedModifier(this);
            this.position.x = playerTwoHitBox.left - (this.theme.ball.overflow ? this.theme.ball.overflowX / 2 : 0);
            this.game.playerTwo.playPaddleCollision();
        }
    }

    draw(ctx) {
        const width = this.theme.ball.overflow ? this.width + this.theme.ball.overflowX : this.width;
        const height = this.theme.ball.overflow ? this.height + this.theme.ball.overflowY : this.height;
        ctx.drawImage(
            this.imageElement,
            this.position.x,
            this.position.y,
            width,
            height
        );

        // Debug region below
        drawHitBox(this, ctx);
        if (!zoneDebug) {
            return;
        }
        for (let i = 0; i < debugZones.length; i++) {
            const zone = debugZones[i];
            if (i === 0) {
                drawHitBox(zone, ctx, "red");
            }
            if (i === 1) {
                drawHitBox(zone, ctx, "green");
            }
            if (i === 2) {
                drawHitBox(zone, ctx, "blue");
            }
            if (i === 3) {
                drawHitBox(zone, ctx, "Yellow");
            }
            if (i === 4) {
                drawHitBox(zone, ctx, "Pink");
            }
            if (i === 5) {
                drawHitBox(zone, ctx, "Orange");
            }
        }
    }

    reset() {
        this.position = {
            x: this.gameWidth / 2 - (this.theme.ball.overflow ? this.theme.ball.overflowX / 2 + this.width : this.width / 2),
            y: this.gameHeight / 2 - (this.theme.ball.overflow ? this.theme.ball.overflowY / 2 + this.height : this.height / 2)
        };
        this.speed = {
            x: this.minSpeed,
            y: -this.minSpeed
        };
    }
}
