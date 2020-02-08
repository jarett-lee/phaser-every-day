import "../style.css";
import {Game} from "./Game";
import {Graphics} from "./Graphics";

const getHtmlElements = (): {canvas: HTMLCanvasElement} => {
    const canvas = document.getElementById("canvas");
    if (canvas === null) throw new Error("No such element with id canvas");
    if (!(canvas instanceof HTMLCanvasElement)) throw new Error("Element with id canvas is not HTMLCanvasElement");
    return {canvas};
};

const main = (): void => {
    const {canvas} = getHtmlElements();

    canvas.width = 200;
    canvas.height = 200;

    const context = canvas.getContext("2d");
    if (context === null) throw new Error("Context for canvas does not exist");

    // graphics should clear the board, draw clean lines, ...
    const graphics: Graphics = {
        draw: () => undefined,
        clear: (): void => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        },
    };
    const game = new Game(graphics);
    game.start();
};

main();
