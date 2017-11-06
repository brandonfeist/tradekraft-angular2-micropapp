import { Artist } from './../artist/artist';

export class Song {
    id: number;
    name: string;
    songFile: any;
    trackNumber: number;
    duration: string;
    bpm: number;
    artists: Artist[];
    // genre: Genre;
    slug: string;
}