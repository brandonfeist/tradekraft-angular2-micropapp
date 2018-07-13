import { Video } from './video';
import { Artist } from './artist';

export class Song {
    id: number;
    name: string;
    songFiles: any;
    trackNumber: number;
    duration: string;
    bpm: number;
    artists: Artist[];
    videos: Video[]
    // genre: Genre;
    slug: string;
}