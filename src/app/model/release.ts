import { Song } from './song';

export class Release {
    id: number;
    name: string;
    image: object;
    description: string;
    releaseType: string;
    releaseDate: Date;
    soundcloud: string;
    spotify: string;
    itunes: string;
    appleMusic: string;
    googlePlay: string;
    amazon: string;
    freeRelease: boolean;
    songs: Song[];
    slug: string;
}