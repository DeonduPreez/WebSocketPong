export default class CollisionZone {
    constructor(speedModifier) {
        this.speedModifier = speedModifier;
    }
}

export const onePaddleZone = [
    new CollisionZone((ball) => {
        return {x: reverseXSpeed(ball), y: 0};
    })
];

export const basicPaddleZones = [
    new CollisionZone((ball) => {
        let ySpeed = ball.speed.y;
        if (ySpeed > 0) {
            ySpeed = -ySpeed;
        }
        if (ySpeed === 0) {
            ySpeed = -ball.minSpeed;
        }
        return {x: reverseXSpeed(ball), y: ySpeed};
    }),
    new CollisionZone((ball) => {
        return {x: reverseXSpeed(ball), y: 0};
    }),
    new CollisionZone((ball) => {
        let ySpeed = ball.speed.y;
        if (ySpeed < 0) {
            ySpeed = -ySpeed;
        }
        if (ySpeed === 0) {
            ySpeed = ball.minSpeed;
        }
        return {x: reverseXSpeed(ball), y: ySpeed};
    })
];

function reverseXSpeed(ball) {
    return -(ball.speed.x < 0 ? ball.speed.x - ball.speedIncrease : ball.speed.x + ball.speedIncrease);
}
