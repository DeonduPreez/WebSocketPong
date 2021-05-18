import CollisionZone from "./collision-zone.js";

export default class Paddle {
    constructor(game, playerNumber) {
        this.width = 20;
        this.height = 150;
        this.maxSpeed = 10;

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.position = {
            x: playerNumber === 1 ? 20 : this.gameWidth - 20 - this.width,
            y: game.gameHeight / 2 - this.height / 2
        }
        this.speed = 0;
        this.zones = [
            new CollisionZone((ball) => {
                let ySpeed = ball.speed.y;
                if (ySpeed > 0) {
                    ySpeed = -ySpeed;
                }
                let xSpeed = ball.speed.x;
                if (ball.speed.x < 0)
                {
                    xSpeed = xSpeed - ball.speedIncrease;
                }
                return {x: xSpeed * - 1, y: ySpeed};
            }),
            new CollisionZone((ball) => {
                return {x: ball.speed.x + ball.speedIncrease, y: 0};
            }),
            new CollisionZone((ball) => {
                let ySpeed = ball.speed.y;
                if (ySpeed < 0) {
                    ySpeed = -ySpeed;
                }
                return {x: ball.speed.x + ball.speedIncrease, y: ySpeed};
            })
        ];
    }

    draw(ctx) {
        ctx.fillStyle = "#0ff";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        this.position.y += this.speed;

        if (this.position.y < 0) {
            this.position.y = 0;
        }
        if (this.position.y + this.height > this.gameHeight) {
            this.position.y = this.gameHeight - this.height;
        }
    }

    stop() {
        this.speed = 0;
    }

    moveUp() {
        this.speed = -this.maxSpeed;
    }

    moveDown() {
        this.speed = this.maxSpeed;
    }
}
