import {Entity} from "./Entity";
import {Graphics} from "./Graphics";

export class Game {
    startTime: number | undefined;
    entities: Entity[] = [];
    graphics: Graphics;

    constructor(graphics: Graphics) {
        this.graphics = graphics;
    }

    update(): void {
        for (let i = this.entities.length - 1; i >= 0; i -= 1) {
            const entity = this.entities[i];
            const deleteSelf = ((): (() => void) => {
                let executed = false;
                return (): void => {
                    if (!executed) {
                        executed = true;
                        this.entities.splice(i, 1);
                    }
                };
            })();
            entity.update(deleteSelf);
        }
    }

    render(): void {
        this.graphics.clear();
        for (const entity of this.entities) {
            this.graphics.draw(entity);
        }
    }

    step(time: number): void {
        if (this.startTime === undefined) this.startTime = time;

        this.update();
        this.render();
        window.requestAnimationFrame((time2: number) => this.step(time2));
    }

    start(): void {
        window.requestAnimationFrame((time: number) => this.step(time));
    }
}
