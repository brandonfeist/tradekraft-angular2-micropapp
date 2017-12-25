import { Song } from './song';

export class Video {
    id: number;
    name: string;
    image: object;
    slug: string;
    videoFile;
    videoThumbnail: string;
    youtubeUrl: string;
    externalUrl: string;
    featured: boolean;
    song: Song;
    createdAt: Date;
    updatedAt: Date;
}