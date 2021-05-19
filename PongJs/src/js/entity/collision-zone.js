export default class CollisionZone {
    constructor(speedModifier) {
        this.speedModifier = speedModifier;
    }
}

export const basicPaddleZones = [
    new CollisionZone((ball) => {
        let ySpeed = ball.speed.y;
        if (ySpeed > 0) {
            ySpeed = -ySpeed;
        }
        if (ySpeed === 0)
        {
            ySpeed = -ball.minSpeed;
        }
        let xSpeed = ball.speed.x;
        xSpeed = ball.speed.x < 0 ? xSpeed - ball.speedIncrease : xSpeed + ball.speedIncrease;
        return {x: -xSpeed, y: ySpeed};
    }),
    new CollisionZone((ball) => {
        const xSpeed = ball.speed.x < 0 ? ball.speed.x - ball.speedIncrease : ball.speed.x + ball.speedIncrease;
        return {x: -xSpeed, y: 0};
    }),
    new CollisionZone((ball) => {
        let ySpeed = ball.speed.y;
        if (ySpeed < 0) {
            ySpeed = -ySpeed;
        }
        if (ySpeed === 0)
        {
            ySpeed = ball.minSpeed;
        }
        let xSpeed = ball.speed.x;
        xSpeed = ball.speed.x < 0 ? xSpeed - ball.speedIncrease : xSpeed + ball.speedIncrease;
        return {x: -xSpeed, y: ySpeed};
    })
];
