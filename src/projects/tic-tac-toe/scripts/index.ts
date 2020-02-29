import Phaser from "phaser";
import {Grid} from "lib/grid";

enum Piece {
    X, O
}

class Graphics {
    graphics: Phaser.GameObjects.Graphics;
    size: number;
    halfSize: number;

    constructor(graphics: Phaser.GameObjects.Graphics, size: number) {
        this.graphics = graphics;
        this.size = size;
        this.halfSize = Math.floor(size / 2);
    }

    drawO(centerX: number, centerY: number): void {
        this.graphics.beginPath();

        this.graphics.strokeCircle(centerX, centerY, this.halfSize);
    }

    drawX(centerX: number, centerY: number): void {
        this.graphics.beginPath();

        const x = centerX - this.halfSize;
        const y = centerY - this.halfSize;

        this.graphics.moveTo(x, y);
        this.graphics.lineTo(x + this.size, y + this.size);
        this.graphics.moveTo(x, y + this.size);
        this.graphics.lineTo(x + this.size, y);

        this.graphics.strokePath();
    }

    drawBoard(centerX: number, centerY: number): void {
        const {size, halfSize} = this;

        const x = centerX - halfSize - size;
        const y = centerY - halfSize - size;

        this.graphics.moveTo(x, y + size);
        this.graphics.lineTo(x + (3 * size), y + size);

        this.graphics.moveTo(x, y + (2 * size));
        this.graphics.lineTo(x + (3 * size), y + (2 * size));

        this.graphics.moveTo(x + size, y);
        this.graphics.lineTo(x + size, y + (3 * size));

        this.graphics.moveTo(x + (2 * size), y);
        this.graphics.lineTo(x + (2 * size), y + (3 * size));

        this.graphics.strokePath();
    }

    draw(board: Grid<undefined | Piece>): void {
        const {graphics, size} = this;

        graphics.clear();

        graphics.lineStyle(1, 0xFFFFFF);

        this.drawBoard(2 * size, 2 * size);

        board.forEach((piece, i) => {
            const {x, y} = board.c(i);
            if (piece === Piece.X) {
                this.drawX((x + 1) * size, (y + 1) * size);
            } else if (piece === Piece.O) {
                this.drawO((x + 1) * size, (y + 1) * size);
            }
        });
    }
}

const snapToBoard = (x: number, y: number, size: number): {x: number; y: number} => {
    const halfSize = Math.floor(size / 2);

    return {
        x: Math.floor((x + halfSize) / size) * size,
        y: Math.floor((y + halfSize) / size) * size,
    };
};

const snapToBoard2 = (x: number, y: number, leftX: number, topY: number, size2: number): {x: number; y: number} => {
    const halfSize2 = Math.floor(size2 / 2);

    return {
        x: Math.floor((x + halfSize2 - leftX) / size2),
        y: Math.floor((y + halfSize2 - topY) / size2),
    };
};

const nextPiece = (turn: Piece): Piece => {
    if (turn === Piece.X) {
        return Piece.O;
    } else {
        return Piece.X;
    }
};

class SimpleScene extends Phaser.Scene {
    turn: Piece;
    size: number;
    board: Grid<undefined | Piece>;
    graphics: Graphics | undefined;

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);

        this.size = 100;
        this.turn = Piece.X;
        this.board = new Grid(3, 3);
    }

    getGraphics(): Graphics {
        if (this.graphics == undefined) {
            this.graphics = new Graphics(this.add.graphics(), this.size);
        }
        return this.graphics;
    }

    reset(): void {
        this.turn = Piece.X;
        this.board.clear();
        this.getGraphics().draw(this.board);
    }

    isGameOver(): boolean {
        const {board} = this;

        const allSamePiece = (a?: Piece, b?: Piece, c?: Piece): Piece | undefined => {
            const allDefined = a !== undefined && b !== undefined && c !== undefined;
            const allEqual = a === b && b === c;
            return allDefined && allEqual ? a : undefined;
        };

        let winner: Piece | undefined = undefined;
        let undefinedCount = 0;
        for (let i = 0; i < 3; i += 1) {
            if (winner === undefined) winner = allSamePiece(board.get(0, i), board.get(1, i), board.get(2, i));
            if (winner === undefined) winner = allSamePiece(board.get(i, 0), board.get(i, 1), board.get(i, 2));

            undefinedCount += board.get(0, i) === undefined ? 1 : 0;
            undefinedCount += board.get(1, i) === undefined ? 1 : 0;
            undefinedCount += board.get(2, i) === undefined ? 1 : 0;
        }
        if (winner === undefined) winner = allSamePiece(board.get(0, 0), board.get(1, 1), board.get(2, 2));
        if (winner === undefined) winner = allSamePiece(board.get(2, 0), board.get(1, 1), board.get(0, 2));
        const winnerExists = winner !== undefined;
        const boardFull = undefinedCount === 0;

        return winnerExists || boardFull;
    }

    create(): void {
        const {size} = this;
        const graphics = this.getGraphics();

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const {x, y} = snapToBoard2(pointer.x, pointer.y, size, size, size);
            const outOfBounds = this.board.outOfBounds(x, y);
            if (outOfBounds) return;

            const piece = this.board.get(x, y);
            if (piece !== undefined) return;

            this.board.set(x, y, this.turn);

            graphics.draw(this.board);
            this.turn = nextPiece(this.turn);
            if (this.isGameOver()) {
                this.reset();
            }
        }, this);

        graphics.draw(this.board);
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
