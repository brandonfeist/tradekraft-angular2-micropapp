import { Release } from "app/model/release";

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
    release: Release;
    createdAt: Date;
    updatedAt: Date;
}