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

    reset(): void {
        this.turn = Piece.X;
        this.board.clear();
    }

    determineWinnerIfExists(): Piece | undefined {
        const {board} = this;

        const allSamePiece = (a?: Piece, b?: Piece, c?: Piece): Piece | undefined => {
            const allDefined = a !== undefined && b !== undefined && c !== undefined;
            const allEqual = a === b && b === c;
            return allDefined && allEqual ? a : undefined;
        };

        let winner: Piece | undefined = undefined;
        for (let i = 0; i < 3; i += 1) {
            winner = winner === undefined ? undefined : allSamePiece(board.get(0, i), board.get(1, i), board.get(2, i));
            winner = winner === undefined ? undefined : allSamePiece(board.get(i, 0), board.get(i, 1), board.get(i, 2));
        }
        winner = winner === undefined ? undefined : allSamePiece(board.get(0, 0), board.get(1, 1), board.get(2, 2));
        winner = winner === undefined ? undefined : allSamePiece(board.get(2, 0), board.get(1, 1), board.get(0, 2));

        return winner;
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
            if (this.determineWinnerIfExists() !== undefined) {
                this.reset();
            }
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
