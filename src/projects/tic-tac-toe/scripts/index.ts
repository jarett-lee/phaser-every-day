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

class SimpleScene extends Phaser.Scene {
    preload(): void {
        // TODO
    }

    create(): void {
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFFFFFF);

        drawX(graphics, 100, 100);
        drawO(graphics, 200, 200);
        drawBoard(graphics, 200, 200);
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
            width: 800,
            height: 600,
        };

        this.game = new Phaser.Game(config);

        this.game.scene.add("scene", SimpleScene);
        this.game.scene.start("scene");
    }
}

window.onload = (): void => {
    new SimpleGame();
};
