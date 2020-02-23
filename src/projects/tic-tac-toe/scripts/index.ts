import Phaser from "phaser";

class SimpleGame {
    game: Phaser.Game;

    constructor() {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: "arcade",
                arcade: {gravity: {y: 200}},
            },
            scene: {
                preload: this.preload,
                create: this.create,
            },
        };

        this.game = new Phaser.Game(config);
    }

    preload(): void {
        (this as unknown as Phaser.Scene).load.setBaseURL("http://labs.phaser.io");

        (this as unknown as Phaser.Scene).load.image("sky", "assets/skies/space3.png");
        (this as unknown as Phaser.Scene).load.image("logo", "assets/sprites/phaser3-logo.png");
        (this as unknown as Phaser.Scene).load.image("red", "assets/particles/red.png");
    }

    create(): void {
        (this as unknown as Phaser.Scene).add.image(400, 300, "sky");

        const particles = (this as unknown as Phaser.Scene).add.particles("red");

        const emitter = particles.createEmitter({
            speed: 100,
            scale: {start: 1, end: 0},
            blendMode: "ADD",
        });

        const logo = (this as unknown as Phaser.Scene).physics.add.image(400, 100, "logo");

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
    }
}

window.onload = (): void => {
    new SimpleGame();
};
