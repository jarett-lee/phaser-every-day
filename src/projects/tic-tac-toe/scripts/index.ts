import Phaser from "phaser";

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

enum Turn {
    X, O
}

const nextTurn = (turn: Turn): Turn => {
    if (turn === Turn.X) {
        return Turn.O;
    } else {
        return Turn.X;
    }
};

class SimpleScene extends Phaser.Scene {
    turn: Turn = Turn.X;

    preload(): void {
        // TODO
    }

    create(): void {
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFFFFFF);

        drawBoard(graphics, 200, 200);

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const {x, y} = snapToBoard(pointer.x, pointer.y);

            if (this.turn === Turn.X) {
                drawX(graphics, x, y);
            } else {
                drawO(graphics, x, y);
            }
            this.turn = nextTurn(this.turn);
        }, this);
    }

    update(): void {
        // TODO
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
