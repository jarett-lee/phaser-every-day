import Phaser from "phaser";
import {Grid} from "lib/grid";

const size = 100;
const halfSize = Math.floor(size / 2);

const drawO = (graphics: Phaser.GameObjects.Graphics, centerX: number, centerY: number): void => {
    graphics.beginPath();

    graphics.strokeCircle(centerX, centerY, halfSize);
};

const drawX = (graphics: Phaser.GameObjects.Graphics, centerX: number, centerY: number): void => {
    graphics.beginPath();

    const x = centerX - halfSize;
    const y = centerY - halfSize;

    graphics.moveTo(x, y);
    graphics.lineTo(x + size, y + size);
    graphics.moveTo(x, y + size);
    graphics.lineTo(x + size, y);

    graphics.strokePath();
};

const drawBoard = (graphics: Phaser.GameObjects.Graphics, centerX: number, centerY: number): void => {
    const x = centerX - halfSize - size;
    const y = centerY - halfSize - size;

    graphics.moveTo(x, y + size);
    graphics.lineTo(x + (3 * size), y + size);

    graphics.moveTo(x, y + (2 * size));
    graphics.lineTo(x + (3 * size), y + (2 * size));

    graphics.moveTo(x + size, y);
    graphics.lineTo(x + size, y + (3 * size));

    graphics.moveTo(x + (2 * size), y);
    graphics.lineTo(x + (2 * size), y + (3 * size));

    graphics.strokePath();
};

const snapToBoard = (x: number, y: number): {x: number; y: number} => {
    return {
        x: Math.floor((x + halfSize) / size) * size,
        y: Math.floor((y + halfSize) / size) * size,
    };
};

enum Piece {
    X, O
}

const nextPiece = (turn: Piece): Piece => {
    if (turn === Piece.X) {
        return Piece.O;
    } else {
        return Piece.X;
    }
};

class SimpleScene extends Phaser.Scene {
    turn: Piece;
    board: Grid<undefined | Piece>

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);

        this.turn = Piece.X;
        this.board = new Grid(3, 3);
    }

    create(): void {
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFFFFFF);

        drawBoard(graphics, 200, 200);

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const {x, y} = snapToBoard(pointer.x, pointer.y);

            if (this.turn === Piece.X) {
                drawX(graphics, x, y);
            } else {
                drawO(graphics, x, y);
            }
            this.turn = nextPiece(this.turn);
        }, this);
    }
}

class SimpleGame {
    game: Phaser.Game;

    constructor() {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 400,
            height: 400,
        };

        this.game = new Phaser.Game(config);

        this.game.scene.add("scene", SimpleScene);
        this.game.scene.start("scene");
    }
}

window.onload = (): void => {
    new SimpleGame();
};
