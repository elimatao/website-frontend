export type Composer = {
    id: number;
    name: string;
    surname: string;
};

export type Piece = {
    id: number;
    composer_id: number;
    title_en: string;
};

export type Recording = {
    id: number;
    piece_id: number;
    url: string;
    recdate: Date;
    youtube_id: string;
    youtube_params?: string;
    highlighted?: boolean;
};

export type AggregateRecording = Recording & {
    piece_title: string,
    composer_id: number,
    composer_name: string,
    composer_surname: string,
}

export type MusicDatabase = {
    composers: Composer[];
    pieces: Piece[];
    recordings: Recording[];
};