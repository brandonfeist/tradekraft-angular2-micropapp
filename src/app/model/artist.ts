import { Year } from 'app/model/year';
import { Event } from './event';

export class Artist {
    id: number;
    name: string;
    images: object;
    description: string;
    soundcloud: string;
    facebook: string;
    twitter: string;
    instagram: string;
    releases;
    spotify: string;
    slug: string;
    events: Event[];
    yearsActive: Year[];
    createdAt: Date;
    updatedAt: Date;
}