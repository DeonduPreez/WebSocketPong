import {createImageElement} from "../helpers/element-helper.js";
import {debugZones, drawHitBox} from "../helpers/collisionDetection.js";

export default class Paddle {
    constructor(game, playerNumber, zones, paddleCollisionSoundFile, theme) {
        this.playerNumber = playerNumber;
        this.imageElement = createImageElement(theme.paddle.image);
        this.theme = theme;
        this.width = theme.paddle.width;
        this.height = theme.paddle.height;
        this.maxSpeed = theme.paddle.speed;

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        if (theme.paddle.overflow) {
            const openSpaceY = theme.paddle.overflow ? (theme.paddle.overflowY / 2) : 0;
            this.position = {
                x: playerNumber === 1 ? this.width - theme.paddle.overflowX / 2 : this.gameWidth - this.width - 20 - theme.paddle.overflowX / 2,
                y: game.gameHeight / 2 - (this.height + openSpaceY * 2) / 2
            }
        } else {
            this.position = {
                x: playerNumber === 1 ? theme.paddle.openSpace : this.gameWidth - this.width - theme.paddle.openSpace,
                y: game.gameHeight / 2 - (this.height + 20 * 2) / 2
            }
        }
        this.speed = 0;
        this.zones = zones;
        this.paddleCollisionSoundFile = paddleCollisionSoundFile;
    }

    getHitBox() {
        const paddle = this;
        let top = paddle.position.y + (this.theme.paddle.overflow ? this.theme.paddle.overflowY : 0) / 2;
        let xPos = paddle.position.x + (this.theme.paddle.overflow ? this.theme.paddle.overflowX : 0) / 2;
        let bottom = top + paddle.height;
        return {
            top: top,
            bottom: bottom,
            left: xPos,
            right: xPos + this.width,
            position: {
                x: xPos,
                y: top
            }
        };
    }

    update(deltaTime) {
        this.position.y += this.speed;
        const paddleHitBox = this.getHitBox();

        if (paddleHitBox.top < 0) {
            this.position.y = -(this.theme.paddle.overflow ? this.theme.paddle.overflowY / 2 : 0);
        }
        if (paddleHitBox.bottom > this.gameHeight) {
            this.position.y = this.gameHeight - (this.theme.paddle.overflow ? this.theme.paddle.overflowY * 2 : 0);
        }
    }

    draw(ctx) {
        const width = this.theme.paddle.overflow ? this.width + this.theme.paddle.overflowX : this.width;
        const height = this.theme.paddle.overflow ? this.height + this.theme.paddle.overflowY : this.height;
        ctx.drawImage(this.imageElement, this.position.x, this.position.y, width, height);

        drawHitBox(this, ctx);
    }

    stop() {
        this.speed = 0;
    }

    moveUp() {
        debugZones.splice(0);
        this.speed = -this.maxSpeed;
    }

    moveDown() {
        debugZones.splice(0);
        this.speed = this.maxSpeed;
    }

    playPaddleCollision() {
        this.paddleCollisionSoundFile.play();
    }
}
