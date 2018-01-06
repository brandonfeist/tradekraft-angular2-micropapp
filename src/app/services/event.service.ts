import { AppSettings } from 'app/app-settings';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
    private tkServiceUrl: string;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.tkServiceUrl = AppSettings.tkServiceUrl;
    }

    createEvent(eventData) {
        return this.authHttp.post(this.tkServiceUrl + '/v1/events', eventData)
        .map((res:Response) => res.json());
    }

    uploadEventImage(eventSlug: string, eventImage: File) {
        let formData: FormData = new FormData();
        formData.append('event-slug', eventSlug);
        formData.append('image', eventImage, eventImage.name);

        return this.authHttp.post(this.tkServiceUrl + '/v1/events/image', formData)
        .map((res:Response) => res.json());
    }

    getEvents(parameters?: URLSearchParams) {
        return this.http.get(this.tkServiceUrl + '/v1/events',
        { params: parameters })
        .map((res:Response) => res.json());
    }

    getEvent(slug: string) {
        return this.http.get(this.tkServiceUrl + '/v1/events/' + slug,)
        .map((res:Response) => res.json());
    }

    deleteEvent(eventSlug: string) {
        return this.authHttp.delete(this.tkServiceUrl + '/v1/events/' + eventSlug)
        .map((res:Response) => res.json());
    }

    editEvent(eventSlug: string, patches: Object[]) {
        return this.authHttp.patch(this.tkServiceUrl + '/v1/events/' + eventSlug, patches)
        .map((res:Response) => res.json());
    }
}
