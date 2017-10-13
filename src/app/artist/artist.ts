import { Event } from './../event/event';

export class Artist {
    id: number;
    name: string;
    image: object;
    description: string;
    soundcloud: string;
    facebook: string;
    twitter: string;
    instagram: string;
    spotify: string;
    slug: string;
    events: Event[];
    createdAt: Date;
    updatedAt: Date;
}