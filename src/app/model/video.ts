import { Song } from './song';

export class Video {
    id: number;
    name: string;
    image: object;
    slug: string;
    videoFiles;
    videoThumbnails;
    youtubeUrl: string;
    externalUrl: string;
    featured: boolean;
    song: Song;
    createdAt: Date;
    updatedAt: Date;
}