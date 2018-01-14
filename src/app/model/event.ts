import { Artist } from './artist';

export class Event {
    id: number;
    name: string;
    images: object;
    description: string;
    ticketLink: string;
    entryAge: string;
    venueName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    startDateTime: number;
    endDateTime: number;
    officialEvent: boolean;
    slug: string;
    artists: Artist[];
    createdAt: Date;
    updatedAt: Date;
}