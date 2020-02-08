import {Entity} from "./Entity";

export interface Graphics {
    draw: (entities: Entity) => void;
    clear: () => void;
}
