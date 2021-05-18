function getObjectRect(gameObject) {
    return {
        top: gameObject.position.y,
        left: gameObject.position.x,
        right: gameObject.position.x + gameObject.width,
        bottom: gameObject.position.y + gameObject.height
    };
}

function getObjectCollisionZones(gameObject) {
    const zoneHeight = gameObject.height / gameObject.zones.length;
    const zones = [];

    for (let i = 0; i < gameObject.zones.length; i++) {
        zones.push({
            zone: i,
            top: gameObject.position.y + (zoneHeight * i),
            left: gameObject.position.x,
            right: gameObject.position.x + gameObject.width,
            bottom: gameObject.position.y + (zoneHeight * i) + zoneHeight
        })
    }
    return zones;
}

export function detectCollision(ball, gameObject) {
    const bottomOfBall = ball.position.y + ball.size;
    const topOfBall = ball.position.y;

    const objRect = getObjectRect(gameObject);
    if (detectObjCollision(ball, bottomOfBall, topOfBall, objRect)) {
        const collisionZones = getObjectCollisionZones(gameObject);
        for (let i = 0; i < collisionZones.length; i++) {
            const zone = collisionZones[i];
            if (detectObjCollision(ball, bottomOfBall, topOfBall, zone)) {
                return gameObject.zones[i];
            }
        }
        return null;
    } else {
        return null;
    }
}

function detectObjCollision(ball, bottomOfBall, topOfBall, objRect) {
    return bottomOfBall >= objRect.top &&
        topOfBall <= objRect.bottom &&
        ball.position.x >= objRect.left &&
        ball.position.x + ball.size <= objRect.right;
}
