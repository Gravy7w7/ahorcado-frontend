export interface GameMessage {
    type: string;
    word?: string;
    attempts?: number;
    usedLetters?: string[];
    message?: string;
}