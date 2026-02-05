import "server-only";
import fs from 'fs';
import yaml from 'js-yaml';
import { Composer, Piece, Recording, MusicDatabase, AggregateRecording } from "./music-types";

export function getMusicDatabase() {
    const composers = yaml.load(fs.readFileSync("./data/composers.yaml", "utf8")) as Composer[];
    const recordings = yaml.load(fs.readFileSync("./data/recordings.yaml", "utf8")) as Recording[];
    const pieces = yaml.load(fs.readFileSync("./data/pieces.yaml", "utf8")) as Piece[];

    composers.sort((a, b) => a.surname.localeCompare(b.surname));

    return {composers: composers, recordings: recordings, pieces: pieces} as MusicDatabase;
}

export function aggregateRecordingsData(musicDb: MusicDatabase) {
    const { composers, pieces, recordings } = musicDb;
    const aggregateRecordings = recordings.map((recording)=> {
        const piece = pieces.find((p) => p.id === recording.piece_id);
        const composer = composers.find((c) => c.id === piece?.composer_id);
        return {
            ...recording,
            piece_title: piece ? piece.title_en : "Unnamed Piece",
            composer_name: composer ? composer.name : "",
            composer_surname: composer ? composer.surname : "",
            composer_id: composer ? composer.id : -1,
        } as AggregateRecording;
    });
    return aggregateRecordings;
}