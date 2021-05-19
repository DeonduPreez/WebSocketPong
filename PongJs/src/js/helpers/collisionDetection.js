import {debug} from "../index.js";

export function drawHitBox(obj, ctx, fillStyle) {
    if (!debug) {
        return;
    }

    const hitBox = obj.getHitBox && {}.toString.call(obj.getHitBox) === "[object Function]" ?
        obj.getHitBox() :
        obj;
    const ctxFill = ctx.fillStyle;
    ctx.fillStyle = fillStyle == null ? "#0ff" : fillStyle;
    ctx.fillRect(hitBox.left, hitBox.top, hitBox.right - hitBox.left, hitBox.bottom - hitBox.top);
    ctx.fillStyle = ctxFill;
}

// function getObjectRect(gameObject) {
//     return {
//         top: gameObject.position.y,
//         left: gameObject.position.x,
//         right: gameObject.position.x + gameObject.width,
//         bottom: gameObject.position.y + gameObject.height
//     };
// }

export let debugZones = [];

function getObjectCollisionZones(gameObject, objHitBox) {
    debugZones.splice(0);
    const zoneHeight = (objHitBox.bottom - objHitBox.top) / gameObject.zones.length;
    const zones = [];

    for (let i = 0; i < gameObject.zones.length; i++) {
        const top = objHitBox.top + (zoneHeight * i);
        const left = objHitBox.left;
        zones.push({
            zone: gameObject.zones[i],
            top: top,
            left: left,
            right: left + gameObject.width,
            bottom: top + zoneHeight
        });
        debugZones.push(zones[i]);
    }
    return zones;
}


export function detectCollision(ball, gameObject) {

    const ballHitBox = ball.getHitBox();
    const objHitBox = gameObject.getHitBox();

    if (detectObjCollision(ballHitBox, objHitBox)) {
        const collisionZones = getObjectCollisionZones(gameObject, objHitBox);
        for (let i = 0; i < collisionZones.length; i++) {
            const zone = collisionZones[i];
            if (detectObjCollision(ballHitBox, zone)) {
                return zone.zone;
            }
        }
        return null;
    } else {
        return null;
    }
}

function detectObjCollision(ballHitBox, objHitBox) {
    return ballHitBox.bottom >= objHitBox.top &&
        ballHitBox.top <= objHitBox.bottom &&
        ballHitBox.left >= objHitBox.left &&
        ballHitBox.right <= objHitBox.right;
}
