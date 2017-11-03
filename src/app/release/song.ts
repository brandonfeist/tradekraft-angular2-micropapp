import { Artist } from './../artist/artist';

export class Song {
    id: number;
    name: string;
    songFile: object;
    trackNumber: number;
    duration: string;
    bpm: number;
    artists: Artist[];
    // genre: Genre;
    slug: string;
}