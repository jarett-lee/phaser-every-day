export interface Entity {
    update: (deleteSelf: () => void) => void;
}
