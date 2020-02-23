import Phaser from "phaser";

const drawO = (graphics: Phaser.GameObjects.Graphics, centerX: number, centerY: number): void => {
    graphics.beginPath();

    const size = 100;
    const radius = Math.floor(size / 2);

    graphics.strokeCircle(centerX, centerY, radius);
};

const drawX = (graphics: Phaser.GameObjects.Graphics, centerX: number, centerY: number): void => {
    graphics.beginPath();

    const size = 100;
    const x = centerX - Math.floor(size / 2);
    const y = centerY - Math.floor(size / 2);

    graphics.moveTo(x, y);
    graphics.lineTo(x + size, y + size);
    graphics.moveTo(x, y + size);
    graphics.lineTo(x + size, y);

    graphics.strokePath();
};

const drawBoard = (graphics: Phaser.GameObjects.Graphics, centerX: number, centerY: number): void => {
    const size = 100;

    const x = centerX - Math.floor(size / 2) - size;
    const y = centerY - Math.floor(size / 2) - size;

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
            if (this.turn === Turn.X) {
                drawX(graphics, pointer.x, pointer.y);
            } else {
                drawO(graphics, pointer.x, pointer.y);
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
