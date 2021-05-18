export default class InputHandler {
    constructor(game, paddle) {
        document.addEventListener("keydown", (event) => {
            console.log("key: ", event.key);
            switch (event.key) {
                case "ArrowUp":
                    paddle.moveUp();
                    break;
                case "ArrowDown":
                    paddle.moveDown();
                    break;
                case "Escape":
                    game.togglePause();
                    break;
                case " ":
                    game.start();
                    break;
            }
        });

        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    if (paddle.speed < 0) paddle.stop();
                    break;
                case "ArrowDown":
                    if (paddle.speed > 0) paddle.stop();
                    break;
            }
        });
    }
}
